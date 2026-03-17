import logging

from .interfaces import FXDataProvider
from .models import TransactionQuote

logger = logging.getLogger(__name__)


class CurrencyConversionService:
    """Handles business logic, applying spreads and fees to raw API data."""

    def __init__(self, provider: FXDataProvider, default_margin: float = 0.025) -> None:
        self.provider = provider
        self.margin = default_margin

    def generate_quote(self, base: str, target: str, amount: float, flat_fee: float = 0.0, margin: float | None = None) -> TransactionQuote | None:
        logger.info("Generating FranklyFX quote: %s %s to %s", amount, base, target)

        if amount <= 0:
            logger.error("Amount must be positive. Received: %s", amount)
            return None

        if flat_fee < 0:
            logger.error("Flat fee cannot be negative. Received: %s", flat_fee)
            return None

        exchange_rate_data = self.provider.fetch_rate(base, target)

        if not exchange_rate_data:
            logger.error("Failed to generate quote due to missing exchange rate data.")
            return None

        actual_margin = margin if margin is not None else self.margin

        # Phase 1 UX Redesign: Deduct the sender's flat fee entirely natively from the Base Currency 
        # (Source funds) BEFORE calculating the conversion multiplier.
        chargeable_amount = max(0.0, amount - flat_fee)

        interbank_rate = exchange_rate_data.rate
        consumer_rate = interbank_rate * (1 - actual_margin)
        final_payout = chargeable_amount * consumer_rate

        return TransactionQuote(
            base_currency=base.upper(),
            target_currency=target.upper(),
            original_amount=amount,
            interbank_rate=interbank_rate,
            consumer_rate=consumer_rate,
            final_payout=max(0.0, final_payout),  # Prevent negative payouts
            fees_applied=flat_fee,
            provider_name=exchange_rate_data.provider_name,
        )
