# Fornax

Fornax turns any GitHub repository into a context-aware technical questionnaire. It analyzes the codebase to generate practical, project-specific questions helping interviewers evaluate candidates faster and giving candidates a more realistic way to practice.

## Live Link

[fornax.curr.xyz](https://fornax.curr.xyz)

## Preview

![Fornax Preview](./public/fornax.curr.xyz_.png)

## Features

- Interactive, responsive frontend built with React + Vite.
- AI-ready backend service using Express and Google Generative AI SDK.
- Git-powered automation support with `simple-git`.
- Clean UI utilities with Tailwind CSS and component libraries.

## Tech Stack

- Frontend: TypeScript, React, Vite, Tailwind CSS, Radix UI, Shadcn UI
- Backend: Bun, TypeScript, Node-style Express API
- Integrations: OpenRouter API , Simple Git


## Local Setup (Frontend + Backend)

### Clone the repository

```bash
git clone <your-repo-url>
cd fornax
```

### Backend setup

```bash
cd backend
bun install
bun run index.ts
```

Backend runs on your configured API port.

### Frontend setup

Open a new terminal:

```bash
cd app
bun install
bun run dev
```

Frontend runs on the Vite dev server (usually `http://localhost:5173`).
