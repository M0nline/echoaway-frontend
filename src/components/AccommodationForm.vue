<template>
  <q-form @submit="handleSubmit" class="q-gutter-md">
    <!-- Informations de base -->
    <div class="text-subtitle2 text-grey-7 q-mb-md">
      <q-icon name="info" size="sm" class="q-mr-xs" />
      Tous les champs sont obligatoires sauf ceux indiqués comme optionnels.
    </div>

    <!-- Titre -->
    <q-input
      v-model="formData.name"
      label="Titre de l'hébergement"
      outlined
      :rules="[(val) => !!val || 'Le titre est obligatoire']"
      aria-required="true"
      aria-describedby="name-error"
      hint="Ex: Chalet des Alpes, Maison de campagne, etc."
    />
    <div id="name-error" class="sr-only" v-if="validationErrors.name">
      Erreur: {{ validationErrors.name }}
    </div>

    <!-- Adresse -->
    <q-input
      v-model="formData.address"
      label="Adresse complète"
      outlined
      :rules="[(val) => !!val || 'L\'adresse est obligatoire']"
      aria-required="true"
      aria-describedby="address-error"
      hint="Numéro et nom de rue"
    />
    <div id="address-error" class="sr-only" v-if="validationErrors.address">
      Erreur: {{ validationErrors.address }}
    </div>

    <!-- Code postal et ville -->
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-input
          v-model="formData.postalCode"
          label="Code postal"
          outlined
          :rules="[(val) => !!val || 'Le code postal est obligatoire']"
          aria-required="true"
          aria-describedby="postal-error"
          hint="Ex: 75001"
        />
        <div
          id="postal-error"
          class="sr-only"
          v-if="validationErrors.postalCode"
        >
          Erreur: {{ validationErrors.postalCode }}
        </div>
      </div>
      <div class="col-6">
        <q-input
          v-model="formData.city"
          label="Ville *"
          outlined
          :rules="[(val) => !!val || 'La ville est obligatoire']"
          aria-required="true"
          aria-describedby="city-error"
          hint="Ex: Paris"
        />
        <div id="city-error" class="sr-only" v-if="validationErrors.city">
          Erreur: {{ validationErrors.city }}
        </div>
      </div>
    </div>

    <!-- Type et connectivité -->
    <q-select
      v-model="formData.type"
      :options="typeOptions"
      label="Type d'hébergement"
      outlined
      :rules="[(val) => !!val || 'Le type est obligatoire']"
      aria-required="true"
      aria-describedby="type-error"
      hint="Sélectionnez le type qui correspond le mieux"
    />
    <div id="type-error" class="sr-only" v-if="validationErrors.type">
      Erreur: {{ validationErrors.type }}
    </div>

    <q-select
      v-model="formData.connectivity"
      :options="connectivityOptions"
      label="Zone de connectivité"
      outlined
      aria-describedby="connectivity-hint"
      hint="Niveau de réseau disponible sur place"
    />
    <div id="connectivity-hint" class="sr-only">
      Zone blanche: pas de réseau, Zone grise: réseau limité, Autre: réseau
      disponible
    </div>

    <!-- Prix par nuit -->
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-input
          v-model.number="formData.priceMinPerNight"
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
          v-model.number="formData.priceMaxPerNight"
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

    <!-- Capacité d'accueil -->
    <q-input
      v-model.number="formData.numberOfBeds"
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

    <!-- Description -->
    <q-input
      v-model="formData.description"
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

    <!-- Contact de réservation -->
    <div class="text-subtitle2 text-grey-7 q-mb-sm">
      Contact de réservation (lien OU téléphone obligatoire)
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-input
          v-model="formData.bookingLink"
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
          v-model="formData.phoneNumber"
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

    <!-- Erreur de contact de réservation -->
    <div
      v-if="validationErrors.bookingContact"
      class="text-negative text-caption q-mt-sm"
    >
      {{ validationErrors.bookingContact }}
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Props
interface Props {
  modelValue: AccommodationFormData
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: AccommodationFormData]
  submit: [form: AccommodationFormData]
}>()

// Types
interface AccommodationFormData {
  name: string
  address: string
  postalCode: string
  city: string
  type: string
  connectivity: 'Zone blanche' | 'Zone grise' | 'Autre'
  priceMinPerNight?: number
  priceMaxPerNight?: number
  numberOfBeds?: number
  description: string
  bookingLink: string
  phoneNumber: string
}

// Options pour les selects
const connectivityOptions = [
  { label: 'Zone blanche', value: 'Zone blanche' },
  { label: 'Zone grise', value: 'Zone grise' },
  { label: 'Autre', value: 'Autre' },
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

// État local du formulaire
const formData = ref<AccommodationFormData>({
  name: '',
  address: '',
  postalCode: '',
  city: '',
  type: '',
  connectivity: 'Zone blanche',
  priceMinPerNight: undefined,
  priceMaxPerNight: undefined,
  numberOfBeds: undefined,
  description: '',
  bookingLink: '',
  phoneNumber: '',
})

// Erreurs de validation locales
const validationErrors = ref<Record<string, string>>({})

// Synchronisation bidirectionnelle avec le parent
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      formData.value = { ...newValue }
    }
  },
  { deep: true, immediate: true }
)

// Émettre les changements au parent
watch(
  formData,
  (newValue) => {
    emit('update:modelValue', { ...newValue })
  },
  { deep: true }
)

// Validation complète du formulaire
const validateForm = (): boolean => {
  validationErrors.value = {}

  // Validation des champs obligatoires
  if (!formData.value.name) {
    validationErrors.value.name = 'Le titre est obligatoire'
  }
  if (!formData.value.address) {
    validationErrors.value.address = "L'adresse est obligatoire"
  }
  if (!formData.value.postalCode) {
    validationErrors.value.postalCode = 'Le code postal est obligatoire'
  }
  if (!formData.value.city) {
    validationErrors.value.city = 'La ville est obligatoire'
  }
  if (!formData.value.type) {
    validationErrors.value.type = 'Le type est obligatoire'
  }

  // Validation du contact de réservation
  if (!formData.value.bookingLink && !formData.value.phoneNumber) {
    validationErrors.value.bookingContact =
      'Un lien de réservation ou un numéro de téléphone est obligatoire'
  }

  return Object.keys(validationErrors.value).length === 0
}

// Gestion de la soumission du formulaire
const handleSubmit = () => {
  if (validateForm()) {
    // Nettoyer les erreurs
    validationErrors.value = {}
    // Émettre les données validées
    emit('submit', { ...formData.value })
  }
}
</script>

<style scoped>
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
.q-select:focus-within {
  outline: 2px solid var(--echoaway-primary);
  outline-offset: 2px;
}
</style>
