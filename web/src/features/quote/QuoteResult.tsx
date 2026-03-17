import type { QuoteResponse } from '../../models';
import { CheckCircle, AlertCircle, Building2, Wallet } from 'lucide-react';

interface QuoteResultProps {
  quote: QuoteResponse;
}

export function QuoteResult({ quote }: QuoteResultProps) {
  const formatMoney = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatRate = (rate: number) => rate.toFixed(4);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header section with gradient */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-blue-100 flex items-center">
            <CheckCircle size={18} className="mr-2 text-green-400" />
            Official Transaction Quote
          </h3>
          <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            Valid Now
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-baseline space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="text-4xl font-bold tracking-tight">
            {formatMoney(quote.finalPayout, quote.targetCurrency)}
          </span>
          <span className="text-blue-200 font-medium">Final Payout</span>
        </div>

        <p className="text-sm text-blue-200 mt-2 flex items-center">
          Converting {formatMoney(quote.originalAmount, quote.baseCurrency)}
        </p>
      </div>

      {/* Breakdown section */}
      <div className="px-6 py-6 divide-y divide-gray-100">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center text-gray-600">
            <Building2 size={18} className="mr-2 text-gray-400" />
            <span className="text-sm">Interbank Rate</span>
          </div>
          <span className="font-medium text-gray-900">{formatRate(quote.interbankRate)}</span>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center text-gray-600">
            <AlertCircle size={18} className="mr-2 text-gray-400" />
            <span className="text-sm">Retail Rate (After Spread)</span>
          </div>
          <span className="font-medium text-gray-900">{formatRate(quote.consumerRate)}</span>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center text-gray-600">
            <Wallet size={18} className="mr-2 text-gray-400" />
            <span className="text-sm">Flat Fee Applied</span>
          </div>
          <span className="font-medium text-red-600">
            -{formatMoney(quote.feesApplied, quote.baseCurrency)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50/80 px-6 py-3 border-t border-gray-100 text-xs text-center text-gray-500">
        Rates provided by <span className="font-semibold text-gray-700">{quote.providerName}</span>
      </div>
    </div>
  );
}
