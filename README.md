# Appointment Details & Invoicing Dashboard

Staff-facing appointment and invoicing dashboard for garages, salons, and repair shops. The loaded desktop layout is preserved from the original design; this build adds loading, error, toast, action feedback, and fully responsive sidebar behavior.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (typically `http://localhost:5173`).

Other scripts:

- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint

## Repository structure

```
appointment-dashboard/
├── README.md
├── package.json
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── components/
    │   ├── AppointmentDetail.jsx
    │   ├── AppointmentInfo.jsx
    │   ├── InvoiceInfo.jsx
    │   ├── StatusBadge.jsx
    │   ├── Button.jsx
    │   ├── LoadingState.jsx
    │   ├── ErrorState.jsx
    │   ├── Toast.jsx
    │   └── PaymentModal.jsx
    ├── hooks/
    │   └── useAppointment.js
    ├── styles/
    │   ├── tailwind.config.js
    │   └── globals.css
    └── api/
        └── mockData.js
```

Vite keeps `index.html` at the project root. App styles live in `src/styles/globals.css` and are imported from `src/index.css`.

## Component overview

| File | Role |
| --- | --- |
| `AppointmentDetail.jsx` | Main container: fetch, layout, sidebar, actions, toasts, payment modal |
| `AppointmentInfo.jsx` | Service, customer, vehicle, work notes, photo gallery |
| `InvoiceInfo.jsx` | Invoice summary, totals, financing banner |
| `StatusBadge.jsx` | Pill badge with icon + text for appointment and invoice statuses |
| `Button.jsx` | Primary / secondary / dark / danger variants with loading + `aria-busy` |
| `LoadingState.jsx` | Skeleton matching the loaded layout |
| `ErrorState.jsx` | Failed-load card with Retry |
| `Toast.jsx` | Top-right stacked toasts, auto-dismiss after 3 seconds |
| `PaymentModal.jsx` | Record-payment form with validation, focus trap, and Esc to close |
| `useAppointment.js` | Parallel fetch of appointment + invoice |
| `api/mockData.js` | Axios mock adapter with delay and typed error mapping |

## Features

- Desktop (`lg`, 1024px+): two-column appointment + invoice layout, full sidebar, horizontal actions
- Tablet (`md`, 768–1023px): stacked sections, icon-only collapsible sidebar, horizontal actions
- Mobile (`<768px`): stacked sections, sidebar hidden, header three-dots menu, full-width 44px actions
- Mock Axios endpoints: fetch appointment/invoice, send invoice, record payment, mark complete
- Immediate UI updates after payment (invoice Paid) and completion (appointment Completed)
- Payment modal with labelled fields, `aria-invalid` / `aria-describedby`, Esc to close, and focus trap
- Loading skeleton, error retry, success/error/info toasts
- Action buttons disable and show a spinner + "Loading..." while the request is in flight

## Demo query params

- `?error=1` — first load fails; Retry fetches successfully
- `?actionError=timeout` — action requests time out
- `?actionError=network` — action requests fail with a connection error
- `?actionError=403` — action requests fail with a permission error
- `?actionError=422` — action requests fail with a validation error

## Accessibility

- Semantic sections and heading hierarchy with `aria-labelledby`
- Icon + text on every status badge (never colour alone)
- Descriptive `aria-label` on icon-only controls
- Visible `:focus-visible` outlines on interactive elements
- Buttons expose `aria-busy` and disable while loading
- Keyboard: tab order, Enter/Space activation, Esc closes the modal and mobile nav
- Colour contrast aimed at WCAG 2.1 AA (body text `#0F172A`, labels `#6B7280`, primary `#2563EB`)
- Toasts use `role="status"` with `aria-live="polite"` (assertive for errors)

## Design tokens

- Primary `#2563EB` · Success `#10B981` · Warning `#F59E0B` · Danger `#EF4444`
- Background `#F9FAFB` · Border `#E5E7EB` · Navy `#0F172A`
- Radius 8px · Button padding 12px 24px · Shadow `0 1px 3px rgba(0,0,0,0.1)`
- Type: 24px bold headings, 16px semibold subheads, 14px body, 12px small
