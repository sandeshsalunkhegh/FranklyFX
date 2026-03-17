import logging
import os
import requests

from core.interfaces import FXDataProvider
from core.models import ExchangeRate

logger = logging.getLogger(__name__)


class FrankfurterProvider(FXDataProvider):
    """Implementation of FXDataProvider using the free Frankfurter API."""

    def __init__(self) -> None:
        self.base_url = "https://api.frankfurter.app/latest"
        self.provider_name = "FranklyFX (via Frankfurter)"

    def fetch_rate(self, base: str, target: str) -> ExchangeRate | None:
        base, target = base.upper(), target.upper()
        url = f"{self.base_url}?from={base}&to={target}"

        try:
            logger.debug("Calling external API: %s", url)
            # Strict 10-second timeout for production reliability
            response = requests.get(url, timeout=10)
            response.raise_for_status()

            data = response.json()
            rate_value = data["rates"].get(target)

            if not rate_value:
                logger.error("Rate for %s not found in response.", target)
                return None

            return ExchangeRate(
                base_currency=base,
                target_currency=target,
                rate=rate_value,
                provider_name=self.provider_name,
            )

        except requests.exceptions.HTTPError as exc:
            if response.status_code == 404:
                logger.warning("Invalid currency pair requested: %s/%s", base, target)
            else:
                logger.error("HTTP Error fetching rate: %s", exc)
            return None
        except requests.exceptions.RequestException as exc:
            logger.error("Network error fetching rate from %s: %s", self.provider_name, exc)
            return None


class ExchangeRatesApiProvider(FXDataProvider):
    """Implementation of FXDataProvider using the exchangeratesapi.io service."""

    def __init__(self, api_key: str | None = None) -> None:
        # Note: The free tier requires HTTP instead of HTTPS on certain plans, and forces base=EUR
        self.base_url = "http://api.exchangeratesapi.io/v1/latest"
        self.api_key = api_key or os.environ.get("EXCHANGERATESAPI_KEY", "")
        self.provider_name = "FranklyFX (via ExchangeRatesAPI)"

    def fetch_rate(self, base: str, target: str) -> ExchangeRate | None:
        if not self.api_key:
             logger.error("ExchangeRatesAPI key is missing. Set EXCHANGERATESAPI_KEY.")
             return None

        base, target = base.upper(), target.upper()

        if base == target:
            return ExchangeRate(
                base_currency=base,
                target_currency=target,
                rate=1.0,
                provider_name=self.provider_name,
            )

        # Free tier restricted to EUR base. We fetch EUR relative rates for BOTH targeting cross-math.
        # Ensure we request both base and target in the symbols query against EUR.
        symbols = f"{base},{target}" if base != "EUR" else target
        url = f"{self.base_url}?access_key={self.api_key}&symbols={symbols}"

        try:
            logger.debug("Calling external API: %s (api_key hidden)", self.base_url)
            response = requests.get(url, timeout=10)
            response.raise_for_status()

            data = response.json()
            if not data.get("success"):
                logger.error("ExchangeRatesAPI logic error: %s", data.get("error"))
                return None
            
            rates = data.get("rates", {})

            # If the user requested EUR as base, the math is 1:1 direct lookup.
            if base == "EUR":
                rate_value = rates.get(target)
                if rate_value is None:
                    logger.error("Rate for %s not found in response.", target)
                    return None
            else:
                # Perform Cross-Rate Math because API enforced EUR base
                # Formula: EUR_to_Target / EUR_to_Base = Base_to_Target
                eur_to_base = rates.get(base)
                eur_to_target = rates.get(target)

                if eur_to_base is None or eur_to_target is None:
                    logger.error("Required cross-rates missing. Got: %s", rates)
                    return None
                
                rate_value = eur_to_target / eur_to_base

            return ExchangeRate(
                base_currency=base,
                target_currency=target,
                rate=rate_value,
                provider_name=self.provider_name,
            )

        except requests.exceptions.HTTPError as exc:
             logger.error("HTTP Error fetching rate: %s - %s", exc, response.text)
             return None
        except requests.exceptions.RequestException as exc:
             logger.error("Network error fetching rate from %s: %s", self.provider_name, exc)
             return None

class FallbackFXProvider(FXDataProvider):
    """Implementation of FXDataProvider that falls back to alternative providers on failure."""
    
    def __init__(self, providers: list[FXDataProvider]) -> None:
        self.providers = providers
        
    def fetch_rate(self, base: str, target: str) -> ExchangeRate | None:
        for provider in self.providers:
            logger.info("Attempting to fetch rate using %s", provider.__class__.__name__)
            rate = provider.fetch_rate(base, target)
            if rate is not None:
                return rate
            logger.warning("%s failed. Falling back to next provider...", provider.__class__.__name__)
            
        logger.error("All providers failed to fetch the exchange rate.")
        return None
