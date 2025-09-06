// Service API centralisé pour EchoAway
// Utilise la configuration d'environnement

import { config, getApiUrl, validateConfig } from '../config/environment'
import { type Accommodation, type CreateAccommodationData } from '../types/accommodation'

// Interface pour les erreurs API structurées
interface ApiError {
  message: string
  statusCode?: number
  error?: string
  details?: any
}

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = config.apiUrl
    console.log(`🔗 API Service initialized with base URL: ${this.baseUrl}`)

    // Valider la configuration au démarrage
    if (!validateConfig()) {
      console.warn('⚠️ API configuration validation failed, using fallback')
    }
  }

  // Méthode générique pour les appels API avec gestion d'erreurs améliorée
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = getApiUrl(endpoint)

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        let errorData: ApiError
        try {
          errorData = await response.json()
        } catch {
          errorData = {
            message: `Erreur HTTP ${response.status}: ${response.statusText}`,
            statusCode: response.status,
          }
        }

        // Personnaliser les messages d'erreur selon le code de statut
        let userMessage = errorData.message
        switch (response.status) {
          case 400:
            userMessage = errorData.message || 'Données invalides. Veuillez vérifier votre saisie.'
            break
          case 401:
            userMessage = 'Vous devez être connecté pour effectuer cette action.'
            break
          case 403:
            userMessage = 'Vous n\'avez pas les droits pour effectuer cette action.'
            break
          case 404:
            userMessage = 'Ressource non trouvée.'
            break
          case 409:
            userMessage = errorData.message || 'Cette ressource existe déjà.'
            break
          case 422:
            userMessage = errorData.message || 'Données de validation incorrectes.'
            break
          case 500:
            userMessage = 'Erreur serveur. Veuillez réessayer plus tard.'
            break
          default:
            userMessage = errorData.message || `Erreur inattendue (${response.status})`
        }

        const error = new Error(userMessage) as Error & { statusCode?: number; details?: any }
        error.statusCode = response.status
        error.details = errorData.details
        throw error
      }

      // Gérer les réponses vides (204 No Content)
      if (response.status === 204) {
        return {} as T
      }

      return await response.json()
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error)
      
      // Si c'est une erreur réseau
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError = new Error('Impossible de contacter le serveur. Vérifiez votre connexion.')
        throw networkError
      }
      
      throw error
    }
  }

  // Méthodes pour l'authentification
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: {
    email: string
    password: string
    login: string
    name: string
    role?: 'user' | 'admin' | 'host'
    avatar?: string
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async getProfile(token: string) {
    return this.request('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  // Méthodes pour les hébergements avec types stricts
  async getAccommodations(): Promise<Accommodation[]> {
    // Les hébergements sont accessibles à tous (pas besoin d'auth)
    return this.request<Accommodation[]>('/accommodations')
  }

  async getAccommodation(id: string): Promise<Accommodation> {
    return this.request<Accommodation>(`/accommodations/${id}`)
  }

  async createAccommodation(data: CreateAccommodationData): Promise<Accommodation> {
    const token = this.getAuthToken()
    if (!token) {
      throw new Error('Vous devez être connecté pour créer un hébergement')
    }
    
    return this.request<Accommodation>('/accommodations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  }

  async updateAccommodation(id: string, data: Partial<CreateAccommodationData>): Promise<Accommodation> {
    const token = this.getAuthToken()
    if (!token) {
      throw new Error('Vous devez être connecté pour modifier un hébergement')
    }
    
    return this.request<Accommodation>(`/accommodations/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  }

  async deleteAccommodation(id: string): Promise<void> {
    const token = this.getAuthToken()
    if (!token) {
      throw new Error('Vous devez être connecté pour supprimer un hébergement')
    }
    
    return this.request<void>(`/accommodations/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  // Méthode utilitaire pour récupérer le token d'authentification
  private getAuthToken(): string | null {
    // Récupérer le token depuis le localStorage ou le store d'auth
    return localStorage.getItem('auth_token') || null
  }

  // Méthode pour vérifier la connectivité
  async healthCheck(): Promise<boolean> {
    try {
      await this.request('/status')
      return true
    } catch {
      return false
    }
  }

  // Getter pour l'URL de base (utile pour le debug)
  getBaseUrl(): string {
    return this.baseUrl
  }

  // Méthode pour tester la connectivité à l'API
  async testConnection(): Promise<{
    success: boolean
    url: string
    responseTime: number
  }> {
    const startTime = Date.now()
    try {
      await this.healthCheck()
      const responseTime = Date.now() - startTime
      return {
        success: true,
        url: this.baseUrl,
        responseTime,
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      return {
        success: false,
        url: this.baseUrl,
        responseTime,
      }
    }
  }
}

// Instance singleton
export const apiService = new ApiService()

// Export par défaut pour la compatibilité
export default apiService
