import { useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Wrap = styled.div`
  @media screen and (max-width: 640px) {
    flex-basis: 100%;
  }
`;

const LanguageSwitcher = (): JSX.Element => {
  const router = useRouter();
  const { i18n: { language } } = useTranslation();

  const languageNames: { [key: string]: string } = {
    en: 'English',
    pt: 'Português'
  };

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = router.asPath;

    return router.push(path, path, { locale: e.target.value });
  }, [router]);

  return (
    <Wrap>
      <select
        name="language"
        onChange={handleLanguageChange}
        defaultValue={language}>

        {router.locales?.map(locale => (
          <option key={`locale-${locale}`} value={locale}>{languageNames[locale]}</option>
        ))}
      </select>
    </Wrap>
  );
};

export default LanguageSwitcher;
