import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Quasar, Notify } from 'quasar'
import router from './router'
import App from './App.vue'
import { useAuthStore } from './stores/auth'

// Import Quasar css
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

// Import des variables SCSS personnalisées
import './quasar-variables.scss'

// Import des styles globaux du design system
import './styles/design-system.css'

// Import de la configuration du design system
import { quasarConfig } from './config/design-system'

const app = createApp(App)
const pinia = createPinia()

// Configuration de la persistance Pinia
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: {
    Notify,
  },
  config: quasarConfig,
})

// Initialiser l'authentification avant de monter l'app
const authStore = useAuthStore()
authStore.initAuth().then(() => {
  console.log('🚀 Application démarrée avec authentification initialisée')
  app.mount('#app')
})
