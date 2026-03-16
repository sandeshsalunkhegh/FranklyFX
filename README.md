# FranklyFX

FranklyFX is a production-ready Python FX tracker using the free Frankfurter API. It features a clean, layered architecture with dependency injection, designed for seamless integration and easy testing.

This is an open-source, production-ready Foreign Exchange (FX) tracker. It securely fetches real-time currency exchange rates without requiring an API key.

## Key Features

* Completely free API data (using Frankfurter)
* Enterprise-grade layered architecture (domain, infrastructure, entrypoint)
* Built-in error handling and structured logging
* Extensible design for future API integrations via pluggable providers

## Requirements

* Python 3.10 or higher
* `requests` (installed via `requirements.txt`)

## Installation

1. Clone the repository.
2. (Optional) Run `./setup.sh` to scaffold the project structure if starting from scratch.
3. Create and activate a virtual environment.
4. Install dependencies with:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Run the application entrypoint:

```bash
python main.py
```

By default, `main.py` generates a single quote from USD to INR for a notional amount and prints a human‑readable quote summary to stdout.

To adjust the behaviour (currencies, amount, spread, flat fee), update the call to `CurrencyConversionService.generate_quote` in `main.py`, or wire your own CLI/wrapper on top of the service.

## Project Layout

* `core/`: Domain models, interfaces, and business logic (`models.py`, `interfaces.py`, `service.py`).
* `infrastructure/`: External API integrations, such as `FrankfurterProvider`.
* `main.py`: Application entrypoint that wires providers into the service and renders a quote.
* `requirements.txt`: Python dependencies.

For more details, see:

* `STRUCTURE.md` for the repository layout.
* `FILE_USAGE.md` for a per‑file responsibility overview.
* `TECH_STACK.md` for language, libraries, and architecture notes.
* `RULES.md` for coding guidelines applied across the project.
