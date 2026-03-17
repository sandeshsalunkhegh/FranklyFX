import { useState } from 'react';
import type { QuoteRequest } from '../../models';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { CurrencySelect } from '../../components/CurrencySelect';
import { ArrowRightLeft, DollarSign } from 'lucide-react';
import { CURRENCIES } from '../../data/currencies';

interface QuoteFormProps {
  onSubmit: (request: QuoteRequest) => void;
  isLoading: boolean;
}

export function QuoteForm({ onSubmit, isLoading }: QuoteFormProps) {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [amountStr, setAmountStr] = useState('1,000');
  const [flatFee, setFlatFee] = useState('5.00');
  const [margin, setMargin] = useState('2.0');
  const [isSwapping, setIsSwapping] = useState(false);

  // Dynamic Symbol Lookups
  const baseSymbol = CURRENCIES.find(c => c.code === baseCurrency)?.symbol || '$';

  // Number Formatter (e.g. 1000000 -> 1,000,000)
  const formatAmount = (val: string) => {
    const naked = val.replace(/[^\d.]/g, '');
    const parts = naked.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      baseCurrency: baseCurrency.toUpperCase(),
      targetCurrency: targetCurrency.toUpperCase(),
      amount: parseFloat(amountStr.replace(/,/g, '')),
      flatFee: parseFloat(flatFee.replace(/,/g, '')),
      margin: parseFloat(margin) / 100, // Convert percentage to decimal
    });
  };

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => setIsSwapping(false), 300);
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="flex-1 min-w-0">
          <CurrencySelect
            label="From"
            value={baseCurrency}
            onChange={setBaseCurrency}
            required
          />
        </div>
        
        <div className="pt-6 flex-shrink-0">
          <button
            type="button"
            onClick={handleSwap}
            className={`p-2.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${isSwapping ? 'rotate-180 scale-110' : ''}`}
            title="Swap Currencies"
          >
            <ArrowRightLeft size={18} />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <CurrencySelect
            label="To"
            value={targetCurrency}
            onChange={setTargetCurrency}
            required
          />
        </div>
      </div>

      <div className="space-y-6 pt-2">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Amount to Convert"
            type="text"
            leftAddon={baseSymbol}
            value={amountStr}
            onChange={(e) => setAmountStr(formatAmount(e.target.value))}
            required
          />
          <Input
            label={`Flat Fee (${baseCurrency})`}
            type="number"
            leftAddon={baseSymbol}
            min="0"
            step="0.01"
            value={flatFee}
            onChange={(e) => setFlatFee(e.target.value)}
            required
          />
        </div>
        
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Advanced Provider Settings</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <Input
              label="Margin Spread (%)"
              type="number"
              min="0"
              step="0.1"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              required
            />
            <div className="flex gap-2 pb-1">
              {['1.0', '1.5', '2.0'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setMargin(opt)}
                  className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-colors border ${
                    margin === opt 
                      ? 'bg-blue-100 text-blue-700 border-blue-200' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {opt}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        icon={<DollarSign size={20} />}
      >
        {isSwapping ? 'Recalculating...' : `Calculate ${targetCurrency} Payout`}
      </Button>
    </form>
  );
}
