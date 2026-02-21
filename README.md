
# Digital Parking Reservation System

A web application for reserving parking spaces (frontend). Built with Vite + React (TypeScript) and a lightweight component/ui system.

App Link: https://parksmart-aef30.web.app/

<img width="1431" height="852" alt="image" src="https://github.com/user-attachments/assets/5f95a6ad-f09b-47ca-847f-014826e7e6c7" />
<img width="1432" height="797" alt="image" src="https://github.com/user-attachments/assets/81d63292-90af-4d1f-9b6c-3d5037274579" />
<img width="1378" height="851" alt="image" src="https://github.com/user-attachments/assets/6fff47bc-80f1-4a45-8467-79fa9baf6adb" />
<img width="1423" height="770" alt="image" src="https://github.com/user-attachments/assets/25f5c129-6674-4aa5-96c3-231ca9c37fbd" />



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

**Development**

1. Install: `npm install`
2. Run: `npm run dev` and open the URL shown in the terminal (usually `http://localhost:5173`).


**Build & Deploy**

- Create a production build: `npm run build` (outputs to `build/`).
- Serve locally for verification: `npm run preview`.



