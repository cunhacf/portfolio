import { useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from '@/components/Translation';

const Wrap = styled.div`
  @media screen and (max-width: 640px) {
    flex-basis: 100%;
  }
`;

const LanguageSwitcher = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { locales, locale } = useTranslation();

  const languageNames: { [key: string]: string } = {
    en: 'English',
    pt: 'Português'
  };

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    return router.push(
      slug
        ? `/${e.target.value}/${slug}`
        : `/${e.target.value}`
    );
  }, [slug, router]);

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
