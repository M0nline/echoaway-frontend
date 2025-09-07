# Organisation des Styles - EchoAway

## 📁 Structure des fichiers

```
src/styles/
├── design-system.css          # Design system principal avec variables CSS
├── components/
│   └── layout.css            # Styles pour Header et Footer
└── README.md                 # Cette documentation
```

## 🎯 Bonnes pratiques appliquées

### **1. Séparation des responsabilités**

- **`design-system.css`** : Variables CSS, typographie, styles globaux
- **`components/layout.css`** : Styles spécifiques aux composants de layout
- **Composants Vue** : Logique uniquement, pas de styles scoped

### **2. Nommage des classes CSS**

- **Préfixe `echoaway-`** : Évite les conflits avec d'autres librairies
- **Nommage sémantique** : `.echoaway-header`, `.echoaway-footer`
- **Hiérarchie claire** : `.echoaway-header-content`, `.echoaway-nav-link`

### **3. Variables CSS centralisées**

```css
:root {
  --echoaway-primary: #e29578;
  --echoaway-secondary: #ffddd2;
  --echoaway-accent: #006d77;
  /* ... */
}
```

### **4. Design Tokens**

```css
:root {
  --border-radius-organic: 12px;
  --shadow-soft: 0 2px 8px rgba(226, 149, 120, 0.1);
  --transition-organic: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
```

## 🔄 Avantages de cette approche

### **✅ Maintenance**

- **Styles centralisés** : Modification en un seul endroit
- **Cohérence** : Même look & feel sur tous les composants
- **Réutilisabilité** : Classes CSS réutilisables

### **✅ Performance**

- **Moins de duplication** : Styles partagés
- **Bundle optimisé** : CSS global plus efficace
- **Cache** : Styles globaux mis en cache

### **✅ Développement**

- **Debugging facile** : Styles dans des fichiers dédiés
- **Collaboration** : Designers peuvent modifier les styles
- **Évolutivité** : Facile d'ajouter de nouveaux composants

## 🚀 Utilisation

### **Dans les composants Vue**

```vue
<template>
  <header class="echoaway-header">
    <div class="echoaway-header-content">
      <!-- Contenu -->
    </div>
  </header>
</template>

<script setup lang="ts">
// Logique uniquement
</script>
<!-- Pas de <style> scoped -->
```

### **Ajout de nouveaux composants**

1. Créer le fichier CSS dans `src/styles/components/`
2. L'importer dans `design-system.css`
3. Utiliser les classes avec le préfixe `echoaway-`

## 📱 Responsive Design

### **Approche Desktop First**

```css
/* Styles de base pour desktop */

@media (max-width: 1024px) {
  /* Tablette */
}

@media (max-width: 768px) {
  /* Mobile */
}

@media (max-width: 480px) {
  /* Petit mobile */
}
```

## ♿ Accessibilité RGAA

### **Focus States**

```css
.echoaway-nav-link:focus {
  outline: 2px solid var(--echoaway-accent);
  outline-offset: 2px;
}
```

### **Contrastes**

- Toutes les couleurs respectent les ratios WCAG AA
- Variables CSS pour faciliter les ajustements

## 🎨 Design System "Low Radiation"

### **Esthétique organique**

- Transitions douces avec `cubic-bezier`
- Ombres subtiles avec la couleur primaire
- Bordures arrondies naturelles
- Palette de couleurs apaisantes

### **Typographie**

- **Merriweather** (serif) pour les titres
- **Lato** (sans-serif) pour les textes
- Line-height optimisé pour la lisibilité
