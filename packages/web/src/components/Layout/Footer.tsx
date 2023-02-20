import Link from 'next/link';
import styled from 'styled-components';

import Container from '@/components/Layout/Container';
import { helpers } from '@/components/theme';

import LogoIcomp from '@root/public/img/logo-icomp.svg';

const SiteFooter = styled.footer`
  position: relative;
  z-index: 1;
`;

const Icomp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.theme.helpers.fontSize(14)}

  a {
    margin: 0 ${props => props.theme.helpers.toRem(15)};
    color: inherit;

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  svg {
    vertical-align: top;
  }
`;

const Footer = (): JSX.Element => {
  return (
    <SiteFooter data-aos="fade-down" data-aos-delay="400">
      <Container>

      </Container>
    </SiteFooter>
  );
};

export default Footer;
