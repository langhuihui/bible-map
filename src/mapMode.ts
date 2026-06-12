import maplibregl from "maplibre-gl";
import { applyTerrain, loadTerrainConfig, removeTerrain } from "./mapSources";
import { defaultPitch, setTerrainModeEnabled } from "./responsive";

const TERRAIN_PREF_KEY = "bible-map:terrain-enabled";

export function enableGlobe(map: maplibregl.Map): void {
  try {
    map.setProjection({ type: "globe" });
  } catch (err) {
    console.warn("[bible-map] Globe 投影不可用:", err);
  }
}

function readTerrainPref(): boolean {
  try {
    return localStorage.getItem(TERRAIN_PREF_KEY) === "1";
  } catch {
    return false;
  }
}

function writeTerrainPref(enabled: boolean): void {
  try {
    localStorage.setItem(TERRAIN_PREF_KEY, enabled ? "1" : "0");
  } catch {
    // 存储不可用时忽略
  }
}

function syncToggle(
  btn: HTMLButtonElement,
  enabled: boolean,
  loading = false,
): void {
  btn.disabled = loading;
  btn.textContent = loading ? "加载中…" : enabled ? "3D 地形 · 开" : "3D 地形 · 关";
  btn.setAttribute("aria-pressed", String(enabled));
}

async function enableTerrainMode(map: maplibregl.Map): Promise<boolean> {
  const terrain = await loadTerrainConfig();
  if (!terrain) {
    console.warn("[bible-map] 无可用地形数据，保持 Globe 轻量模式");
    return false;
  }
  applyTerrain(map, terrain);
  setTerrainModeEnabled(true);
  map.easeTo({ pitch: defaultPitch(), duration: 800 });
  return true;
}

function disableTerrainMode(map: maplibregl.Map): void {
  removeTerrain(map);
  setTerrainModeEnabled(false);
  map.easeTo({ pitch: defaultPitch(), duration: 800 });
}

export function initMapModeControls(map: maplibregl.Map): void {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "map-mode-toggle";
  btn.title = "开启后可显示山体起伏，可能降低流畅度";

  let enabled = readTerrainPref();
  syncToggle(btn, enabled);

  btn.addEventListener("click", async () => {
    if (btn.disabled) return;
    if (enabled) {
      disableTerrainMode(map);
      enabled = false;
      writeTerrainPref(false);
      syncToggle(btn, enabled);
      return;
    }

    syncToggle(btn, enabled, true);
    enabled = await enableTerrainMode(map);
    if (!enabled) writeTerrainPref(false);
    else writeTerrainPref(true);
    syncToggle(btn, enabled);
  });

  document.body.appendChild(btn);

  if (enabled) {
    syncToggle(btn, enabled, true);
    void enableTerrainMode(map).then((ok) => {
      enabled = ok;
      if (!ok) writeTerrainPref(false);
      syncToggle(btn, enabled);
    });
  }
}
