# EchoAway Frontend

**Vue3 + Quasar user interface for EchoAway**

> **📖 Complete documentation** : See the [Backend README](../echoaway-backend/README.md) for the complete architecture and application startup.

## 🏗️ Architecture

This repository contains only the **frontend** of the EchoAway application:

- **Frontend** : Vue3/Quasar with Vite (this repository)
- **Backend** : NestJS API (separate repository)
- **Deployment** : Vercel (frontend) + Railway (backend)

## 🛠️ Technical Stack

- **Vue 3** : JavaScript framework with Composition API
- **Quasar** : UI framework with ready-to-use components
- **Vite** : Build tool and development server
- **TypeScript** : Static typing
- **Pinia** : State management
- **Vue Router** : Navigation

## 🚀 Quick Start

> **⚠️ IMPORTANT** : This repository does NOT contain the main `docker-compose.yml`.
> 
> To launch the complete application, see the [Backend README](../echoaway-backend/README.md).

### Frontend Only Startup

```bash
# 1. Install dependencies
npm install

# 2. Launch development server
npm run dev

# The application will be accessible on http://localhost:3000
```

### Prerequisites

- **Node.js 18+** (recommended: use NVM)
- **Backend running** on `http://localhost:3001`

## 📦 Available Scripts

```bash
npm run dev          # Vite development server
npm run build        # Production build
npm run preview      # Production build preview
npm run lint         # Linting with ESLint
npm run format       # Formatting with Prettier
npm run format:check # Formatting verification
```

## 📂 Project Structure

```
echoaway-frontend/
├── src/
│   ├── views/                    # Application pages
│   ├── components/               # Reusable components
│   ├── router/                   # Route configuration
│   ├── stores/                   # Pinia state management
│   ├── services/                 # API services
│   ├── config/                   # Configuration
│   ├── styles/                   # Custom styles
│   ├── App.vue                  # Root component
│   └── main.ts                  # Entry point
├── public/                       # Static assets
├── vercel.json                  # Vercel configuration
└── package.json
```

## ⚙️ Environment Variables

### Development

```bash
cp env.example .env
```

Then modify the `.env` file:

```env
VITE_API_URL=http://localhost:3001
```

### Production

The variable is configured in Vercel:

```env
VITE_API_URL=https://echoaway-backend-production.up.railway.app
```

> **Important** : The URL must include the `https://` protocol to work correctly.

## 🔌 API Configuration

The project uses a centralized API service (`src/services/api.ts`) that:

- Manages API URL via `VITE_API_URL`
- Configures authentication headers
- Handles errors centrally
- Supports development and production environments

## 🚀 Deployment

- **Production URL** : `https://echoaway.vercel.app`
- **Platform** : Vercel (automatic deployment from Git)
- **CI/CD** : GitHub Actions - Tests on `main` and `dev`, deployment only on `main`

> **📖 For more details** : See the [Backend README](../echoaway-backend/README.md) for the complete architecture and development workflow.

## 🎨 Frontend Architecture

### Components
- **Views** : Main application pages
- **Components** : Reusable components (see [COMPONENTS.md](./COMPONENTS.md))
- **Stores** : Centralized state management with Pinia
- **Services** : Business logic and API calls
- **Router** : Navigation and route protection

### Application State
- **AuthStore** : Authentication management
- **JWT Token** : Secure session storage
- **User** : Connected user information

### Security
- **Guards** : Sensitive route protection
- **Validation** : Input data verification
- **CORS** : Backend communication configuration
