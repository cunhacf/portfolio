import { Viewport } from 'next';
import { groq } from 'next-sanity';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google'

import Layout from '@/components/Layout';

import favicon from '@/assets/img/favicon.png';

import client from '@root/client';
import StyledComponentsRegistry from '@root/utils/Registry';

interface Params {
  locale: string;
}

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
}

const generalSans = localFont({
  src: [
    {
      path: '../../assets/fonts/GeneralSans/GeneralSans-Variable.woff2',
      style: 'normal',
      weight: '1 999'
    },
    {
      path: '../../assets/fonts/GeneralSans/GeneralSans-VariableItalic.woff2',
      style: 'italic',
      weight: '1 999'
    },
  ],
  variable: '--font-general-sans',
});

const getData = async (locale: string): Promise<Props> => {
  const fetch = await client.fetch(groq`{
    "config": *[_type == "config" && language == $locale][0],
    "navigation": *[_type == "navigation" && !(_id in path("drafts.**")) && language == $locale] | order(orderRank asc){
      _id,
      title,
      external,
      externalUrl,
      blank,
      internalPage->
    }
  }`, { locale }, { next: { revalidate: 60 } });

  const config = fetch.config;
  const navigation = fetch.navigation;

  return {
    config,
    navigation
  };
};

export const generateViewport = (): Viewport => {
  return {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
      { media: '(prefers-color-scheme: dark)', color: '#1D1D1F' },
    ],
  }
};

const RootLayout = async ({ params, children }: React.PropsWithChildren<{ params: Params }>) => {
  const { locale } = params;
  const { config, navigation } = await getData(locale);

  return (
    <html lang={locale}>
      <link rel="icon" href={favicon.src} type="image/x-icon" />
      <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />

      <link rel="me" href="https://mastodon.social/@cunhacf" />

      <body className={generalSans.variable}>
        <StyledComponentsRegistry>
          <Layout locale={locale} config={config} navigation={navigation}>
            {children}
          </Layout>
        </StyledComponentsRegistry>
      </body>

      <GoogleAnalytics gaId="G-H94G76SZVS" />
    </html>
  );
};

export default RootLayout;
