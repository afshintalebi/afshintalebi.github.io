# Afshin Talebi — Portfolio

Personal portfolio site of Afshin Talebi, a software developer with 10+ years of experience building production systems in Go, NestJS and TypeScript.

## Sections

- **Hero** — intro, animated terminal and stats
- **System Simulator** — concurrent vs. sequential workload demo
- **Projects** — searchable project cards with detail modals
- **Experience** — career timeline
- **Skills** — skills matrix with years of experience and proficiency
- **Contact**
- **Command palette** — `Cmd/Ctrl + K` to jump to any section

## Tech stack

- [Next.js](https://nextjs.org) (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- [lucide-react](https://lucide.dev) icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  app/          layout, global styles, page
  components/   UI sections and widgets
  data/         projects, experience and skills content
  utils/        audio and clipboard helpers
```

Site content lives in `src/data/`. Edit those files to update projects, experience and skills.

## Contact

Afshin Talebi — see the contact section on the site.
