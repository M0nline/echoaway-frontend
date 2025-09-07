import { useAuthStore } from '../stores/auth'

export async function requireAuth(to: any, _from: any) {
  const authStore = useAuthStore()

  // S'assurer que l'auth est initialisée
  await authStore.initAuth()

  // Vérifier si l'utilisateur est authentifié
  if (!authStore.isAuthenticated) {
    console.log(
      '🔒 Accès refusé - utilisateur non authentifié, redirection vers login'
    )
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }

  // Vérifier si le token est encore valide
  try {
    await authStore.checkAuth()
    console.log('✅ Accès autorisé pour:', authStore.user?.email)
    return true
  } catch (error) {
    // Token invalide, rediriger vers la connexion
    console.log('❌ Token invalide, déconnexion et redirection')
    authStore.logout()
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
}

export async function requireGuest(_to: any, _from: any) {
  const authStore = useAuthStore()

  // S'assurer que l'auth est initialisée
  await authStore.initAuth()

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (authStore.isAuthenticated) {
    console.log(
      '🔒 Accès refusé - utilisateur déjà connecté, redirection vers accueil'
    )
    return '/'
  }

  console.log('✅ Accès autorisé - utilisateur non connecté')
  return true
}

export async function requireRole(roles: string[], to: any, _from: any) {
  const authStore = useAuthStore()

  // S'assurer que l'auth est initialisée
  await authStore.initAuth()

  // Vérifier l'authentification d'abord
  if (!authStore.isAuthenticated) {
    console.log(
      '🔒 Accès refusé - utilisateur non authentifié pour rôle requis'
    )
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }

  // Vérifier le rôle
  if (!roles.includes(authStore.userRole)) {
    console.log(
      '🔒 Accès refusé - rôle insuffisant:',
      authStore.userRole,
      'requis:',
      roles
    )
    return '/'
  }

  console.log('✅ Accès autorisé - rôle valide:', authStore.userRole)
  return true
}
