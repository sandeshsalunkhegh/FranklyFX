## Webpages and Structure

This document outlines the main webpages of the FranklyFX web client and the structure of each page.

### 1. Home / Quote Builder Page

- **Route**: `/`
- **Purpose**: Primary entrypoint where users build and request an FX quote.
- **Layout**: `MainLayout` with centered card.
- **Sections**:
  - **Hero/Header**:
    - App name and short description.
    - Optional link to documentation.
  - **Quote Builder Card**:
    - `QuoteForm` component:
      - Base currency selector.
      - Target currency selector.
      - Amount input.
      - Flat fee input.
      - Optional margin override.
      - Submit button.
    - `QuoteResult` component:
      - Displays quote summary when available.
      - Includes interbank rate, consumer rate, fees, final payout.
  - **Footer**:
    - Links to About and future documentation.

### 2. Quote Results (Dedicated) Page (Optional)

- **Route**: `/quote/:id` or `/quote/result`
- **Purpose**: Show a single quote in detail, potentially navigated from Home.
- **Layout**: `MainLayout`.
- **Sections**:
  - **Summary Header**:
    - "Official Transaction Quote" title.
    - Key figures (amount, currencies).
  - **Details Panel**:
    - Interbank vs consumer rate comparison.
    - Fee breakdown.
    - Final payout.
  - **Actions**:
    - Button to "Create another quote" (navigate back to `/`).

### 3. Quote History Page (Future)

- **Route**: `/history`
- **Purpose**: List previously generated quotes if/when backend persistence is added.
- **Layout**: `DashboardLayout` (sidebar + content).
- **Sections**:
  - **Filter Bar**:
    - Filter by base/target currency, date range.
  - **Quote List**:
    - `QuoteHistoryList` with `QuoteHistoryItem` rows.
    - Each row shows key details and links to detailed view.

### 4. About / Documentation Page

- **Route**: `/about`
- **Purpose**: Explain what FranklyFX is, data sources, and disclaimers.
- **Layout**: `MainLayout`.
- **Sections**:
  - **Overview**:
    - Short description of the project and architecture.
  - **Data Source**:
    - Frankfurter API information and limitations.
  - **Legal / Disclaimer**:
    - Non-binding indicative quotes, not financial advice.

