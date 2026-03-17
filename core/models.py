from dataclasses import dataclass

@dataclass
class ExchangeRate:
    base_currency: str
    target_currency: str
    rate: float
    provider_name: str

@dataclass
class TransactionQuote:
    base_currency: str
    target_currency: str
    original_amount: float
    interbank_rate: float
    consumer_rate: float
    final_payout: float
    fees_applied: float
    provider_name: str
