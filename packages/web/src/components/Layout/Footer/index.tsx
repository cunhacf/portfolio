import styled from 'styled-components';

import Container from '@/components/Layout/Container';

import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

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
      flex-wrap: wrap;
      grid-gap: 10px;
    }
  }
`;

const Copyright = styled.div``;

const Footer = (): JSX.Element => {
  return (
    <SiteFooter>
      <Container>
        <Copyright>© {new Date().getFullYear()} Carlos Fernandes Cunha</Copyright>

        <ThemeSwitcher />
        <LanguageSwitcher />
      </Container>
    </SiteFooter>
  );
};

export default Footer;
