import React, { createContext, useCallback, Context } from 'react';

import enDict from '@/dictionaries/en.json';
import ptDict from '@/dictionaries/pt.json';

import { i18n } from '@/i18n-config';

interface Props {
  locale: string;
}

export interface Provider {
  t: (text: string) => string;
  locale: string;
  locales: readonly string[];
  defaultLocale: string;
}

export const TranslationContext: Context<Provider> = createContext({} as any);

const TranslationProvider = ({ children, locale }: React.PropsWithChildren<Props>): JSX.Element => {
  const { locales, defaultLocale } = i18n;

  const t = useCallback((text: string) => {
    const dictionaries: { [key: string]: any } = {
      en: enDict,
      pt: ptDict,
    };

    return dictionaries[locale][text] || text;
  }, [locale]);

  return (
    <TranslationContext.Provider value={{ t, locale, locales, defaultLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
