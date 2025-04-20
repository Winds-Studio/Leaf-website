import { computed } from 'vue';
import { useData } from 'vitepress';
import { translations } from '../../i18n/download';

type TranslationType = typeof translations['en'];
type NestedValue = string | Record<string, any>;

export function useTranslation() {
  const { lang } = useData();
  
  const t = computed(() => {
    const currentLang = lang.value;
    const fallbackLang = 'en';
    
    return (key: string) => {
      const keys = key.split('.');
      let value: NestedValue = translations[currentLang as keyof typeof translations] as TranslationType || translations[fallbackLang] as TranslationType;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k as keyof typeof value];
        } else {
          let fallbackValue: NestedValue = translations[fallbackLang] as TranslationType;
          for (const k2 of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && k2 in fallbackValue) {
              fallbackValue = fallbackValue[k2 as keyof typeof fallbackValue];
            } else {
              return key; 
            }
          }
          return fallbackValue as string;
        }
      }
      
      return value as string;
    };
  });
  
  return { t };
} 