import Link from 'next/link';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import Logo from '@root/public/img/logo.svg';

import Container from '@/components/Layout/Container';
import LinkButton from '@/components/Layout/LinkButton';

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

`;

const Header = ({ config, navigation }: Props): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <SiteHeader>
      <Container>
        <HeaderBlock>
          <LogoWrap>
            <Link href="/">
              <Logo
                width={50}
                height={50} />
            </Link>
          </LogoWrap>
        </HeaderBlock>

        <HeaderBlock>
          <Menu items={navigation} />
        </HeaderBlock>

        <HeaderBlock>
          <LinkButton href={config.contactUrl} muted>{t('contactButtonLabel')}</LinkButton>
        </HeaderBlock>
      </Container>
    </SiteHeader>
  );
};

export default Header;
