import styled, { css } from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
  fillHeight?: boolean;
  noHeader?: boolean;
  noFooter?: boolean;
  noScroll?: boolean;
}

const Content = styled.main`
`;

const Layout = ({
  config,
  navigation,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      <Header config={config} navigation={navigation} />

      <Content>
        {children}
      </Content>

      <Footer />
    </>
  );
};

export { Container };

export default Layout;
