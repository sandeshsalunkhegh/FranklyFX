import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { QuoteForm } from '../features/quote/QuoteForm';
import { QuoteResult } from '../features/quote/QuoteResult';
import { createQuote } from '../api/client';
import type { QuoteRequest, QuoteResponse, ApiError } from '../models';
import { AlertCircle, Loader2 } from 'lucide-react';

export function HomePage() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateQuote = async (request: QuoteRequest) => {
    setIsLoading(true);
    setError(null);
    setQuote(null);
    
    try {
      const response = await createQuote(request);
      setQuote(response);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="w-full space-y-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Transparent FX Conversions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your exact cross-border payment payout with real-time interbank rates and clear, honest fee breakdowns.
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start space-x-3 shadow-sm animate-in fade-in">
            <AlertCircle className="mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-medium">Failed to generate quote</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <Card title="Quote Builder" className="h-full border-t-4 border-t-blue-600">
              <QuoteForm onSubmit={handleCreateQuote} isLoading={isLoading} />
            </Card>
          </div>
          
          <div className="lg:col-span-7">
            {isLoading ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-white border border-gray-100 rounded-2xl text-gray-500 shadow-sm animate-pulse">
                <div className="bg-blue-50 p-4 rounded-full mb-4 text-blue-600">
                  <Loader2 className="animate-spin" size={32} />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Fetching live rates...</h3>
                <p className="text-sm max-w-sm">Please wait while we calculate your exact conversion with current market data.</p>
              </div>
            ) : quote ? (
              <QuoteResult quote={quote} />
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-white border border-dashed border-gray-300 rounded-2xl text-gray-500">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <span className="text-2xl">💱</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">No active quote</h3>
                <p className="text-sm max-w-sm">Fill out the form to generate a transparent quote based on real-time market data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
