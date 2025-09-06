<template>
  <q-page class="flex flex-center bg-grey-1">
    <div class="row full-width justify-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <q-card class="register-card q-pa-lg">
          <q-card-section class="text-center">
            <div class="text-h4 text-primary q-mb-md">Inscription</div>
            <div class="text-body2 text-grey-6">
              Créez votre compte EchoAway
            </div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="handleRegister" class="q-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="form.firstname"
                    label="Prénom"
                    outlined
                    :rules="[
                      (val) => !!val || 'Le prénom est requis',
                      (val) =>
                        val.length >= 2 ||
                        'Le prénom doit contenir au moins 2 caractères',
                    ]"
                    :disable="authStore.loading"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="form.name"
                    label="Nom de famille"
                    outlined
                    :rules="[
                      (val) => !!val || 'Le nom de famille est requis',
                      (val) =>
                        val.length >= 2 ||
                        'Le nom de famille doit contenir au moins 2 caractères',
                    ]"
                    :disable="authStore.loading"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                </div>
              </div>

              <q-input
                v-model="form.email"
                label="Email"
                type="email"
                outlined
                :rules="[
                  (val) => !!val || 'L\'email est requis',
                  (val) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email invalide',
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
                :rules="[
                  (val) => !!val || 'Le mot de passe est requis',
                  (val) =>
                    val.length >= 8 ||
                    'Le mot de passe doit contenir au moins 8 caractères',
                  (val) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val) ||
                    'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre',
                ]"
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

              <q-input
                v-model="form.confirmPassword"
                label="Confirmer le mot de passe"
                :type="showConfirmPassword ? 'text' : 'password'"
                outlined
                :rules="[
                  (val) =>
                    !!val || 'La confirmation du mot de passe est requise',
                  (val) =>
                    val === form.password ||
                    'Les mots de passe ne correspondent pas',
                ]"
                :disable="authStore.loading"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="
                      showConfirmPassword ? 'visibility' : 'visibility_off'
                    "
                    class="cursor-pointer"
                    @click="showConfirmPassword = !showConfirmPassword"
                  />
                </template>
              </q-input>

              <q-select
                v-model="form.role"
                :options="roleOptions"
                label="Rôle"
                outlined
                :rules="[(val) => !!val || 'Le rôle est requis']"
                :disable="authStore.loading"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" />
                </template>
              </q-select>

              <q-input
                v-model="form.avatar"
                label="URL de l'avatar (optionnel)"
                outlined
                :disable="authStore.loading"
              >
                <template v-slot:prepend>
                  <q-icon name="image" />
                </template>
              </q-input>

              <q-checkbox
                v-model="acceptTerms"
                label="J'accepte les conditions d'utilisation"
                :disable="authStore.loading"
                :rules="[
                  (val) =>
                    val || 'Vous devez accepter les conditions d\'utilisation',
                ]"
              />

              <q-btn
                type="submit"
                color="primary"
                size="lg"
                class="full-width"
                :loading="authStore.loading"
                :disable="authStore.loading || !acceptTerms"
              >
                <q-spinner-dots v-if="authStore.loading" />
                <span v-else>Créer mon compte</span>
              </q-btn>
            </q-form>
          </q-card-section>

          <q-card-section class="text-center">
            <div class="text-body2 text-grey-6">
              Déjà un compte ?
              <q-btn
                flat
                color="primary"
                label="Se connecter"
                :disable="authStore.loading"
                @click="$router.push('/login')"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'

// Composables
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// État réactif
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const acceptTerms = ref(false)

const form = reactive({
  firstname: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'visitor' as 'admin' | 'host' | 'guest' | 'visitor',
  avatar: '',
})

const roleOptions = [
  { label: 'Visiteur', value: 'visitor' },
  { label: 'Invité', value: 'guest' },
  { label: 'Hôte', value: 'host' },
  { label: 'Administrateur', value: 'admin' },
]

// Méthodes
const handleRegister = async () => {
  try {
    const userData = {
      email: form.email,
      password: form.password,
      firstname: form.firstname,
      name: form.name,
      role: form.role,
      avatar: form.avatar || undefined,
    }

    await authStore.register(userData)

    $q.notify({
      type: 'positive',
      message: 'Inscription réussie ! Bienvenue sur EchoAway',
      position: 'top',
    })

    // Rediriger vers la page d'accueil
    router.push('/')
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.message || "Erreur lors de l'inscription",
      position: 'top',
    })
  }
}
</script>

<style scoped>
.register-card {
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}
</style>
