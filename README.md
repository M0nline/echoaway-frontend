# EchoAway Frontend

Application Vue3 + Quasar pour EchoAway - Projet RNCP

## Stack Technique

- **Vue 3** avec Composition API
- **Quasar Framework** pour l'interface utilisateur
- **Vite** comme bundler et serveur de développement
- **TypeScript** pour le typage
- **Pinia** pour la gestion d'état
- **Vue Router** pour la navigation

## Installation

```bash
npm install
```

## Développement

```bash
# Serveur de développement
npm run dev

# L'application sera accessible sur http://localhost:3000
```

## Build Production

```bash
npm run build
```

## Preview Production

```bash
npm run preview
```

## Structure du projet

```
echoaway-frontend/
├── src/
│   ├── views/              # Pages de l'application
│   │   ├── HomeView.vue
│   │   └── AccommodationsView.vue
│   ├── router/             # Configuration des routes
│   │   └── index.ts
│   ├── App.vue            # Composant racine
│   ├── main.ts            # Point d'entrée
│   └── quasar-variables.scss # Variables Quasar
├── public/                # Assets statiques
├── Dockerfile
└── package.json
```

## Routes

- `/` - Page d'accueil
- `/accommodations` - Gestion des hébergements

## Variables d'environnement

```env
VITE_API_URL=http://localhost:3001
```

## Docker

```bash
# Build de l'image
docker build -t echoaway-frontend .

# Exécution
docker run -p 3000:3000 echoaway-frontend
```

## Scripts disponibles

- `npm run dev` - Serveur de développement Vite
- `npm run build` - Build de production
- `npm run preview` - Preview du build de production
- `npm run lint` - Linting du code
- `npm run format` - Formatage du code avec Prettier

## Configuration Vite

Le projet utilise Vite avec :
- Proxy API vers le backend (`/api` → `http://localhost:3001`)
- Support TypeScript
- Intégration Quasar
- Hot Module Replacement (HMR)
