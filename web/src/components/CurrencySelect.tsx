import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { CURRENCIES } from '../data/currencies';

interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function CurrencySelect({ label, value, onChange, required }: CurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedCurrency = CURRENCIES.find((c) => c.code === value) || CURRENCIES[0];

  const filteredCurrencies = CURRENCIES.filter((currency) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      currency.code.toLowerCase().includes(searchLower) ||
      currency.name.toLowerCase().includes(searchLower) ||
      currency.country.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currencyCode: string) => {
    onChange(currencyCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="space-y-1.5 relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div 
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-colors cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 truncate">
          <span className="text-xl leading-none">{selectedCurrency.flag}</span>
          <span className="font-semibold text-gray-900">{selectedCurrency.code}</span>
          <span className="text-gray-500 text-sm truncate max-w-[150px] hidden sm:inline-block">
            {selectedCurrency.country}
          </span>
        </div>
        <ChevronDown size={18} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search currency or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>
          
          <ul className="max-h-60 overflow-y-auto w-full py-1">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <li
                  key={currency.code}
                  className={`px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between group ${
                    currency.code === value ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleSelect(currency.code)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl leading-none">{currency.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 text-sm">
                        {currency.code} <span className="font-normal text-gray-500">- {currency.name}</span>
                      </span>
                      <span className="text-xs text-gray-500">{currency.country}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 font-medium group-hover:text-blue-500">{currency.symbol}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">No currencies found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
