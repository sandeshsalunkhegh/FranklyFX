# FranklyFX

FranklyFX is a production-ready Foreign Exchange (FX) tracker using the free Frankfurter API. It features a clean, layered architecture with dependency injection, designed for seamless integration and easy testing. 

This open-source project securely fetches real-time currency exchange rates and allows computing custom transaction payouts with user-defined spreads and fees.

## Key Features

* **Real-time Free Data**: Built on top of the Frankfurter API.
* **Enterprise Architecture**: Strict separation of concerns (Domain/Core, Infrastructure, Web).
* **Cross-Platform Interfaces**: 
  - A comprehensive **Python FastAPI** backend REST layer (`index.py`).
  - A terminal entry point CLI script for operational testing (`main.py`).
  - A modern **React + TypeScript** web client for an intuitive Quote Builder UI (`web/`).

## Requirements

* **Backend:** Python 3.10+
* **Frontend:** Node.js 18+

## Step-by-Step Guide & Execution Details

To run the full stack FranklyFX application locally, you need to execute both the backend API and the frontend client simultaneously. Here are the exact execution details:

### 1. Start the Backend API (Terminal 1)
The backend acts as the core engine to fetch rates and execute business logic.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sandeshsalunkhegh/FranklyFX.git
   cd FranklyFX
   ```
2. **Set up Python virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Start the FastAPI server (Execution):**
   ```bash
   uvicorn index:app --reload --port 8000
   ```
   *Execution Detail:* The backend server runs on `http://127.0.0.1:8000`. It exposes the `POST /api/quote` REST endpoint and accepts CORS requests from the frontend.

*(Optional Alternative: You can execute the backend operations purely in via the CLI utilizing `python main.py`)*

### 2. Start the Frontend Web Client (Terminal 2)
The web client consumes the REST API to provide the user interface.

1. **Open a new terminal window** and navigate into the `web/` directory:
   ```bash
   cd FranklyFX/web
   ```
2. **Install Node dependencies:**
   ```bash
   npm install
   ```
3. **Start the Vite development server (Execution):**
   ```bash
   npm run dev
   ```
   *Execution Detail:* The frontend proxy runs on `http://localhost:5173`. It connects over HTTP to the backend running on port 8000 to fetch quotes transparently.

## All Project Markdown Files

FranklyFX is heavily documented. Here is an index of all `.md` files in the repository explaining its architecture and functionality:

### Root Level
| File | Description |
|------|-------------|
| `README.md` | Provides the main project overview, features, and step-by-step execution guide. |
| `STRUCTURE.md` | Outlines the backend and project root directory architecture. |
| `TECH_STACK.md` | Details the overarching stack choices (FastAPI, Free Frankfurter API, React, Tailwind). |
| `RULES.md` | Technical guidelines on codebase conventions, python formatting, dependency injection, etc. |
| `FILE_USAGE.md` | In-depth breakdown of the responsibilities held by root files (e.g. `main.py` vs `api.py`). |
| `PHASE_2.md` | Outlines future roadmap enhancements for backend and project tooling optimizations. |

### Web Client (`web/`) Level
| File | Description |
|------|-------------|
| `web/README.md` | Web-client specific overview, execution steps, and React documentation. |
| `web/PHASE_1_WEB.md` | High-level requirements and phase objectives for building the React frontend. |
| `web/STRUCTURE.md` | Standard folder structure expectations for the React frontend application. |
| `web/MODULES.md` | Defines the specific functional requirements to be implemented in the UX. |
| `web/PAGES.md` | Illustrates the page-by-page mapping and routing specifications. |
| `web/DATA_MODELS.md` | Specifies the TypeScript interfaces and validation models expected by the React state. |
| `web/DATA_OBJECTS.md` | Defines the actual API payloads (`QuoteRequest`, `QuoteResponse`). |
| `web/DESIGN_LAYOUTS.md`| Specifications for structural web designs, CSS layouts, and component grids. |
| `web/COMMUNICATION.md` | Rules detailing how the frontend Axios client must communicate with the FastAPI backend. |
| `web/ENVIRONMENT.md` | Documentation regarding Vite environment variables. |
