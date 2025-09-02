// Configuration d'environnement pour EchoAway
// Gère les URLs API selon l'environnement
// TEST: Synchronisation des volumes Docker

interface EnvironmentConfig {
  apiUrl: string
  isDevelopment: boolean
  isProduction: boolean
}

// Configuration par défaut (développement local)
const defaultConfig: EnvironmentConfig = {
  apiUrl: 'http://localhost:3001',
  isDevelopment: true,
  isProduction: false,
}

// Configuration de production (Railway)
const productionConfig: EnvironmentConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://your-railway-app.railway.app',
  isDevelopment: false,
  isProduction: true,
}

// Détecter l'environnement
const isProduction = import.meta.env.PROD || import.meta.env.VITE_NODE_ENV === 'production'

// Configuration finale
export const config: EnvironmentConfig = isProduction ? productionConfig : defaultConfig

// Logs de configuration (seulement en développement)
if (config.isDevelopment) {
  console.log('🔧 Environment Configuration:', {
    apiUrl: config.apiUrl,
    environment: config.isProduction ? 'production' : 'development',
    viteMode: import.meta.env.MODE,
    nodeEnv: import.meta.env.VITE_NODE_ENV
  })
}

// Export des valeurs individuelles pour faciliter l'utilisation
export const API_BASE_URL = config.apiUrl
export const IS_DEVELOPMENT = config.isDevelopment
export const IS_PRODUCTION = config.isProduction

// Validation de la configuration
export const validateConfig = (): boolean => {
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
  return `${config.apiUrl}/api${endpoint}`
}

export default config
