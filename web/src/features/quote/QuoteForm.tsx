import { useState } from 'react';
import type { QuoteRequest } from '../../models';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ArrowRightLeft, DollarSign } from 'lucide-react';

interface QuoteFormProps {
  onSubmit: (request: QuoteRequest) => void;
  isLoading: boolean;
}

export function QuoteForm({ onSubmit, isLoading }: QuoteFormProps) {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [amount, setAmount] = useState('1000');
  const [flatFee, setFlatFee] = useState('5');
  const [margin, setMargin] = useState('2.0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      baseCurrency: baseCurrency.toUpperCase(),
      targetCurrency: targetCurrency.toUpperCase(),
      amount: parseFloat(amount),
      flatFee: parseFloat(flatFee),
      margin: parseFloat(margin) / 100, // Convert percentage to decimal
    });
  };

  const handleSwap = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="flex-1 min-w-0">
          <Input
            label="From"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            placeholder="e.g. USD"
            maxLength={3}
            required
            className="uppercase"
          />
        </div>
        
        <div className="pt-6 flex-shrink-0">
          <button
            type="button"
            onClick={handleSwap}
            className="p-2.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            title="Swap Currencies"
          >
            <ArrowRightLeft size={18} />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <Input
            label="To"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            placeholder="e.g. EUR"
            maxLength={3}
            required
            className="uppercase"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Amount to Convert"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Input
          label="Flat Fee (in Target)"
          type="number"
          min="0"
          step="0.01"
          value={flatFee}
          onChange={(e) => setFlatFee(e.target.value)}
          required
        />
        <Input
          label="Margin Spread (%)"
          type="number"
          min="0"
          step="0.1"
          value={margin}
          onChange={(e) => setMargin(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        icon={<DollarSign size={20} />}
      >
        Get Official Quote
      </Button>
    </form>
  );
}
