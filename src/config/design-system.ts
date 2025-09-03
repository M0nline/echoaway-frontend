// Configuration centralisée du design system EchoAway
export const designSystem = {
  // Couleurs principales
  colors: {
    primary: '#006D77',
    secondary: '#83C5BE',
    accent: '#E29578',
    dark: '#006D77',
    'dark-page': '#EDF6F9',
    positive: '#21BA45',
    negative: '#C10015',
    info: '#31CCEC',
    warning: '#F2C037'
  },

  // Espacements cohérents
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },

  // Rayons de bordure
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px'
  },

  // Ombres
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 16px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 25px rgba(0, 109, 119, 0.15)',
    xl: '0 20px 60px rgba(0, 0, 0, 0.15)'
  },

  // Transitions
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    slow: 'all 0.5s ease'
  },

  // Typographie
  typography: {
    fontFamily: {
      primary: 'Roboto, sans-serif',
      secondary: 'Material Icons'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700
    }
  },

  // Breakpoints responsive
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 1024,
    lg: 1440,
    xl: 1920
  }
}

// Classes utilitaires CSS personnalisées
export const utilityClasses = {
  // Cartes
  card: {
    base: 'design-system-card',
    hover: 'design-system-card--hover',
    elevated: 'design-system-card--elevated'
  },

  // Boutons
  button: {
    primary: 'design-system-btn--primary',
    secondary: 'design-system-btn--secondary',
    outline: 'design-system-btn--outline'
  },

  // Formulaires
  form: {
    input: 'design-system-input',
    select: 'design-system-select',
    label: 'design-system-label'
  }
}

// Configuration Quasar personnalisée
export const quasarConfig = {
  brand: {
    primary: '#006D77',
    secondary: '#83C5BE',
    accent: '#E29578',
    dark: '#006D77',
    'dark-page': '#EDF6F9',
    positive: '#21BA45',
    negative: '#C10015',
    info: '#31CCEC',
    warning: '#F2C037'
  },
  
  // Composants personnalisés
  components: {
    QCard: {
      style: {
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }
    },
    QBtn: {
      style: {
        borderRadius: '8px',
        fontWeight: '500'
      }
    },
    QInput: {
      style: {
        borderRadius: '8px'
      }
    }
  }
}
