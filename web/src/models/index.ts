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

export type CurrencyCode = string;
export type Money = number;
export type Rate = number;
