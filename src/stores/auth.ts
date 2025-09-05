import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '../services/api'

// Types
export interface User {
  id: string
  email: string
  firstname: string
  name: string
  role: 'user' | 'admin' | 'host'
  avatar?: string
  createdAt: string
  lastLoginAt?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    // État réactif
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const loading = ref(false)

    // Getters
    const isAuthenticated = computed(() => !!token.value && !!user.value)
    const userRole = computed(() => user.value?.role || 'user')
    const isAdmin = computed(() => userRole.value === 'admin')
    const isHost = computed(
      () => userRole.value === 'host' || userRole.value === 'admin'
    )
    const fullName = computed(() => {
      if (!user.value) return ''
      return user.value.name
    })

    // Actions
    const login = async (email: string, password: string) => {
      loading.value = true
      try {
        const data = await apiService.login(email, password)
        user.value = data.user
        token.value = data.token

        // Stocker le token dans localStorage
        localStorage.setItem('auth_token', data.token)

        return data
      } finally {
        loading.value = false
      }
    }

    const register = async (userData: {
      email: string
      password: string
      firstname: string
      name: string
      role?: 'user' | 'admin' | 'host'
      avatar?: string
    }) => {
      loading.value = true
      try {
        const data = await apiService.register(userData)
        user.value = data.user
        token.value = data.token

        // Stocker le token dans localStorage
        localStorage.setItem('auth_token', data.token)

        return data
      } finally {
        loading.value = false
      }
    }

    const logout = () => {
      user.value = null
      token.value = null
      localStorage.removeItem('auth_token')
    }

    const checkAuth = async () => {
      const storedToken = localStorage.getItem('auth_token')
      if (!storedToken) return false

      try {
        const data = await apiService.getProfile(storedToken)
        user.value = data.user
        token.value = storedToken
        return true
      } catch (error) {
        logout()
        return false
      }
    }

    const refreshToken = async () => {
      if (!token.value) return false

      try {
        const data = await apiService.getProfile(token.value)
        user.value = data.user
        return true
      } catch (error) {
        logout()
        return false
      }
    }

    // Initialiser l'authentification au démarrage
    const initAuth = async () => {
      await checkAuth()
    }

    return {
      // État
      user,
      token,
      loading,

      // Getters
      isAuthenticated,
      userRole,
      isAdmin,
      isHost,
      fullName,

      // Actions
      login,
      register,
      logout,
      checkAuth,
      refreshToken,
      initAuth,
    }
  },
  {
    persist: {
      key: 'echoaway-auth',
      storage: localStorage,
      paths: ['token', 'user'],
    },
  }
)
