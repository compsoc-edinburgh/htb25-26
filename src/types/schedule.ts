export type Event = {
  id: string;
  day: "2025-09-12" | "2025-09-13" | string; // ISO date
  start: string; // 'HH:mm'
  end: string; // 'HH:mm'
  title: string;
  location?: string; // e.g., '@NUCLEUS_RECEPTION'
  description?: string;
};
