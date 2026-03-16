## Web Client Environment & API Configuration

The FranklyFX web client reads its backend API base URL from environment variables at build time.

### 1. Environment Variables

- **`VITE_API_BASE_URL`**
  - Description: Base URL for the Python backend (e.g., `http://localhost:8000` in development).
  - Used by: `src/config/env.ts` and `src/api/client.ts`.

### 2. Example `.env` Files

- **Development (`web/app/.env.development`)**

  ```env
  VITE_API_BASE_URL=http://localhost:8000
  ```

- **Production (`web/app/.env.production`)**

  ```env
  VITE_API_BASE_URL=https://api.franklyfx.your-domain.com
  ```

### 3. `src/config/env.ts` (Planned)

The `env.ts` module will provide a typed wrapper around environment variables:

```ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
};
```

All HTTP calls in the web client should use `config.apiBaseUrl` to construct URLs (e.g., `${config.apiBaseUrl}/api/quote`).

