<template>
  <header class="echoaway-header">
    <div class="echoaway-header-content">
      <router-link to="/" class="echoaway-logo">ECHOAWAY</router-link>
      <nav class="echoaway-nav">
        <router-link to="/accommodations" class="echoaway-nav-link">
          Hébergements
        </router-link>
        <a href="#" class="echoaway-nav-link">Loisirs</a>
      </nav>

      <!-- Boutons d'authentification (non connecté) -->
      <div v-if="!authStore.isAuthenticated" class="echoaway-auth-buttons">
        <router-link to="/register" class="echoaway-login-btn">
          S'inscrire
        </router-link>
        <router-link to="/login" class="echoaway-login-btn">
          Connexion
        </router-link>
      </div>

      <!-- Menu utilisateur (connecté) -->
      <div v-else class="echoaway-user-menu">
        <q-btn-dropdown
          color="dark"
          :label="authStore.user?.firstname || 'Utilisateur'"
          class="echoaway-user-dropdown"
        >
          <q-list>
            <q-item clickable v-close-popup @click="$router.push('/profile')">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Mon profil</q-item-label>
                <q-item-label caption>{{
                  getRoleLabel(authStore.user?.role)
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Se déconnecter</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { getRoleLabel } from '../utils/roleLabels'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const $q = useQuasar()
const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logout()
    $q.notify({
      type: 'positive',
      message: 'Déconnexion réussie',
      position: 'top',
    })
    router.push('/')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    $q.notify({
      type: 'negative',
      message: 'Erreur lors de la déconnexion',
      position: 'top',
    })
  }
}
</script>

<!-- Styles sont maintenant dans src/styles/components/layout.css -->
