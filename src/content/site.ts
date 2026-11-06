export const site = {
  name: "Lhenna-Marie Velasco",
  shortName: "Lhenna",
  role: "UI/UX Designer & Frontend Developer",
  // Override with NEXT_PUBLIC_SITE_URL if a custom domain is connected later.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lhennav.github.io/lhenna-portfolio",
  description:
    "Lhenna-Marie Velasco is a UI/UX designer and frontend developer who designs interfaces in Figma, then builds them with Next.js, TypeScript, and Tailwind CSS.",
  location: "Santa Maria, Bulacan, Philippines",
  email: "vlhennamarie@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1_Xfmtsy8TfvCJFzy_U8l8ro_dWQGYg_5/view?usp=sharing",
  socials: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/lhenna-marie-velasco-151825342",
    },
    { label: "GitHub", url: "https://github.com/LhennaV" },
  ],
};

export const skills = [
  {
    group: "Design",
    items: [
      "Figma",
      "User flows",
      "Wireframing",
      "Interactive prototypes",
      "Design systems",
      "Accessible color & theming",
    ],
  },
  {
    group: "Frontend",
    items: [
      "HTML & CSS",
      "JavaScript",
      "TypeScript",
      "React & Next.js",
      "Tailwind CSS",
      "Alpine.js",
      "Laravel Blade",
    ],
  },
  {
    group: "Tools & services",
    items: ["Supabase", "Leaflet.js", "Vercel", "Git & GitHub"],
  },
];
