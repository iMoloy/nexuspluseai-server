<div align="center">
  <h1>🛡️ NexusPulse AI — Server API</h1>
  <p>High Performance Express TypeScript & MongoDB Backend Engine</p>
  <p>
    <a href="https://nexuspluseai-server.onrender.com/api/v1/health"><img src="https://img.shields.io/badge/Render-Live_Production-46E3B7?style=for-the-badge&logo=render&logoColor=white" /></a>
    <img src="https://img.shields.io/badge/Express.js-v4-000000?style=for-the-badge&logo=express&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-v20-339933?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-v5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/Gemini_AI-v1.5-8E75B2?style=for-the-badge&logo=google&logoColor=white" />
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" />
  </p>
</div>

---

## 📖 Overview

The core RESTful API engine powering **NexusPulse AI** — an AI-Driven Freelance Gigs, Asset Rentals & Escrow Financial Super-App Ecosystem.

- 📡 **Live Base API:** [https://nexuspluseai-server.onrender.com/api/v1](https://nexuspluseai-server.onrender.com/api/v1)
- 🌐 **Live Frontend Client:** [https://nexuspulseai-client.vercel.app](https://nexuspulseai-client.vercel.app)
- 💻 **Client Repository:** [`nexuspulseai-client`](https://github.com/iMoloy/nexuspluseai-client)

---

## ⚡ Key API Modules & Routes

| Module | Route Prefix | Key Functionalities |
|--------|--------------|---------------------|
| 🔐 **Auth Module** | `/api/v1/auth` | JWT Register, Login, Google OAuth sync, Me profile endpoint |
| 🤖 **AI Engine** | `/api/v1/ai` | Gemini Task Spec generation & Gemini Dispute Settlement mediation |
| 🏎️ **Asset Rentals**| `/api/v1/assets` | Asset listing CRUD, daily rate calculation, deposit verification |
| 📋 **Gig Kanban** | `/api/v1/gigs` | Task creation, milestone escrow lock, proposal submission, status workflow |
| 💳 **Escrow Wallet** | `/api/v1/wallet` | Escrow balance tracking, deposit holds, fund releases, multi-channel payouts |
| 📡 **Realtime SSE** | `/api/v1/events/stream` | Server-Sent Events stream for live status updates & notifications |
| 🩺 **Health Check** | `/api/v1/health` | Uptime check, database status & API ping |

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|-------|-----------|
| **Runtime & Framework** | Node.js (v18 / v20+), Express.js, TypeScript |
| **Database & ODM** | MongoDB Atlas, Mongoose ORM |
| **Cache & In-Memory** | Redis (`ioredis` with graceful offline fallback) |
| **AI Integration** | Google Gemini API (`@google/generative-ai`) |
| **Security & Middleware** | JWT (`jsonwebtoken`), BcryptJS, CORS, Helmet, Morgan logger |

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

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with ts-node-dev |
| `npm run build` | Compile TypeScript into `/dist` directory |
| `npm start` | Start production Node.js server (`dist/server.js`) |
| `npx tsc --noEmit` | Verify TypeScript compilation with zero errors |

---

## ☁️ Deployment Instructions (Render / Cloud)

- **Build Command:** `npm install && npm run build`
- **Start Command:** `node dist/server.js`
- **Environment:** Node 20.x

---

## 👤 Author & License

Developed with ❤️ by **[Moloy Paul (iMoloy)](https://github.com/iMoloy)**.  
Released under the **MIT License**. Copyright © 2026 NexusPulse AI.
