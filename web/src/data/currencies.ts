export interface CurrencyData {
  code: string;
  name: string;
  country: string;
  symbol: string;
  flag: string;
}

export const CURRENCIES: CurrencyData[] = [
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', symbol: '$', flag: '🇦🇺' },
  { code: 'BGN', name: 'Bulgarian Lev', country: 'Bulgaria', symbol: 'лв', flag: '🇧🇬' },
  { code: 'BRL', name: 'Brazilian Real', country: 'Brazil', symbol: 'R$', flag: '🇧🇷' },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', symbol: '$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', country: 'Switzerland', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', symbol: '¥', flag: '🇨🇳' },
  { code: 'CZK', name: 'Czech Koruna', country: 'Czech Republic', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'DKK', name: 'Danish Krone', country: 'Denmark', symbol: 'kr', flag: '🇩🇰' },
  { code: 'EUR', name: 'Euro', country: 'Eurozone', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound Sterling', country: 'United Kingdom', symbol: '£', flag: '🇬🇧' },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', symbol: '$', flag: '🇭🇰' },
  { code: 'HUF', name: 'Hungarian Forint', country: 'Hungary', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'IDR', name: 'Indonesian Rupiah', country: 'Indonesia', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'ILS', name: 'Israeli New Sheqel', country: 'Israel', symbol: '₪', flag: '🇮🇱' },
  { code: 'INR', name: 'Indian Rupee', country: 'India', symbol: '₹', flag: '🇮🇳' },
  { code: 'ISK', name: 'Icelandic Króna', country: 'Iceland', symbol: 'kr', flag: '🇮🇸' },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', symbol: '¥', flag: '🇯🇵' },
  { code: 'KRW', name: 'South Korean Won', country: 'South Korea', symbol: '₩', flag: '🇰🇷' },
  { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', symbol: '$', flag: '🇲🇽' },
  { code: 'MYR', name: 'Malaysian Ringgit', country: 'Malaysia', symbol: 'RM', flag: '🇲🇾' },
  { code: 'NOK', name: 'Norwegian Krone', country: 'Norway', symbol: 'kr', flag: '🇳🇴' },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', symbol: '$', flag: '🇳🇿' },
  { code: 'PHP', name: 'Philippine Peso', country: 'Philippines', symbol: '₱', flag: '🇵🇭' },
  { code: 'PLN', name: 'Polish Zloty', country: 'Poland', symbol: 'zł', flag: '🇵🇱' },
  { code: 'RON', name: 'Romanian Leu', country: 'Romania', symbol: 'lei', flag: '🇷🇴' },
  { code: 'SEK', name: 'Swedish Krona', country: 'Sweden', symbol: 'kr', flag: '🇸🇪' },
  { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore', symbol: '$', flag: '🇸🇬' },
  { code: 'THB', name: 'Thai Baht', country: 'Thailand', symbol: '฿', flag: '🇹🇭' },
  { code: 'TRY', name: 'Turkish Lira', country: 'Turkey', symbol: '₺', flag: '🇹🇷' },
  { code: 'USD', name: 'United States Dollar', country: 'United States', symbol: '$', flag: '🇺🇸' },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', symbol: 'R', flag: '🇿🇦' }
];
