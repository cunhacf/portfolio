import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Container from '@/components/Layout/Container';

const SiteFooter = styled.footer`
  margin-top: 20px;
  padding: 40px 0;
  position: relative;
  z-index: 1;

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 640px) {
      flex-direction: column;
      grid-gap: 10px;
    }
  }
`;

const Copyright = styled.div``;

const LanguageSelector = styled.div``;

const Footer = (): JSX.Element => {
  const router = useRouter();
  const { i18n: { language } } = useTranslation();

  console.log(language);

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([language], {
      type: 'language',
    });
  }, [language]);

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = router.asPath;

    return router.push(path, path, { locale: e.target.value });
  }, [router]);

  return (
    <SiteFooter>
      <Container>
        <Copyright>© {new Date().getFullYear()} Carlos Fernandes Cunha</Copyright>
        <LanguageSelector>
          <select
            name="language"
            onChange={handleLanguageChange}
            defaultValue={language}>

            {router.locales?.map(locale => (
              <option key={`locale-${locale}`} value={locale}>{languageNames.of(locale)}</option>
            ))}
          </select>
        </LanguageSelector>
      </Container>
    </SiteFooter>
  );
};

export default Footer;
