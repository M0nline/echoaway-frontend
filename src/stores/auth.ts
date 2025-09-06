import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '../services/api'

// Types
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
    const userRole = computed(() => user.value?.role || 'visitor')
    const isAdmin = computed(() => userRole.value === 'admin')
    const isHost = computed(
      () => userRole.value === 'host' || userRole.value === 'admin'
    )
    const isGuest = computed(() => userRole.value === 'guest')
    const isVisitor = computed(() => userRole.value === 'visitor')
    const fullName = computed(() => {
      if (!user.value) return ''
      return user.value.name
    })

    // Actions
    const login = async (email: string, password: string) => {
      loading.value = true
      try {
        console.log('🔐 Tentative de connexion pour:', email)
        const data = await apiService.login(email, password)
        user.value = data.user
        token.value = data.token

        // Le token sera automatiquement persisté par Pinia

        console.log('✅ Connexion réussie:', {
          utilisateur: data.user.email,
          rôle: data.user.role,
          token: data.token ? 'Présent' : 'Absent',
        })

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
      role?: 'host' | 'guest'
      avatar?: string
    }) => {
      loading.value = true
      try {
        console.log('📝 Tentative d\'inscription pour:', userData.email, 'avec le rôle:', userData.role)
        const data = await apiService.register(userData)
        user.value = data.user
        token.value = data.token

        // Le token sera automatiquement persisté par Pinia

        console.log('✅ Inscription réussie:', {
          utilisateur: data.user.email,
          rôle: data.user.role,
          prénom: data.user.firstname,
          nom: data.user.name,
          token: data.token ? 'Présent' : 'Absent',
        })

        return data
      } finally {
        loading.value = false
      }
    }

    const logout = () => {
      console.log('🚪 Déconnexion de l\'utilisateur:', user.value?.email || 'Inconnu')
      user.value = null
      token.value = null
      // Le token sera automatiquement supprimé par Pinia
      console.log('✅ Déconnexion terminée')
    }

    const checkAuth = async () => {
      // Utiliser le token du store Pinia (qui est persisté automatiquement)
      console.log('🔍 Vérification du token dans le store:', token.value ? 'Présent' : 'Absent')
      console.log('🔍 Contenu localStorage echoaway-auth:', localStorage.getItem('echoaway-auth'))
      
      if (!token.value) {
        console.log('🔍 Aucun token trouvé dans le store')
        return false
      }

      try {
        console.log('🔍 Vérification de l\'authentification avec le token existant')
        console.log('🔑 Token utilisé:', token.value?.substring(0, 20) + '...')
        const data = await apiService.getProfile(token.value)
        user.value = data.user
        console.log('✅ Authentification vérifiée:', {
          utilisateur: data.user.email,
          rôle: data.user.role,
        })
        return true
      } catch (error) {
        console.log('❌ Token invalide, déconnexion automatique')
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
      console.log('🚀 Initialisation de l\'authentification...')
      const isAuthenticated = await checkAuth()
      console.log('🚀 Initialisation terminée. État:', isAuthenticated ? 'Connecté' : 'Non connecté')
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
      isGuest,
      isVisitor,
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
