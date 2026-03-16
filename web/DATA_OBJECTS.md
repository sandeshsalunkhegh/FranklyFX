## Web Client Data Objects

This document defines the core data objects the FranklyFX web client will use when communicating with the backend and managing UI state.

### 1. Quote Request Object

- **Name**: `QuoteRequest`
- **Purpose**: Represents a user’s request for an FX quote.
- **Fields**:
  - `baseCurrency: string` – ISO currency code (e.g., `"USD"`).
  - `targetCurrency: string` – ISO currency code (e.g., `"INR"`).
  - `amount: number` – Amount in base currency.
  - `flatFee: number` – Optional flat fee applied in target currency.
  - `margin?: number` – Optional override for the default margin/spread.

### 2. Quote Response Object

- **Name**: `QuoteResponse`
- **Purpose**: Represents the response from the backend after generating a quote.
- **Fields**:
  - `baseCurrency: string`
  - `targetCurrency: string`
  - `originalAmount: number`
  - `interbankRate: number`
  - `consumerRate: number`
  - `finalPayout: number`
  - `feesApplied: number`
  - `providerName: string` – Name of the FX data provider (e.g., `"FranklyFX (via Frankfurter)"`).

### 3. Exchange Rate Object

- **Name**: `ExchangeRateObject`
- **Purpose**: Represents a raw or cached FX rate for auxiliary features (e.g., rate display or history).
- **Fields**:
  - `baseCurrency: string`
  - `targetCurrency: string`
  - `rate: number`
  - `providerName: string`
  - `timestamp?: string` – ISO timestamp when the rate was fetched.

### 4. Validation Error Object

- **Name**: `ValidationError`
- **Purpose**: Used on the client side to represent input validation errors.
- **Fields**:
  - `field: string` – The name of the field (e.g., `"amount"`, `"baseCurrency"`).
  - `message: string` – Human-readable error message.

### 5. API Error Object

- **Name**: `ApiError`
- **Purpose**: Standard shape for errors returned from the backend.
- **Fields**:
  - `code: string` – Machine-readable error code (e.g., `"INVALID_INPUT"`, `"PROVIDER_UNAVAILABLE"`).
  - `message: string` – Human-readable explanation.
  - `details?: Record<string, unknown>` – Optional structured details (e.g., which fields failed).

### 6. UI State Objects

- **Name**: `QuoteFormState`
  - `values: QuoteRequest`
  - `errors: ValidationError[]`
  - `isSubmitting: boolean`

- **Name**: `QuoteViewState`
  - `currentQuote?: QuoteResponse`
  - `isLoading: boolean`
  - `error?: ApiError`

