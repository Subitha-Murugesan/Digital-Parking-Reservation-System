# Firebase Deployment Guide - Digital Parking Reservation System

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Project Configuration](#project-configuration)
4. [Building the Project](#building-the-project)
5. [Deploying to Firebase](#deploying-to-firebase)
6. [Post-Deployment](#post-deployment)
7. [Updating Deployments](#updating-deployments)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Firebase CLI** - Install globally:
  ```bash
  npm install -g firebase-tools
  ```

### Required Accounts
- **Google Account** - Needed for Firebase Console
- **Firebase Project** - Create one at [Firebase Console](https://console.firebase.google.com)

### Verify Installation
Check that all tools are installed correctly:
```bash
node --version
npm --version
firebase --version
```

---

## Initial Setup

### 1. Login to Firebase
Authenticate with your Google account:
```bash
firebase login
```

This opens your browser for authentication. Approve access to Firebase CLI.

### 2. Verify Login
Check which account is logged in:
```bash
firebase login:list
```

---

## Project Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"** or **"Add project"**
3. Enter project name (e.g., "Parksmart")
4. Complete the setup wizard
5. Note your **Project ID** (e.g., `parksmart-aef30`)

### 2. Initialize Firebase in Project Directory
Navigate to your project root:
```bash
cd "/Users/subitham/Documents/ZHAW New project/Digital Parking Reservation System"
```

### 3. Create Firebase Configuration Files

#### `.firebaserc` file
This file links your local project to your Firebase project. Create or update:
```json
{
  "projects": {
    "default": "parksmart-aef30"
  }
}
```

Replace `parksmart-aef30` with your actual Firebase Project ID.

#### `firebase.json` file
This file configures Firebase Hosting. Create or update:
```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Key settings explained:**
- `"public": "build"` - Folder containing built files (Vite outputs to `build/`)
- `"ignore"` - Files/folders to exclude from deployment
- `"rewrites"` - Routes all requests to `index.html` (required for React routing)

---

## Building the Project

### 1. Install Dependencies
```bash
npm install
```

This installs all required packages from `package.json`.

### 2. Build for Production
```bash
npm run build
```

**Output:**
- Creates a `build/` directory
- Minifies and optimizes code
- Generates CSS and JavaScript bundles

**Expected output:**
```
vite v6.3.5 building for production...
✓ 1603 modules transformed.
build/index.html                   0.45 kB │ gzip:  0.29 kB
build/assets/index-BNC42rBH.css   24.25 kB │ gzip:  5.24 kB
build/assets/index-DibWsD25.js   170.17 kB │ gzip: 52.15 kB
✓ built in 947ms
```

### 3. Test Build Locally (Optional)
```bash
npm run dev
```

This starts a local development server to test changes before deploying.

---

## Deploying to Firebase

### Deploy Command
```bash
firebase deploy
```

### Full Deployment Steps
```bash
# 1. Navigate to project directory
cd "/Users/subitham/Documents/ZHAW New project/Digital Parking Reservation System"

# 2. Install dependencies (if not done already)
npm install

# 3. Build for production
npm run build

# 4. Deploy to Firebase
firebase deploy
```

### Expected Output
```
=== Deploying to 'parksmart-aef30'...

i  deploying hosting
i  hosting[parksmart-aef30]: beginning deploy...
i  hosting[parksmart-aef30]: found 3 files in build
✔  hosting[parksmart-aef30]: file upload complete
i  hosting[parksmart-aef30]: finalizing version...
✔  hosting[parksmart-aef30]: version finalized
i  hosting[parksmart-aef30]: releasing new version...
✔  hosting[parksmart-aef30]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/parksmart-aef30/overview
Hosting URL: https://parksmart-aef30.web.app
```

---

## Post-Deployment

### Access Your App
After successful deployment, your app is available at:
- **Primary URL:** `https://parksmart-aef30.web.app`
- **Alternative URL:** `https://parksmart-aef30.firebaseapp.com`

Replace `parksmart-aef30` with your actual project ID.

### View Deployment History
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click **Hosting** in the left menu
4. View all deployment versions and release history

### Rollback to Previous Version
If needed, you can rollback from the Firebase Console:
1. Go to Hosting → Release History
2. Click the three dots next to a previous version
3. Select "Rollback"

---

## Updating Deployments

Whenever you make changes to your code and want to deploy:

### Quick Deployment
```bash
# From project root directory
npm run build && firebase deploy
```

### Step-by-Step Update
```bash
# 1. Navigate to project
cd "/Users/subitham/Documents/ZHAW New project/Digital Parking Reservation System"

# 2. Make your code changes
# (Edit files in src/ directory)

# 3. Build the project
npm run build

# 4. Deploy
firebase deploy
```

### With Force Flag
To deploy even if there are no detected changes:
```bash
firebase deploy --force
```

---

## Troubleshooting

### Error: "Invalid project id"
**Problem:** Project ID contains uppercase letters
**Solution:** Firebase requires lowercase project IDs. Update `.firebaserc`:
```json
{
  "projects": {
    "default": "parksmart-aef30"
  }
}
```

### Error: "Failed to get Firebase project"
**Problem:** Project doesn't exist or you don't have access
**Solutions:**
1. Verify project exists in [Firebase Console](https://console.firebase.google.com)
2. Check you're logged into the correct Google account: `firebase login:list`
3. Login again if needed: `firebase logout` then `firebase login`

### Error: "vite: command not found"
**Problem:** Vite is not installed
**Solution:** Install dependencies first:
```bash
npm install
```

### Error: "command not found: firebase"
**Problem:** Firebase CLI is not installed globally
**Solution:** Install Firebase Tools:
```bash
npm install -g firebase-tools
```

### Error: "PERMISSION_DENIED"
**Problem:** Your Google account doesn't have permission
**Solution:**
1. Go to Firebase Console
2. Click on the project settings gear icon
3. Go to "Members" tab
4. Ensure your account has "Editor" role or higher

### Deployment Hangs or Times Out
**Problem:** Large files or slow connection
**Solutions:**
1. Wait longer (deployment can take several minutes)
2. Check internet connection
3. Try deployment again with `firebase deploy`
4. Check status in Firebase Console

### Build Fails
**Problem:** Errors during `npm run build`
**Solutions:**
1. Install latest dependencies: `npm install`
2. Clear build cache: `rm -rf build node_modules && npm install`
3. Check for TypeScript errors: `npm run build` (will show error details)
4. Review recent code changes

### Changes Not Reflected After Deployment
**Problem:** Old version still showing
**Solutions:**
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache and cookies
3. Wait a few minutes for CDN cache to update
4. Check deployment status in Firebase Console

### Hot Reload Not Working
**Problem:** Development changes not showing
**Solutions:**
1. Ensure you're running `npm run dev` (not the production build)
2. Save your file changes
3. Check console for errors (F12)

---

## Project Structure Reference

```
Digital Parking Reservation System/
├── src/
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   ├── components/          # React components
│   ├── styles/              # CSS files
│   └── utils/               # Utility functions
├── build/                   # Production build (generated)
├── node_modules/            # Dependencies (generated)
├── package.json             # Project dependencies
├── vite.config.ts           # Vite configuration
├── firebase.json            # Firebase configuration
├── .firebaserc              # Firebase project ID
└── README.md                # Project documentation
```

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Login to Firebase | `firebase login` |
| Check login status | `firebase login:list` |
| Logout | `firebase logout` |
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Deploy to Firebase | `firebase deploy` |
| Force deploy | `firebase deploy --force` |
| View Firebase projects | `firebase projects:list` |
| Open Firebase Console | `firebase open` |

---

## Environment Variables (If Needed)

If your app uses environment variables:

1. Create `.env` file in project root:
```
VITE_API_URL=https://your-api.com
VITE_PROJECT_ID=parksmart-aef30
```

2. Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

3. Build will include these in the bundle for production.

---

## Security Considerations

### Best Practices
1. **Never commit `.env` files** containing secrets to Git
2. **Use Firebase Authentication** for user login
3. **Set Firebase Security Rules** for database access
4. **Enable HTTPS** (automatic with Firebase Hosting)
5. **Review release history** regularly

### Protecting Sensitive Data
- Use environment variables for API keys
- Never hardcode credentials in code
- Use Firebase Admin SDK for backend operations
- Implement proper CORS headers if needed

---

## Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firebase Console](https://console.firebase.google.com)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

---

## Support

For issues or questions:
1. Check Firebase Console for error logs
2. Review `firebase-debug.log` file
3. Check [Firebase Status](https://status.firebase.google.com/)
4. Contact Firebase Support from Console

---

**Last Updated:** January 18, 2026
**Project:** Digital Parking Reservation System
**Firebase Project ID:** parksmart-aef30
