'use client'
import styled from 'styled-components';

import Logo from '@/assets/img/logo.svg';

import Container from '@/components/Container';
import LinkButton from '@/components/LinkButton';
import { useTranslation } from '@/components/Translation';

import Menu from './Menu';

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
}

const SiteHeader = styled.header`
  padding: 30px 0;

  ${Container} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    justify-content: center;
  }

  &:last-child {
    justify-content: flex-end;
  }
`;

const LogoWrap = styled.div`
  color: ${props => props.theme.colors.secondary};
`;

const Header = ({ config, navigation }: Props) => {
  const { t } = useTranslation();

  return (
    <SiteHeader>
      <Container>
        <HeaderBlock>
          <LogoWrap>
            <Logo
              width={50}
              height={50}
              title="Logo" />
          </LogoWrap>
        </HeaderBlock>

        <HeaderBlock>
          <Menu items={navigation} />
        </HeaderBlock>

        <HeaderBlock>
          <LinkButton href={config?.contactUrl} muted>{t('contactButtonLabel')}</LinkButton>
        </HeaderBlock>
      </Container>
    </SiteHeader>
  );
};

export default Header;
