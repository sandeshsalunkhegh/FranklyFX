## FranklyFX Web Client – Project & Codebase Structure

This document defines the proposed folder and file structure for the FranklyFX web client, implemented as a React + TypeScript single-page application.

### 1. Top-Level Structure (inside `web/`)

```text
web/
  ├─ README.md
  ├─ STRUCTURE.md
  ├─ MODULES.md
  ├─ DATA_OBJECTS.md
  ├─ DATA_MODELS.md
  ├─ PAGES.md
  ├─ DESIGN_LAYOUTS.md
  ├─ COMMUNICATION.md
  └─ app/
      ├─ index.html
      ├─ package.json
      ├─ tsconfig.json
      ├─ vite.config.ts               # or similar bundler config
      └─ src/
          ├─ main.tsx
          ├─ App.tsx
          ├─ routes/
          ├─ features/
          ├─ components/
          ├─ layouts/
          ├─ api/
          ├─ models/
          ├─ config/
          ├─ styles/
          └─ lib/
```

The `app/` directory holds the actual React + TypeScript project. The markdown files at the root of `web/` document design and architecture decisions.

### 2. Entry & Configuration Files (`web/app/`)

- **`index.html`**
  - Root HTML file with a `div#root` mount point for React.

- **`package.json`**
  - NPM/Yarn project manifest.
  - Scripts:
    - `dev` – run dev server.
    - `build` – production build.
    - `preview` – preview production build.
    - `lint` / `test` – quality checks (optional).
  - Dependencies:
    - React, React DOM, TypeScript.
    - Vite (as the bundler/dev server).
    - React Router for routing.
    - Axios for HTTP requests.
    - Tailwind CSS for styling.

- **`tsconfig.json`**
  - TypeScript configuration (strict mode recommended).

- **`vite.config.ts` (or equivalent)**
  - Bundler configuration, including dev server proxy settings to the Python backend (for `/api`).

### 3. `src/` Root

- **`main.tsx`**
  - React entrypoint.
  - Renders `<App />` into `#root`.
  - Wraps app with providers (router, query client, theme).

- **`App.tsx`**
  - Defines the main route structure.
  - Selects layout components for each route.

### 4. Routing (`src/routes/`)

```text
src/routes/
  ├─ index.tsx              # Route definitions / lazy loading
  ├─ HomePage.tsx           # '/'
  ├─ QuoteResultPage.tsx    # '/quote/:id' or '/quote/result'
  ├─ HistoryPage.tsx        # '/history' (future)
  └─ AboutPage.tsx          # '/about'
```

- **Responsibility**: Wire URLs to page components and associated layouts.

### 5. Features (`src/features/`)

```text
src/features/
  ├─ quote/
  │   ├─ components/
  │   │   ├─ QuoteForm.tsx
  │   │   └─ QuoteResult.tsx
  │   ├─ hooks/
  │   │   └─ useCreateQuote.ts
  │   ├─ types.ts            # feature-specific types if needed
  │   └─ index.ts
  ├─ currency/
  │   ├─ components/
  │   │   └─ CurrencySelect.tsx
  │   ├─ data/
  │   │   └─ currencies.ts   # list of supported codes
  │   └─ index.ts
  └─ history/                # optional future module
      ├─ components/
      │   └─ QuoteHistoryList.tsx
      ├─ hooks/
      │   └─ useQuoteHistory.ts
      └─ index.ts
```

- **Responsibility**: Encapsulate domain-specific UI, state, and logic around quotes, currencies, and history.

### 6. Shared Components (`src/components/`)

```text
src/components/
  ├─ Button.tsx
  ├─ TextInput.tsx
  ├─ Select.tsx
  ├─ Card.tsx
  ├─ Loader.tsx
  ├─ Alert.tsx
  └─ index.ts
```

- **Responsibility**: Reusable UI primitives used across multiple features and pages, forming a lightweight design system.

### 7. Layouts (`src/layouts/`)

```text
src/layouts/
  ├─ MainLayout.tsx
  ├─ DashboardLayout.tsx
  └─ index.ts
```

- **`MainLayout`**:
  - Header with navigation (Home, History, About).
  - Main content area.
  - Footer (optional).

- **`DashboardLayout`**:
  - Sidebar + content structure used for History or more complex pages.

### 8. API Layer (`src/api/`)

```text
src/api/
  ├─ client.ts              # Axios/fetch wrapper, base URL, interceptors
  ├─ quote.ts               # createQuote(request: QuoteRequest)
  └─ types.ts               # API-specific types if needed
```

- **Responsibility**:
  - Centralize HTTP configuration (base URL, headers).
  - Provide typed endpoint functions for the rest of the app.
  - Map raw HTTP errors to `ApiError`.

### 9. Models (`src/models/`)

```text
src/models/
  ├─ quote.ts               # TransactionQuote, QuoteRequest, QuoteResponse
  ├─ exchangeRate.ts        # ExchangeRate
  ├─ errors.ts              # ApiError, ValidationError
  └─ index.ts
```

- **Responsibility**: Provide TypeScript models mirroring backend DTOs, as documented in `DATA_MODELS.md`.

### 10. Config (`src/config/`)

```text
src/config/
  ├─ env.ts                 # Reads environment variables (e.g., API base URL)
  └─ index.ts
```

- **Responsibility**:
  - Centralize environment-dependent configuration.
  - Expose typed configuration values to the rest of the app.

### 11. Styles (`src/styles/`)

```text
src/styles/
  ├─ globals.css            # Global resets and typography
  ├─ variables.css          # CSS variables (colors, spacing)
  └─ components.css         # Shared component styling (if not using CSS-in-JS)
```

- **Responsibility**: Define global and shared styling. Can be replaced by CSS-in-JS or a utility framework if preferred.

### 12. Lib / Utilities (`src/lib/`)

```text
src/lib/
  ├─ formatCurrency.ts
  ├─ formatRate.ts
  └─ index.ts
```

- **Responsibility**: Small, framework-agnostic helper functions (formatting, parsing, etc.) used across the app.

