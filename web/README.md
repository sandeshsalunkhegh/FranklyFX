# FranklyFX Web Client

This is the Official React frontend application for **FranklyFX**, a production-ready Foreign Exchange tracker.

It provides a modern, responsive **Quote Builder** interface for users to fetch secure, real-time exchange rates and compute custom transaction quotes incorporating consumer spread and flat fees.

## Technology Stack
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite v6
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Icons:** Lucide React

## Step-by-Step Guide & Execution Details

### Prerequisites
1. Node.js (v18+)
2. The FranklyFX Python Backend must reflect active service.

### 1. Build & Installation
Navigate into the `web/` directory from the root project and install the exact resolved dependencies using npm.

```bash
cd web
npm install
```

### 2. Local Development (Execution)
To run the local development server with Hot Module Replacement (HMR), execute the dev script:

```bash
npm run dev
```
*Execution Detail:* Vite launches a fast local server at `http://localhost:5173`. Open your browser to that address. Ensure the Python API is simultaneously running (by default on port 8000), as the Axios client `src/api/client.ts` automatically sends `POST` requests fetching quotes from the local backend environment.

### 3. Production Build
To create a strictly-typed, minified production build:
```bash
npm run build
```
*Execution Detail:* Under the hood, this executes `tsc -b && vite build`. `tsc` enforces strict TypeScript `verbatimModuleSyntax` validation. The compiled, lightweight assets are outputted to the `/dist` directory.

## Project Architecture
The web client strictly follows a decoupled feature-based architecture pattern modeled after the backend DTOs.

- `src/models/`: TypeScript interfaces syncing exactly with the backend Models (`QuoteRequest`).
- `src/api/`: Typed HTTP layer wrapping `axios` calls (`client.ts`).
- `src/components/`: Shared, reusable Tailwind CSS primitives (`Card`, `Button`, `Input`).
- `src/layouts/`: Global application wrappers (`MainLayout`).
- `src/features/quote/`: Core domain logic and specific UI elements for FX computing (`QuoteForm`, `QuoteResult`).
- `src/pages/`: Assembled layouts combining features (`HomePage`, `AboutPage`).

## Web Documentation Markdown Files

All structural constraints and frontend system designs were synthesized from the following local specification `.md` files residing in the `web/` directory:

| Document | Purpose |
|----------|---------|
| `README.md` | This file: Execution steps, tech stack, and web application overview. |
| `PHASE_1_WEB.md` | High-level feature roadmap completed during the frontend build phase. |
| `STRUCTURE.md` | Outlines the directory architecture (`src/components`, `src/features`). |
| `MODULES.md` | Breakdown of the logical modules handling FX conversion states. |
| `PAGES.md` | Details the React Router layout and single-page routing trees. |
| `DATA_MODELS.md` | TypeScript state interfaces and form validation standards. |
| `DATA_OBJECTS.md` | Data Transfer Objects syncing the UI Payload precisely with the Backend API. |
| `DESIGN_LAYOUTS.md` | The structural CSS specifications (Tailwind grids, flexbox logic, aesthetics). |
| `COMMUNICATION.md` | Error handling and API connectivity rules for dealing with network state. |
| `ENVIRONMENT.md` | Configuration rules for mapping the `.env` API endpoints securely. |
