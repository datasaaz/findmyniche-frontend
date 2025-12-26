# FindMyNiche – Frontend

This repository contains the **web frontend** for **FindMyNiche**, an AI-assisted business opportunity analysis tool.

The frontend is responsible for user authentication, collecting inputs for analysis, invoking backend APIs, and displaying reports and results.

---

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Firebase Authentication
- Stripe (via backend APIs)

---

## Core User Flow

1. User signs in using Firebase Authentication
2. User provides:
   - Business idea (free text)
   - Location (geo-suggested)
   - Analysis objective
3. Frontend calls backend to run analysis
4. Analysis results are displayed
5. User may save results as a **Report**
6. Reports contain **append-only Runs**
7. User can revisit reports or manage billing

---

## Project Structure

```
src/
├── app/
│   ├── auth/            # Login / signup
│   ├── session/         # Create analysis + list reports
│   ├── reports/[id]/    # Report viewer
│   └── billing/         # Stripe success / cancel pages
├── components/
├── providers/
├── lib/
│   ├── api/             # Backend API client & endpoints
│   └── firebase/        # Firebase client & auth actions
```

---

## Authentication

- Firebase Authentication is used on the client
- After login, a Firebase **ID token** is retrieved
- All backend API requests include:

```
Authorization: Bearer <firebase_id_token>
```

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

The backend API is expected to be reachable at:

```
http://127.0.0.1:8000
```

---

## Local Development

```bash
npm install
npm run dev
```

The application runs at:

```
http://localhost:3000
```

---

## Notes

- Entitlements and quota enforcement are handled by the backend
- The frontend responds to backend status codes such as:
  - `402` – payment required
  - `429` – quota exceeded
- No AI or billing logic exists in this repository

---

## Status

MVP / early-stage frontend
