<template>
  <section class="section-alt">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Mes Favoris</h2>
        <p class="section-description">
          Vos hébergements préférés pour vos prochains séjours
        </p>
      </div>

      <!-- État de chargement -->
      <div v-if="loading" class="text-center q-pa-md">
        <q-spinner-dots size="50px" color="primary" />
        <div class="q-mt-sm">Chargement de vos favoris...</div>
      </div>

      <!-- Aucun favori -->
      <div
        v-else-if="favorites.length === 0"
        class="text-center q-pa-md"
      >
        <q-icon name="favorite_border" size="100px" color="grey-4" />
        <div class="text-h6 text-grey-6 q-mt-md">
          Aucun favori pour le moment
        </div>
        <p class="text-body2 text-grey-6 q-mt-sm">
          Explorez nos hébergements et ajoutez vos préférés à vos favoris
        </p>
        <q-btn
          color="primary"
          label="Découvrir les hébergements"
          icon="explore"
          class="q-mt-md"
          @click="$emit('explore-accommodations')"
        />
      </div>

      <!-- Liste des favoris -->
      <div v-else class="favorites-grid">
        <div
          v-for="favorite in favorites"
          :key="favorite.id"
          class="favorite-item"
        >
          <q-card class="favorite-card">
            <q-card-section>
              <div class="row items-center">
                <div class="col">
                  <div class="text-h6 text-weight-medium">
                    {{ favorite.accommodation?.title || 'Hébergement' }}
                  </div>
                  <div class="text-subtitle2 text-grey-6 q-mt-xs">
                    {{ favorite.accommodation?.city || 'Ville' }}, 
                    {{ favorite.accommodation?.postalCode || 'Code postal' }}
                  </div>
                </div>
                <div class="col-auto">
                  <q-btn
                    color="negative"
                    icon="favorite"
                    flat
                    round
                    size="sm"
                    @click="removeFavorite(favorite.id)"
                  />
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-chip
                    :color="getConnectivityColor(favorite.accommodation?.connectivity)"
                    text-color="white"
                    size="sm"
                    class="q-mr-xs"
                  >
                    {{ getConnectivityLabel(favorite.accommodation?.connectivity) }}
                  </q-chip>
                </div>
                <div class="col-12 col-sm-6">
                  <q-chip
                    color="primary"
                    text-color="white"
                    size="sm"
                  >
                    {{ favorite.accommodation?.type || 'Type' }}
                  </q-chip>
                </div>
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn
                color="primary"
                label="Voir les détails"
                flat
                @click="$emit('view-accommodation', favorite.accommodation?.id)"
              />
              <q-space />
              <q-btn
                color="negative"
                label="Retirer des favoris"
                flat
                icon="favorite_border"
                @click="removeFavorite(favorite.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

// Props et emits
defineEmits<{
  'explore-accommodations': []
  'view-accommodation': [id: number]
}>()

// Composables
const $q = useQuasar()

// État réactif
const loading = ref(false)
const favorites = ref([])

// Méthodes
const loadFavorites = async () => {
  loading.value = true
  try {
    // TODO: Implémenter l'appel API pour récupérer les favoris
    // const data = await apiService.getFavorites()
    // favorites.value = data
    
    // Simulation pour le moment
    favorites.value = []
  } catch (error) {
    console.error('Erreur lors du chargement des favoris:', error)
    $q.notify({
      type: 'negative',
      message: 'Erreur lors du chargement des favoris',
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}

const removeFavorite = async (favoriteId: number) => {
  try {
    // TODO: Implémenter l'appel API pour supprimer le favori
    // await apiService.removeFavorite(favoriteId)
    
    // Simulation pour le moment
    favorites.value = favorites.value.filter(f => f.id !== favoriteId)
    
    $q.notify({
      type: 'positive',
      message: 'Favori retiré avec succès',
      position: 'top',
    })
  } catch (error) {
    console.error('Erreur lors de la suppression du favori:', error)
    $q.notify({
      type: 'negative',
      message: 'Erreur lors de la suppression du favori',
      position: 'top',
    })
  }
}

const getConnectivityColor = (connectivity: string) => {
  switch (connectivity) {
    case 'white_zone': return 'positive'
    case 'low_coverage': return 'warning'
    case 'good_coverage': return 'negative'
    default: return 'grey'
  }
}

const getConnectivityLabel = (connectivity: string) => {
  switch (connectivity) {
    case 'white_zone': return 'Zone blanche'
    case 'low_coverage': return 'Faible couverture'
    case 'good_coverage': return 'Bonne couverture'
    default: return 'Non spécifié'
  }
}

// Lifecycle
onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.favorite-item {
  width: 100%;
}

.favorite-card {
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.favorite-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
