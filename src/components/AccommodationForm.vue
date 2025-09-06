<template>
  <q-form @submit="handleSubmit" class="q-gutter-md">
    <!-- Informations de base -->
    <div class="text-subtitle2 text-grey-7 q-mb-md">
      <q-icon name="info" size="sm" class="q-mr-xs" />
      Tous les champs sont obligatoires sauf ceux indiqués comme optionnels.
    </div>

    <!-- Titre -->
    <q-input
      v-model="formData.title"
      label="Titre de l'hébergement"
      outlined
      :rules="[(val) => !!val || 'Le titre est obligatoire']"
      aria-required="true"
      aria-describedby="title-error"
      hint="Ex: Chalet des Alpes, Maison de campagne, etc."
    />
    <div id="title-error" class="sr-only" v-if="validationErrors.title">
      Erreur: {{ validationErrors.title }}
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
import { ref, watch, nextTick } from 'vue'
import {
  type AccommodationFormData,
  AccommodationType,
  ConnectivityType,
  accommodationTypeOptions,
  connectivityTypeOptions,
  ValidationRules,
} from '../types/accommodation'

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

// Options pour les selects (utilisation des enums)
const connectivityOptions = connectivityTypeOptions
const typeOptions = accommodationTypeOptions

// État local du formulaire
const formData = ref<AccommodationFormData>({
  title: '',
  address: '',
  postalCode: '',
  city: '',
  type: AccommodationType.HOUSE,
  connectivity: ConnectivityType.ZONE_BLANCHE,
  priceMinPerNight: 0,
  priceMaxPerNight: 0,
  numberOfBeds: 1,
  description: '',
  bookingLink: '',
  phoneNumber: '',
})

// Erreurs de validation locales
const validationErrors = ref<Record<string, string>>({})

// Flag pour éviter les boucles infinies de réactivité
const isUpdatingFromParent = ref(false)

// Synchronisation bidirectionnelle avec le parent
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && !isUpdatingFromParent.value) {
      isUpdatingFromParent.value = true
      formData.value = { ...newValue }
      nextTick(() => {
        isUpdatingFromParent.value = false
      })
    }
  },
  { deep: true, immediate: true }
)

// Émettre les changements au parent
watch(
  formData,
  (newValue) => {
    if (!isUpdatingFromParent.value) {
      emit('update:modelValue', { ...newValue })
    }
  },
  { deep: true }
)

// Validation complète du formulaire avec les règles synchronisées
const validateForm = (): boolean => {
  validationErrors.value = {}

  // Validation du titre
  if (!formData.value.title) {
    validationErrors.value.title = 'Le titre est obligatoire'
  } else if (formData.value.title.length > ValidationRules.title.maxLength) {
    validationErrors.value.title = `Le titre ne peut pas dépasser ${ValidationRules.title.maxLength} caractères`
  }

  // Validation de l'adresse
  if (!formData.value.address) {
    validationErrors.value.address = "L'adresse est obligatoire"
  } else if (formData.value.address.length > ValidationRules.address.maxLength) {
    validationErrors.value.address = `L'adresse ne peut pas dépasser ${ValidationRules.address.maxLength} caractères`
  }

  // Validation du code postal
  if (!formData.value.postalCode) {
    validationErrors.value.postalCode = 'Le code postal est obligatoire'
  } else if (formData.value.postalCode.length > ValidationRules.postalCode.maxLength) {
    validationErrors.value.postalCode = `Le code postal ne peut pas dépasser ${ValidationRules.postalCode.maxLength} caractères`
  } else if (!ValidationRules.postalCode.pattern.test(formData.value.postalCode)) {
    validationErrors.value.postalCode = 'Le code postal doit être composé de 5 chiffres'
  }

  // Validation de la ville
  if (!formData.value.city) {
    validationErrors.value.city = 'La ville est obligatoire'
  } else if (formData.value.city.length > ValidationRules.city.maxLength) {
    validationErrors.value.city = `La ville ne peut pas dépasser ${ValidationRules.city.maxLength} caractères`
  }

  // Validation du type
  if (!formData.value.type) {
    validationErrors.value.type = 'Le type est obligatoire'
  }

  // Validation de la description
  if (!formData.value.description) {
    validationErrors.value.description = 'La description est obligatoire'
  } else if (formData.value.description.length > ValidationRules.description.maxLength) {
    validationErrors.value.description = `La description ne peut pas dépasser ${ValidationRules.description.maxLength} caractères`
  }

  // Validation des prix
  if (formData.value.priceMinPerNight < ValidationRules.priceMinPerNight.min) {
    validationErrors.value.priceMinPerNight = 'Le prix minimum ne peut pas être négatif'
  }
  if (formData.value.priceMaxPerNight < ValidationRules.priceMaxPerNight.min) {
    validationErrors.value.priceMaxPerNight = 'Le prix maximum ne peut pas être négatif'
  }
  if (formData.value.priceMinPerNight > formData.value.priceMaxPerNight && formData.value.priceMaxPerNight > 0) {
    validationErrors.value.priceMaxPerNight = 'Le prix maximum doit être supérieur au prix minimum'
  }

  // Validation du nombre de couchages
  if (formData.value.numberOfBeds < ValidationRules.numberOfBeds.min) {
    validationErrors.value.numberOfBeds = `Le nombre de couchages doit être d'au moins ${ValidationRules.numberOfBeds.min}`
  } else if (formData.value.numberOfBeds > ValidationRules.numberOfBeds.max) {
    validationErrors.value.numberOfBeds = `Le nombre de couchages ne peut pas dépasser ${ValidationRules.numberOfBeds.max}`
  }

  // Validation du lien de réservation
  if (formData.value.bookingLink && !ValidationRules.bookingLink.pattern.test(formData.value.bookingLink)) {
    validationErrors.value.bookingLink = 'Le lien de réservation doit être une URL valide (http:// ou https://)'
  }

  // Validation du numéro de téléphone
  if (formData.value.phoneNumber && !ValidationRules.phoneNumber.pattern.test(formData.value.phoneNumber)) {
    validationErrors.value.phoneNumber = 'Le numéro de téléphone doit être un numéro français valide'
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

// Exposer les méthodes pour le parent
defineExpose({
  validateForm,
  handleSubmit
})
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
