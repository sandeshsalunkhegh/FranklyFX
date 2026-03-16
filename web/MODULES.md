## Web Client Modules (React + TypeScript)

The FranklyFX web client is organized into clear, focused modules to keep concerns separated and the codebase maintainable.

### 1. `app` Module

- **Responsibility**: Application shell and global wiring.
- **Contents**:
  - `App` root component.
  - Top-level routing configuration.
  - Global providers (e.g., query client, theme provider, error boundary).

### 2. `features/quote` Module

- **Responsibility**: Everything related to building and displaying FX quotes.
- **Contents**:
  - `QuoteForm` component for user input (base, target, amount, fees).
  - `QuoteResult` component for displaying the returned quote.
  - Hooks such as `useCreateQuote` (wrapping API calls).
  - Local state management and validation.

### 3. `features/history` Module (Optional)

- **Responsibility**: Displaying previously generated quotes (if backend supports persistence later).
- **Contents**:
  - `QuoteHistoryList` and `QuoteHistoryItem` components.
  - Hook `useQuoteHistory` to fetch and cache history.

### 4. `features/currency` Module

- **Responsibility**: Currency-related utilities and UI.
- **Contents**:
  - Currency selector components (dropdowns, search).
  - Static or dynamic list of supported currency codes.
  - Formatting helpers for currencies.

### 5. `components` (Shared UI Library)

- **Responsibility**: Reusable UI primitives.
- **Contents**:
  - Buttons, inputs, form fields, cards, layout containers, modals, etc.
  - Design-system-aligned components used across features.

### 6. `layouts` Module

- **Responsibility**: Page-level layout components.
- **Contents**:
  - `MainLayout` (header, footer, content area).
  - `DashboardLayout` (sidebar + content).
  - Layout wrappers used by different pages.

### 7. `api` Module

- **Responsibility**: Typed HTTP client and endpoint functions.
- **Contents**:
  - API client configuration (base URL, interceptors, error mapping).
  - `createQuote` function calling the backend FX quote endpoint.
  - Response/error normalization for the rest of the app.

### 8. `models` Module

- **Responsibility**: TypeScript models mirroring backend DTOs.
- **Contents**:
  - `QuoteRequest`, `QuoteResponse`, `ExchangeRate`, `TransactionQuote` types/interfaces.
  - Converters/mappers between raw JSON and strongly-typed objects.

### 9. `config` Module

- **Responsibility**: Environment-based configuration.
- **Contents**:
  - Backend API base URL.
  - Feature flags (e.g., enable history).
  - Environment-specific toggles (dev vs prod).

