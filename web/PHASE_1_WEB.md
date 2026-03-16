## Phase 1 – FranklyFX Web Client Scope

This document defines the minimum viable scope for the first version of the FranklyFX web client.

### 1. Goals

- Provide a simple, responsive web UI to request an FX quote.
- Show all key quote details returned from the backend.
- Keep architecture and codebase ready for future expansion (history, multiple providers, etc.).

### 2. Included in Phase 1

- **Pages**
  - Home / Quote Builder (`/`).
  - About (`/about`) – basic static content.

- **Functionality**
  - Fill out a quote form:
    - Base currency.
    - Target currency.
    - Amount.
    - Flat fee.
  - Submit the form and call `POST /api/quote`.
  - Render the returned quote details:
    - Interbank rate.
    - Consumer rate.
    - Fees.
    - Final payout.
  - Handle and display basic error states:
    - Invalid input (400).
    - Provider unavailable (502/503).

### 3. Explicitly Out of Scope for Phase 1

- Quote history / persistence (`/history`).
- Authentication and user accounts.
- Multi-language support.
- Advanced analytics or charts.
- Multiple backend providers and provider selection.

### 4. Technical Stack (Phase 1)

- **Frontend**
  - React + TypeScript.
  - Bundler: Vite.
  - Router: React Router.
  - Data fetching: Axios (or fetch) wrapped in a small API layer.
  - Styling/UI: Tailwind CSS (utility-first) plus a small set of custom components.

- **Backend**
  - Python with FastAPI (existing `api.py`).
  - Endpoint: `POST /api/quote`.

