import { useCallback } from 'react';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';

import { useTranslation } from '@/components/Translation';

const Wrap = styled.div`
  @media screen and (max-width: 640px) {
    flex-basis: 100%;
  }
`;

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale } = useTranslation();
  const path = usePathname();

  const languageNames: { [key: string]: string } = {
    en: 'English',
    pt: 'Português'
  };

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUrl = path.replace(new RegExp(`^\/${locale}`), `/${e.target.value}`);

    return router.push(newUrl);
  }, [locale, path, router]);

  return (
    <Wrap>
      <select
        name="language"
        onChange={handleLanguageChange}
        defaultValue={locale}>

        {locales?.map(locale => (
          <option key={`locale-${locale}`} value={locale}>{languageNames[locale]}</option>
        ))}
      </select>
    </Wrap>
  );
};

export default LanguageSwitcher;
