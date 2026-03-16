import axios from 'axios';
import type { QuoteRequest, QuoteResponse, ApiError } from '../models';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createQuote = async (request: QuoteRequest): Promise<QuoteResponse> => {
  try {
    const response = await client.post<QuoteResponse>('/api/quote', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const apiError: ApiError = error.response.data;
      throw apiError;
    }
    throw {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred while communicating with the server.',
    } as ApiError;
  }
};
