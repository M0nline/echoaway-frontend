# Composants EchoAway - Architecture Modulaire

## 🏗️ Vue d'ensemble

L'application EchoAway utilise une architecture modulaire avec des composants réutilisables pour améliorer la maintenabilité et la réutilisabilité du code. L'architecture respecte les bonnes pratiques d'accessibilité et de séparation des responsabilités.

## 📋 Composants créés

### 1. AccommodationForm.vue

**Localisation :** `src/components/AccommodationForm.vue`

**Description :** Composant de formulaire **autonome** et **réutilisable** pour la création et modification d'hébergements.

**Responsabilités :**

- ✅ **Affichage des champs** de saisie
- ✅ **Validation complète** du formulaire
- ✅ **Gestion des erreurs** locales
- ✅ **Synchronisation bidirectionnelle** avec le parent
- ✅ **Accessibilité RGAA** complète

**Props :**

- `modelValue` : Données du formulaire (v-model)
- `isEditing` : Mode édition ou création

**Événements :**

- `update:modelValue` : Mise à jour des données
- `submit` : Soumission du formulaire (données validées)

**Fonctionnalités :**

- Validation en temps réel et à la soumission
- Gestion locale des erreurs de validation
- Accessibilité RGAA complète (labels ARIA, navigation clavier)
- Design system cohérent
- Synchronisation automatique avec le parent

### 2. AccommodationDialog.vue

**Localisation :** `src/components/AccommodationDialog.vue`

**Description :** Dialog modal qui contient le formulaire d'hébergement et gère l'interface utilisateur.

**Responsabilités :**

- ✅ **Gestion de l'UI** (ouverture/fermeture)
- ✅ **Initialisation des données** (création vs édition)
- ✅ **Transmission des données** validées au parent
- ✅ **Gestion des actions** (annulation, soumission)

**Props :**

- `modelValue` : État d'ouverture/fermeture (v-model)
- `accommodation` : Hébergement à modifier (optionnel)
- `loading` : État de chargement

**Événements :**

- `update:modelValue` : Contrôle de l'ouverture/fermeture
- `submit` : Transmission des données validées
- `cancel` : Annulation de l'opération

**Fonctionnalités :**

- Mode création et édition automatique
- Gestion automatique des données existantes
- Mapping des données backend/frontend
- Réinitialisation automatique du formulaire

## 🔄 Architecture et flux de données

### **Flux de données simplifié :**

```
AccommodationForm (validation + soumission)
         ↓
AccommodationDialog (transmission)
         ↓
AccommodationsView (traitement métier)
```

### **Responsabilités clarifiées :**

1. **AccommodationForm** :
   - Validation complète
   - Gestion des erreurs
   - Soumission des données validées

2. **AccommodationDialog** :
   - Interface utilisateur
   - Transmission des données
   - Gestion de l'état

3. **AccommodationsView** :
   - Logique métier
   - Appels API
   - Gestion de l'état global

## 🎨 Design System

Les composants utilisent le design system centralisé :

- **Couleurs** : Variables CSS personnalisées
- **Classes utilitaires** : `design-system-card`, `design-system-btn--primary`
- **Transitions** : Animations fluides et cohérentes
- **Accessibilité** : Focus visible, labels ARIA, navigation clavier

## 🚀 Avantages de la nouvelle architecture

1. **♿ Accessibilité parfaite** : Formulaire complet et autonome
2. **🔄 Réutilisabilité** : Formulaire utilisable dans d'autres vues
3. **🧪 Testabilité** : Composants isolés et testables individuellement
4. **🎯 Séparation des responsabilités** : UI vs Logique métier vs Validation
5. **📱 Performance** : Pas de re-renders inutiles
6. **🔧 Maintenabilité** : Code clair et logique centralisée

## 📁 Structure des fichiers

```
src/
├── components/
│   ├── AccommodationForm.vue      # Formulaire autonome avec validation
│   └── AccommodationDialog.vue    # Dialog UI avec transmission
├── views/
│   └── AccommodationsView.vue     # Vue principale avec logique métier
├── config/
│   └── design-system.ts           # Configuration centralisée
└── styles/
    └── design-system.css          # Styles globaux
```

## 🔧 Développement futur

### **Composants à créer**

- `AccommodationCard.vue` : Carte d'hébergement réutilisable
- `AccommodationList.vue` : Liste avec pagination
- `AccommodationFilters.vue` : Filtres de recherche

### **Améliorations possibles**

- Validation côté client avec Zod ou Yup
- Tests unitaires pour chaque composant
- Storybook pour la documentation des composants
- Composants génériques (GenericForm, GenericDialog)

## 📚 Bonnes pratiques

1. **Props validation** : Toujours typer les props avec TypeScript
2. **Événements** : Utiliser des noms explicites et documentés
3. **Accessibilité** : Respecter les standards RGAA
4. **Design system** : Utiliser les classes et variables centralisées
5. **Performance** : Éviter les re-renders inutiles avec `computed` et `watch`
6. **Séparation des responsabilités** : Un composant = une responsabilité claire

## 🎯 Exemples d'utilisation

### **Utilisation simple du formulaire :**

```vue
<AccommodationForm
  v-model="formData"
  :is-editing="false"
  @submit="handleFormSubmit"
/>
```

### **Utilisation avec le dialog :**

```vue
<AccommodationDialog
  v-model="showDialog"
  :accommodation="editingAccommodation"
  :loading="saving"
  @submit="saveAccommodation"
  @cancel="closeDialog"
/>
```

### **Gestion des événements :**

```typescript
const handleFormSubmit = (validatedData: AccommodationFormData) => {
  // Les données sont déjà validées par le formulaire
  console.log('Données validées:', validatedData)
  // Traitement métier...
}
```
