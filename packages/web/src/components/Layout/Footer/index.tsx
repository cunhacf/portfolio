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

const FooterBlock = styled.div`
  flex-basis: 33.333%;
  flex-shrink: 0;

  @media screen and (max-width: 640px) {
    flex-basis: 48%;
  }

  &:nth-child(2) {
    text-align: center;

    @media screen and (max-width: 640px) {
      text-align: right;
    }
  }

  &:last-child {
    text-align: right;

    @media screen and (max-width: 640px) {
      text-align: left;
    }
  }
`;

const Footer = () => {
  return (
    <SiteFooter>
      <Container>
        <FooterBlock>
          <div>© {new Date().getFullYear()} Carlos Fernandes Cunha.<br/> 30.000.894 CARLOS FERNANDES CUNHA</div>
        </FooterBlock>

        <FooterBlock>
          <ThemeSwitcher />
        </FooterBlock>

        <FooterBlock>
          <LanguageSwitcher />
        </FooterBlock>
      </Container>
    </SiteFooter>
  );
};

export default Footer;
