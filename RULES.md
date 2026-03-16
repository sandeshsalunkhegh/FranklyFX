# Coding Rules and Guidelines

* **Type Hinting is Mandatory:** All functions must have explicit parameter and return type annotations.
* **SOLID Principles:** Maintain a layered architecture and keep domain logic isolated from the infrastructure.
* **Logging (Core and Infrastructure):** Use the standard `logging` module instead of `print()` in all domain (`core/`) and infrastructure (`infrastructure/`) code.
* **CLI / UI Output:** `print()` is allowed only in the top-level entrypoint (e.g., `main.py`) or other explicit UI layers responsible for rendering information to the user.
* **Error Handling:** Always set timeouts for network calls and catch specific exceptions gracefully, logging meaningful messages for operational visibility.
* **Testing (Recommended):** Business logic should be covered by unit tests (e.g., for `CurrencyConversionService` and provider implementations, ideally with HTTP calls mocked out).