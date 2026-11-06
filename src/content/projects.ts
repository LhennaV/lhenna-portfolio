export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectLink = { label: string; url: string };

export type Project = {
  slug: string;
  title: string;
  formerName?: string;
  featured: boolean;
  tagline: string;
  summary: string;
  cover: ProjectImage;
  role: string;
  team?: string;
  timeline?: string;
  status?: string;
  tags: string[];
  problem?: string;
  sections?: { title: string; points: string[] }[];
  process?: {
    intro: string;
    steps: { title: string; body: string; quote?: string; images?: ProjectImage[] }[];
  };
  stack?: string;
  gallery?: ProjectImage[];
  links: ProjectLink[];
};

const phone = (src: string, caption: string, alt: string, height = 844, width = 390): ProjectImage => ({
  src,
  caption,
  alt,
  width,
  height,
});

export const projects: Project[] = [
  {
    slug: "trybe",
    title: "Trybe",
    featured: true,
    tagline: "A trading platform for hobby tools and equipment.",
    summary:
      "Trybe lets people trade the hobby gear they no longer use for gear they need to try something new, with trust built into every step of the trade.",
    cover: {
      src: "/images/projects/trybe/desktop-feed.png",
      alt: "Trybe desktop discovery feed showing hobby posts in a masonry grid",
      width: 1440,
      height: 900,
    },
    role: "Product design & frontend",
    team: "Personal project (2-person team)",
    timeline: "Oct 2026 – present",
    status: "In development · prototype complete",
    tags: ["UI/UX", "Figma", "Mobile-first", "Next.js", "TypeScript", "Supabase"],
    problem:
      "People pick up a hobby, buy the gear, then move on, so the tools sit unused and lose value. Trying something new means buying fresh equipment that might not pay off. Trybe lets people swap what they no longer use for what they need next.",
    sections: [
      {
        title: "What I designed",
        points: [
          "A Pinterest-style discovery feed, browsable by hobby category, where every post clearly shows whether its gear is up for trade or shared for inspiration only.",
          "The full trade flow: propose an item-for-item swap, balance an uneven trade with cash or an extra item, and counter-offer inside the chat.",
          "Trust and safety built into the flow: ratings, trade history, account age, a “new trader” badge, safe public meetup spots, and an inspect-before-you-swap checklist.",
          "Cancel, block, and report flows plus edge cases, across 9 flows on both mobile and desktop.",
        ],
      },
      {
        title: "Research that shaped it",
        points: [
          "Carousell: sellers pre-set trade markups like “trades+5”, which became Trybe’s “looking for” field.",
          "Depop: buyers check review count, rating, and account age first, so every Trybe profile shows all three.",
          "Facebook Marketplace: safe exchange zones and inspection reminders became part of the meetup step.",
        ],
      },
      {
        title: "Accessibility & brand",
        points: [
          "Light, dark, and high-contrast versions of every theme.",
          "A custom logo concept, brand palette, and a consistent icon set.",
        ],
      },
    ],
    process: {
      intro:
        "Trybe started in my notebook long before it reached Figma. These are the actual pages.",
      steps: [
        {
          title: "Naming it",
          body: "My first names were literal: Hobby Trader, Tools Trader, Hobby Trade. Accurate, but forgettable. Trybe stuck because it's two words in one: try, because the app is about trying new hobbies, and tribe, for the community around them.",
          images: [
            {
              src: "/images/projects/trybe/process/naming.jpg",
              alt: "Notebook page listing app name ideas, with Trybe circled and annotated as try plus tribe",
              caption: "Name ideas, with Trybe circled",
              width: 900,
              height: 1200,
            },
          ],
        },
        {
          title: "Scroll or swipe?",
          quote: "Imagine squishy trade but with hobby tools.",
          body: "I wanted it to feel like social media or a dating app, and went back and forth on scrolling versus swiping. I chose scrolling, like Instagram, so people can discover their next hobby by browsing what others have made.",
        },
        {
          title: "Finding the tagline",
          body: "I started from the saying “curiosity killed the cat, but satisfaction brought it back” and mapped it onto the problem: curiosity is what gets people to try new hobbies, and it “kills” them financially and in storage space when the hobby doesn't stick. Trybe is what brings it back. One draft was “Curiosity looks good on you (???)”. The final: “Curiosity killed the cat. Trybe brought it back.”",
          images: [
            {
              src: "/images/projects/trybe/process/tagline.jpg",
              alt: "Notebook page mapping the phrase curiosity killed the cat onto Trybe's purpose",
              caption: "Turning the saying into a metaphor",
              width: 900,
              height: 1200,
            },
          ],
        },
        {
          title: "The logo",
          body: "A cat peeking out of a box. The cat is the curiosity, and the box is the hobby tools forgotten in storage. My cat, Stormi, was the reference, which is why the final cat is a tortoiseshell.",
          images: [
            {
              src: "/images/projects/trybe/process/logo-notes.jpg",
              alt: "Notebook page with the logo idea, a cat peeking out of a box, and rough sketches including one of Stormi",
              caption: "First logo notes and rough sketches",
              width: 900,
              height: 1200,
            },
            {
              src: "/images/projects/trybe/process/logo-sketch.jpg",
              alt: "Pencil sketch of a cat peeking out of a cardboard box marked with a T and a paw print",
              caption: "The sketch that went into Figma…",
              width: 760,
              height: 600,
            },
            {
              src: "/images/projects/trybe/process/logo-final.png",
              alt: "Final Trybe logo: a tortoiseshell cat peeking out of a cardboard box above the TRYBE wordmark and tagline",
              caption: "…and the final logo",
              width: 510,
              height: 478,
            },
          ],
        },
        {
          title: "Rules I set early, and what I cut",
          quote: "Trybe should be fun in designs. Don't stick to one color, use dopamine colors.",
          body: "That note is why Trybe pairs lavender with coral, yellow, mint, and sky blue instead of a single brand color. Renting tools made it into my first proposal, but not into the first version, which focuses on trading.",
        },
      ],
    },
    stack:
      "Next.js, TypeScript, and Tailwind CSS on the frontend; Supabase for auth, database, storage, and realtime chat; deployed on Vercel as an installable PWA.",
    gallery: [
      phone("/images/projects/trybe/mobile-feed.png", "Discovery feed", "Trybe mobile discovery feed"),
      phone("/images/projects/trybe/mobile-post.png", "Post with tools up for trade", "Trybe post detail listing tools available for trade"),
      phone("/images/projects/trybe/mobile-propose.png", "Proposing a trade", "Trybe propose-a-trade screen"),
      phone("/images/projects/trybe/mobile-chat.png", "Counter-offer chat", "Trybe chat with a counter-offer"),
      phone("/images/projects/trybe/mobile-meetup.png", "Safe meetup checklist", "Trybe meetup checklist screen"),
      phone("/images/projects/trybe/mobile-profile.png", "Trust signals on profiles", "Trybe profile showing rating, trade count, and account age"),
      {
        src: "/images/projects/trybe/themes-dark.png",
        alt: "Trybe screens in the dark theme",
        caption: "Dark theme",
        width: 1600,
        height: 876,
      },
    ],
    links: [
      { label: "Figma prototype", url: "https://www.figma.com/design/yR5GCWiMt5l1xueLRZGW6o/Trybe" },
      { label: "GitHub", url: "https://github.com/LhennaV/Trybe" },
    ],
  },
  {
    slug: "kasafide",
    title: "Kasafide",
    formerName: "HomeSure",
    featured: true,
    tagline: "A verified housing rental and listing platform with demand analytics.",
    summary:
      "A property platform for Santa Maria, Bulacan that fights rental fraud and low-quality listings, with an interactive barangay-level map.",
    cover: {
      src: "/images/projects/kasafide/home.png",
      alt: "Kasafide landing page with a map of Santa Maria barangays",
      width: 1360,
      height: 689,
    },
    role: "Design & frontend development",
    team: "Capstone project, group",
    timeline: "Jan 2025 – present",
    status: "Live",
    tags: ["Figma", "HTML", "CSS", "JavaScript", "Leaflet.js"],
    problem:
      "Online property search is full of fake listings and unverified sellers, which makes renting risky. Kasafide only shows listings from verified owners, so renters can trust what they see.",
    sections: [
      {
        title: "What we built",
        points: [
          "Property listing management with seller verification.",
          "Separate account flows for renters and landlords.",
          "Search and filtering by location and price.",
          "Demand analytics for tracking rental trends.",
          "A barangay-level map built with Leaflet.js, so renters can explore listings by area.",
        ],
      },
    ],
    stack: "HTML, CSS, and JavaScript, with Leaflet.js for map overlays. Designed in Figma.",
    gallery: [
      {
        src: "/images/projects/kasafide/home.png",
        alt: "Kasafide landing page with the Santa Maria barangay map",
        caption: "Landing page with the barangay map",
        width: 1360,
        height: 689,
      },
    ],
    // Update this link once the site moves to the Kasafide domain.
    links: [{ label: "Visit the live site", url: "https://homesure.site" }],
  },
  {
    slug: "gtrack",
    title: "GTrack",
    featured: true,
    tagline: "Transaction management for GCash cash-in and cash-out businesses.",
    summary:
      "A digital audit log that replaces handwritten ledgers for GCash outlets, with fast transaction logging and end-of-day reports.",
    cover: {
      src: "/images/projects/gtrack/cover.png",
      alt: "GTrack dashboard showing balances, daily totals, and recent cash-in and cash-out transactions",
      width: 2608,
      height: 2778,
    },
    role: "UI/UX design & frontend lead",
    team: "2-person team",
    timeline: "Apr 2025 – present",
    status: "In development",
    tags: ["Figma", "Laravel Blade", "Tailwind CSS", "Alpine.js"],
    problem:
      "GCash outlets track cash-in, cash-out, and fees by hand, which makes end-of-day totals slow and error-prone.",
    sections: [
      {
        title: "What I did",
        points: [
          "Designed the UI/UX in Figma: user flows, wireframes, layouts, and interactive prototypes.",
          "Led frontend development, turning the designs into responsive interfaces.",
          "Kept the interface simple for fast cash-in/cash-out logging, service charge tracking, balance monitoring, and end-of-day reports.",
        ],
      },
    ],
    stack: "Laravel Blade, Tailwind CSS, and Alpine.js.",
    gallery: [
      {
        src: "/images/projects/gtrack/cover.png",
        alt: "GTrack dashboard before and after starting a business day",
        caption: "Dashboard: inactive session vs. active day with transactions",
        width: 2608,
        height: 2778,
      },
    ],
    links: [
      {
        label: "Figma",
        url: "https://www.figma.com/design/csy0D8GyqELHmkDRXk7Hzu/GTrack?node-id=0-1&p=f&t=uMm2HpgYmXsKXbHC-0",
      },
    ],
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    featured: false,
    tagline: "An interactive pixel-art portfolio with a customizable character and a cat.",
    summary:
      "My personal site: a cozy pixel-art world where visitors customize my character, play with my cat Stormi, and leave a note in the guestbook.",
    cover: {
      src: "/images/projects/personal-portfolio/home.png",
      alt: "Pixel-art personal portfolio with a character customizer and a pixel cat",
      width: 1440,
      height: 900,
    },
    role: "Design & development",
    team: "Personal project",
    status: "Live",
    tags: ["Pixel art", "JavaScript", "Tailwind CSS", "Supabase"],
    problem:
      "I wanted a personal site that felt like me instead of a template: playful, cozy, and a little bit of a game.",
    sections: [
      {
        title: "What I built",
        points: [
          "A layered pixel-art version of me that visitors can customize (hair, outfit, expression, and accessories), with animated scenes.",
          "An interactive Stormi: drag her into her box or onto the character, or drop stickers on her.",
          "Draggable desktop stickers, each with its own sound effect.",
          "A guestbook backed by Supabase.",
          "An admin page for editing projects, images, and guestbook entries, with database rules that only let my account save changes.",
        ],
      },
      {
        title: "Behind the scenes",
        points: [
          "Sprites generated with Python scripts, so every layer lines up on the same 32×56 canvas with no manual positioning.",
          "Sound effects synthesized in code as WAV files with a small Node script.",
          "A scheduled GitHub Action that keeps the free Supabase database from pausing.",
        ],
      },
    ],
    stack:
      "HTML, Tailwind CSS, and vanilla JavaScript, with Supabase for the guestbook, project data, and admin sign-in. Hosted on GitHub Pages.",
    links: [
      { label: "Visit the site", url: "https://lhennav.github.io/Portfolio/" },
      { label: "GitHub", url: "https://github.com/LhennaV/Portfolio" },
    ],
  },
  {
    slug: "mindease",
    title: "MindEase",
    featured: false,
    tagline: "A gentle mental wellness app concept.",
    summary:
      "Journaling, emoji mood tracking with weekly and monthly insights, an AI chat companion, a guided breathing space, and quick access to crisis hotlines.",
    cover: {
      src: "/images/projects/mindease/home.png",
      alt: "MindEase home screen with a daily mood check-in",
      width: 376,
      height: 1000,
    },
    role: "UI/UX design",
    team: "Personal project",
    timeline: "Jan – Feb 2025",
    status: "Figma prototype",
    tags: ["UI/UX", "Figma", "Mobile", "Web"],
    problem:
      "Checking in with your feelings is easy to skip when the tools feel clinical. MindEase is a soft, low-pressure space for daily emotional support.",
    sections: [
      {
        title: "What I designed",
        points: [
          "A quick daily check-in: pick an emoji mood and add an optional note.",
          "A journal with text notes, tags, and voice notes.",
          "Weekly and monthly insights that turn moods into exportable graphs.",
          "An AI chat companion with a supportive, conversational tone.",
          "A calm space with a breathing button that breathes with you, plus daily affirmations.",
          "Crisis support with direct access to mental health hotlines.",
        ],
      },
    ],
    gallery: [
      phone("/images/projects/mindease/home.png", "Home & daily check-in", "MindEase home screen", 1000, 376),
      phone("/images/projects/mindease/journal.png", "Journal", "MindEase journal screen", 639, 448),
      phone("/images/projects/mindease/insights.png", "Weekly insights", "MindEase weekly mood insights", 1000, 427),
      phone("/images/projects/mindease/ai-chat.png", "AI chat companion", "MindEase AI chat screen", 620, 448),
      phone("/images/projects/mindease/calm-space.png", "Calm space", "MindEase breathing exercise screen", 1000, 279),
    ],
    links: [
      {
        label: "Figma",
        url: "https://www.figma.com/design/rMXThOw1lLauXQK3CGvAlk/MindEase?node-id=0-1&t=cjrfuSESobvWZFjw-1",
      },
    ],
  },
  {
    slug: "eduspace",
    title: "EduSpace",
    featured: false,
    tagline: "A room scheduling system for schools.",
    summary:
      "A room scheduling system designed to make booking and managing educational spaces simple and stress-free.",
    cover: {
      src: "/images/projects/eduspace/cover.png",
      alt: "EduSpace room scheduling interface",
      width: 1336,
      height: 768,
    },
    role: "UI/UX design",
    tags: ["UI/UX", "Figma"],
    links: [
      {
        label: "Figma",
        url: "https://www.figma.com/design/ZrjQ19shEBsHez8wsHeyRh/EduSpace?node-id=95-408&t=uMm2HpgYmXsKXbHC-0",
      },
    ],
  },
];

export const hasCaseStudy = (p: Project) => Boolean(p.sections?.length);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
