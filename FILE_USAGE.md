# File Usage

* `core/models.py`: Strictly defines the Data Transfer Objects (DTOs) for the application (e.g., `ExchangeRate`, `TransactionQuote`).
* `core/interfaces.py`: Establishes the contracts and blueprints (Abstract Base Classes) for FX data providers (e.g., `FXDataProvider`).
* `core/service.py`: Handles the core business logic, including spreads and transaction fee calculations, relying only on the abstract provider interface.
* `infrastructure/providers.py`: Contains concrete implementations of `FXDataProvider` that communicate securely with external APIs (e.g., `FrankfurterProvider`).
* `main.py`: Application entry point that wires concrete providers into the `CurrencyConversionService` and renders user-facing output.
* `requirements.txt`: Captures the Python dependency set required to run the application.
* `setup.sh`: Convenience script to bootstrap the project structure and initial files.