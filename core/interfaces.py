from abc import ABC, abstractmethod
from typing import Optional
from .models import ExchangeRate

class FXDataProvider(ABC):
    """Abstract contract for any Foreign Exchange data provider."""
    
    @abstractmethod
    def fetch_rate(self, base: str, target: str) -> Optional[ExchangeRate]:
        """Fetches the exchange rate between two currencies."""
        pass
