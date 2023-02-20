import { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { groq } from 'next-sanity';

import Layout from '@/components/Layout';

import Header from '@/components/pages/index/Header';
import Events from '@/components/pages/index/Events';
import Work from '@/components/pages/index/Work';
import Posts from '@/components/pages/index/Posts';
import Videos from '@/components/pages/index/Videos';
import Discography from '@/components/pages/index/Discography';
import Gallery from '@/components/pages/index/Gallery';
import Fans from '@/components/pages/index/Fans';
import Contact from '@/components/pages/index/Contact';

import client from '@root/client';

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
  homePage: SanityHomePage;
  posts: SanityBlogPost[];
  work: SanityWork[];
}

const Content = styled.div``;

const HomePage: NextPage<Props> = ({
  config,
  navigation,
  homePage,
  work
}: Props) => {
  const [documentLoaded, setDocumentLoaded] = useState(false);

  useEffect(() => {
    setDocumentLoaded(true);
  }, []);

  return (
    <Layout navigation={navigation}>

      <Head>
        <title>{config.title || 'Léo Magalhães'}</title>
        <meta name="description" content={config.description || 'Coragem, determinação, talento e carisma, elementos que se encaixaram na vida de um garoto chamando Léo Magalhães.'} />

        <meta property="og:title" content={config.title || 'Léo Magalhães'} key="og-title" />
        <meta property="og:description" content={config.description || 'Coragem, determinação, talento e carisma, elementos que se encaixaram na vida de um garoto chamando Léo Magalhães.'} key="og-description" />
      </Head>

      <Content>
        <Header
          section={homePage.header}
          config={config} />

        {homePage.contentBlocks.map(contentBlock => {
          switch (contentBlock.blockType) {
            case 'work':
              return (
                <Work
                  section={contentBlock}
                  work={work} />
              )
            case 'projects':
              return (
                <Work
                  section={contentBlock}
                  work={work} />
              )
            case 'contact':
              return (
                <Work
                  section={contentBlock}
                  work={work} />
              )
          }
        })}

        {/* {documentLoaded && <Events
          section={homePage.events}
          events={events} />}

        <Posts
          section={homePage.posts}
          highlights={homePage.posts?.posts}
          posts={posts} />

        <Videos
          config={config}
          section={homePage.videos}
          highlights={homePage.videos?.videos}
          videos={videos} />

        <Discography
          section={homePage.discography}
          records={records} />

        <Gallery
          section={homePage.gallery}
          galleries={galleries} />

        <Fans
          section={homePage.fans} />

        <Contact
          config={config}
          section={homePage.contact} /> */}
      </Content>
    </Layout>
  )
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const fetch = await client.fetch(groq`{
    "config": *[_type == "config" && _id == 'config'][0],
    "navigation": *[_type == "navigation" && !(_id in path("drafts.**"))] | order(orderRank asc){
      _id,
      title,
      external,
      externalUrl,
      blank,
      internalPage->
    },
    "homePage": *[_type == "homePage" && _id == 'homePage'][0]{
      header,
      contentBlocks
    },
    "posts": *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(date asc),
    "work": *[_type == "work" && !(_id in path("drafts.**"))] | order(orderRank asc),
  }`, { currentDate: new Date().toISOString().replace(/T.*/, '') });

  const config = fetch.config;
  const navigation = fetch.navigation;
  const homePage = fetch.homePage;
  const posts = fetch.posts;
  const work = fetch.work;

  return {
    props: {
      config,
      navigation,
      homePage,
      posts,
      work,
    },
    revalidate: 60
  }
};

export default HomePage;
