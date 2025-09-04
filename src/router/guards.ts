import { useAuthStore } from '../stores/auth'

export async function requireAuth(
  to: any,
  _from: any
) {
  const authStore = useAuthStore()
  
  // Vérifier si l'utilisateur est authentifié
  if (!authStore.isAuthenticated) {
    // Rediriger vers la page de connexion avec la page demandée en paramètre
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }

  // Vérifier si le token est encore valide
  try {
    await authStore.checkAuth()
    return true
  } catch (error) {
    // Token invalide, rediriger vers la connexion
    authStore.logout()
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
}

export async function requireGuest(
  to: any,
  _from: any
) {
  const authStore = useAuthStore()
  
  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (authStore.isAuthenticated) {
    return '/'
  }

  return true
}

export async function requireRole(
  roles: string[],
  to: any,
  _from: any
) {
  const authStore = useAuthStore()
  
  // Vérifier l'authentification d'abord
  if (!authStore.isAuthenticated) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }

  // Vérifier le rôle
  if (!roles.includes(authStore.userRole)) {
    // Rôle insuffisant, rediriger vers la page d'accueil
    return '/'
  }

  return true
}



