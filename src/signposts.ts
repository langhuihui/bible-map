import maplibregl from "maplibre-gl";
import type { Journey, Site } from "./types";
import { isMobile, popupMaxWidth, popupOffset } from "./responsive";

export interface SignpostsApi {
  setActiveJourney(journeyId: string | null): void;
  openSite(journeyId: string, siteIndex: number): void;
  closePopup(): void;
  highlightSite(journeyId: string, siteIndex: number | null): void;
}

interface SignpostEntry {
  journeyId: string;
  siteIndex: number;
  site: Site;
  marker: maplibregl.Marker;
  el: HTMLElement;
}

function routeSourceId(journeyId: string): string {
  return `journey-route-${journeyId}`;
}

// 虚线相位序列：依次切换可让虚线沿线条正方向（sites 顺序）流动
const DASH_STEPS: number[][] = [
  [0, 4, 3],
  [0.5, 4, 2.5],
  [1, 4, 2],
  [1.5, 4, 1.5],
  [2, 4, 1],
  [2.5, 4, 0.5],
  [3, 4, 0],
  [0, 0.5, 3, 3.5],
  [0, 1, 3, 3],
  [0, 1.5, 3, 2.5],
  [0, 2, 3, 2],
  [0, 2.5, 3, 1.5],
  [0, 3, 3, 1],
  [0, 3.5, 3, 0.5],
];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSignpostEl(site: Site, color: string, order: number): HTMLElement {
  const el = document.createElement("div");
  el.className = "signpost";
  el.style.setProperty("--signpost-color", color);

  const board = document.createElement("div");
  board.className = "signpost-board";

  const num = document.createElement("span");
  num.className = "signpost-number";
  num.textContent = String(order);

  const name = document.createElement("span");
  name.className = "signpost-name";
  name.textContent = site.name;

  board.append(num, name);

  const pole = document.createElement("div");
  pole.className = "signpost-pole";

  el.appendChild(board);
  el.appendChild(pole);
  return el;
}

function buildPopupHtml(site: Site): string {
  const events = site.events
    .map((ev) => {
      const scriptureText = ev.scriptureText
        ? `<blockquote class="site-popup-quote">${escapeHtml(ev.scriptureText)}</blockquote>`
        : "";
      return `
        <div class="site-popup-event">
          <div class="site-popup-event-title">${escapeHtml(ev.title)}</div>
          <div class="site-popup-event-desc">${escapeHtml(ev.description)}</div>
          <div class="site-popup-scripture">${escapeHtml(ev.scripture)}</div>
          ${scriptureText}
        </div>`;
    })
    .join("");

  const modern = site.modernName
    ? `<div class="site-popup-modern">今 ${escapeHtml(site.modernName)}</div>`
    : "";

  return `
    <div class="site-popup-body">
      <div class="site-popup-name">${escapeHtml(site.name)}</div>
      ${modern}
      <div class="site-popup-events">${events}</div>
    </div>`;
}

export function initSignposts(
  map: maplibregl.Map,
  journeys: Journey[],
): SignpostsApi {
  const entries: SignpostEntry[] = [];
  let activeJourneyId: string | null = null;
  let highlighted: SignpostEntry | null = null;
  let popup: maplibregl.Popup | null = null;

  // 路线 source/layer
  for (const journey of journeys) {
    const id = routeSourceId(journey.id);
    map.addSource(id, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: journey.sites.map((s) => s.coordinates),
        },
      },
    });
    // 白色描边底层，让黑色虚线在深浅地形上都清晰可辨
    map.addLayer({
      id: `${id}-glow`,
      type: "line",
      source: id,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": "#ffffff",
        "line-width": 6,
        "line-opacity": 0.55,
        "line-blur": 1,
      },
    });
    map.addLayer({
      id: `${id}-line`,
      type: "line",
      source: id,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": "#000000",
        "line-width": 3,
        "line-dasharray": DASH_STEPS[0],
      },
    });
  }

  // 虚线流动动画：循环平移 dash 相位，使虚线沿 sites 顺序方向流动
  const DASH_FPS = 18;
  let dashStep = 0;
  let lastDashTime = 0;
  function animateDash(time: number): void {
    if (time - lastDashTime >= 1000 / DASH_FPS) {
      lastDashTime = time;
      dashStep = (dashStep + 1) % DASH_STEPS.length;
      for (const journey of journeys) {
        const layerId = `${routeSourceId(journey.id)}-line`;
        if (map.getLayer(layerId)) {
          map.setPaintProperty(layerId, "line-dasharray", DASH_STEPS[dashStep]);
        }
      }
    }
    requestAnimationFrame(animateDash);
  }
  requestAnimationFrame(animateDash);

  function setHighlight(entry: SignpostEntry | null): void {
    if (highlighted) highlighted.el.classList.remove("signpost-highlighted");
    highlighted = entry;
    if (entry) entry.el.classList.add("signpost-highlighted");
  }

  function closePopup(): void {
    popup?.remove();
    popup = null;
  }

  function openPopupFor(entry: SignpostEntry): void {
    closePopup();
    popup = new maplibregl.Popup({
      className: isMobile() ? "site-popup site-popup--mobile" : "site-popup",
      anchor: isMobile() ? "top" : "bottom",
      offset: popupOffset(),
      maxWidth: popupMaxWidth(),
      closeButton: true,
      closeOnClick: false,
    })
      .setLngLat(entry.site.coordinates)
      .setHTML(buildPopupHtml(entry.site))
      .addTo(map);
    popup.on("close", () => {
      popup = null;
    });
  }

  // 路牌 marker
  for (const journey of journeys) {
    journey.sites.forEach((site, siteIndex) => {
      const el = buildSignpostEl(site, journey.color, siteIndex + 1);
      const marker = new maplibregl.Marker({
        element: el,
        anchor: "bottom",
        pitchAlignment: "viewport",
        rotationAlignment: "viewport",
      })
        .setLngLat(site.coordinates)
        .addTo(map);

      const entry: SignpostEntry = {
        journeyId: journey.id,
        siteIndex,
        site,
        marker,
        el,
      };
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setHighlight(entry);
        openPopupFor(entry);
      });
      entries.push(entry);
    });
  }

  function findEntry(
    journeyId: string,
    siteIndex: number,
  ): SignpostEntry | undefined {
    return entries.find(
      (e) => e.journeyId === journeyId && e.siteIndex === siteIndex,
    );
  }

  function setActiveJourney(journeyId: string | null): void {
    activeJourneyId = journeyId;
    for (const journey of journeys) {
      const visible = journeyId === null || journey.id === journeyId;
      const visibility = visible ? "visible" : "none";
      const id = routeSourceId(journey.id);
      map.setLayoutProperty(`${id}-line`, "visibility", visibility);
      map.setLayoutProperty(`${id}-glow`, "visibility", visibility);
    }
    for (const entry of entries) {
      const visible =
        activeJourneyId === null || entry.journeyId === activeJourneyId;
      entry.el.style.display = visible ? "" : "none";
    }
    if (highlighted && activeJourneyId && highlighted.journeyId !== activeJourneyId) {
      setHighlight(null);
      closePopup();
    }
  }

  function openSite(journeyId: string, siteIndex: number): void {
    const entry = findEntry(journeyId, siteIndex);
    if (!entry) return;
    setHighlight(entry);
    openPopupFor(entry);
  }

  function highlightSite(journeyId: string, siteIndex: number | null): void {
    if (siteIndex === null) {
      if (highlighted?.journeyId === journeyId) setHighlight(null);
      return;
    }
    const entry = findEntry(journeyId, siteIndex);
    setHighlight(entry ?? null);
  }

  return { setActiveJourney, openSite, closePopup, highlightSite };
}
