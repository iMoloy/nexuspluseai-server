# NexusPulse AI — High Performance Express TypeScript Backend 🛡️⚡

[![Render Deployment](https://img.shields.io/badge/Render-Live_Production-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://nexuspluseai-server.onrender.com/api/v1/health)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

The core RESTful API engine powering **NexusPulse AI** — an AI-Driven Freelance Gigs, Asset Rentals & Escrow Financial Super-App Ecosystem.

📡 **Live API Base URL:** [https://nexuspluseai-server.onrender.com/api/v1](https://nexuspluseai-server.onrender.com/api/v1)  
🌐 **Live Frontend Client:** [https://nexuspulseai-client.vercel.app](https://nexuspulseai-client.vercel.app)

---

## ⚡ Key Modules & Features

- **🛡️ Atomic Escrow & Wallet Ledger**: Funds locking, deposit handling, release approvals, and security deposit returns.
- **🤖 Gemini AI Integration**: Automated task spec generation, candidate matchmaking, and dispute mediation.
- **🚗 Asset Rental Management**: Daily rate calculations, security deposit holds, and vehicle/equipment availability.
- **📋 Micro-Tasking Kanban Engine**: Task creation, proposal submissions, freelancer selection, work proof submission & payment release.
- **🔐 Google OAuth Sync & JWT Security**: Google OAuth user account synchronization & JWT authorization middleware.
- **📡 Server-Sent Events (SSE)**: Real-time event streaming (`/api/v1/events/stream`) for live notifications.

---

## 🛠️ Tech Stack

- **Runtime & Framework:** Node.js (v18+ / v20+), Express.js, TypeScript (`tsc`)
- **Database & Modeling:** MongoDB, Mongoose ORM
- **Cache & In-Memory Data:** Redis (`ioredis` with graceful offline fallback)
- **Security & Utilities:** Cors, Helmet, JsonWebToken, BcryptJS, Morgan

---

## 🚀 Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://your_live_mongodb_atlas_uri
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
CORS_ORIGIN=https://nexuspulseai-client.vercel.app
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🔧 Local Setup & Build

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iMoloy/nexuspluseai-server.git
   cd nexuspluseai-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Development Mode:**
   ```bash
   npm run dev
   ```

4. **Production Build & Verification:**
   ```bash
   npx tsc --noEmit
   npm run build
   npm start
   ```

---

## ☁️ Deploy to Render / Cloud Hosts

- **Build Command:** `npm install && npm run build`
- **Start Command:** `node dist/server.js`

---

## 👤 Author & Credits

Developed with ❤️ by [iMoloy (Moloy Paul)](https://github.com/iMoloy).  
Copyright © 2026 NexusPulse AI. All Rights Reserved.
