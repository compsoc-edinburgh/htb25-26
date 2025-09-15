export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  gif?: string;
  link?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Kameran Russell",
    role: "Director",
    bio: "I'm a 3rd year Maths student. Here to make HTB fun and engaging for everyone!",
    image: "/team/kameran.png",
    link: "https://www.linkedin.com/in/kameran-russell-238712203/",
  },
  {
    name: "Kacper Szymanski",
    role: "Events Lead",
    bio: "Organising big events and programming embedded systems.",
    image: "/team/Kacper.png",
    link: "https://www.linkedin.com/in/kacper-szymanski-edi/",
  },
  {
    name: "Danyil Butov",
    role: "Tech Lead",
    bio: "Enjoying building seamless, functional products that feel intuitive to use.",
    link: "https://danyilbutov.com/",
    image: "/team/danyil.png",
  },
  {
    name: "Kay",
    role: "Design Lead",
    bio: "Designing & developing visual experiences that even your grandma would love.",
    image: "/team/kay.png",
    gif: "/team/kay.gif",
    link: "https://itskay.co",
  },
  {
    name: "Anna Petrusenko",
    role: "Events",
    bio: "Coding enthusiast passionate about robotics and quantum physics and AI",
    link: "https://www.linkedin.com/in/anna-petrusenko-0600b02b6/",
    image: "/team/anna.png",
  },
  {
    name: "Yasir",
    role: "Tech",
    bio: "Coder with 15yrs of experience",
    link: "https://www.linkedin.com/in/jasiridriz/",
    image: "/team/yasir.png",
  },
  {
    name: "Yuna",
    role: "Tech",
    bio: "crashout software developer specialising in AI and frontend shenanigans <3",
    link: "https://www.linkedin.com/in/yuna-shono-1b3431188?",
    image: "/team/yuna.png",
  },
  {
    name: "Emily Miller",
    role: "Tech",
    bio: "Hi, I'm Emily! I mainly do sysadmin, backend SWE, and cybersecurity work. CTF player in my spare time.",
    link: "https://emilymiller.xyz/",
    image: "/team/emily.png",
  },
  {
    name: "Ao Zhang",
    role: "Logistics",
    bio: "3rd yr AI & CS student at UoE. Like to build & paint minitures during free time.",
    link: "https://www.instagram.com/aozhang384/",
    image: "/team/ao.png",
  },
  {
    name: "Archie",
    role: "Logistics",
    bio: "A hacker making sure you're all fed",
    link: "https://platinumxy.com/",
    image: "/team/archie.png",
  },
];
