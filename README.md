# Lhenna-Marie Velasco — Portfolio

Professional portfolio of Lhenna-Marie Velasco, UI/UX designer and frontend developer.

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, deployed on **GitHub Pages**.

Live at [lhennav.github.io/lhenna-portfolio](https://lhennav.github.io/lhenna-portfolio/).

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Editing content

All content lives in plain TypeScript files, so there's no CMS to manage:

- `src/content/site.ts`: name, bio details, email, résumé link, socials, skills
- `src/content/projects.ts`: projects and case studies

A project with `sections` gets its own case-study page at `/work/<slug>`. A project without them links straight to its first external link (e.g. Figma).

Images live in `public/images/`.

## Deployment

The site is a static export (`output: "export"`). Every push to `main` runs
`.github/workflows/deploy.yml`, which builds the site into `out/` and publishes it
to GitHub Pages.

One-time setup: in the repo, go to **Settings → Pages → Build and deployment →
Source** and choose **GitHub Actions**.

Images from `public/` must go through `asset()` from `src/lib/asset.ts` so they
get the `/lhenna-portfolio` prefix on GitHub Pages.
