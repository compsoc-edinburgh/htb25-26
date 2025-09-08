export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Danyil Butov",
    role: "Tech Lead",
    bio: "Software developer passionate about user‑centric design.",
  },
  {
    name: "Alex Morgan",
    role: "President",
    bio: "Guiding the vision and keeping everything on track.",
  },
  {
    name: "Priya Shah",
    role: "Sponsorship",
    bio: "Building meaningful relationships.",
  },
  {
    name: "Leo Martínez",
    role: "Design",
    bio: "Crafting consistent branding and visual identity.",
  },
  {
    name: "Hannah Lee",
    role: "Logistics",
    bio: "Making the weekend run smoothly end‑to‑end.",
  },
  {
    name: "Omar Ali",
    role: "Workshops",
    bio: "Curating sessions that inspire creative hacks.",
  },
  {
    name: "Sofia Rossi",
    role: "Community",
    bio: "Creating an inclusive, welcoming atmosphere.",
  },
  {
    name: "Ethan Park",
    role: "Ops Engineer",
    bio: "Keeping infrastructure stable and fast all weekend.",
  },
];
