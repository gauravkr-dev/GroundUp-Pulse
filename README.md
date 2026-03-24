# GroundUp Pulse

GroundUp Pulse connects citizens with authorities for faster issue resolution.

## Description

GroundUp Pulse is a full-stack, AI-powered civic issue reporting platform that enables citizens to report real-world problems (potholes, garbage, water leaks, exposed wiring, etc.) using photos, descriptions, and location. The system verifies reports, detects duplicates, assigns priority scores, and routes actionable issues to the correct government authority — all while enabling real-time communication and rewarding meaningful contributors.

## 🚀 Features

- **AI Issue Verification** — Multimodal verification (image + text): confirms real issues and rejects unclear or irrelevant reports with human-readable reasons.
- **Smart Duplicate Detection** — Rule-based + AI similarity checks prevent spam, cluster nearby reports, and only increase priority when validated by distinct users.
- **Intelligent Priority System** — Automatic 0–100 priority scoring; emergency patterns (flooding, exposed wiring) are auto-escalated.
- **Real-Time Communication** — In-app chat between citizens and authorities for follow-ups and clarifications.
- **Authority Dashboard** — Officers can view, assign, resolve, or reject issues; rejections require a reason. Team-based visibility and assignment workflows supported.
- **Reward System** — Points, badges, or credits for meaningful contributions and resolved reports to encourage civic participation.
- **Location-Based Filtering** — Clustering, heatmaps, and proximity-based routing to local departments.

## 🧠 How It Works (step-by-step)

1. Citizen submits a report with one or more photos, a short description, and a location (map or GPS).
2. AI Verification: the AI model (e.g., Gemini or another multimodal model) analyzes images and text to determine whether the report likely represents a valid civic issue.
   - If verification fails, the report is rejected with a clear reason (e.g., "image unclear", "not an actionable issue").
3. Duplicate Detection:
   - Fast rule checks (same category, within a geographic threshold) run first.
   - AI-based similarity checks compare images and textual context to detect duplicates.
   - Duplicates are linked; priority increases only when distinct verified users report the same incident.
4. Priority Scoring:
   - The system computes a 0–100 priority score using signals such as issue type, severity, proximity to critical infrastructure, number of unique reporters, and time-sensitivity.
   - Emergency signatures automatically boost priority and trigger alerts.
5. Routing:
   - Based on category and geolocation, the platform maps the issue to the appropriate authority/department.
6. Authority Triage & Communication:
   - Officers triage via the dashboard, request clarifications, resolve, or reject (with required reason).
   - Two-way real-time messages enable quick clarifications and updates.
7. Resolution & Rewards:
   - On resolution, the reporter earns points/credits based on contribution quality. Resolved issues feed dashboards and analytics for city planning.

## 🛠️ Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js, tRPC (type-safe APIs)
- Database: Drizzle ORM (with Neon)
- Realtime: socket.io
- AI Integration: Gemini API
- Authentication: Better Auth
- Optional: UploadThing (storage for images) and MapTiler Map (for location)

## 📸 Screenshots / Demo

- Hero / Landing: (placeholder image)
- Citizen Report Flow: (placeholder image)
- Authority Dashboard: (placeholder image)
- Chat & Resolution Flow: (placeholder image)

_Add screenshots, GIFs, or a hosted demo link here._


## 📁 Folder Structure (overview)

```
.
├─ app/                    # Next.js app routes & pages
│  ├─ api/                 # API routes (auth, upload, trpc)
│  ├─ authority/           # Authority area (dashboard, routes)
│  ├─ citizen/             # Citizen area (reporting, dashboard)
│  └─ (marketing)/         # Landing pages & marketing content
├─ components/             # Reusable components & UI
├─ ui/                     # Design system primitives & components
├─ lib/                    # Utilities, auth helpers, AI client wrappers
├─ modules/                # Domain modules (authority, citizen, messages)
├─ trpc/                   # tRPC server/client setup & routers
├─ db/                     # DB schema + migrations helpers
├─ socket-server/          # Optional standalone socket server
├─ public/                 # Public assets
└─ README.md
```

## ⚙️ Installation & Setup

1. Clone repository

```bash
git clone https://github.com/your-org/groundup-pulse.git
cd groundup-pulse
```

1. Install dependencies

```bash
npm install
```

1. Environment variables (create a `.env.local`)

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_MAPTILER_API_KEY=
UPLOADTHING_TOKEN=
DATABASE_URL=postgres://user:pass@localhost:5432/groundup
GEMINI_API_KEY=your_gemini_api_key

```

1. Database setup (example using Prisma)

```
# push schema (drizzle-kit)
npm run db:push

# optional: open drizzle studio
npm run db:studio
```

1. Run development servers

- `dev` — Start Next.js in development mode (`next dev`)
- `build` — Build the Next.js app (`next build`)
- `start` — Start production server (`next start`)
- `lint` — Run ESLint (`eslint`)
- `db:studio` — Start `drizzle-kit studio` (database GUI)
- `db:push` — Push schema changes using `drizzle-kit push`


```bash
# Start Next.js frontend + backend
npm run dev

# If using a separate socket server (optional):
cd socket-server
npm install
node socket.js
```


## 🧭 Why this project matters

- Bridges the gap between citizens and public authorities by lowering friction for reporting.
- Helps authorities act faster with prioritized, verified reports — reducing unnecessary field visits.
- Encourages civic participation by rewarding contributors and providing visibility on impact.
- Enables data-driven urban maintenance and better allocation of public resources.

---


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
