## Designs and Layouts for Each Webpage

This document describes the visual layout and UX design for the main FranklyFX web pages. It assumes a modern, responsive design with a light theme by default, implemented using Tailwind CSS utility classes on top of reusable React components.

### 1. Global Design System

- **Typography**:
  - Clean sans-serif font (e.g., Inter, Roboto).
  - Distinct sizes for headings, body, and captions.
- **Color Palette**:
  - Primary: A calm blue for actions and highlights.
  - Accent: A contrasting color for important badges or warnings.
  - Background: Light gray/white with subtle elevation shadows on cards.
  - Success: Green tones for favorable results.
- **Components**:
  - Buttons with clear primary/secondary states.
  - Input fields with labels, helper text, and error states.
  - Cards with rounded corners and subtle shadows.

### 2. Home / Quote Builder Page Layout

- **Layout**: Centered card within `MainLayout`.
- **Structure**:
  - Header bar (top):
    - Left: Logo / app name.
    - Right: Links to About and History.
  - Main content:
    - A full-height flex container centering a `QuoteCard`.
  - `QuoteCard` content:
    - Left section: `QuoteForm` (form inputs stacked vertically).
    - Right section (or below on mobile): `QuoteResult` (summary and details).
- **Responsive behavior**:
  - On desktop: Form and result side by side.
  - On mobile: Form on top, result panel below.

### 3. Quote Results Page Layout

- **Layout**: Similar to Home but focused on a single quote.
- **Structure**:
  - Header with navigation.
  - Centered `ResultCard`:
    - Title and brief summary at the top.
    - Sections with clear dividers:
      - Amount and currencies.
      - Interbank vs consumer rate comparison.
      - Fees and final payout.
    - Action row at the bottom:
      - Button to create a new quote.

### 4. Quote History Page Layout

- **Layout**: `DashboardLayout` with sidebar.
- **Structure**:
  - Sidebar:
    - Navigation items: Home, History, About.
  - Main content:
    - Page title and filters at the top.
    - Table or list of past quotes:
      - Columns: Date/time, base, target, amount, final payout.
      - Each row clickable, navigating to the detailed quote view.
- **Responsive behavior**:
  - Sidebar collapses into a top navigation drawer on small screens.

### 5. About Page Layout

- **Layout**: `MainLayout` with single-column content.
- **Structure**:
  - Title and tagline at the top.
  - Content sections:
    - Project overview.
    - Technical architecture summary.
    - Data source and limitations.
    - Legal disclaimers.

