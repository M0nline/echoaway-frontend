// Configuration d'environnement pour EchoAway
// Gère les URLs API selon l'environnement
// TEST: Synchronisation des volumes Docker

interface EnvironmentConfig {
  apiUrl: string
  isDevelopment: boolean
  isProduction: boolean
}

// Configuration par défaut (développement local avec proxy Vite)
const defaultConfig: EnvironmentConfig = {
  apiUrl: '', // Utilise le proxy Vite en développement
  isDevelopment: true,
  isProduction: false,
}

// Configuration de production (Railway)
const productionConfig: EnvironmentConfig = {
  apiUrl:
    import.meta.env.VITE_API_URL || 'https://your-railway-app.railway.app',
  isDevelopment: false,
  isProduction: true,
}

// Détecter l'environnement
const isProduction =
  import.meta.env.PROD || import.meta.env.VITE_NODE_ENV === 'production'

// Configuration finale
export const config: EnvironmentConfig = isProduction
  ? productionConfig
  : defaultConfig

// Logs de configuration (seulement en développement)
if (config.isDevelopment) {
  console.log('🔧 Environment Configuration:', {
    apiUrl: config.apiUrl || 'Proxy Vite (développement)',
    environment: config.isProduction ? 'production' : 'development',
    viteMode: import.meta.env.MODE,
    nodeEnv: import.meta.env.VITE_NODE_ENV,
  })
}

// Export des valeurs individuelles pour faciliter l'utilisation
export const API_BASE_URL = config.apiUrl
export const IS_DEVELOPMENT = config.isDevelopment
export const IS_PRODUCTION = config.isProduction

// Validation de la configuration
export const validateConfig = (): boolean => {
  // En développement, accepter une URL vide (proxy Vite)
  if (config.isDevelopment && !config.apiUrl) {
    console.log('✅ Development mode: Using Vite proxy for API calls')
    return true
  }

  if (!config.apiUrl) {
    console.error('❌ VITE_API_URL is not configured')
    return false
  }

  if (!config.apiUrl.startsWith('http')) {
    console.error('❌ Invalid API URL format:', config.apiUrl)
    return false
  }

  console.log('✅ Configuration validated successfully')
  return true
}

// Méthode pour obtenir l'URL complète d'un endpoint
export const getApiUrl = (endpoint: string): string => {
  // Si pas d'URL de base (développement avec proxy Vite), utiliser le chemin avec /api
  if (!config.apiUrl) {
    return `/api${endpoint}`
  }
  return `${config.apiUrl}/api${endpoint}`
}

export default config
