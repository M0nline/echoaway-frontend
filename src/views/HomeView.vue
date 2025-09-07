<template>
  <AppLayout>
    <PageLayout>
      <!-- Section principale - Besoin de déconnecter -->
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">Besoin de déconnecter ?</h1>
          <p class="hero-description">
            EchoAway connecte les voyageurs à la déconnexion. Explorez zones
            blanches, hébergements éco-responsables et activités hors réseau
            pour un séjour authentique, loin du numérique et proche de
            l'essentiel.
          </p>

          <div class="features-grid">
            <FeatureCard
              v-for="feature in features"
              :key="feature.id"
              :feature="feature"
              @click="handleFeatureClick"
            />
          </div>
        </div>
      </section>

      <!-- Section de recherche -->
      <section class="search-section">
        <div class="container">
          <h2 class="section-title">Recherchez votre hébergement</h2>
          <div class="search-form">
            <q-input
              v-model="searchLocation"
              outlined
              placeholder="Ville, région..."
              class="search-input"
            />
            <q-input
              v-model="searchType"
              outlined
              placeholder="Type"
              class="search-input"
            />
            <q-btn
              color="dark"
              label="Lancer la recherche"
              class="search-btn"
              size="lg"
            />
          </div>
        </div>
      </section>

      <!-- Section hébergements -->
      <section class="accommodations-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Mieux notés x Sponsorisés</h2>
            <p class="section-subtitle">
              Découvrez nos hébergements les mieux notés par la communauté
              électrosensible
            </p>
          </div>

          <div class="accommodations-grid">
            <AccommodationCard
              v-for="accommodation in accommodations"
              :key="accommodation.id"
              :accommodation="accommodation"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import PageLayout from '../components/PageLayout.vue'
import FeatureCard from '../components/FeatureCard.vue'
import AccommodationCard from '../components/AccommodationCard.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const searchLocation = ref('')
const searchType = ref('')

// Données pour les features
const features = ref([
  {
    id: 'no-wifi',
    title: 'No Wi-Fi',
    description:
      'Découvrez des lieux sans connexion internet pour une déconnexion totale',
    buttonText: 'Découvrir',
    buttonColor: 'primary',
  },
  {
    id: 'zones-blanches',
    title: 'Zones blanches et grises',
    description:
      'Explorez les zones avec signal limité pour une expérience apaisante',
    buttonText: 'Explorer',
    buttonColor: 'primary',
  },
  {
    id: 'zones-sans-wifi',
    title: 'Zones blanches sans Wi-Fi',
    description:
      'Vivez une expérience authentique dans des lieux totalement déconnectés',
    buttonText: 'Vivre',
    buttonColor: 'primary',
  },
])

// Données pour les accommodations (exemple)
const accommodations = ref([
  {
    id: '1',
    location: 'Montagne des Vosges',
    host: 'Marie & Pierre',
    rating: 4,
    minPrice: 75,
    maxPrice: 95,
    isFavorite: true,
  },
  {
    id: '2',
    location: 'Côte Atlantique',
    host: 'Jean-Luc',
    rating: 5,
    minPrice: 110,
    maxPrice: 130,
    isFavorite: false,
  },
  {
    id: '3',
    location: 'Provence',
    host: 'Sophie',
    rating: 3,
    minPrice: 85,
    maxPrice: 105,
    isFavorite: true,
  },
  {
    id: '4',
    location: 'Bretagne',
    host: 'Yann & Claire',
    rating: 4,
    minPrice: 100,
    maxPrice: 120,
    isFavorite: false,
  },
])

onMounted(() => {
  console.log('🏠 HomeView mounted')
  console.log("🔐 État d'authentification:", {
    connecté: authStore.isAuthenticated,
    utilisateur: authStore.user?.email || 'Aucun',
    rôle: authStore.user?.role,
  })

  // Log détaillé de l'utilisateur si connecté
  if (authStore.isAuthenticated && authStore.user) {
    console.log('👤 Détails utilisateur:', {
      id: authStore.user.id,
      email: authStore.user.email,
      prénom: authStore.user.firstname,
      nom: authStore.user.name,
      rôle: authStore.user.role,
      avatar: authStore.user.avatar ? 'Défini' : 'Non défini',
      'créé le': authStore.user.createdAt,
    })
  }
})

// Fonction pour gérer les clics sur les features
const handleFeatureClick = (feature: any) => {
  console.log('🎯 Feature cliquée:', feature)
  // Ici on pourrait naviguer vers une page spécifique ou ouvrir un dialog
  // Par exemple: router.push(`/features/${feature.id}`)
}
</script>

<style scoped>
/* Styles spécifiques à la page d'accueil */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--echoaway-accent);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-description {
  font-family: var(--font-body);
  font-size: 1.25rem;
  color: var(--echoaway-primary);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

/* Features Section */
.features-section {
  padding: 4rem 0;
  background-color: white;
}

.features-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--echoaway-accent);
  text-align: center;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Styles des feature cards maintenant dans FeatureCard.vue */

/* Search Section */
.search-section {
  padding: 4rem 0;
  background-color: white;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  color: var(--echoaway-accent);
  text-align: center;
  margin-bottom: 2rem;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.search-btn {
  background-color: var(--echoaway-accent) !important;
  color: white !important;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: var(--border-radius-soft);
  text-transform: none;
  box-shadow: var(--shadow-soft);
  transition: var(--transition-organic);
}

.search-btn:hover {
  background-color: #005a61 !important;
  transform: translateY(-2px);
  box-shadow: var(--shadow-gentle);
}

/* Accommodations Section */
.accommodations-section {
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-subtitle {
  font-family: var(--font-body);
  color: var(--echoaway-primary);
  font-style: italic;
  margin-top: 0.5rem;
}

.accommodations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Styles des accommodation cards maintenant dans AccommodationCard.vue */

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .features-grid,
  .accommodations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
