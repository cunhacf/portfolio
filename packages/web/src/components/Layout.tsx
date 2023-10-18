'use client'
import { useEffect, useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { rgba } from 'polished';

import { lightTheme, darkTheme } from '@/components/theme';

import Header from './Header';
import Footer from './Footer';
import Container from './Container';
import { TranslationProvider } from './Translation';

type AppTheme = 'light' | 'dark' | string;

interface Props {
  locale: string;
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
  fillHeight?: boolean;
  noHeader?: boolean;
  noFooter?: boolean;
  noScroll?: boolean;
}

const GlobalStyle = createGlobalStyle`
  ::selection {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.main};
  }

  ::-webkit-selection {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.main};
  }

  ::-moz-selection {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.main};
  }

  html,
  body {
    min-height: stretch;
    margin: 0;
    padding: 0;
    font-family: var(--font-general-sans);
    font-size: 16px;
    background-color: ${props => props.theme.colors.bg};
    color: ${props => props.theme.colors.mainDark};

    @media screen and (max-width: 960px) {
      font-size: 15px;
    }
  }

  body {
    margin: 0 auto;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.secondary};
    transition: all 0.2s;

    &:focus,
    &:hover {
      color: ${props => props.theme.colors.mainDark};
    }
  }

  svg {
    fill: currentColor;
  }

  code {
    padding: ${props => props.theme.helpers.toRem(3)} ${props => props.theme.helpers.toRem(6)};
    border-radius: 10px;
    font-size: 0.9em;
    font-family: IBM Plex Mono, monospace;
    background: ${props => rgba(props.theme.colors.mainDark, 0.1)};
  }

  blockquote {
    min-height: ${props => props.theme.helpers.toRem(50)};
    margin-left: 0;
    margin-right: 0;
    padding: 0.8em 4em 0.8em 1em;
    position: relative;
    border-width: ${props => props.theme.helpers.toRem(1)} ${props => props.theme.helpers.toRem(1)} ${props => props.theme.helpers.toRem(1)} ${props => props.theme.helpers.toRem(4)};
    border-style: solid;
    border-color: ${props => rgba(props.theme.colors.main, 0.1)};
    border-radius: ${props => props.theme.helpers.toRem(10)};
    background: ${props => rgba(props.theme.colors.main, 0.02)};
    overflow: hidden;

    &:after {
      content: '”';
      position: absolute;
      top: ${props => props.theme.helpers.toRem(-10)};
      right: ${props => props.theme.helpers.toRem(10)};
      font-size: ${props => props.theme.helpers.toRem(90)};
      opacity: 0.3;
    }
  }

  #__next {
    min-height: stretch;
    display: flex;
    flex-direction: column;
  }
`;

const Content = styled.main`
`;

const Layout = ({
  locale,
  config,
  navigation,
  children,
}: React.PropsWithChildren<Props>) => {
  const [theme, setTheme] = useState<AppTheme>('light');

  useEffect(() => {
    if (!window) return;

    const preferredTheme: AppTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const storageTheme: AppTheme = localStorage.getItem('theme') as string;

    window.addEventListener('storage', () => {
      if (!localStorage.getItem('theme')) return;

      setTheme(localStorage.getItem('theme') as string);
    });

    setTheme(storageTheme || preferredTheme || 'light');
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <TranslationProvider locale={locale}>
        <Header config={config} navigation={navigation} />

        <Content>
          {children}
        </Content>

        <Footer />

        <GlobalStyle />
      </TranslationProvider>
    </ThemeProvider>
  );
};

export { Container };

export default Layout;
