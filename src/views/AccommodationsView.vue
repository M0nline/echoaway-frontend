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

            <div v-else-if="accommodations.length === 0" class="text-center q-pa-md">
              <q-icon name="hotel" size="100px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">Aucun hébergement trouvé</div>
            </div>

            <div v-else class="row q-col-gutter-lg">
              <div 
                v-for="accommodation in accommodations" 
                :key="accommodation.id"
                class="col-12 col-xl-3 col-lg-4 col-md-6"
              >
                <q-card class="accommodation-card">
                  <q-card-section>
                    <div class="text-h6">{{ accommodation.name }}</div>
                    <div class="text-subtitle2 text-grey-6">{{ accommodation.location }}</div>
                    <div class="q-mt-sm">
                      <q-chip 
                        :color="getConnectivityColor(accommodation.connectivity)"
                        text-color="white"
                        size="sm"
                      >
                        {{ accommodation.connectivity }}
                      </q-chip>
                      <q-chip 
                        color="secondary" 
                        text-color="white"
                        size="sm"
                        class="q-ml-xs"
                      >
                        {{ accommodation.type }}
                      </q-chip>
                    </div>
                    <div v-if="accommodation.pricePerNight" class="text-h6 text-primary q-mt-sm">
                      {{ accommodation.pricePerNight }}€ / nuit
                    </div>
                    <div v-if="accommodation.description" class="text-body2 q-mt-sm">
                      {{ accommodation.description }}
                    </div>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn 
                      flat 
                      color="primary" 
                      icon="edit"
                      @click="editAccommodation(accommodation)"
                    />
                    <q-btn 
                      flat 
                      color="negative" 
                      icon="delete"
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
    <q-dialog v-model="showCreateDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">
            {{ editingAccommodation ? 'Modifier' : 'Créer' }} un hébergement
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-body2 text-grey-7 q-mb-md">
            <q-icon name="info" size="sm" class="q-mr-xs" />
            Tous les champs sont obligatoires sauf ceux indiqués comme optionnels.
          </div>
          <q-form @submit="saveAccommodation" class="q-gutter-md">
            <q-input
              v-model="form.name"
              label="Titre de l'hébergement"
              outlined
              :rules="[val => !!val || 'Le titre est obligatoire']"
              aria-required="true"
              aria-describedby="name-error"
              hint="Ex: Chalet des Alpes, Maison de campagne, etc."
            />
            <div id="name-error" class="sr-only" v-if="errors.name">
              Erreur: {{ errors.name }}
            </div>

            <q-input
              v-model="form.address"
              label="Adresse complète"
              outlined
              :rules="[val => !!val || 'L\'adresse est obligatoire']"
              aria-required="true"
              aria-describedby="address-error"
              hint="Numéro et nom de rue"
            />
            <div id="address-error" class="sr-only" v-if="errors.address">
              Erreur: {{ errors.address }}
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-6">
                                  <q-input
                    v-model="form.postalCode"
                    label="Code postal"
                    outlined
                    :rules="[val => !!val || 'Le code postal est obligatoire']"
                    aria-required="true"
                    aria-describedby="postal-error"
                    hint="Ex: 75001"
                  />
                <div id="postal-error" class="sr-only" v-if="errors.postalCode">
                  Erreur: {{ errors.postalCode }}
                </div>
              </div>
              <div class="col-6">
                <q-input
                  v-model="form.city"
                  label="Ville *"
                  outlined
                  :rules="[val => !!val || 'La ville est obligatoire']"
                  aria-required="true"
                  aria-describedby="city-error"
                  hint="Ex: Paris"
                />
                <div id="city-error" class="sr-only" v-if="errors.city">
                  Erreur: {{ errors.city }}
                </div>
              </div>
            </div>

            <q-select
              v-model="form.type"
              :options="typeOptions"
              label="Type d'hébergement"
              outlined
              :rules="[val => !!val || 'Le type est obligatoire']"
              aria-required="true"
              aria-describedby="type-error"
              hint="Sélectionnez le type qui correspond le mieux"
            />
            <div id="type-error" class="sr-only" v-if="errors.type">
              Erreur: {{ errors.type }}
            </div>

            <q-select
              v-model="form.connectivity"
              :options="connectivityOptions"
              label="Zone de connectivité"
              outlined
              aria-describedby="connectivity-hint"
              hint="Niveau de réseau disponible sur place"
            />
            <div id="connectivity-hint" class="sr-only">
              Zone blanche: pas de réseau, Zone grise: réseau limité, Autre: réseau disponible
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  v-model.number="form.priceMinPerNight"
                  label="Prix minimum par nuit (€)"
                  type="number"
                  outlined
                  min="0"
                  step="0.01"
                  hint="Format: 0 000,00"
                  aria-describedby="price-min-hint"
                />
                <div id="price-min-hint" class="sr-only">
                  Prix minimum pour une nuit, en euros
                </div>
              </div>
              <div class="col-6">
                <q-input
                  v-model.number="form.priceMaxPerNight"
                  label="Prix maximum par nuit (€)"
                  type="number"
                  outlined
                  min="0"
                  step="0.01"
                  hint="Format: 0 000,00"
                  aria-describedby="price-max-hint"
                />
                <div id="price-max-hint" class="sr-only">
                  Prix maximum pour une nuit, en euros
                </div>
              </div>
            </div>

            <q-input
              v-model.number="form.numberOfBeds"
              label="Nombre de couchages"
              type="number"
              outlined
              min="1"
              max="20"
              hint="Nombre de personnes que peut accueillir l'hébergement"
              aria-describedby="beds-hint"
            />
            <div id="beds-hint" class="sr-only">
              Capacité d'accueil de l'hébergement
            </div>

            <q-input
              v-model="form.description"
              label="Description de l'hébergement"
              type="textarea"
              outlined
              rows="3"
              hint="Décrivez votre hébergement, ses particularités, etc."
              aria-describedby="description-hint"
            />
            <div id="description-hint" class="sr-only">
              Détails et caractéristiques de votre hébergement
            </div>

            <div class="text-subtitle2 text-grey-7 q-mb-sm">
              Contact de réservation (lien OU téléphone obligatoire)
            </div>
            
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  v-model="form.bookingLink"
                  label="Lien de réservation"
                  type="url"
                  outlined
                  hint="URL de votre site de réservation"
                  aria-describedby="booking-hint"
                />
                <div id="booking-hint" class="sr-only">
                  Lien vers votre système de réservation
                </div>
              </div>
              <div class="col-6">
                <q-input
                  v-model="form.phoneNumber"
                  label="Numéro de téléphone"
                  type="tel"
                  outlined
                  hint="Numéro pour réservation par téléphone"
                  aria-describedby="phone-hint"
                />
                <div id="phone-hint" class="sr-only">
                  Numéro de téléphone pour les réservations
                </div>
              </div>
            </div>
            
            <div v-if="errors.bookingContact" class="text-negative text-caption q-mt-sm">
              {{ errors.bookingContact }}
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" @click="closeDialog" />
          <q-btn 
            color="primary" 
            :label="editingAccommodation ? 'Modifier' : 'Créer'"
            @click="saveAccommodation"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'
import { apiService } from '../services/api'

// Types
interface Accommodation {
  id: string  // Changé de number à string pour correspondre au backend
  name: string
  location: string
  type: string
  connectivity: 'None' | 'Low' | 'High'
  pricePerNight?: number
  numberOfRooms?: number
  description?: string
  createdAt: string
  updatedAt: string
}

// Composables
const $q = useQuasar()
const authStore = useAuthStore()

// État réactif
const loading = ref(false)
const accommodations = ref<Accommodation[]>([])
const showCreateDialog = ref(false)
const editingAccommodation = ref<Accommodation | null>(null)

const filters = reactive({
  search: '',
  connectivity: null as string | null,
  type: null as string | null
})

const form = reactive({
  name: '',
  address: '',
  postalCode: '',
  city: '',
  type: '',
  connectivity: 'Zone blanche' as 'Zone blanche' | 'Zone grise' | 'Autre',
  priceMinPerNight: undefined as number | undefined,
  priceMaxPerNight: undefined as number | undefined,
  numberOfBeds: undefined as number | undefined,
  description: '',
  bookingLink: '',
  phoneNumber: ''
})

const errors = reactive({
  name: '',
  address: '',
  postalCode: '',
  city: '',
  type: '',
  bookingContact: ''
})

// Validation personnalisée pour le contact de réservation
const validateBookingContact = () => {
  if (!form.bookingLink && !form.phoneNumber) {
    errors.bookingContact = 'Un lien de réservation ou un numéro de téléphone est obligatoire'
    return false
  }
  errors.bookingContact = ''
  return true
}

// Options pour les selects
const connectivityOptions = [
  { label: 'Zone blanche', value: 'Zone blanche' },
  { label: 'Zone grise', value: 'Zone grise' },
  { label: 'Autre', value: 'Autre' }
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
  'Phare/Refuge'
]

// Méthodes
const loadAccommodations = async () => {
  loading.value = true
  try {
    // Charger les hébergements (accessible à tous)
    accommodations.value = await apiService.getAccommodations()
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
    $q.notify({
      type: 'negative',
      message: 'Erreur lors du chargement des hébergements'
    })
  } finally {
    loading.value = false
  }
}

const saveAccommodation = async () => {
  // Validation du contact de réservation
  if (!validateBookingContact()) {
    $q.notify({
      type: 'warning',
      message: 'Veuillez remplir au moins un contact de réservation'
    })
    return
  }

  try {
    if (editingAccommodation.value) {
      // Mise à jour
      await apiService.updateAccommodation(
        editingAccommodation.value.id, 
        form
      )
      $q.notify({
        type: 'positive',
        message: 'Hébergement modifié avec succès'
      })
    } else {
      // Création
      await apiService.createAccommodation(form)
      $q.notify({
        type: 'positive',
        message: 'Hébergement créé avec succès'
      })
    }
    
    closeDialog()
    loadAccommodations()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    $q.notify({
      type: 'negative',
      message: 'Erreur lors de la sauvegarde'
    })
  }
}

const editAccommodation = (accommodation: Accommodation) => {
  editingAccommodation.value = accommodation
  Object.assign(form, accommodation)
  showCreateDialog.value = true
}

const deleteAccommodation = async (id: string) => {
  $q.dialog({
    title: 'Confirmation',
    message: 'Êtes-vous sûr de vouloir supprimer cet hébergement ?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await apiService.deleteAccommodation(id)
      
      $q.notify({
        type: 'positive',
        message: 'Hébergement supprimé avec succès'
      })
      loadAccommodations()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      $q.notify({
        type: 'negative',
        message: 'Erreur lors de la suppression'
      })
    }
  })
}

const closeDialog = () => {
  showCreateDialog.value = false
  editingAccommodation.value = null
  Object.assign(form, {
    name: '',
    location: '',
    type: '',
    connectivity: 'None',
    pricePerNight: undefined,
    numberOfRooms: undefined,
    description: ''
  })
}

const getConnectivityColor = (connectivity: string) => {
  switch (connectivity) {
    case 'High': return 'positive'
    case 'Low': return 'warning'
    default: return 'grey'
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
  content: " *";
  color: #c10015;
}
</style>