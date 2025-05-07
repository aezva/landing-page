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

    // Billing
    'billing.title': 'Credits and Subscription',
    'billing.description': 'Manage your credits and subscription plan',

    // Conversations
    'conversations.title': 'Conversations',
    'conversations.empty': 'No conversations yet',

    // Settings
    'settings.title': 'NNIA Settings',
    'settings.personalization': 'NNIA Personalization',
    'settings.assistantName': 'Assistant Name',
    'settings.description': 'Description',
    'settings.integration': 'Integration Settings',
    'settings.enableWidget': 'Enable Chat Widget',

    // Support
    'support.title': 'Support',
    'support.description': 'Get help and contact support'
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

    // Billing
    'billing.title': 'Créditos y Suscripción',
    'billing.description': 'Administra tus créditos y plan de suscripción',

    // Conversations
    'conversations.title': 'Conversaciones',
    'conversations.empty': 'No hay conversaciones aún',

    // Settings
    'settings.title': 'Configuración de NNIA',
    'settings.personalization': 'Personalización de NNIA',
    'settings.assistantName': 'Nombre del Asistente',
    'settings.description': 'Descripción',
    'settings.integration': 'Configuración de Integración',
    'settings.enableWidget': 'Habilitar Widget de Chat',

    // Support
    'support.title': 'Soporte',
    'support.description': 'Obtén ayuda y contacta a soporte'
  }
} as const;

export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[language][key];
} 