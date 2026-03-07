# Tejaswi Ganji Portfolio

Recruiter-focused multi-page portfolio built with React + Vite, TailwindCSS, Framer Motion, and React Router.

## Tech Stack
- React + Vite
- React Router
- TailwindCSS
- Framer Motion
- Lucide Icons

## Current Route Structure
- `/` -> Home
- `/about` -> About
- `/projects` -> Projects hub (category landing)
- `/projects/data` -> Data / Visualization projects
- `/projects/ai-ml` -> AI / ML projects
- `/projects/software` -> Software Engineering projects
- `/projects/:slug` -> Project detail page
- `/experience` -> Experience
- `/resume` -> Resume Snapshot
- `/contact` -> Contact
- `/404` -> Not Found

## Project Structure (Relevant)
```bash
src/
  pages/
    Home.jsx
    About.jsx
    Projects.jsx
    ProjectsData.jsx
    ProjectsAIML.jsx
    ProjectsSoftware.jsx
    ProjectDetails.jsx
  components/
    projects/
      ProjectCard.jsx
      ProjectCategoryCard.jsx
      ProjectHero.jsx
    skills/
      SkillCard.jsx
  data/
    projects.js
    skills.js
```

## Where Project Images Live
Project/category images are served from `public/images/`:
- Project images: `public/images/projects/*`
- Category images: `public/images/categories/*`

Example image path used in data:
- `/images/projects/travelwise-nyc-agentic-rag.png`

## How Project Categories Work
`src/data/projects.js` contains:
- `projectCategories`: category cards for `/projects`
- `projects`: full project list with `category` values (`data`, `ai-ml`, `software`)

Category pages (`/projects/data`, `/projects/ai-ml`, `/projects/software`) automatically filter from this same data source.

## How To Add/Edit Projects
Edit `src/data/projects.js` and add/update objects with this shape:
```js
{
  title: 'Project Name',
  slug: 'project-name',
  category: 'ai-ml', // data | ai-ml | software
  description: 'Short summary',
  stack: ['Python', 'PyTorch'],
  image: '/images/projects/project-name.png',
  githubUrl: 'https://github.com/...',
  demoUrl: 'https://...', // set null if unavailable
  featured: true,
  metrics: ['Key impact metric'],
  problem: '...',
  approach: '...',
  outcomes: ['...'],
  keyFeatures: ['...'],
  impact: '...'
}
```

## GitHub and Demo Links
- **GitHub profile:** Set your profile URL in `src/data/socialLinks.js` (`github`). Project GitHub links are built as `https://github.com/<your-username>/<repo-name>`.
- **Repo names** used in `src/data/projects.js`: `TravelWise-Project-Using-RAG`, `bank-customer-churn-prediction`, `scientific-data-pipeline`, `medical-image-cnn-benchmark`, `api-first-workflow-service`. Change the repo name in each project’s `githubUrl: repoUrl('your-repo-name')` if your GitHub repos differ.
- **Live demos:** Demo links use GitHub Pages by default: `https://<your-username>.github.io/<repo-name>/`. To use a custom URL (e.g. Vercel, Netlify), set `demoUrl: 'https://your-app.vercel.app'` instead of `demoUrlForRepo('repo-name')`.
- If `demoUrl` is `null`, the Demo button is hidden. If `githubUrl` is `null`, the GitHub button is hidden.

## Skills and Technical Expertise
- Home page intentionally excludes detailed skills/capability sections.
- All technical expertise now lives in `src/pages/About.jsx` and `src/data/skills.js`.

## Run Locally
1. Install dependencies:
```bash
npm install
```
2. Start dev server:
```bash
npm run dev
```
3. Build production:
```bash
npm run build
```

## Deploy (Vercel)
1. Push repo to GitHub
2. Import into Vercel
3. Framework preset: `Vite`
4. Build command: `npm run build`
5. Output directory: `dist`
