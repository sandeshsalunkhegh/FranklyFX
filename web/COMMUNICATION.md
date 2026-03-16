## Backend–Frontend Communication Design

This document describes how the FranklyFX web client communicates with the backend service.

### 1. High-Level Architecture

- The Python backend exposes an HTTP API (e.g., using FastAPI or Flask) that:
  - Wraps `CurrencyConversionService` and `FrankfurterProvider`.
  - Provides a `/api/quote` endpoint to generate FX quotes.
- The React + TypeScript web client:
  - Sends JSON requests to `/api/quote`.
  - Receives JSON responses aligned with `TransactionQuote` and related DTOs.

### 2. Quote Endpoint

- **Method**: `POST`
- **Path**: `/api/quote`
- **Request Body (JSON)**:
  ```json
  {
    "baseCurrency": "USD",
    "targetCurrency": "INR",
    "amount": 1000.0,
    "flatFee": 5.0,
    "margin": 0.02
  }
  ```
- **Successful Response (200)**:
  ```json
  {
    "baseCurrency": "USD",
    "targetCurrency": "INR",
    "originalAmount": 1000.0,
    "interbankRate": 91.2345,
    "consumerRate": 89.4098,
    "finalPayout": 89400.0,
    "feesApplied": 5.0,
    "providerName": "FranklyFX (via Frankfurter)"
  }
  ```

### 3. Error Handling

- **Validation errors (e.g., invalid amount)**:
  - **Status**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "code": "INVALID_INPUT",
      "message": "Amount must be greater than zero.",
      "details": { "field": "amount" }
    }
    ```

- **Provider / external errors (e.g., API unavailable)**:
  - **Status**: `502 Bad Gateway` or `503 Service Unavailable`
  - **Body**:
    ```json
    {
      "code": "PROVIDER_UNAVAILABLE",
      "message": "Unable to fetch FX rate at this time."
    }
    ```

### 4. Frontend API Layer

- The web client defines an `api` module:
  - `createQuote(request: QuoteRequest): Promise<QuoteResponse>`
  - Handles:
    - JSON serialization/deserialization.
    - Mapping HTTP errors into `ApiError`.
    - Optional retries or user-facing error messages.

### 5. Security and CORS

- Enable CORS on the backend for the web client origin:
  - Restrict allowed origins to the deployed web app domain in production.
  - Allow necessary methods (`POST`) and headers (`Content-Type`, auth headers if added later).

### 6. Future Extensions

- Additional endpoints that the same pattern can support:
  - `GET /api/rates` – Fetch current rates for a set of target currencies.
  - `GET /api/history` – Return historical quotes (if persistence is added).

