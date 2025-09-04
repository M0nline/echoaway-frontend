<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- En-tête -->
      <div class="col-12">
        <div class="row items-center justify-between q-mb-lg">
          <div class="text-h3 text-lg-h4 text-md-h5 text-primary">
            Gestion des Hébergements
          </div>
          <q-btn
            color="primary"
            icon="add"
            label="Nouvel hébergement"
            size="lg"
            @click="showCreateDialog = true"
          />
        </div>
      </div>

      <!-- Filtres -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-lg">
              <div class="col-12 col-lg-3 col-md-6">
                <q-input
                  v-model="filters.search"
                  label="Rechercher un hébergement"
                  outlined
                  clearable
                  @update:model-value="loadAccommodations"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-lg-3 col-md-6">
                <q-select
                  v-model="filters.connectivity"
                  :options="connectivityOptions"
                  label="Zone de connectivité"
                  outlined
                  clearable
                  @update:model-value="loadAccommodations"
                />
              </div>
              <div class="col-12 col-lg-3 col-md-6">
                <q-select
                  v-model="filters.type"
                  :options="typeOptions"
                  label="Type d'hébergement"
                  outlined
                  clearable
                  @update:model-value="loadAccommodations"
                />
              </div>
              <div class="col-12 col-lg-3 col-md-6">
                <q-btn
                  color="primary"
                  icon="refresh"
                  label="Actualiser"
                  @click="loadAccommodations"
                  class="full-width"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Liste des hébergements -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div v-if="loading" class="text-center q-pa-md">
              <q-spinner-dots size="50px" color="primary" />
              <div class="q-mt-sm">Chargement...</div>
            </div>

            <div
              v-else-if="accommodations.length === 0"
              class="text-center q-pa-md"
            >
              <q-icon name="hotel" size="100px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">
                Aucun hébergement trouvé
              </div>
            </div>

            <div v-else class="row q-col-gutter-lg">
              <div
                v-for="accommodation in accommodations"
                :key="accommodation.id"
                class="col-12 col-xl-3 col-lg-4 col-md-6"
              >
                <q-card class="accommodation-card design-system-card">
                  <q-card-section>
                    <div class="text-h6 text-weight-medium">
                      {{ accommodation.title }}
                    </div>
                    <div class="text-subtitle2 text-grey-6 q-mt-xs">
                      {{ accommodation.address }}, {{ accommodation.postalCode }} {{ accommodation.city }}
                    </div>
                    <div class="q-mt-md">
                      <q-chip
                        :color="
                          getConnectivityColor(accommodation.connectivity)
                        "
                        text-color="white"
                        size="sm"
                        class="q-mr-xs"
                      >
                        {{ accommodation.connectivity }}
                      </q-chip>
                      <q-chip color="secondary" text-color="white" size="sm">
                        {{ accommodation.type }}
                      </q-chip>
                      <q-chip color="info" text-color="white" size="sm" class="q-ml-xs">
                        {{ accommodation.numberOfBeds }} couchages
                      </q-chip>
                    </div>
                    <div
                      v-if="accommodation.priceMinPerNight && accommodation.priceMaxPerNight"
                      class="text-h6 text-primary q-mt-md"
                    >
                      {{ accommodation.priceMinPerNight }}€ - {{ accommodation.priceMaxPerNight }}€ / nuit
                    </div>
                    <div
                      v-else-if="accommodation.priceMinPerNight"
                      class="text-h6 text-primary q-mt-md"
                    >
                      À partir de {{ accommodation.priceMinPerNight }}€ / nuit
                    </div>
                    <div
                      v-if="accommodation.description"
                      class="text-body2 q-mt-sm text-grey-7"
                    >
                      {{ accommodation.description }}
                    </div>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      flat
                      color="primary"
                      icon="edit"
                      size="sm"
                      @click="editAccommodation(accommodation)"
                    />
                    <q-btn
                      flat
                      color="negative"
                      icon="delete"
                      size="sm"
                      @click="deleteAccommodation(accommodation.id)"
                    />
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Dialog de création/édition -->
    <AccommodationDialog
      v-model="showCreateDialog"
      :accommodation="editingAccommodation"
      :loading="loading"
      @submit="saveAccommodation"
      @cancel="closeDialog"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'
import { apiService } from '../services/api'
import AccommodationDialog from '../components/AccommodationDialog.vue'

// Types
interface Accommodation {
  id: number
  title: string
  address: string
  postalCode: string
  city: string
  type: string
  connectivity: 'Zone blanche' | 'Zone grise' | 'Autre'
  priceMinPerNight: number
  priceMaxPerNight: number
  numberOfBeds: number
  description: string
  bookingLink?: string
  phoneNumber?: string
  hostId: number
  createdAt: Date | string
  updatedAt: Date | string
}

// Composables
const $q = useQuasar()
const _authStore = useAuthStore()

// État réactif
const loading = ref(false)
const accommodations = ref<Accommodation[]>([])
const showCreateDialog = ref(false)
const editingAccommodation = ref<Accommodation | null>(null)

const filters = reactive({
  search: '',
  connectivity: null as string | null,
  type: null as string | null,
})

// Options pour les selects (utilisées par le composant AccommodationForm)
const connectivityOptions = [
  'Zone blanche',
  'Zone grise', 
  'Autre',
]

const typeOptions = [
  'Appartement',
  'Maison',
  'Chalet',
  'Cabane',
  'Tiny house',
  'Yourte/Tipi',
  'Roulotte',
  'Troglodyte',
  'Phare/Refuge',
]

// Méthodes
const loadAccommodations = async () => {
  loading.value = true
  try {
    // Charger les hébergements (accessible à tous)
    const data = await apiService.getAccommodations()
    accommodations.value = data as Accommodation[]
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
    $q.notify({
      type: 'negative',
      message: 'Erreur lors du chargement des hébergements',
    })
  } finally {
    loading.value = false
  }
}

const saveAccommodation = async (formData: any) => {
  try {
    if (editingAccommodation.value) {
      // Mise à jour
      await apiService.updateAccommodation(
        editingAccommodation.value.id.toString(),
        formData
      )
      $q.notify({
        type: 'positive',
        message: 'Hébergement modifié avec succès',
      })
    } else {
      // Création - ajouter l'hostId depuis le store d'auth
      const authStore = useAuthStore()
      const userData = authStore.user
      if (!userData) {
        throw new Error('Utilisateur non connecté')
      }
      
      const accommodationData = {
        ...formData,
        hostId: parseInt(userData.id)
      }
      
      await apiService.createAccommodation(accommodationData)
      $q.notify({
        type: 'positive',
        message: 'Hébergement créé avec succès',
      })
    }

    closeDialog()
    loadAccommodations()
  } catch (error: any) {
    console.error('Erreur lors de la sauvegarde:', error)
    const errorMessage = error.message || 'Erreur lors de la sauvegarde'
    $q.notify({
      type: 'negative',
      message: errorMessage,
    })
  }
}

const editAccommodation = (accommodation: Accommodation) => {
  editingAccommodation.value = accommodation
  showCreateDialog.value = true
}

const deleteAccommodation = async (id: number) => {
  $q.dialog({
    title: 'Confirmation',
    message: 'Êtes-vous sûr de vouloir supprimer cet hébergement ?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await apiService.deleteAccommodation(id.toString())

      $q.notify({
        type: 'positive',
        message: 'Hébergement supprimé avec succès',
      })
      loadAccommodations()
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error)
      const errorMessage = error.message || 'Erreur lors de la suppression'
      $q.notify({
        type: 'negative',
        message: errorMessage,
      })
    }
  })
}

const closeDialog = () => {
  showCreateDialog.value = false
  editingAccommodation.value = null
}

const getConnectivityColor = (connectivity: string) => {
  switch (connectivity) {
    case 'Autre':
      return 'positive'
    case 'Zone grise':
      return 'warning'
    case 'Zone blanche':
      return 'grey'
    default:
      return 'grey'
  }
}

// Lifecycle
onMounted(() => {
  loadAccommodations()
})
</script>

<style scoped>
.accommodation-card {
  transition: all 0.3s ease;
  height: 100%;
}

.accommodation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

/* Accessibilité RGAA */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus visible pour la navigation au clavier */
.q-input:focus-within,
.q-select:focus-within,
.q-btn:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

/* Messages d'erreur accessibles */
.error-message {
  color: #c10015;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Labels obligatoires */
.required-field::after {
  content: ' *';
  color: #c10015;
}
</style>
