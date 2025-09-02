# EchoAway Frontend

Vue3 + Quasar application for EchoAway

## 🏗️ Project Architecture

This project is part of a **multi-repositories** architecture with:
- **Frontend** : Vue3/Quasar application with Vite (this repository)
- **Backend** : NestJS API with TypeORM and PostgreSQL (separate repository)
- **Deployment** : Vercel (frontend) + Railway (backend)

## Technical Stack Frontend

- **Vue 3** with Composition API
- **Quasar Framework** for user interface
- **Vite** as bundler and development server
- **TypeScript** for typing
- **Pinia** for state management
- **Vue Router** for navigation

## 🚀 Application Launch

**⚠️ IMPORTANT: This repository does NOT contain the main docker-compose file.**

*To launch the complete application locally, you need to clone BOTH repositories.*

### Prerequisites
- Docker and Docker Compose installed
- Ports 3001 (backend) and 5432 (database) available
- Node.js 18+ (recommended: use NVM for version management)
- Git for cloning repositories
- **SSH key configured** for GitHub access

### Node.js Version Management (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Use the project's Node.js version (automatically detected)
nvm install
nvm use
```

### SSH Configuration
**Ask a team member with repository access to add your SSH key to the GitHub repositories.**

### Quick Start
```bash
# 1. Clone the backend repository (contains the main docker-compose)
git clone git@github.com:username/echoaway-backend.git
cd echoaway-backend

# 2. Clone the frontend repository in the same parent folder
git clone git@github.com:username/echoaway-frontend.git ../echoaway-frontend

# 3. Launch backend and database from the backend folder
docker-compose up -d

# 4. Launch frontend in development mode
cd ../echoaway-frontend
npm install
npm run dev

# The application will be accessible on:
# - Frontend: http://localhost:3000 (npm run dev)
# - Backend API: http://localhost:3001
# - Database: localhost:5432
```

### Folder Structure
```
echoaway-app/
├── echoaway-backend/          # Backend repository (contains docker-compose.yml)
│   ├── docker-compose.yml     # Backend + DB only
│   ├── Dockerfile
│   └── src/
└── echoaway-frontend/         # This repository
    ├── package.json
    └── src/
```

## Installation

```bash
npm install
```

## Development

```bash
# Development server
npm run dev

# The application will be accessible on http://localhost:3000
```

## Production Build

```bash
npm run build
```

## Production Preview

```bash
npm run preview
```

## Project Structure

```
echoaway-frontend/
├── src/
│   ├── views/                    # Application pages
│   ├── router/                   # Route configuration
│   ├── stores/                   # Pinia state management
│   ├── services/                 # API services
│   ├── config/                   # Configuration
│   ├── App.vue                  # Root component
│   ├── main.ts                  # Entry point
│   └── quasar-variables.scss    # Quasar variables
├── public/                       # Static assets
├── Dockerfile
├── env.example
└── package.json
```

## Environment Variables

1. Copy the example file:
```bash
cp env.example .env
```

2. Modify the `.env` file with your values:
```env
VITE_API_URL=http://localhost:3001
```

## API Configuration

The project uses a centralized API service (`src/services/api.ts`) that:
- Manages API URL via `VITE_API_URL`
- Configures authentication headers
- Handles errors centrally
- Supports development and production environments

## 🚀 Production Deployment

### Platforms Used
- **Frontend** : Vercel (automatic deployment from Git)
- **Backend** : Railway (automatic deployment from Git)
- **Database** : Railway PostgreSQL

## Available Scripts

- `npm run dev` - Vite development server
- `npm run build` - Production build
- `npm run preview` - Production build preview
- `npm run lint` - Code linting
- `npm run format` - Code formatting with Prettier

## Vite Configuration

The project uses Vite with:
- TypeScript support
- Quasar integration
- Hot Module Replacement (HMR)
- Environment variables via `VITE_*`
- Production optimized build

## Architecture

### Components
- **Views** : Main application pages
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

## Development

### Adding New Features
1. Create the view in `src/views/`
2. Add the route in `src/router/index.ts`
3. Implement logic in the appropriate store
4. Test with backend API

### Styles and UI
- **Quasar** : Ready-to-use UI components
- **SCSS** : Custom variables and mixins
- **Responsive** : Mobile/desktop adaptive design
