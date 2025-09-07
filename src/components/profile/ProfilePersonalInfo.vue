<template>
  <section class="section section-personal-info">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Informations personnelles</h2>
      </div>
      <div class="row justify-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="q-gutter-md">
            <!-- Ligne du haut : Prénom et Nom -->
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="profile.firstname"
                  label="Prénom"
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
            </div>
            
            <!-- Ligne du bas : Email et Mot de passe -->
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12 col-sm-6">
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth'

// Store
const authStore = useAuthStore()

// État réactif
const profile = reactive({
  firstname: computed(() => authStore.user?.firstname || ''),
  name: computed(() => authStore.user?.name || ''),
  email: computed(() => authStore.user?.email || ''),
  password: computed(() => '••••••••'),
})
</script>

<style scoped>
.section-personal-info {
  background: var(--echoaway-light) !important;
}
</style>
