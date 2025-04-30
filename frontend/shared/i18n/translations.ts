import { Language } from './LanguageContext';

export type TranslationKey = keyof typeof translations['en'];

export const translations = {
  en: {
    // Common
    'welcome': 'Welcome to NNIA',
    'save': 'Save',
    'cancel': 'Cancel',
    'next': 'Next',
    'previous': 'Previous',
    'finish': 'Finish',
    
    // Setup
    'setup.title': 'NNIA Setup',
    'setup.description': 'Customize your AI assistant to fit your business needs',
    'setup.businessInfo': 'Business Information',
    'setup.businessName': 'Business Name',
    'setup.industry': 'Industry',
    'setup.email': 'Email',
    
    // Integrations
    'integrations.title': 'Integrations',
    'integrations.shopify': 'Shopify',
    'integrations.whatsapp': 'WhatsApp Business',
    'integrations.email': 'Email',
  },
  es: {
    // Common
    'welcome': 'Bienvenido a NNIA',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'next': 'Siguiente',
    'previous': 'Anterior',
    'finish': 'Finalizar',
    
    // Setup
    'setup.title': 'Configuración de NNIA',
    'setup.description': 'Personaliza tu asistente de IA para que se adapte a las necesidades de tu negocio',
    'setup.businessInfo': 'Información del Negocio',
    'setup.businessName': 'Nombre de la Empresa',
    'setup.industry': 'Industria',
    'setup.email': 'Email',
    
    // Integrations
    'integrations.title': 'Integraciones',
    'integrations.shopify': 'Shopify',
    'integrations.whatsapp': 'WhatsApp Business',
    'integrations.email': 'Email',
  }
} as const;

export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[language][key];
} 