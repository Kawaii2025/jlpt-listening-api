# listening-api

Simple Node.js + Express REST API for JLPT listening practice.

Prerequisites
- Node.js 18+
- A PostgreSQL database (Neon)

Quick start
1. Copy `.env.example` to `.env` and fill DATABASE_URL (and DATABASE_SSL if needed).
2. Install dependencies:

   npm install

3. Run in development:

   npm run dev

4. Start production:

   npm start

Endpoints
- GET /api/exams
- GET /api/exams/:examId/parts
- GET /api/parts/:partId/items
- GET /api/items/:itemId/choices
- GET /api/items/:itemId/sentences
- POST /api/user_practice  (body: { user_id, sentence_id })
- GET /api/users/:userId/practice

Database
This API expects the following tables: `exams`, `parts`, `items`, `choices`, `sentences`, `users`, `user_practice` (see project database schema file).

