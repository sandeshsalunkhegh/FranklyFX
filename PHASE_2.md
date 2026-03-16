## Phase 2: Implementation Optimizations and Cleanups

This phase focuses on improving efficiency, cleanliness, and extensibility of the existing FranklyFX implementation without changing its overall architecture.

### 1. HTTP Efficiency and Provider Design

- **Use a shared `requests.Session`**
  - Replace per-call `requests.get` with a reusable `requests.Session` in `FrankfurterProvider`.
  - Either inject a session from the outside (for testability) or lazily create one on first use and reuse it for subsequent calls.
  - Benefits: connection reuse, centralized HTTP configuration (timeouts, retries, headers), better performance under multiple calls.

- **Prepare for batch rate retrieval (future)**
  - Design the provider so it can later support multiple target currencies in a single API call (Frankfurter supports multiple `to` values).
  - Potential approach: a `fetch_rates(base: str, targets: list[str])` method that returns a mapping of target to `ExchangeRate`.

### 2. Stronger Typing and Domain Contracts

- **Introduce clearer type aliases**
  - Define semantic aliases such as:
    - `type CurrencyCode = str`
    - `type Rate = float`
  - Use these in `FXDataProvider`, `CurrencyConversionService`, and models to improve readability and tooling support.

- **Validate configuration early**
  - In `CurrencyConversionService.__init__`, assert or validate that:
    - `default_margin >= 0.0`
  - Prefer raising a small domain-specific error (e.g., `InvalidServiceConfigurationError`) when incorrectly configured, rather than failing later at runtime.

### 3. Clearer Error Handling Semantics

- **Differentiate external vs. caller errors**
  - For **bad inputs** (e.g., `amount <= 0`, `flat_fee < 0`), consider raising an explicit domain exception such as `InvalidQuoteRequestError` instead of returning `None`.
  - Reserve `None` return values for **external issues**, e.g.:
    - Provider could not fetch data.
    - Network errors, invalid currency pair, or missing rate.
  - This makes it easier for callers to distinguish between bad user input and operational failures.

### 4. Separation of Orchestration and Presentation

- **Extract a dedicated renderer from `main.py`**
  - Move the quote-printing block into a function, e.g.:
    - `def render_quote_to_stdout(quote: TransactionQuote) -> None: ...`
  - Let `main()` orchestrate:
    - Instantiate provider and service.
    - Call `generate_quote`.
    - Call `render_quote_to_stdout` if a quote is returned.
  - Benefits:
    - Easier unit testing of the service logic without dealing with stdout.
    - Clear boundary between business logic and UI/presentation.

- **Enable alternative outputs later**
  - With a dedicated renderer function, it becomes straightforward to add:
    - A JSON renderer for APIs or logging.
    - A structured logging renderer.

### 5. Remove Magic Numbers in `main.py`

- **Define configuration constants**
  - Extract hard-coded values into named constants:
    - `DEFAULT_MARGIN = 0.02`
    - `DEFAULT_BASE = "USD"`
    - `DEFAULT_TARGET = "INR"`
    - `DEFAULT_AMOUNT = 1000.0`
    - `DEFAULT_FLAT_FEE = 5.0`
  - Use these in the call to `CurrencyConversionService.generate_quote`.
  - Benefits:
    - Centralized configuration knobs.
    - Clearer intent when reading code.

- **Optional: Small configuration layer**
  - Later, these constants can be loaded from environment variables, a config file, or CLI flags without changing the service interface.

### 6. Logging Strategy and Levels

- **Fine-tune logging verbosity**
  - Keep parameterized logging (already implemented) to avoid string formatting overhead when logs are disabled.
  - Consider:
    - Using `logger.debug` for per-call details (e.g., API URLs).
    - Reserving `logger.info` for higher-level events (e.g., “quote generated successfully”).

- **Standardize log messages**
  - Use consistent phrasing and structure for logs in both service and provider (e.g., always include base/target and amount).
  - This helps when searching logs and integrating with log aggregation tools.

### 7. Testing-Oriented Enhancements (Optional for Phase 2)

- **Make components easier to test**
  - Pass in a `requests.Session` or an HTTP client abstraction to `FrankfurterProvider` to allow painless mocking.
  - Ensure quote generation logic is fully deterministic given mocked provider responses.

- **Add initial unit tests**
  - Cover core scenarios for `CurrencyConversionService.generate_quote`:
    - Valid conversions with various margins and fees.
    - Edge cases like zero / negative amounts and flat fees.
  - Cover provider behavior with mocked HTTP responses:
    - Successful responses with valid rates.
    - 404 for invalid currency pairs.
    - Network errors (timeouts, connection errors).

