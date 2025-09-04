// Service API centralisé pour EchoAway
// Utilise la configuration d'environnement

import { config, getApiUrl, validateConfig } from '../config/environment'

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

  // Méthode générique pour les appels API
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
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error)
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

  // Méthodes pour les hébergements
  async getAccommodations(token?: string) {
    const headers: Record<string, string> = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return this.request('/accommodations', { headers })
  }

  async createAccommodation(data: any, token: string) {
    return this.request('/accommodations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  }

  async updateAccommodation(id: string, data: any, token: string) {
    return this.request(`/accommodations/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  }

  async deleteAccommodation(id: string, token: string) {
    return this.request(`/accommodations/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
