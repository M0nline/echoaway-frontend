// Types partagés pour les réponses API

export interface User {
  id: number
  email: string
  firstname: string
  name: string
  role: 'admin' | 'host' | 'guest' | 'visitor'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstname: string
  name: string
  role?: 'host' | 'guest'
  avatar?: string
}
