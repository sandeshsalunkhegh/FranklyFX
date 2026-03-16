## Web Client Data Models (TypeScript)

These models mirror the backend DTOs (`ExchangeRate`, `TransactionQuote`) and define additional client-only types for UI and state management.

### 1. Core Models (Aligned with Backend)

```ts
export interface ExchangeRate {
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  providerName: string;
}

export interface TransactionQuote {
  baseCurrency: string;
  targetCurrency: string;
  originalAmount: number;
  interbankRate: number;
  consumerRate: number;
  finalPayout: number;
  feesApplied: number;
}
```

### 2. Request / Response Models

```ts
export interface QuoteRequest {
  baseCurrency: string;
  targetCurrency: string;
  amount: number;
  flatFee: number;
  margin?: number;
}

export interface QuoteResponse extends TransactionQuote {
  providerName: string;
}
```

### 3. Error and State Models

```ts
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface QuoteFormState {
  values: QuoteRequest;
  errors: ValidationError[];
  isSubmitting: boolean;
}

export interface QuoteViewState {
  currentQuote?: QuoteResponse;
  isLoading: boolean;
  error?: ApiError;
}
```

### 4. Utility Type Aliases

```ts
export type CurrencyCode = string;
export type Money = number;
export type Rate = number;
```

These aliases improve readability and make function signatures more expressive across the web client.

