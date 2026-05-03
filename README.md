# 🛡️ Auth — Premium Authentication Suite

A high-fidelity, minimalist authentication application inspired by the **Vercel/Geist** design system. Built with **React 19**, **Vite**, and **Tailwind CSS v4**, integrated with the **FreeAPI** backend.

![Version](https://img.shields.io/badge/version-1.0.0-white?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square)

## ✨ Key Features

- **🔐 Robust Authentication**: Full Login and Registration flow with instant post-registration onboarding.
- **📧 Email Verification**: In-app verification system with token-based confirmation and "Resend Code" functionality.
- **🖼️ Profile Management**: 
  - Dynamic user dashboard with tabular data presentation.
  - Interactive Avatar management with `multipart/form-data` support and live upload previews.
- **⚡ Instant-Login Experience**: Automatic authenticated session creation immediately after a successful signup.
- **🛡️ Secure Session Handling**: Axios configured with `withCredentials` and proxy rewrites to bypass CORS in both development and production.
- **🎨 Premium Design System**: 
  - Minimalist Dark Mode following the Geist/Vercel aesthetic.
  - Custom UI components (`geist-card`, `geist-button`, `geist-input`).
  - Frosted glass effects and smooth micro-animations.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (modern configuration)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Networking**: [Axios](https://axios-http.com/)
- **Feedback**: [React Hot Toast](https://react-hot-toast.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn / bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/authenticationapp.git
   cd authenticationapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 🌐 API Integration

The app connects to the [FreeAPI](https://api.freeapi.app/) backend. For local development, a proxy is configured in `vite.config.js` to route `/api` to `https://api.freeapi.app/api/v1`.

### Endpoints Used:
- `POST /users/register` - User onboarding
- `POST /users/login` - Session creation
- `GET /users/current-user` - Session persistence
- `GET /users/verify-email/:token` - Account verification
- `POST /users/resend-email-verification` - Token renewal
- `PATCH /users/avatar` - Profile picture updates

## 📦 Deployment

### Vercel (Recommended)
The project includes a `vercel.json` file that handles:
- **API Rewrites**: Maps `/api/*` to the FreeAPI server to prevent CORS issues.
- **SPA Routing**: Catch-all rules to prevent 404 errors on page refresh.


