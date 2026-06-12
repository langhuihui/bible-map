const MOBILE_MQ = window.matchMedia("(max-width: 600px)");
const REDUCED_MOTION_MQ = window.matchMedia("(prefers-reduced-motion: reduce)");

let terrainModeEnabled = false;

export function isMobile(): boolean {
  return MOBILE_MQ.matches;
}

export function prefersReducedMotion(): boolean {
  return REDUCED_MOTION_MQ.matches;
}

export function setTerrainModeEnabled(enabled: boolean): void {
  terrainModeEnabled = enabled;
}

export function isTerrainModeEnabled(): boolean {
  return terrainModeEnabled;
}

export interface MapInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function fitBoundsPadding(): MapInsets {
  if (isMobile()) {
    return { top: 48, bottom: 200, left: 20, right: 20 };
  }
  return { top: 60, bottom: 240, left: 80, right: 80 };
}

function controlBarBottomInset(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--control-bar-offset")
    .trim();
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 200;
}

export function flyToPadding(): MapInsets {
  if (isMobile()) {
    const collapsed = document
      .getElementById("control-bar")
      ?.classList.contains("pb-collapsed");
    return { top: 72, left: 0, right: 0, bottom: collapsed ? 64 : 220 };
  }
  // 播放聚焦：上方为气泡留空，路牌靠下显示
  return {
    top: 320,
    left: 0,
    right: 0,
    bottom: controlBarBottomInset(),
  };
}

export function popupOffset(): number {
  return isMobile() ? 12 : 64;
}

export function popupMaxWidth(): string {
  if (isMobile()) {
    return `${Math.min(window.innerWidth - 24, 420)}px`;
  }
  return "640px";
}

export function defaultPitch(): number {
  if (terrainModeEnabled) {
    return isMobile() ? 50 : 60;
  }
  return isMobile() ? 30 : 40;
}

/** 同步控制条高度，供弹窗 bottom 留白计算 */
export function syncControlBarHeight(): void {
  const bar = document.getElementById("control-bar");
  if (!bar) return;
  const gap = isMobile() ? 16 : 28;
  document.documentElement.style.setProperty(
    "--control-bar-offset",
    `${bar.offsetHeight + gap}px`,
  );
}
