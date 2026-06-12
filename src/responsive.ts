const MOBILE_MQ = window.matchMedia("(max-width: 600px)");

export function isMobile(): boolean {
  return MOBILE_MQ.matches;
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

export function flyToPadding(): MapInsets {
  if (isMobile()) {
    return { top: 72, left: 0, right: 0, bottom: 220 };
  }
  return { top: 0, left: 0, right: 0, bottom: 200 };
}

export function popupOffset(): number {
  return isMobile() ? 12 : 64;
}

export function popupMaxWidth(): string {
  if (isMobile()) {
    return `${Math.min(window.innerWidth - 24, 420)}px`;
  }
  return "320px";
}

export function defaultPitch(): number {
  return isMobile() ? 50 : 60;
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
