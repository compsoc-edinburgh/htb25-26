const OPEN_DATE_UTC = Date.UTC(2025, 8, 15, 0, 0, 0);

export function isBeforeOpenDate(nowMs?: number): boolean {
  const now = typeof nowMs === "number" ? nowMs : Date.now();
  return now < OPEN_DATE_UTC;
}

export const OPEN_DATE_READABLE = "September 15, 2025";
