"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { Event } from "~/types/schedule";

interface ScheduleTimelineProps {
  events: Event[];
  startHour?: number;
  endHour?: number;
  className?: string;

  pxPerHour?: number;
  compressAfterMinutes?: number;
  gapCompressFactor?: number;
  minEventWidth?: number;
  dayRowHeight?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const ON_HOVER_VARIANTS = {
  rest: {
    clipPath: "inset(0 calc(100% - 2px) 0 0)",
    transition: { duration: 0.35, ease: EASE },
  },
  hover: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 0.45, ease: EASE },
  },
};

const ON_HOVER_CONTENT_VARIANTS = {
  rest: { color: "rgb(24 24 27)", transition: { duration: 0.4, ease: EASE } },
  hover: {
    color: "rgb(255 255 255)",
    transition: { duration: 0.4, ease: EASE },
  },
};

const ON_HOVER_CARD_VARIANTS = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: 0.35, ease: EASE } },
};

type DayChunks = Array<
  | { kind: "gap"; minutes: number }
  | { kind: "event"; minutes: number; event: Event }
>;

const toMinutes = (hhmm: string): number => {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(v, hi));

const toOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

const formatDay = (dateStr: string) => {
  const date = new Date(dateStr);
  return {
    dayNumber: String(date.getDate()).padStart(2, "0"),
    dayOrdinal: toOrdinal(date.getDate()), // e.g., 12th
    dayName: date
      .toLocaleDateString("en-GB", { weekday: "long" })
      .toUpperCase(),
    monthNameUpper: date
      .toLocaleDateString("en-GB", { month: "long" })
      .toUpperCase(),
    monthNameTitle: date.toLocaleDateString("en-GB", { month: "long" }), // e.g., September
  };
};

const groupEventsByDay = (events: Event[]): Record<string, Event[]> =>
  events.reduce(
    (acc, e) => {
      (acc[e.day] ||= []).push(e);
      return acc;
    },
    {} as Record<string, Event[]>
  );

function buildChunksForDay(
  dayEvents: Event[],
  startHour: number,
  endHour: number
): DayChunks {
  const startWindow = startHour * 60;
  const endWindow = endHour * 60;

  const normalized = dayEvents
    .map((e) => {
      const s = clamp(toMinutes(e.start), startWindow, endWindow);
      const t = clamp(toMinutes(e.end), startWindow, endWindow);
      return t > s ? { ...e, _s: s, _t: t } : null;
    })
    .filter((v): v is Event & { _s: number; _t: number } => !!v)
    .sort((a, b) => a._s - b._s || a._t - b._t);

  const chunks: DayChunks = [];
  let cursor = startWindow;

  for (const e of normalized) {
    if (e._s > cursor) chunks.push({ kind: "gap", minutes: e._s - cursor });
    chunks.push({ kind: "event", minutes: e._t - e._s, event: e });
    cursor = e._t;
  }

  if (cursor < endWindow)
    chunks.push({ kind: "gap", minutes: endWindow - cursor });
  return chunks;
}

export default function ScheduleTimeline({
  events,
  startHour = 9,
  endHour = 23,
  className = "",
  pxPerHour = 240,
  compressAfterMinutes = 60,
  gapCompressFactor = 0.25,
  minEventWidth = 80,
  dayRowHeight = 220,
}: ScheduleTimelineProps) {
  const eventsByDay = useMemo(() => groupEventsByDay(events), [events]);

  const sortedDays = useMemo(
    () =>
      Object.keys(eventsByDay).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      ),
    [eventsByDay]
  );

  const pxPerMinute = pxPerHour / 60;

  const widthForGap = (gapMinutes: number) => {
    if (gapMinutes <= 0) return 0;
    const full = Math.min(gapMinutes, compressAfterMinutes) * pxPerMinute;
    const extra =
      Math.max(0, gapMinutes - compressAfterMinutes) *
      pxPerMinute *
      gapCompressFactor;
    return full + extra;
  };

  const widthForEvent = (eventMinutes: number) =>
    Math.max(minEventWidth, eventMinutes * pxPerMinute);

  return (
    <div className={`w-full border-y border-gray-200 ${className}`}>
      <div className="relative">
        {sortedDays.map((day) => {
          const {
            dayNumber,
            dayOrdinal,
            dayName,
            monthNameUpper,
            monthNameTitle,
          } = formatDay(day);
          const dayEvents = eventsByDay[day] ?? [];
          const chunks = buildChunksForDay(dayEvents, startHour, endHour);

          return (
            <div
              key={day}
              className="flex border-b border-gray-200 last:border-b-0"
            >
              <div className="hidden w-64 flex-shrink-0 flex-col justify-center p-4 md:flex">
                <div className="flex items-end gap-1 text-7xl font-bold leading-none">
                  <h1 className="font-hexaframe text-black">{dayNumber}</h1>
                  <p className="text-xs font-medium uppercase text-zinc-500">
                    {monthNameUpper}
                  </p>
                </div>
                <div className="text-left font-hexaframe text-3xl font-bold leading-none text-black">
                  {dayName}
                </div>
              </div>

              <div className="relative min-w-0 flex-1">
                <div className="px-4 pt-4 md:hidden">
                  <div className="font-hexaframe text-2xl font-bold leading-none text-black">
                    {dayOrdinal} {monthNameTitle}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase text-zinc-500">
                    {dayName}
                  </div>
                </div>

                <div className="relative">
                  <div
                    className="scrollbar-hide overflow-x-auto overflow-y-hidden px-8 py-5 pt-3 md:pt-5"
                    style={{ height: `${dayRowHeight}px` }}
                    role="region"
                    aria-label={`${dayOrdinal} ${monthNameTitle} timeline`}
                  >
                    <div className="flex items-stretch">
                      {chunks.map((chunk, idx) => {
                        if (chunk.kind === "gap") {
                          const w = widthForGap(chunk.minutes);
                          return (
                            <div
                              key={`gap-${idx}`}
                              className="shrink-0"
                              style={{ width: `${w}px` }}
                              aria-hidden
                            />
                          );
                        }

                        const w = widthForEvent(chunk.minutes);
                        const e = chunk.event;

                        return (
                          <motion.article
                            key={e.id}
                            className="relative mx-1 flex w-auto max-w-[70vw] shrink-0 flex-col overflow-hidden  bg-white"
                            style={{
                              width: `${w}px`,
                              height: `${dayRowHeight - 32}px`,
                            }}
                            variants={ON_HOVER_CARD_VARIANTS}
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                          >
                            <motion.div
                              className="absolute inset-0 bg-black"
                              style={{ willChange: "clip-path" }}
                              variants={ON_HOVER_VARIANTS}
                              aria-hidden
                            />

                            <motion.div
                              className="relative z-10 flex h-full flex-col p-4"
                              variants={ON_HOVER_CONTENT_VARIANTS}
                              style={{ willChange: "color" }}
                            >
                              <motion.div
                                className="mb-2 text-xs font-bold sm:text-sm"
                                layout="position"
                              >
                                {e.start}–{e.end}
                              </motion.div>

                              <motion.div
                                className="mb-1 text-sm font-semibold leading-tight sm:text-base"
                                layout="position"
                                transition={{ duration: 0.2, ease: EASE }}
                              >
                                {e.title}
                              </motion.div>

                              {e.location && (
                                <motion.div
                                  className="mb-1 text-xs font-medium opacity-90"
                                  layout="position"
                                  transition={{ duration: 0.2, ease: EASE }}
                                >
                                  {e.location}
                                </motion.div>
                              )}

                              {e.description && (
                                <motion.div
                                  className="mt-1 line-clamp-5 flex-1 overflow-hidden text-xs leading-tight opacity-80"
                                  transition={{ duration: 0.2, ease: EASE }}
                                >
                                  {e.description}
                                </motion.div>
                              )}
                            </motion.div>
                          </motion.article>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pointer-events-none absolute left-0 top-0 z-30 h-full w-8 bg-gradient-to-r from-white via-white/80 to-transparent" />
                  <div className="pointer-events-none absolute right-0 top-0 z-30 h-full w-8 bg-gradient-to-l from-white via-white/80 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
