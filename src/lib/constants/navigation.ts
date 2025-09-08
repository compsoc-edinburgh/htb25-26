export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/#about", label: "ABOUT" },
  { href: "/#schedule", label: "SCHEDULE" },
  { href: "/#team", label: "TEAM" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#volunteer", label: "VOLUNTEER" },
];

export const SOCIAL_LINKS: NavLink[] = [
  { label: "GITHUB", href: "https://github.com/compsoc-edinburgh/htb25-26" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/hacktheburgh" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/company/hacktheburgh/" },
];
