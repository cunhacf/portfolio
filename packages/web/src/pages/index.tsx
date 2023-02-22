import { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { groq } from 'next-sanity';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/Layout';

import Header from '@/components/pages/index/Header';
import Work from '@/components/pages/index/Work';
import Projects from '@/components/pages/index/Projects';
import Contact from '@/components/pages/index/Contact';

import client from '@root/client';
import sanityImage from '@root/utils/sanityImage';

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
  homePage: SanityHomePage;
  work: SanityWork[];
  projects: SanityProject[];
}

const Content = styled.div``;

const HomePage: NextPage<Props> = ({
  config,
  navigation,
  homePage,
  work,
  projects,
}: Props) => {
  return (
    <Layout config={config} navigation={navigation}>
      <Head>
        <title>{config.title}</title>
        {config.description && <meta name="description" content={config.description} />}

        <meta property="og:title" content={config.title} key="og-title" />
        {config.description && <meta property="og:description" content={config.description} key="og-description" />}
        {homePage.header.image && <meta property="og:image" content={sanityImage(homePage.header.image).url()} key="og-image" />}
      </Head>

      <Content>
        <Header
          section={homePage.header}
          config={config} />

        {homePage.contentBlocks?.map(contentBlock => {
          switch (contentBlock.blockType) {
            case 'work':
              return (
                <Work
                  section={contentBlock}
                  work={work} />
              )
            case 'projects':
              return (
                <Projects
                  section={contentBlock}
                  projects={projects} />
              )
            case 'contact':
              return (
                <Contact
                  section={contentBlock}
                  config={config} />
              )
          }
        })}
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
    "homePage": coalesce(
      *[_type == "homePage" && _id == 'homePage__i18n_' + $locale][0],
      *[_type == "homePage" && _id == 'homePage'][0]
    ),
    "work": *[_type == "work" && !(_id in path("drafts.**")) && __i18n_lang == $locale] | order(orderRank asc),
    "projects": *[_type == "project" && !(_id in path("drafts.**")) && __i18n_lang == $locale] | order(orderRank asc),
  }`, { currentDate: new Date().toISOString().replace(/T.*/, ''), locale });

  const config = fetch.config;
  const navigation = fetch.navigation;
  const homePage = fetch.homePage;
  const work = fetch.work;
  const projects = fetch.projects;

  return {
    props: {
      config,
      navigation,
      homePage,
      work,
      projects,
      ...(await serverSideTranslations(locale as string, [
        'common'
      ]))
    },
    revalidate: 60
  }
};

export default HomePage;
