import type maplibregl from "maplibre-gl";
import { isMobile } from "./responsive";

export const TERRAIN_SOURCE = "terrain-dem";
const PROBE_MS = 2500;
const CONFIG_CACHE_KEY = "bible-map:map-config-v1";
const TERRAIN_CACHE_KEY = "bible-map:terrain-config-v1";

// 耶路撒冷附近 z8 瓦片，用于探测可用性
const PROBE_Z = 8;
const PROBE_X = 153;
const PROBE_Y = 105;

export interface TerrainConfig {
  tiles: string[];
  encoding: "terrarium" | "mapbox";
  maxzoom?: number;
}

export type ResolvedMapConfig =
  | { kind: "style-url"; styleUrl: string; label: string }
  | {
      kind: "raster";
      style: maplibregl.StyleSpecification;
      label: string;
    };

interface TileCandidate {
  id: string;
  label: string;
  tiles: string[];
  attribution: string;
}

const STYLE_CANDIDATES = [
  {
    id: "openfreemap-liberty",
    label: "OpenFreeMap",
    url: "https://tiles.openfreemap.org/styles/liberty",
  },
  {
    id: "openfreemap-bright",
    label: "OpenFreeMap Bright",
    url: "https://tiles.openfreemap.org/styles/bright",
  },
] as const;

const RASTER_CANDIDATES: TileCandidate[] = [
  {
    id: "osm-cn",
    label: "OpenStreetMap 中国镜像",
    tiles: ["https://tile.openstreetmap.cn/{z}/{x}/{y}.png"],
    attribution: "&copy; OpenStreetMap contributors, OSM China",
  },
  {
    id: "osm-de",
    label: "OpenStreetMap 德国镜像",
    tiles: ["https://tile.openstreetmap.de/{z}/{x}/{y}.png"],
    attribution: "&copy; OpenStreetMap contributors",
  },
  {
    id: "wikimedia",
    label: "Wikimedia OSM",
    tiles: ["https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"],
    attribution: "&copy; OpenStreetMap contributors, Wikimedia",
  },
  {
    id: "carto-voyager",
    label: "CARTO Voyager",
    tiles: [
      "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    ],
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
  },
  {
    id: "osm",
    label: "OpenStreetMap",
    tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
    attribution: "&copy; OpenStreetMap contributors",
  },
];

const TERRAIN_CANDIDATES: (TerrainConfig & { label: string })[] = [
  {
    label: "AWS Terrarium",
    tiles: [
      "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
    ],
    encoding: "terrarium",
    maxzoom: 15,
  },
];

async function probeFetch(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(PROBE_MS),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function tileUrl(template: string, z: number, x: number, y: number): string {
  return template.replace("{z}", String(z)).replace("{x}", String(x)).replace("{y}", String(y));
}

async function probeRasterTiles(tiles: string[]): Promise<boolean> {
  return probeFetch(tileUrl(tiles[0], PROBE_Z, PROBE_X, PROBE_Y));
}

function buildTiandituStyle(token: string): maplibregl.StyleSpecification {
  const mkTiles = (layer: string) =>
    Array.from({ length: 8 }, (_, i) =>
      `https://t${i}.tianditu.gov.cn/DataServer?T=${layer}&x={x}&y={y}&l={z}&tk=${token}`,
    );

  return {
    version: 8,
    sources: {
      "tdt-vec": {
        type: "raster",
        tiles: mkTiles("vec_w"),
        tileSize: 256,
        maxzoom: 18,
        attribution: "&copy; 天地图",
      },
      "tdt-cva": {
        type: "raster",
        tiles: mkTiles("cva_w"),
        tileSize: 256,
        maxzoom: 18,
      },
      "tdt-ter": {
        type: "raster",
        tiles: mkTiles("ter_w"),
        tileSize: 256,
        maxzoom: 14,
      },
    },
    sky: defaultSky(),
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": "#0d1117" },
      },
      { id: "tdt-vec", type: "raster", source: "tdt-vec" },
      { id: "tdt-ter", type: "raster", source: "tdt-ter", paint: { "raster-opacity": 0.35 } },
      { id: "tdt-cva", type: "raster", source: "tdt-cva" },
    ],
  };
}

function defaultSky(): maplibregl.SkySpecification {
  return {
    "sky-color": "#1a2b4a",
    "horizon-color": "#3a5577",
    "fog-color": "#2a3a55",
    "sky-horizon-blend": 0.6,
    "horizon-fog-blend": 0.7,
    "fog-ground-blend": 0.6,
  };
}

function buildRasterStyle(
  candidate: TileCandidate,
): maplibregl.StyleSpecification {
  const sources: maplibregl.StyleSpecification["sources"] = {
    basemap: {
      type: "raster",
      tiles: candidate.tiles,
      tileSize: 256,
      maxzoom: 19,
      attribution: candidate.attribution,
    },
  };

  const layers: maplibregl.LayerSpecification[] = [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#0d1117" },
    },
    { id: "basemap", type: "raster", source: "basemap" },
  ];

  return {
    version: 8,
    sources,
    sky: defaultSky(),
    layers,
  };
}

async function resolveTerrain(): Promise<TerrainConfig | undefined> {
  for (const t of TERRAIN_CANDIDATES) {
    const url = tileUrl(t.tiles[0], PROBE_Z, PROBE_X, PROBE_Y);
    if (await probeFetch(url)) {
      console.info(`[bible-map] 地形数据源: ${t.label}`);
      return t;
    }
  }
  console.warn("[bible-map] 无可用地形瓦片，将以平面模式显示");
  return undefined;
}

function terrainLabelOf(terrain: TerrainConfig): string | undefined {
  return TERRAIN_CANDIDATES.find((t) => t.tiles[0] === terrain.tiles[0])?.label;
}

function readConfigCache(): CachedMapConfig | null {
  try {
    const raw = sessionStorage.getItem(CONFIG_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CachedMapConfig;
  } catch {
    return null;
  }
}

interface CachedMapConfig {
  sourceId: string;
}

function writeConfigCache(sourceId: string): void {
  try {
    sessionStorage.setItem(
      CONFIG_CACHE_KEY,
      JSON.stringify({ sourceId } satisfies CachedMapConfig),
    );
  } catch {
    // 存储不可用时忽略
  }
}

function buildConfigFromCache(
  cached: CachedMapConfig,
): ResolvedMapConfig | null {
  if (cached.sourceId === "tianditu") {
    const token = import.meta.env.VITE_TIANDITU_TOKEN?.trim();
    if (!token) return null;
    return {
      kind: "raster",
      style: buildTiandituStyle(token),
      label: "天地图",
    };
  }

  const style = STYLE_CANDIDATES.find((s) => s.id === cached.sourceId);
  if (style) {
    return {
      kind: "style-url",
      styleUrl: style.url,
      label: style.label,
    };
  }

  const raster = RASTER_CANDIDATES.find((c) => c.id === cached.sourceId);
  if (raster) {
    return {
      kind: "raster",
      style: buildRasterStyle(raster),
      label: raster.label,
    };
  }

  if (cached.sourceId === "demotiles") {
    return {
      kind: "style-url",
      styleUrl: "https://demotiles.maplibre.org/style.json",
      label: "MapLibre Demo",
    };
  }

  return null;
}

let terrainConfigPromise: Promise<TerrainConfig | undefined> | null = null;

export function loadTerrainConfig(): Promise<TerrainConfig | undefined> {
  if (!terrainConfigPromise) {
    terrainConfigPromise = resolveTerrainConfigCached();
  }
  return terrainConfigPromise;
}

async function resolveTerrainConfigCached(): Promise<TerrainConfig | undefined> {
  try {
    const label = sessionStorage.getItem(TERRAIN_CACHE_KEY);
    if (label) {
      const hit = TERRAIN_CANDIDATES.find((t) => t.label === label);
      if (hit) return hit;
    }
  } catch {
    // 忽略缓存读取失败
  }

  const terrain = await resolveTerrain();
  if (terrain) {
    try {
      sessionStorage.setItem(TERRAIN_CACHE_KEY, terrainLabelOf(terrain) ?? "");
    } catch {
      // 忽略缓存写入失败
    }
  }
  return terrain;
}

export async function resolveMapConfig(): Promise<ResolvedMapConfig> {
  const cached = readConfigCache();
  if (cached) {
    const config = buildConfigFromCache(cached);
    if (config) {
      console.info(`[bible-map] 底图: ${config.label} (缓存)`);
      return config;
    }
  }

  const tiandituToken = import.meta.env.VITE_TIANDITU_TOKEN?.trim();
  if (tiandituToken) {
    // 天地图浏览器端 Key 禁止服务端 fetch，且 CORS 探测不可靠，配置后直接采用
    console.info("[bible-map] 底图: 天地图");
    const config: ResolvedMapConfig = {
      kind: "raster",
      style: buildTiandituStyle(tiandituToken),
      label: "天地图",
    };
    writeConfigCache("tianditu");
    return config;
  }

  const styleProbes = await Promise.all(
    STYLE_CANDIDATES.map(async (s) => ({
      s,
      ok: await probeFetch(s.url),
    })),
  );
  const styleHit = styleProbes.find((r) => r.ok);
  if (styleHit) {
    console.info(`[bible-map] 底图: ${styleHit.s.label}`);
    const config: ResolvedMapConfig = {
      kind: "style-url",
      styleUrl: styleHit.s.url,
      label: styleHit.s.label,
    };
    writeConfigCache(styleHit.s.id);
    return config;
  }

  const rasterProbes = await Promise.all(
    RASTER_CANDIDATES.map(async (c) => ({
      c,
      ok: await probeRasterTiles(c.tiles),
    })),
  );
  const rasterHit = rasterProbes.find((r) => r.ok);

  if (rasterHit) {
    console.info(`[bible-map] 底图: ${rasterHit.c.label}`);
    const config: ResolvedMapConfig = {
      kind: "raster",
      style: buildRasterStyle(rasterHit.c),
      label: rasterHit.c.label,
    };
    writeConfigCache(rasterHit.c.id);
    return config;
  }

  console.warn("[bible-map] 所有底图源不可达，回退 demotiles");
  const fallback: ResolvedMapConfig = {
    kind: "style-url",
    styleUrl: "https://demotiles.maplibre.org/style.json",
    label: "MapLibre Demo",
  };
  writeConfigCache("demotiles");
  return fallback;
}

export function applyTerrain(
  map: maplibregl.Map,
  terrain: TerrainConfig,
): void {
  try {
    if (!map.getSource(TERRAIN_SOURCE)) {
      map.addSource(TERRAIN_SOURCE, {
        type: "raster-dem",
        tiles: terrain.tiles,
        tileSize: 256,
        encoding: terrain.encoding,
        maxzoom: terrain.maxzoom ?? 15,
      });
    }
    map.setTerrain({
      source: TERRAIN_SOURCE,
      exaggeration: isMobile() ? 1.2 : 1.5,
    });
  } catch (err) {
    console.warn("[bible-map] 地形加载失败:", err);
  }
}

export function removeTerrain(map: maplibregl.Map): void {
  try {
    map.setTerrain(null);
    if (map.getSource(TERRAIN_SOURCE)) {
      map.removeSource(TERRAIN_SOURCE);
    }
  } catch (err) {
    console.warn("[bible-map] 地形关闭失败:", err);
  }
}

export function ensureSky(map: maplibregl.Map): void {
  try {
    map.setSky(defaultSky());
  } catch {
    // 部分外部样式不支持 sky，忽略
  }
}
