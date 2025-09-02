# EchoAway Frontend

Application Vue3 + Quasar pour EchoAway - Projet RNCP

## 🏗️ Architecture du projet

Ce projet fait partie d'une architecture **multi-repositories** avec :
- **Frontend** : Application Vue3/Quasar avec Vite (ce repository)
- **Backend** : API NestJS avec TypeORM et PostgreSQL (repository séparé)
- **Déploiement** : Vercel (frontend) + Railway (backend)

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
│   ├── views/                    # Pages de l'application
│   ├── router/                   # Configuration des routes
│   ├── stores/                   # Gestion d'état Pinia
│   ├── services/                 # Services API
│   ├── config/                   # Configuration
│   ├── App.vue                  # Composant racine
│   ├── main.ts                  # Point d'entrée
│   └── quasar-variables.scss    # Variables Quasar
├── public/                       # Assets statiques
├── Dockerfile
├── docker-compose.yml            # Développement local
├── env.example
└── package.json
```

## Variables d'environnement

1. Copier le fichier d'exemple :
```bash
cp env.example .env
```

2. Modifier le fichier `.env` avec vos valeurs :
```env
VITE_API_URL=http://localhost:3001
```

## Configuration API

Le projet utilise un service API centralisé (`src/services/api.ts`) qui :
- Gère l'URL de l'API via `VITE_API_URL`
- Configure les headers d'authentification
- Gère les erreurs de manière centralisée
- Supporte les environnements de développement et production

## 🚀 Lancement de l'application

**⚠️ IMPORTANT : Ce repository ne contient PAS le docker-compose principal.**

**Pour lancer l'application complète en local, vous devez cloner les DEUX repositories :**

```bash
# 1. Cloner le repository backend (contient le docker-compose principal)
git clone <url-echoaway-backend>
cd echoaway-backend

# 2. Cloner le repository frontend dans le même dossier parent
git clone <url-echoaway-frontend> ../echoaway-frontend

# 3. Lancer l'application complète depuis le backend
docker-compose up -d

# L'application sera accessible sur :
# - Frontend : http://localhost:3000
# - Backend API : http://localhost:3001
```

### Structure des dossiers
```
echoaway-app/
├── echoaway-backend/          # Repository backend (contient docker-compose.yml)
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── src/
└── echoaway-frontend/         # Ce repository
    ├── Dockerfile
    └── src/
```

## 🚀 Déploiement en production

### Plateformes utilisées
- **Frontend** : Vercel (déploiement automatique depuis Git)
- **Backend** : Railway (déploiement automatique depuis Git)
- **Base de données** : Railway PostgreSQL

### Configuration Vercel
1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déploiement automatique à chaque push

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
- Support TypeScript
- Intégration Quasar
- Hot Module Replacement (HMR)
- Variables d'environnement via `VITE_*`
- Build optimisé pour production

## Architecture

### Composants
- **Views** : Pages principales de l'application
- **Stores** : Gestion d'état centralisée avec Pinia
- **Services** : Logique métier et appels API
- **Router** : Navigation et protection des routes

### État de l'application
- **AuthStore** : Gestion de l'authentification
- **Token JWT** : Stockage sécurisé des sessions
- **User** : Informations de l'utilisateur connecté

### Sécurité
- **Guards** : Protection des routes sensibles
- **Validation** : Vérification des données d'entrée
- **CORS** : Configuration pour la communication backend

## Développement

### Ajout de nouvelles fonctionnalités
1. Créer la vue dans `src/views/`
2. Ajouter la route dans `src/router/index.ts`
3. Implémenter la logique dans le store approprié
4. Tester avec l'API backend

### Styles et UI
- **Quasar** : Composants UI prêts à l'emploi
- **SCSS** : Variables et mixins personnalisés
- **Responsive** : Design adaptatif mobile/desktop

## 🔗 Liens utiles

- **Repository Backend** : [echoaway-backend](<url-backend>)
- **Documentation Vue 3** : https://vuejs.org/
- **Documentation Quasar** : https://quasar.dev/
- **Documentation Vite** : https://vitejs.dev/
- **Vercel** : https://vercel.com/
- **Railway** : https://railway.app/

## 📚 Documentation complète

Pour une vue d'ensemble complète du projet, consultez la documentation de chaque composant :
- **Frontend** : Ce README
- **Backend** : README du repository backend
- **Déploiement** : Configuration Vercel et Railway
