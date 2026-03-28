# GroundUp Pulse

GroundUp Pulse connects citizens with authorities for faster issue resolution.

## Description

GroundUp Pulse is a full-stack, AI-powered civic issue reporting platform that enables citizens to report real-world problems (potholes, garbage, water leaks, exposed wiring, etc.) using photos, descriptions, and location. The system verifies reports, detects duplicates, assigns priority scores, and routes actionable issues to the correct government authority — all while enabling real-time communication and rewarding meaningful contributors.

## Live Demo

- https://groundup-pulse.vercel.app/

## Video Demo

- https://youtu.be/fBqEaK99kx0

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

## 📸 Screenshots 

<img width="1919" height="895" alt="Screenshot 2026-03-24 221611" src="https://github.com/user-attachments/assets/39e814fe-9715-4d07-85df-6a65a4f5227b" />
<img width="1919" height="897" alt="Screenshot 2026-03-24 221643" src="https://github.com/user-attachments/assets/994a26cb-0aa2-4d08-87f8-3d8a7ad809cc" />
<img width="1919" height="896" alt="Screenshot 2026-03-24 221701" src="https://github.com/user-attachments/assets/31bfbdd6-e4c8-4df3-9d56-bae0dcb56a56" />
<img width="1919" height="898" alt="Screenshot 2026-03-24 221721" src="https://github.com/user-attachments/assets/68ffc655-3127-4d00-b6da-57a9ac7683e9" />
<img width="1919" height="899" alt="Screenshot 2026-03-24 221759" src="https://github.com/user-attachments/assets/22aa0181-f230-41d5-85e6-601397ae4bdc" />
<img width="1919" height="895" alt="Screenshot 2026-03-24 221815" src="https://github.com/user-attachments/assets/6d8780f3-d5c4-4a09-bcd0-66cc385d0baf" />
<img width="1919" height="894" alt="Screenshot 2026-03-24 221835" src="https://github.com/user-attachments/assets/b980961a-55d0-4137-ba6b-22cd792851d8" />
<img width="1919" height="900" alt="Screenshot 2026-03-24 221900" src="https://github.com/user-attachments/assets/bf594fa9-4d43-491f-9dc3-085ba80f6c60" />
<img width="1919" height="898" alt="Screenshot 2026-03-24 221919" src="https://github.com/user-attachments/assets/614b0470-2721-4142-bce7-6fc4afd9852e" />
<img width="1919" height="898" alt="Screenshot 2026-03-24 221931" src="https://github.com/user-attachments/assets/1200e3f3-2a4b-4dbe-8efc-7dd6e860a285" />
<img width="1919" height="896" alt="Screenshot 2026-03-24 222010" src="https://github.com/user-attachments/assets/b27688bf-79f8-4c47-8226-a6aeb830e1d6" />
<img width="1919" height="898" alt="Screenshot 2026-03-24 222116" src="https://github.com/user-attachments/assets/c148abe9-9135-4617-afe9-322574c9368f" />
<img width="1919" height="897" alt="Screenshot 2026-03-24 222131" src="https://github.com/user-attachments/assets/b43c4773-d74e-424b-96e2-eba68ae92aba" />
<img width="1919" height="893" alt="Screenshot 2026-03-24 222149" src="https://github.com/user-attachments/assets/4c664a9f-4a59-42a7-bffb-1bf93abfaad4" />
<img width="1918" height="897" alt="Screenshot 2026-03-24 222210" src="https://github.com/user-attachments/assets/648e98bf-6f42-49ed-8863-f68699c49d7d" />
<img width="1919" height="897" alt="Screenshot 2026-03-24 222227" src="https://github.com/user-attachments/assets/b2a7b942-edc3-4732-868b-58a2a125569b" />
<img width="1917" height="896" alt="Screenshot 2026-03-24 222245" src="https://github.com/user-attachments/assets/9d46e5ba-6f23-4ccc-948e-aed95f8187a3" />
<img width="1919" height="898" alt="Screenshot 2026-03-24 222302" src="https://github.com/user-attachments/assets/fc027908-2f4d-4931-9528-f147b5b94a82" />


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
