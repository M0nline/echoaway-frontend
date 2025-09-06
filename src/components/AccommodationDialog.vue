<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 500px" class="design-system-card">
      <q-card-section>
        <div class="text-h6">
          {{ isEditing ? 'Modifier' : 'Créer' }} un hébergement
        </div>
      </q-card-section>

      <q-card-section>
        <AccommodationForm
          ref="formRef"
          v-model="formData"
          :is-editing="isEditing"
          @submit="handleFormSubmit"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Annuler" @click="handleCancel" class="q-mr-sm" />
        <q-btn
          color="primary"
          :label="isEditing ? 'Modifier' : 'Créer'"
          :loading="loading"
          @click="triggerFormSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import AccommodationForm from './AccommodationForm.vue'
import {
  type Accommodation,
  type AccommodationFormData,
  AccommodationType,
  ConnectivityType,
} from '../types/accommodation'

// Props
interface Props {
  modelValue: boolean
  accommodation?: Accommodation | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [form: AccommodationFormData]
  cancel: []
}>()

// État local
const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const isEditing = computed(() => !!props.accommodation)

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

// Référence au formulaire pour déclencher la soumission
const formRef = ref<InstanceType<typeof AccommodationForm> | null>(null)

// Réinitialiser le formulaire
const resetForm = () => {
  formData.value = {
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
  }
}

// Initialiser le formulaire avec les données existantes
watch(
  () => props.accommodation,
  (newAccommodation) => {
    if (newAccommodation) {
      // Mode édition - remplir avec les données existantes
      formData.value = {
        title: newAccommodation.title || '',
        address: newAccommodation.address || '',
        postalCode: newAccommodation.postalCode || '',
        city: newAccommodation.city || '',
        type: newAccommodation.type || '',
        connectivity: newAccommodation.connectivity || ConnectivityType.ZONE_BLANCHE,
        priceMinPerNight: newAccommodation.priceMinPerNight || 0,
        priceMaxPerNight: newAccommodation.priceMaxPerNight || 0,
        numberOfBeds: newAccommodation.numberOfBeds || 1,
        description: newAccommodation.description || '',
        bookingLink: newAccommodation.bookingLink || '',
        phoneNumber: newAccommodation.phoneNumber || '',
      }
    } else {
      // Mode création - formulaire vide
      resetForm()
    }
  },
  { immediate: true }
)

// Déclencher la soumission du formulaire
const triggerFormSubmit = () => {
  // Utiliser la méthode exposée du formulaire pour la validation
  if (formRef.value) {
    formRef.value.handleSubmit()
  }
}

// Gérer la soumission du formulaire (données déjà validées)
const handleFormSubmit = (validatedData: AccommodationFormData) => {
  // Les données sont déjà validées par le formulaire
  emit('submit', validatedData)
}

// Gérer l'annulation
const handleCancel = () => {
  resetForm()
  emit('cancel')
  emit('update:modelValue', false)
}

// Nettoyer le formulaire quand le dialog se ferme
watch(show, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>

<style scoped>
/* Le composant utilise les styles du design system via les classes CSS */
</style>
