<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- En-tête -->
      <div class="col-12">
        <div class="text-h4 text-primary">Mon Profil</div>
      </div>

      <!-- Informations du profil -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Informations personnelles</div>
          </q-card-section>

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="profile.login"
                  label="Nom d'utilisateur"
                  outlined
                  readonly
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="profile.name"
                  label="Nom complet"
                  outlined
                  readonly
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="profile.email"
                  label="Email"
                  type="email"
                  outlined
                  readonly
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="profile.role"
                  label="Rôle"
                  outlined
                  readonly
                >
                  <template v-slot:append>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="profile.lastLoginAt"
                  label="Dernière connexion"
                  outlined
                  readonly
                >
                  <template v-slot:append>
                    <q-icon name="schedule" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Avatar et actions -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section class="text-center">
            <div class="text-h6">Avatar</div>
            <div class="q-mt-md">
              <q-avatar size="120px" class="q-mb-md">
                <img 
                  v-if="profile.avatar" 
                  :src="profile.avatar" 
                  alt="Avatar"
                />
                <q-icon 
                  v-else 
                  name="person" 
                  size="80px" 
                  color="grey-4"
                />
              </q-avatar>
            </div>
            <q-btn
              color="primary"
              label="Modifier l'avatar"
              outline
              class="q-mt-sm"
            />
          </q-card-section>
        </q-card>

        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-h6">Actions</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-md">
              <q-btn
                color="primary"
                label="Modifier le profil"
                icon="edit"
                class="full-width"
              />
              <q-btn
                color="secondary"
                label="Changer le mot de passe"
                icon="lock"
                class="full-width"
              />
              <q-btn
                color="negative"
                label="Se déconnecter"
                icon="logout"
                class="full-width"
                @click="handleLogout"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Statistiques -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Statistiques</div>
          </q-card-section>

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-4">
                <div class="text-center">
                  <div class="text-h4 text-primary">{{ stats.totalAccommodations }}</div>
                  <div class="text-body2 text-grey-6">Hébergements</div>
                </div>
              </div>
              <div class="col-12 col-sm-4">
                <div class="text-center">
                  <div class="text-h4 text-secondary">{{ stats.totalBookings }}</div>
                  <div class="text-body2 text-grey-6">Réservations</div>
                </div>
              </div>
              <div class="col-12 col-sm-4">
                <div class="text-center">
                  <div class="text-h4 text-positive">{{ stats.memberSince }}</div>
                  <div class="text-body2 text-grey-6">Membre depuis</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'

// Composables
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// État réactif
const profile = reactive({
  login: computed(() => authStore.user?.login || ''),
  name: computed(() => authStore.user?.name || ''),
  email: computed(() => authStore.user?.email || ''),
  role: computed(() => {
    const role = authStore.user?.role || 'user'
    const roleLabels = {
      user: 'Utilisateur',
      host: 'Hôte',
      admin: 'Administrateur'
    }
    return roleLabels[role as keyof typeof roleLabels] || role
  }),
  avatar: computed(() => authStore.user?.avatar || ''),
  lastLoginAt: computed(() => {
    if (!authStore.user?.lastLoginAt) return 'Jamais'
    return new Date(authStore.user.lastLoginAt).toLocaleString('fr-FR')
  })
})

const stats = reactive({
  totalAccommodations: 0,
  totalBookings: 0,
  memberSince: computed(() => {
    if (!authStore.user?.createdAt) return 'N/A'
    return new Date(authStore.user.createdAt).toLocaleDateString('fr-FR')
  })
})

// Méthodes
const handleLogout = () => {
  $q.dialog({
    title: 'Confirmation',
    message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    authStore.logout()
    $q.notify({
      type: 'positive',
      message: 'Déconnexion réussie',
      position: 'top'
    })
    router.push('/login')
  })
}
</script>



