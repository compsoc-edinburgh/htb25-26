export type Event = {
  id: string;
  day: "2025-09-12" | "2025-09-13" | string;
  start: string;
  end: string;
  title: string;
  location?: string;
  description?: string;
};

export const hackathonEvents: Event[] = [
  {
    id: "arrival",
    day: "2025-11-01",
    start: "9:00",
    end: "10:00",
    title: "Arrival of participants",
    location: "@NUCLEUS_FOYER",
    description: "Check in and be ready for the event",
  },
  {
    id: "opening-ceremony",
    day: "2025-11-01",
    start: "10:00",
    end: "11:00",
    title: "Opening Ceremony",
    location: "@OAK_LECTURE_THEATRE",
    description: "Opening ceremony and welcome speech",
  },
  {
    id: "team-submission",
    day: "2025-11-01",
    start: "11:00",
    end: "12:00",
    title: "Team Submission",
    location: "@THE_NUCLEUS",
    description: "Submit your team. No team, no hackathon.",
  },
  {
    id: "lunch",
    day: "2025-11-01",
    start: "13:00",
    end: "14:00",
    title: "Lunch",
    location: "@FIRST_FLOOR",
  },
  {
    id: "workshop",
    day: "2025-11-01",
    start: "14:00",
    end: "16:00",
    title: "Workshop",
    location: "@TBA",
    description: "Learn new technologies and frameworks",
  },
  {
    id: "dinner",
    day: "2025-11-01",
    start: "19:30",
    end: "20:00",
    title: "Dinner",
    location: "@FIRST_FLOOR",
  },
  {
    id: "breakfast",
    day: "2025-11-02",
    start: "08:00",
    end: "09:00",
    title: "Breakfast",
    location: "@FIRST_FLOOR",
  },
  {
    id: "submission",
    day: "2025-11-02",
    start: "11:00",
    end: "12:00",
    title: "Submission",
    location: "@THE_NUCLEUS",
    description: "Submit your project",
  },
  {
    id: "lunch",
    day: "2025-11-02",
    start: "12:00",
    end: "13:00",
    title: "Lunch",
    location: "@FIRST_FLOOR",
  },
  {
    id: "demo",
    day: "2025-11-02",
    start: "13:00",
    end: "15:00",
    title: "Demo & Judging",
    location: "@TBA",
  },
  {
    id: "final-results",
    day: "2025-11-02",
    start: "15:00",
    end: "15:30",
    title: "Final Results",
    location: "@THE_NUCLEUS",
    description: "Announce the final results",
  },
  {
    id: "closing-ceremony",
    day: "2025-11-02",
    start: "15:30",
    end: "17:00",
    title: "Closing Ceremony",
    location: "@OAK_LECTURE_THEATRE",
    description: "Closing ceremony and wrap up",
  },
  {
    id: "end",
    day: "2025-11-02",
    start: "17:00",
    end: "17:30",
    title: "End of the Hackathon",
    location: "@THE_NUCLEUS",
  },
];
