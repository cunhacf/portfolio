import { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { groq } from 'next-sanity';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Layout from '@/components/Layout';
import Section, { SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';

import client from '@root/client';

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
}

const Content = styled.div`
  h1 {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Error404Page: NextPage<Props> = ({
  config,
  navigation,
}: Props) => {
  const { t } = useTranslation('common');

  return (
    <Layout config={config} navigation={navigation}>
      <Head>
        <title>{t('error404Title').toString()} &middot; {config.title}</title>
        {config.description && <meta name="description" content={config.description} />}

        <meta property="og:title" content={`${t('error404Title')} &middot; ${config.title}`} key="og-title" />
        {config.description && <meta property="og:description" content={config.description} key="og-description" />}
      </Head>

      <Content>
        <Container>
          <Section>
            <SectionHeader>
              <h1>{t('error404Title')}</h1>
              <p>{t('error404Text')}</p>
            </SectionHeader>
          </Section>
        </Container>
      </Content>
    </Layout>
  )
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const fetch = await client.fetch(groq`{
    "config": coalesce(
      *[_type == "config" && _id == 'config__i18n_' + $locale][0],
      *[_type == "config" && _id == 'config'][0]
    ),
    "navigation": *[_type == "navigation" && !(_id in path("drafts.**")) && __i18n_lang == $locale] | order(orderRank asc){
      _id,
      title,
      external,
      externalUrl,
      blank,
      internalPage->
    },
  }`, { currentDate: new Date().toISOString().replace(/T.*/, ''), locale });

  const config = fetch.config;
  const navigation = fetch.navigation;

  return {
    props: {
      config,
      navigation,
      ...(await serverSideTranslations(locale as string, [
        'common'
      ]))
    },
    revalidate: 60
  }
};

export default Error404Page;
