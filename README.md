
# Digital Parking Reservation System

A web application for reserving parking spaces (frontend). Built with Vite + React (TypeScript) and a lightweight component/ui system.


**Quick Start**

- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`

**What’s in this repo**

- **Frontend:** React + TypeScript via Vite. Entry: `src/main.tsx` and `src/App.tsx`.
- **Components:** `src/components/` contains the app screens and a `ui/` design system.
- **Build output:** `build/` contains the production build artifacts.
- **Firebase config:** `firebase.json` for hosting/deploy configuration.

**Features**

- Browse available parking locations and spaces
- Make, view and manage reservations
- Responsive UI components and accessible controls

**Tech stack**

- Vite
- React + TypeScript
- Tailored component library (under `src/components/ui`)

**Project structure (high level)**

- `src/` — application source
  - `main.tsx`, `App.tsx` — app entry and root
  - `components/` — pages and UI components (see `components/Navigation.tsx`, `components/Dashboard.tsx`)
  - `styles/` — global CSS
- `build/` — production output (generated)
- `firebase.json` — Firebase hosting configuration

**Development**

1. Install: `npm install`
2. Run: `npm run dev` and open the URL shown in the terminal (usually `http://localhost:5173`).

Recommended editor setup: VS Code with TypeScript/ESLint/Prettier for best DX.

**Build & Deploy**

- Create a production build: `npm run build` (outputs to `build/`).
- Serve locally for verification: `npm run preview`.
- If using Firebase Hosting, the included `firebase.json` is already present. Deploy using the Firebase CLI:

```bash
npx firebase-tools login
npx firebase-tools deploy --only hosting
```

Note: ensure you're in the correct Firebase project or set it with `npx firebase-tools use <project-id>`.

