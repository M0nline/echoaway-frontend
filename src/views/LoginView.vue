<template>
  <AppLayout>
    <PageLayout page-class="login-page" page-content-class="flex flex-center">
      <div class="row full-width justify-center">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
          <q-card class="login-card q-pa-lg">
            <q-card-section class="text-center">
              <div class="text-h4 text-primary q-mb-md">Connexion</div>
              <div class="text-body2 text-grey-6">
                Connectez-vous à votre compte EchoAway
              </div>
            </q-card-section>

            <q-card-section>
              <q-form @submit="handleLogin" class="q-gutter-md">
                <q-input
                  v-model="form.email"
                  label="Email"
                  type="email"
                  outlined
                  :rules="[
                    (val) => !!val || 'L\'email est requis',
                    (val) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                      'Email invalide',
                  ]"
                  :disable="authStore.loading"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>

                <q-input
                  v-model="form.password"
                  label="Mot de passe"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  :rules="[(val) => !!val || 'Le mot de passe est requis']"
                  :disable="authStore.loading"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>

                <div class="row justify-between items-center">
                  <q-checkbox
                    v-model="rememberMe"
                    label="Se souvenir de moi"
                    :disable="authStore.loading"
                  />
                  <q-btn
                    flat
                    color="primary"
                    label="Mot de passe oublié ?"
                    :disable="authStore.loading"
                    @click="forgotPassword"
                  />
                </div>

                <q-btn
                  type="submit"
                  color="primary"
                  size="lg"
                  class="full-width"
                  :loading="authStore.loading"
                  :disable="authStore.loading"
                >
                  <q-spinner-dots v-if="authStore.loading" />
                  <span v-else>Se connecter</span>
                </q-btn>
              </q-form>
            </q-card-section>

            <q-card-section class="text-center">
              <div class="text-body2 text-grey-6">
                Pas encore de compte ?
                <q-btn
                  flat
                  color="primary"
                  label="S'inscrire"
                  :disable="authStore.loading"
                  @click="$router.push('/register')"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </PageLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import AppLayout from '../components/AppLayout.vue'
import PageLayout from '../components/PageLayout.vue'
import { useAuthStore } from '../stores/auth'

// Composables
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// État réactif
const showPassword = ref(false)
const rememberMe = ref(false)

const form = reactive({
  email: '',
  password: '',
})

// Méthodes
const handleLogin = async () => {
  try {
    await authStore.login(form.email, form.password)

    $q.notify({
      type: 'positive',
      message: 'Connexion réussie !',
      position: 'top',
    })

    // Rediriger vers la page d'accueil ou la page demandée
    const redirectTo =
      (router.currentRoute.value.query.redirect as string) || '/'
    router.push(redirectTo)
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Erreur lors de la connexion',
      position: 'top',
    })
  }
}

const forgotPassword = () => {
  $q.notify({
    type: 'info',
    message: 'Fonctionnalité à venir',
    position: 'top',
  })
}
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}
</style>
