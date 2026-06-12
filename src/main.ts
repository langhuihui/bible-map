import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";
import { journeys } from "./data/journeys";
import { initSignposts } from "./signposts";
import { initPlayback } from "./playback";
import {
  applyTerrain,
  ensureSky,
  resolveMapConfig,
} from "./mapSources";

export let map: maplibregl.Map;

async function bootstrap(): Promise<void> {
  const loading = document.createElement("div");
  loading.className = "map-loading";
  loading.textContent = "正在连接地图服务…";
  document.getElementById("map")?.appendChild(loading);

  const config = await resolveMapConfig();
  loading.remove();

  const mapOptions: maplibregl.MapOptions = {
    container: "map",
    center: [33, 33],
    zoom: 6,
    pitch: 60,
    bearing: 0,
    maxPitch: 75,
    attributionControl: { compact: true },
    dragPan: false,
    dragRotate: false,
    touchZoomRotate: true,
    touchPitch: true,
    transformRequest: (url) => {
      if (url.includes("tianditu.gov.cn")) {
        return { url, headers: { Referer: "https://www.tianditu.gov.cn/" } };
      }
      return { url };
    },
  };

  if (config.kind === "style-url") {
    mapOptions.style = config.styleUrl;
  } else {
    mapOptions.style = config.style;
  }

  map = new maplibregl.Map(mapOptions);

  setupCustomMapControls(map);
  map.addControl(
    new maplibregl.NavigationControl({ visualizePitch: true }),
    "top-right",
  );

  map.on("load", () => {
    ensureSky(map);
    applyTerrain(map, config.terrain);
    const signposts = initSignposts(map, journeys);
    initPlayback(map, journeys, signposts);
    window.dispatchEvent(new CustomEvent("map-ready", { detail: { map } }));
  });

  map.on("error", (e) => {
    if (e.error?.message?.includes("Failed to load")) {
      console.warn("[bible-map] 瓦片加载错误:", e.error.message);
    }
  });
}

bootstrap().catch((err) => {
  console.error("[bible-map] 地图初始化失败:", err);
});

function setupCustomMapControls(map: maplibregl.Map): void {
  const canvas = map.getCanvas();
  map.dragPan.disable();
  map.dragRotate.disable();

  let spaceHeld = false;
  let dragging = false;
  let mode: "pan" | "rotate" | null = null;
  let startX = 0;
  let startY = 0;
  let startBearing = 0;
  let startPitch = 0;

  function updateCursor(): void {
    if (dragging) {
      canvas.style.cursor = "grabbing";
    } else if (spaceHeld) {
      canvas.style.cursor = "grab";
    } else {
      canvas.style.cursor = "";
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.code !== "Space" || e.repeat) return;
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }
    spaceHeld = true;
    updateCursor();
    e.preventDefault();
  });

  window.addEventListener("keyup", (e) => {
    if (e.code !== "Space") return;
    spaceHeld = false;
    updateCursor();
  });

  window.addEventListener("blur", () => {
    spaceHeld = false;
    dragging = false;
    mode = null;
    updateCursor();
  });

  canvas.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    dragging = true;
    mode = spaceHeld ? "pan" : "rotate";
    startX = e.clientX;
    startY = e.clientY;
    startBearing = map.getBearing();
    startPitch = map.getPitch();
    updateCursor();
    map.fire("dragstart", { originalEvent: e });
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging || !mode) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (mode === "pan") {
      map.panBy([-dx, -dy], { animate: false });
      startX = e.clientX;
      startY = e.clientY;
      return;
    }

    map.setBearing(startBearing + dx * 0.6);
    map.setPitch(
      Math.min(map.getMaxPitch(), Math.max(0, startPitch - dy * 0.4)),
    );
  });

  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    mode = null;
    updateCursor();
    map.fire("dragend");
  });
}
