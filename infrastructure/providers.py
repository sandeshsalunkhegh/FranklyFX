import logging

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
