# HUMAIRE Backend

Human-first Ethical AI Platform backend (Express + MongoDB)

Quick start:

1. Copy `.env.sample` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Run in dev: `npm run dev` (requires `nodemon`) or `npm start`.

API endpoints:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/ai/query
- GET /api/ai/history
- GET /api/admin/users (admin only)
- GET /api/admin/logs (admin only)

Notes:
- AI service is simulated in `services/aiService.js` and moderation in `services/moderationService.js`.
- Uses JWT for auth and bcryptjs for password hashing.
