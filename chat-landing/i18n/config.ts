export const locales = ['en-US', 'es-ES', 'pt-BR', 'zh-CN', 'ru-RU'] as const;
export const defaultLocale = 'en-US';
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  'en-US': 'English (US)',
  'es-ES': 'Español',
  'pt-BR': 'Português (BR)',
  'zh-CN': '简体中文',
  'ru-RU': 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  'en-US': '🇺🇸',
  'es-ES': '🇪🇸',
  'pt-BR': '🇧🇷',
  'zh-CN': '🇨🇳',
  'ru-RU': '🇷🇺',
};
