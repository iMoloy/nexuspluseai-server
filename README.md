# NexusPulse AI - High Performance Express TypeScript Backend 🛡️⚡

The core RESTful API engine powering **NexusPulse AI** — an AI-Driven Freelance Gigs, Asset Rentals & Escrow Financial Super-App Ecosystem.

---

## 🚀 Tech Stack & System Architecture

- **Runtime & Language:** Node.js (v18+ / v20+), Express.js, TypeScript
- **Database:** MongoDB (Mongoose ORM)
- **Caching & In-Memory Store:** Redis (with automatic graceful fallback if offline)
- **Authentication:** Better Auth / JWT Session Authentication (`CLIENT`, `FREELANCER`, `ASSET_OWNER`, `ADMIN`)
- **FinTech Escrow Engine:** Atomic Wallet Ledger, Escrow Funds Locking, Release Payments, and Refund Handling
- **Smart Asset & Vehicle Rental Engine:** Asset CRUD, Availability Filters, Date Range Calculations & Automatic Security Deposit Escrow Holds
- **Micro-Tasking & Kanban Workflow Engine:** Gig Task Creation, Proposal Submissions, Freelancer Selection, Work Verification & Milestone Payment Approvals
- **AI Integration:** Google Generative AI (`@google/generative-ai`) Gemini SDK for Task Generation, Candidate Matchmaking, and AI Dispute Mediation
- **Real-Time Event Streaming:** Express Server-Sent Events (SSE) Stream (`/api/v1/events/stream`)

---

## 🛠️ Environment Configuration & Installation

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/iMoloy/nexuspluseai-server.git
cd nexuspluseai-server
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to create your local `.env` configuration file:
```bash
cp .env.example .env
```

Edit `.env` with your preferred database URIs and API credentials:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/nexuspulse_db
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
CORS_ORIGIN=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
The backend API server will start at `http://localhost:5000`.

### 4. Build for Production
```bash
npm run build
npm start
```

### 5. Automated Tests
```bash
npm test
```

---

## 📡 API Endpoint Reference

### 🏥 Health & System Status
- `GET /api/v1/health` — Service health check & MongoDB/Redis diagnostics.

### 🔐 Authentication & Access Control
- `POST /api/v1/auth/register` — Create new user account (`CLIENT`, `FREELANCER`, `ASSET_OWNER`).
- `POST /api/v1/auth/login` — User authentication & JWT cookie generation.
- `POST /api/v1/auth/refresh` — Refresh authentication tokens.

### 💳 Escrow Digital Wallet & Financial Ledger
- `GET /api/v1/wallet/balance` — Get user's available balance and escrow hold amount.
- `POST /api/v1/wallet/deposit` — Simulate Stripe / SSLCommerz gateway deposit.
- `GET /api/v1/wallet/transactions` — Fetch financial ledger transactions history.

### 🚗 Smart Asset & Vehicle Rental Engine
- `GET /api/v1/assets` — Search and filter rental assets (by category, location, date range).
- `POST /api/v1/assets` — List a new car, equipment, or workspace for rental.
- `POST /api/v1/rentals/book` — Rent asset and lock security deposit in Escrow.
- `PATCH /api/v1/rentals/:id/complete` — Complete rental, release payment & refund security deposit.

### 💼 Micro-Tasking Gigs & Kanban Workflow Engine
- `GET /api/v1/gigs` — Browse available micro-gigs.
- `POST /api/v1/gigs` — Post gig task & lock budget in Escrow.
- `POST /api/v1/gigs/:id/apply` — Submit proposal for a gig.
- `PATCH /api/v1/gigs/:id/assign` — Assign freelancer (Status -> `IN_PROGRESS`).
- `POST /api/v1/gigs/:id/submit` — Submit work proof (Status -> `UNDER_REVIEW`).
- `PATCH /api/v1/gigs/:id/approve` — Approve work & release Escrow payment to freelancer (Status -> `COMPLETED`).

### 🤖 Gemini AI & Smart Matchmaker
- `POST /api/v1/ai/generate-task` — Auto-generate structured gig spec, skills & budget recommendation.
- `POST /api/v1/ai/match` — Rank freelancers and rental assets based on compatibility score.
- `POST /api/v1/ai/resolve-dispute` — Run AI Dispute Mediator Agent settlement analysis.

### 📡 Real-Time SSE Stream
- `GET /api/v1/events/stream` — Connect to Server-Sent Events (SSE) stream for live notifications.

---

## 🛡️ License & Credits

Built with ❤️ by [iMoloy](https://github.com/iMoloy) for NexusPulse AI.
