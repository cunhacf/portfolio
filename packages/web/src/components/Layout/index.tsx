import styled, { css } from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import Container from './Container';

interface Props {
  navigation: SanityNavigation[];
  fillHeight?: boolean;
  noHeader?: boolean;
  noFooter?: boolean;
  noScroll?: boolean;
}

const Content = styled.main<Omit<Props, 'navigation'>>`
  ${props => props.noScroll && css`
    overflow: hidden;
  `};

  ${props => props.fillHeight && css`
    position: relative;
    flex-grow: 1;

    & + footer {
      padding-top: 0;
    }
  `}
`;

const Layout = ({ navigation, fillHeight, noHeader, noFooter, noScroll, children }: React.PropsWithChildren<Props>): JSX.Element => {
  return (
    <>
      {!noHeader && <Header navigation={navigation} />}

      <Content
        noHeader={noHeader}
        fillHeight={fillHeight}
        noScroll={noScroll}>

        {children}
      </Content>

      {!noFooter && <Footer />}
    </>
  );
};

export {
  Container,
}

export default Layout;
