import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";
import { journeys } from "./data/journeys";
import { initSignposts } from "./signposts";
import { initPlayback } from "./playback";

const FALLBACK_STYLE = "https://demotiles.maplibre.org/style.json";
const TERRAIN_SOURCE = "terrain-dem";

// 优先使用 OSM raster 瓦片，保证现代城市/地名标注
const osmStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      maxzoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    },
    [TERRAIN_SOURCE]: {
      type: "raster-dem",
      tiles: [
        "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      encoding: "terrarium",
      maxzoom: 15,
    },
  },
  sky: {
    "sky-color": "#1a2b4a",
    "horizon-color": "#3a5577",
    "fog-color": "#2a3a55",
    "sky-horizon-blend": 0.6,
    "horizon-fog-blend": 0.7,
    "fog-ground-blend": 0.6,
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#0d1117" },
    },
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};

export const map = new maplibregl.Map({
  container: "map",
  style: osmStyle,
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
});

// 默认拖拽旋转；按住空格拖拽平移
setupCustomMapControls(map);

map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

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
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
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
    map.setPitch(Math.min(map.getMaxPitch(), Math.max(0, startPitch - dy * 0.4)));
  });

  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    mode = null;
    updateCursor();
    map.fire("dragend");
  });
}

map.on("load", () => {
  map.setTerrain({ source: TERRAIN_SOURCE, exaggeration: 1.5 });
  const signposts = initSignposts(map, journeys);
  initPlayback(map, journeys, signposts);
  window.dispatchEvent(new CustomEvent("map-ready", { detail: { map } }));
});

// OSM 瓦片不可用时回退到 demotiles 样式
map.once("error", (e) => {
  console.warn("Map error, falling back to demotiles style:", e.error);
  if (!map.isStyleLoaded()) {
    map.setStyle(FALLBACK_STYLE);
  }
});
