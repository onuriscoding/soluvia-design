import 'server-only';

const dictionaries = {
  en: () => import('@/lib/i18n/en.json').then((module) => module.default),
  fr: () => import('@/lib/i18n/fr.json').then((module) => module.default),
};

type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: string | Promise<string>) => {
  // Ensure locale is resolved if it's a promise
  const resolvedLocale = await Promise.resolve(locale);
  
  // Check if the locale is valid (either 'en' or 'fr')
  const validLocale = (Object.keys(dictionaries).includes(resolvedLocale)) ? resolvedLocale as Locale : 'en';
  
  return dictionaries[validLocale]();
}; 