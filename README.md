# NexusPulse AI - High Performance Backend Service 🛡️⚡

The core backend API engine powering **NexusPulse AI** — an AI-Driven Freelance Gigs, Asset Rentals & Escrow Financial Super-App Ecosystem.

## 🚀 Tech Stack & Core Features

- **Runtime & Framework:** Node.js, Express.js with TypeScript
- **Database:** MongoDB (Mongoose ORM)
- **Caching & Sessions:** Redis (with graceful offline fallback)
- **Authentication & RBAC:** Better Auth / JWT Session Authentication (`CLIENT`, `FREELANCER`, `ASSET_OWNER`, `ADMIN`)
- **FinTech Escrow Engine:** Atomic Wallet Balance, Escrow Funds Lock, Release Payment, and Security Deposit Refund Services
- **Smart Asset & Vehicle Rental Engine:** Asset CRUD, Availability Filters, Date Range Calculations & Automatic Escrow Holds
- **Micro-Tasking & Kanban Workflow Engine:** Gig Creation, Proposal Management, Freelancer Assignment, Work Submission & Completion Release
- **AI Integration:** Google Generative AI (`@google/generative-ai`) Gemini SDK for Task Generation, Smart Matchmaker Ranking, and AI Dispute Settlement Mediator
- **Real-Time Stream:** Express Server-Sent Events (SSE) Stream (`/api/v1/events/stream`)

## 🛠️ Installation & Setup

1. **Clone & Install Dependencies:**
   ```bash
   git clone https://github.com/iMoloy/nexuspluseai-server.git
   cd nexuspluseai-server
   npm install
   ```

2. **Environment Variables (`.env`):**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://127.0.0.1:27017/nexuspulse_db
   REDIS_URL=redis://127.0.0.1:6379
   JWT_SECRET=nexus_pulse_super_secret_jwt_key_2026
   JWT_REFRESH_SECRET=nexus_pulse_refresh_secret_key_2026
   CORS_ORIGIN=http://localhost:3000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Development Mode:**
   ```bash
   npm run dev
   ```

4. **Production Build & Start:**
   ```bash
   npm run build
   npm start
   ```

5. **Run Integration Tests:**
   ```bash
   npm test
   ```

## 📡 Core API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Health Check & Service Diagnostics |
| `POST` | `/api/v1/auth/register` | User Account Registration |
| `POST` | `/api/v1/auth/login` | User Authentication & JWT Cookies |
| `GET` | `/api/v1/wallet/balance` | Wallet Available & Escrow Hold Balance |
| `POST` | `/api/v1/wallet/deposit` | In-App Wallet Deposit Simulation |
| `POST` | `/api/v1/assets` | List New Asset / Vehicle for Rental |
| `POST` | `/api/v1/rentals/book` | Rent Asset & Lock Escrow Funds |
| `PATCH` | `/api/v1/rentals/:id/complete` | Complete Rental, Release Payment & Refund Deposit |
| `POST` | `/api/v1/gigs` | Post Gig Task & Lock Budget in Escrow |
| `PATCH` | `/api/v1/gigs/:id/approve` | Approve Work & Release Payment to Freelancer |
| `POST` | `/api/v1/ai/generate-task` | Gemini AI Task Spec Generator |
| `POST` | `/api/v1/ai/resolve-dispute` | AI Dispute Mediator Agent Settlement |
| `GET` | `/api/v1/events/stream` | Server-Sent Events (SSE) Real-time Stream |

---
© 2026 NexusPulse AI. Created by [iMoloy](https://github.com/iMoloy).
