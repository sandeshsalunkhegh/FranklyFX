# Programming Language and Artifacts

* **Language:** Python 3.10 or higher
* **External Packages:** `requests` (for network and API calls)
* **Standard Library Modules:** `dataclasses`, `logging`, `abc` (Abstract Base Classes), `typing`
* **Architecture:** Dependency Injection and Strategy Pattern

FranklyFX uses Dependency Injection to decouple domain logic from infrastructure concerns. The `CurrencyConversionService` depends only on the `FXDataProvider` interface, while concrete providers (such as `FrankfurterProvider`) live in the `infrastructure` layer and can be swapped or extended without touching core business logic.

The Strategy Pattern is applied via the `FXDataProvider` contract: different provider implementations can be plugged in to source FX rates from different APIs while preserving the same service interface and domain models.