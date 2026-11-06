export const site = {
  name: "Lhenna-Marie Velasco",
  shortName: "Lhenna",
  role: "UI/UX Designer & Frontend Developer",
  // NEXT_PUBLIC_SITE_URL wins (custom domain). On Vercel, use its production URL;
  // otherwise fall back to GitHub Pages.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://lhennav.github.io/lhenna-portfolio"),
  description:
    "Lhenna-Marie Velasco is a UI/UX designer and frontend developer who designs interfaces in Figma, then builds them with Next.js, TypeScript, and Tailwind CSS.",
  location: "Santa Maria, Bulacan, Philippines",
  email: "vlhennamarie@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1rUNEUg5-PMZG77rSxgEIc8C7JBwF1mIT/view?usp=sharing",
  socials: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/lhenna-marie-velasco-151825342",
    },
    { label: "GitHub", url: "https://github.com/LhennaV" },
  ],
};

// `icon` is a key in src/components/SkillIcon.tsx
export type Skill = { name: string; icon: string };

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Design",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "User flows", icon: "flows" },
      { name: "Wireframing", icon: "wireframe" },
      { name: "Interactive prototypes", icon: "prototype" },
      { name: "Design systems", icon: "components" },
      { name: "Accessible color & theming", icon: "contrast" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Alpine.js", icon: "alpine" },
      { name: "Laravel Blade", icon: "laravel" },
    ],
  },
  {
    group: "Tools & services",
    items: [
      { name: "Supabase", icon: "supabase" },
      { name: "Leaflet.js", icon: "leaflet" },
      { name: "Vercel", icon: "vercel" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Claude Code", icon: "claude" },
    ],
  },
];
