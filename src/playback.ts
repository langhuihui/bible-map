import maplibregl from "maplibre-gl";
import type { Journey, Site } from "./types";
import {
  defaultPitch,
  fitBoundsPadding,
  flyToPadding,
  syncControlBarHeight,
} from "./responsive";

// 与并行模块 signposts.ts 的 API 契约保持一致（本地声明，避免编译依赖）
export interface SignpostsApi {
  setActiveJourney(id: string | null): void;
  openSite(journeyId: string, siteIndex: number): void;
  closePopup(): void;
  highlightSite(journeyId: string, siteIndex: number | null): void;
}

const DWELL_MS = 6000;
const SPEEDS = [0.5, 1, 2] as const;

function bearingBetween(a: [number, number], b: [number, number]): number {
  const toRad = Math.PI / 180;
  const lat1 = a[1] * toRad;
  const lat2 = b[1] * toRad;
  const dLng = (b[0] - a[0]) * toRad;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function distanceKm(a: [number, number], b: [number, number]): number {
  const toRad = Math.PI / 180;
  const dLat = (b[1] - a[1]) * toRad;
  const dLng = (b[0] - a[0]) * toRad;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a[1] * toRad) * Math.cos(b[1] * toRad) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(s));
}

// 地点间距越小 zoom 越大（9-11）
function fitJourneyView(map: maplibregl.Map, journey: Journey): void {
  const coords = journey.sites.map((s) => s.coordinates);
  if (coords.length === 0) return;

  const bounds = coords.reduce(
    (b, c) => b.extend(c),
    new maplibregl.LngLatBounds(coords[0], coords[0]),
  );

  map.fitBounds(bounds, {
    padding: fitBoundsPadding(),
    pitch: defaultPitch(),
    duration: 1500,
    maxZoom: 9,
  });
}

function zoomForSite(journey: Journey, index: number): number {
  const site = journey.sites[index];
  const neighbors: number[] = [];
  if (index > 0)
    neighbors.push(distanceKm(journey.sites[index - 1].coordinates, site.coordinates));
  if (index < journey.sites.length - 1)
    neighbors.push(distanceKm(site.coordinates, journey.sites[index + 1].coordinates));
  const d = neighbors.length ? Math.min(...neighbors) : 50;
  if (d < 20) return 11;
  if (d < 80) return 10;
  return 9;
}

export function initPlayback(
  map: maplibregl.Map,
  journeys: Journey[],
  signposts: SignpostsApi
): void {
  const root = document.getElementById("control-bar");
  if (!root) return;

  let activeJourney: Journey = journeys[0];
  let currentIndex = 0;
  let playing = false;
  let speedIdx = 1; // 1x
  let dwellTimer: number | null = null;
  let moveEndHandler: (() => void) | null = null;

  // ---------- DOM ----------
  root.classList.add("playback");
  root.innerHTML = "";

  const tabsEl = document.createElement("div");
  tabsEl.className = "pb-tabs";

  const mainEl = document.createElement("div");
  mainEl.className = "pb-main";

  const btnPrev = makeBtn("pb-btn pb-prev", "⏮", "上一站");
  const btnPlay = makeBtn("pb-btn pb-play", "▶", "播放/暂停");
  const btnNext = makeBtn("pb-btn pb-next", "⏭", "下一站");

  const speedBtn = makeBtn("pb-btn pb-speed", "1x", "播放速度");

  const trackWrap = document.createElement("div");
  trackWrap.className = "pb-track-wrap";
  const trackEl = document.createElement("div");
  trackEl.className = "pb-track";
  const siteNameEl = document.createElement("div");
  siteNameEl.className = "pb-site-name";
  trackWrap.appendChild(siteNameEl);
  trackWrap.appendChild(trackEl);

  mainEl.append(btnPrev, btnPlay, btnNext, trackWrap, speedBtn);
  root.append(tabsEl, mainEl);

  function makeBtn(cls: string, text: string, title: string): HTMLButtonElement {
    const b = document.createElement("button");
    b.className = cls;
    b.textContent = text;
    b.title = title;
    return b;
  }

  // ---------- Tabs ----------
  const tabButtons = new Map<string, HTMLButtonElement>();
  journeys.forEach((j) => {
    const b = document.createElement("button");
    b.className = "pb-tab";
    const dot = document.createElement("span");
    dot.className = "pb-tab-dot";
    dot.style.background = j.color;
    b.appendChild(dot);
    b.appendChild(document.createTextNode(j.name));
    b.addEventListener("click", () => selectJourney(j));
    tabButtons.set(j.id, b);
    tabsEl.appendChild(b);
  });

  // ---------- 进度条 ----------
  let nodeEls: HTMLElement[] = [];

  function buildTrack(): void {
    trackEl.innerHTML = "";
    nodeEls = [];
    activeJourney.sites.forEach((site, i) => {
      if (i > 0) {
        const seg = document.createElement("div");
        seg.className = "pb-seg";
        trackEl.appendChild(seg);
      }
      const node = document.createElement("button");
      node.className = "pb-node";
      node.title = site.name;
      node.style.setProperty("--journey-color", activeJourney.color);
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        goTo(i, true);
      });
      nodeEls.push(node);
      trackEl.appendChild(node);
    });
  }

  // 点击/拖动轨道按比例定位到最近节点
  function trackToIndex(clientX: number): number {
    const rect = trackEl.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(ratio * (activeJourney.sites.length - 1));
  }
  trackEl.addEventListener("click", (e) => goTo(trackToIndex(e.clientX), true));
  trackEl.addEventListener("pointerdown", (e) => {
    if ((e.target as HTMLElement).classList.contains("pb-node")) return;
    trackEl.setPointerCapture(e.pointerId);
    const onMove = (ev: PointerEvent) => updateProgressUI(trackToIndex(ev.clientX));
    const onUp = (ev: PointerEvent) => {
      trackEl.removeEventListener("pointermove", onMove);
      trackEl.removeEventListener("pointerup", onUp);
      goTo(trackToIndex(ev.clientX), true);
    };
    trackEl.addEventListener("pointermove", onMove);
    trackEl.addEventListener("pointerup", onUp);
  });

  function updateProgressUI(index: number): void {
    nodeEls.forEach((n, i) => {
      n.classList.toggle("active", i === index);
      n.classList.toggle("passed", i < index);
    });
    trackEl.querySelectorAll(".pb-seg").forEach((seg, i) => {
      seg.classList.toggle("passed", i < index);
    });
    siteNameEl.textContent = activeJourney.sites[index]?.name ?? "";
  }

  // ---------- 播放控制 ----------
  function clearTimers(): void {
    if (dwellTimer !== null) {
      window.clearTimeout(dwellTimer);
      dwellTimer = null;
    }
    if (moveEndHandler) {
      map.off("moveend", moveEndHandler);
      moveEndHandler = null;
    }
  }

  function flyToSite(index: number, onArrive?: () => void): void {
    clearTimers();
    const site: Site = activeJourney.sites[index];
    const prev = activeJourney.sites[index - 1] ?? site;
    const next = activeJourney.sites[index + 1] ?? site;
    const bearing =
      prev === next ? map.getBearing() : bearingBetween(prev.coordinates, next.coordinates);

    const handler = () => {
      moveEndHandler = null;
      signposts.openSite(activeJourney.id, index);
      onArrive?.();
    };
    moveEndHandler = handler;
    map.once("moveend", handler);

    map.flyTo({
      center: site.coordinates,
      zoom: zoomForSite(activeJourney, index),
      pitch: defaultPitch(),
      bearing,
      speed: 0.9,
      essential: true,
      padding: flyToPadding(),
    });
  }

  function scheduleNext(): void {
    if (!playing) return;
    dwellTimer = window.setTimeout(() => {
      dwellTimer = null;
      if (!playing) return;
      if (currentIndex >= activeJourney.sites.length - 1) {
        setPlaying(false);
        return;
      }
      currentIndex += 1;
      updateProgressUI(currentIndex);
      signposts.highlightSite(activeJourney.id, currentIndex);
      flyToSite(currentIndex, scheduleNext);
    }, DWELL_MS / SPEEDS[speedIdx]);
  }

  function setPlaying(v: boolean): void {
    playing = v;
    btnPlay.textContent = v ? "⏸" : "▶";
    if (!v) {
      clearTimers();
    }
  }

  function goTo(index: number, pause = false): void {
    if (pause) setPlaying(false);
    currentIndex = Math.min(Math.max(index, 0), activeJourney.sites.length - 1);
    updateProgressUI(currentIndex);
    signposts.highlightSite(activeJourney.id, currentIndex);
    flyToSite(currentIndex, playing ? scheduleNext : undefined);
  }

  function selectJourney(j: Journey): void {
    setPlaying(false);
    signposts.closePopup();
    activeJourney = j;
    currentIndex = 0;
    tabButtons.forEach((b, id) => b.classList.toggle("active", id === j.id));
    signposts.setActiveJourney(j.id);
    buildTrack();
    updateProgressUI(0);
    signposts.highlightSite(j.id, 0);
    fitJourneyView(map, j);
  }

  // ---------- 按钮事件 ----------
  btnPlay.addEventListener("click", () => {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
      flyToSite(currentIndex, scheduleNext);
    }
  });
  btnPrev.addEventListener("click", () => goTo(currentIndex - 1, true));
  btnNext.addEventListener("click", () => goTo(currentIndex + 1, true));
  speedBtn.addEventListener("click", () => {
    speedIdx = (speedIdx + 1) % SPEEDS.length;
    speedBtn.textContent = `${SPEEDS[speedIdx]}x`;
  });

  // 用户拖动地图时自动暂停
  map.on("dragstart", () => {
    if (playing) setPlaying(false);
  });

  // ---------- 初始化 ----------
  selectJourney(journeys[0]);
  syncControlBarHeight();
  window.addEventListener("resize", syncControlBarHeight);
  new ResizeObserver(syncControlBarHeight).observe(root);
}
