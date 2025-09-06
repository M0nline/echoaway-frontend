// Types partagés pour les hébergements
// Synchronisés avec le backend (accommodation.entity.ts)

export enum AccommodationType {
  APARTMENT = 'Appartement',
  HOUSE = 'Maison',
  CHALET = 'Chalet',
  CABANE = 'Cabane',
  TINY_HOUSE = 'Tiny house',
  YOURTE_TIPI = 'Yourte/Tipi',
  ROULOTTE = 'Roulotte',
  TROGLODYTE = 'Troglodyte',
  PHARE_REFUGE = 'Phare/Refuge',
}

export enum ConnectivityType {
  ZONE_BLANCHE = 'Zone blanche',
  ZONE_GRISE = 'Zone grise',
  AUTRE = 'Autre',
}

// Interface pour l'entité complète (avec métadonnées)
export interface Accommodation {
  id: number
  title: string
  hostId: number
  address: string
  postalCode: string
  city: string
  type: AccommodationType
  numberOfBeds: number
  connectivity: ConnectivityType
  priceMinPerNight: number
  priceMaxPerNight: number
  bookingLink?: string
  phoneNumber?: string
  description: string
  createdAt: Date | string
  updatedAt: Date | string
}

// Interface pour les données de formulaire (sans métadonnées)
export interface AccommodationFormData {
  title: string
  address: string
  postalCode: string
  city: string
  type: AccommodationType
  numberOfBeds: number
  connectivity: ConnectivityType
  priceMinPerNight: number
  priceMaxPerNight: number
  description: string
  bookingLink?: string
  phoneNumber?: string
}

// Interface pour la création (avec hostId optionnel car géré automatiquement)
export interface CreateAccommodationData extends AccommodationFormData {
  hostId?: number
}

// Utilitaires pour les enums
export const accommodationTypeOptions = Object.values(AccommodationType)
export const connectivityTypeOptions = Object.values(ConnectivityType)

// Fonction pour valider un type d'hébergement
export const isValidAccommodationType = (type: string): type is AccommodationType => {
  return Object.values(AccommodationType).includes(type as AccommodationType)
}

// Fonction pour valider un type de connectivité
export const isValidConnectivityType = (connectivity: string): connectivity is ConnectivityType => {
  return Object.values(ConnectivityType).includes(connectivity as ConnectivityType)
}

// Règles de validation synchronisées avec le backend
export const ValidationRules = {
  title: {
    required: true,
    maxLength: 100,
  },
  address: {
    required: true,
    maxLength: 200,
  },
  postalCode: {
    required: true,
    maxLength: 10,
    pattern: /^\d{5}$/, // Code postal français
  },
  city: {
    required: true,
    maxLength: 100,
  },
  numberOfBeds: {
    required: true,
    min: 1,
    max: 20,
  },
  priceMinPerNight: {
    required: true,
    min: 0,
  },
  priceMaxPerNight: {
    required: true,
    min: 0,
  },
  description: {
    required: true,
    maxLength: 1000, // Ajout d'une limite raisonnable
  },
  bookingLink: {
    required: false,
    pattern: /^https?:\/\/.+/, // URL valide
  },
  phoneNumber: {
    required: false,
    pattern: /^(?:\+33|0)[1-9](?:[0-9]{8})$/, // Numéro français
  },
} as const
