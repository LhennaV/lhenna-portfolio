import type { IconType } from "react-icons";
import {
  LuComponent,
  LuContrast,
  LuLayoutTemplate,
  LuMousePointerClick,
  LuSparkles,
  LuWorkflow,
} from "react-icons/lu";
import {
  SiAlpinedotjs,
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLeaflet,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

// Brand logos for tools (Simple Icons), generic icons for design skills (Lucide).
const icons: Record<string, IconType> = {
  figma: SiFigma,
  flows: LuWorkflow,
  wireframe: LuLayoutTemplate,
  prototype: LuMousePointerClick,
  components: LuComponent,
  contrast: LuContrast,
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  alpine: SiAlpinedotjs,
  laravel: SiLaravel,
  supabase: SiSupabase,
  leaflet: SiLeaflet,
  vercel: SiVercel,
  git: SiGit,
  github: SiGithub,
};

export default function SkillIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = icons[icon] ?? LuSparkles;
  return <Icon aria-hidden className={className} />;
}
