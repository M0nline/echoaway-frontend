<template>
  <AppLayout>
    <PageLayout>
      <!-- En-tête profil -->
      <ProfileHeader 
        @edit-profile="handleEditProfile" 
        @logout="handleLogout" 
      />

      <!-- Section informations personnelles -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Informations personnelles</h2>
          </div>
          <div class="row justify-center">
            <div class="col-12 col-md-8 col-lg-6">
              <div class="q-gutter-md">
                <q-input
                  v-model="profile.firstname"
                  label="Prénom"
                  outlined
                  readonly
                />
                <q-input
                  v-model="profile.name"
                  label="Nom complet"
                  outlined
                  readonly
                />
                <q-input
                  v-model="profile.email"
                  label="Email"
                  type="email"
                  outlined
                  readonly
                />
                <q-input
                  v-model="profile.password"
                  label="Mot de passe"
                  type="password"
                  outlined
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import AppLayout from '../components/AppLayout.vue'
import PageLayout from '../components/PageLayout.vue'
import ProfileHeader from '../components/ProfileHeader.vue'
import { useAuthStore } from '../stores/auth'
import { getRoleLabel } from '../utils/roleLabels'

// Composables
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// État réactif
const profile = reactive({
  firstname: computed(() => authStore.user?.firstname || ''),
  name: computed(() => authStore.user?.name || ''),
  email: computed(() => authStore.user?.email || ''),
  role: computed(() => {
    const role = authStore.user?.role || 'visitor'
    return getRoleLabel(role)
  }),
  avatar: computed(() => authStore.user?.avatar || ''),
  password: computed(() => '••••••••'),
})

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

</script>
