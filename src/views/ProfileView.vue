<template>
  <AppLayout>
    <PageLayout>
      <!-- En-tête profil -->
      <ProfileHeader 
        @edit-profile="handleEditProfile" 
        @logout="handleLogout" 
      />

      <!-- Section informations personnelles -->
      <ProfilePersonalInfo />

      <!-- Section favoris -->
      <ProfileFavorites 
        @explore-accommodations="handleExploreAccommodations"
        @view-accommodation="handleViewAccommodation"
      />

    </PageLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import AppLayout from '../components/layout/AppLayout.vue'
import PageLayout from '../components/layout/PageLayout.vue'
import ProfileHeader from '../components/profile/ProfileHeader.vue'
import ProfilePersonalInfo from '../components/profile/ProfilePersonalInfo.vue'
import ProfileFavorites from '../components/profile/ProfileFavorites.vue'
import { useAuthStore } from '../stores/auth'

// Composables
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// Méthodes
const handleEditProfile = () => {
  // TODO: Implémenter la modification du profil
  $q.notify({
    type: 'info',
    message: 'Fonctionnalité de modification du profil à venir',
    position: 'top',
  })
}

const handleLogout = () => {
  $q.dialog({
    title: 'Confirmation',
    message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    authStore.logout()
    $q.notify({
      type: 'positive',
      message: 'Déconnexion réussie',
      position: 'top',
    })
    router.push('/')
  })
}

const handleExploreAccommodations = () => {
  router.push('/accommodations')
}

const handleViewAccommodation = (accommodationId: number) => {
  // TODO: Implémenter la navigation vers les détails de l'hébergement
  router.push(`/accommodations/${accommodationId}`)
}

</script>
