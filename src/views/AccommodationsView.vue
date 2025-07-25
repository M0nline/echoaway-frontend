<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- En-tête -->
      <div class="col-12">
        <div class="row items-center justify-between">
          <div class="text-h4 text-primary">Gestion des Hébergements</div>
          <q-btn 
            color="primary" 
            icon="add" 
            label="Nouvel hébergement"
            @click="showCreateDialog = true"
          />
        </div>
      </div>

      <!-- Filtres -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input
                  v-model="filters.search"
                  label="Rechercher"
                  outlined
                  dense
                  clearable
                  @update:model-value="loadAccommodations"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-select
                  v-model="filters.connectivity"
                  :options="connectivityOptions"
                  label="Connectivité"
                  outlined
                  dense
                  clearable
                  @update:model-value="loadAccommodations"
                />
              </div>
              <div class="col-12 col-md-4">
                <q-select
                  v-model="filters.type"
                  :options="typeOptions"
                  label="Type"
                  outlined
                  dense
                  clearable
                  @update:model-value="loadAccommodations"
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

            <div v-else class="row q-col-gutter-md">
              <div 
                v-for="accommodation in accommodations" 
                :key="accommodation.id"
                class="col-12 col-md-6 col-lg-4"
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
          <q-form @submit="saveAccommodation" class="q-gutter-md">
            <q-input
              v-model="form.name"
              label="Nom"
              outlined
              :rules="[val => !!val || 'Le nom est requis']"
            />

            <q-input
              v-model="form.location"
              label="Localisation"
              outlined
              :rules="[val => !!val || 'La localisation est requise']"
            />

            <q-select
              v-model="form.type"
              :options="typeOptions"
              label="Type"
              outlined
              :rules="[val => !!val || 'Le type est requis']"
            />

            <q-select
              v-model="form.connectivity"
              :options="connectivityOptions"
              label="Connectivité"
              outlined
            />

            <q-input
              v-model.number="form.pricePerNight"
              label="Prix par nuit (€)"
              type="number"
              outlined
              min="0"
            />

            <q-input
              v-model.number="form.numberOfRooms"
              label="Nombre de chambres"
              type="number"
              outlined
              min="1"
              max="20"
            />

            <q-input
              v-model="form.description"
              label="Description"
              type="textarea"
              outlined
              rows="3"
            />
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

// Types
interface Accommodation {
  id: number
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
  location: '',
  type: '',
  connectivity: 'None' as 'None' | 'Low' | 'High',
  pricePerNight: undefined as number | undefined,
  numberOfRooms: undefined as number | undefined,
  description: ''
})

// Options pour les selects
const connectivityOptions = [
  { label: 'Aucune', value: 'None' },
  { label: 'Faible', value: 'Low' },
  { label: 'Élevée', value: 'High' }
]

const typeOptions = [
  'Villa',
  'Appartement',
  'Maison',
  'Chalet',
  'Studio'
]

// Méthodes
const loadAccommodations = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/accommodations')
    if (response.ok) {
      accommodations.value = await response.json()
    } else {
      throw new Error('Erreur lors du chargement')
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erreur lors du chargement des hébergements'
    })
  } finally {
    loading.value = false
  }
}

const saveAccommodation = async () => {
  try {
    const url = editingAccommodation.value 
      ? `/api/accommodations/${editingAccommodation.value.id}`
      : '/api/accommodations'
    
    const method = editingAccommodation.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    if (response.ok) {
      $q.notify({
        type: 'positive',
        message: `Hébergement ${editingAccommodation.value ? 'modifié' : 'créé'} avec succès`
      })
      closeDialog()
      loadAccommodations()
    } else {
      throw new Error('Erreur lors de la sauvegarde')
    }
  } catch (error) {
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

const deleteAccommodation = async (id: number) => {
  $q.dialog({
    title: 'Confirmation',
    message: 'Êtes-vous sûr de vouloir supprimer cet hébergement ?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const response = await fetch(`/api/accommodations/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        $q.notify({
          type: 'positive',
          message: 'Hébergement supprimé avec succès'
        })
        loadAccommodations()
      } else {
        throw new Error('Erreur lors de la suppression')
      }
    } catch (error) {
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
</style>