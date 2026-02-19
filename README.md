# Context and Memory Management System

A prototype AI agent system that maintains business context, retrieved via a ranking algorithm, and uses Google Gemini to reason and explain decisions.

## Project Structure
- **backend/**: Node.js, Express, MongoDB, Google Gemini integration.
- **frontend/**: React (Vite), Business Dashboard UI.

## Prerequisites
# Context & Memory Agent

This repository contains a small prototype agent that stores and retrieves short "memories" (business context), ranks them, and uses Google Gemini to produce human-friendly reasoning and decisions. It's useful as a starting point for building agents that keep a running context of what happened and explain their recommendations.

What you'll find here:
- A simple Express backend that stores memories in MongoDB and calls Google Gemini for reasoning.
- A React + Vite frontend with a minimal UI to add memories and ask the agent questions.

**Quick highlights:**
- Backend: Node.js, Express, Mongoose, Google Generative AI client.
- Frontend: React, Vite, Tailwind (minimal styling).

## Repo structure
- `backend/` — API server, data models, Gemini integration.
   - `server.js` — app entrypoint
   - `models/Memory.js` — memory schema
   - `routes/api.js` — REST endpoints
   - `services/geminiService.js` — wrapper around Gemini calls
- `frontend/` — React app (Vite)
   - `src/components/MemoryManager.jsx` — add/list memories
   - `src/components/QueryInterface.jsx` — ask the agent

## Prerequisites
- Node.js v18 or newer
- MongoDB (local or remote)
- Google Gemini API access and an API key

## Environment variables
Create a `.env` file in `backend/` with at least:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/business_memory
GEMINI_API_KEY=your_gemini_api_key_here
```

Keep your API key secret and do not commit `.env` to source control.

## Quick start

1) Start the backend

```bash
cd backend
npm install
# for development with auto-reload (requires nodemon): npm run dev
npm start
```

By default the server starts via `server.js` (see `backend/package.json`).

2) Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) to use the UI.

## How to use
- Add memories through the UI's "Add Context" form (or send POST requests to the backend API).
- Ask natural-language questions in the Query panel to see the agent's decision and the memories used to reach it.

## Developer notes
- Backend endpoints live in `backend/routes/api.js`.
- The memory ranking and retrieval logic is implemented in the backend; see `models/Memory.js` for the schema and ranking fields.
- Gemini calls are encapsulated in `backend/services/geminiService.js`.

If you want to extend the project:
- Add authentication to the API before exposing it.
- Improve memory ranking (add embeddings, relevance scoring).
- Add tests and CI.

## Contributing
Feel free to open issues or PRs. If you're changing environment variable names or API behavior, update this README and add migration notes.

## License & Contact
This project is an informal prototype. Add a license file if you plan to share it publicly.

If you'd like help extending or deploying this, tell me what you'd like to improve and I can add steps.
