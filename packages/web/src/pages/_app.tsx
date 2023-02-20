import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { rgba } from 'polished';
import { SWRConfig } from 'swr';

import AOS from 'aos';

import theme from '@/components/theme';

import logo from '@root/public/img/logo.png';

import 'aos/dist/aos.css';

const GlobalStyle = createGlobalStyle`
  ${props => props.theme.helpers.font('General Sans', 'GeneralSans-Regular')}
  ${props => props.theme.helpers.font('General Sans', 'GeneralSans-Medium', 500)}
  ${props => props.theme.helpers.font('General Sans', 'GeneralSans-Semibold', 600)}
  ${props => props.theme.helpers.font('General Sans', 'GeneralSans-Bold', 700)}

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
    font-family: General Sans;
    font-size: 16px;
    background-color: ${props => props.theme.colors.bg};
    color: ${props => props.theme.colors.mainDark};

    @media screen and (max-width: 960px) {
      font-size: 14px;
    }

    @media screen and (max-width: 768px) {
      font-size: 12px;
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

export default function App({ Component, pageProps }: AppProps) {
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => {
    if (res.status >= 400 && res.status < 600) throw new Error(res.statusText);
    return res.json();
  }).catch(err => { throw new Error(err); });

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ fetcher }}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

          <meta property="og:title" content="Léo Magalhães" key="og-title" />
          <meta property="og:description" content="Coragem, determinação, talento e carisma, elementos que se encaixaram na vida de um garoto chamando Léo Magalhães." key="og-description" />
          <meta property="og:image" content={logo.src} key="og-image" />
        </Head>

        <Component {...pageProps} />

        <GlobalStyle />
      </SWRConfig>
    </ThemeProvider>
  );
}
