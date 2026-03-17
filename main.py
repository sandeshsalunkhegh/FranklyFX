import logging
import sys

from infrastructure.providers import FrankfurterProvider, ExchangeRatesApiProvider, FallbackFXProvider
from core.service import CurrencyConversionService

# Configure production-level logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger("FranklyFX_Main")


def main(amount :float, base :str, target :str, flat_fee :float) -> None:
    """Entrypoint for running a single FX quote example."""
    logger.info("Starting FranklyFX Application...")

    # 1. Instantiate the fallback provider chain
    api_provider = FallbackFXProvider(providers=[
        FrankfurterProvider(),
        ExchangeRatesApiProvider()
    ])

    # 2. Inject the provider into the business logic service (using a 2% spread)
    fx_service = CurrencyConversionService(provider=api_provider, default_margin=0.02)

    # 3. Execute a conversion request
    quote = fx_service.generate_quote(base=base, target=target, amount=amount, flat_fee=flat_fee)

    if quote:
        print("\n" + "=" * 45)
        print("🌍 FRANKLYFX: OFFICIAL TRANSACTION QUOTE 🌍")
        print("=" * 45)
        print(f"Sending:      {quote.original_amount:.2f} {quote.base_currency}")
        print(f"To:           {quote.target_currency}")
        print("-" * 45)
        print(f"Interbank:    {quote.interbank_rate:.4f} (Wholesale rate)")
        print(f"Retail Rate:  {quote.consumer_rate:.4f} (After 2.0% spread)")
        print(f"Flat Fee:     {quote.fees_applied:.2f} {quote.base_currency}")
        print("-" * 45)
        print(f"FINAL PAYOUT: {quote.final_payout:.2f} {quote.target_currency}")
        print("=" * 45 + "\n")
    else:
        logger.error("Could not process the transaction.")


if __name__ == "__main__":
    main(amount=1000.0, base="USD", target="INR", flat_fee=5.0)
