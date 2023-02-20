import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import styled, { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished';
import { groq } from 'next-sanity';
import { ParsedUrlQuery } from 'querystring';
import { PortableText, PortableTextReactComponents, toPlainText } from '@portabletext/react';

import Layout, { Container } from '@/components/Layout';
import Highlights from '@root/src/components/pages/page/Highlights';

import client from '@root/client';
import sanityImage from '@root/utils/sanityImage';
import Section, { SectionContent, SectionHeader } from '@root/src/components/Section';

import bgBlog from '@root/public/img/bg-blog.jpg';

interface Params extends ParsedUrlQuery {
  type: string;
}

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
  page: SanityPage;
}

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${bgBlog.src});
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

const Post = styled.article`
  margin-top: ${props => props.theme.helpers.toRem(58)};
  display: flex;

  @media screen and (max-width: 1200px) {
    margin-top: 30px;
    display: block;
  }
`;

const PostImage = styled.div`
  width: 42.7%;
  margin-right: ${props => props.theme.helpers.toRem(90)};
  flex-shrink: 0;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: top;
  }
`;

const PostContent = styled.div`
  margin: 0 ${props => props.theme.helpers.toRem(64)} 0 0;
  flex-grow: 1;
  ${props => props.theme.helpers.fontSize(25)}
  color: ${props => lighten(0.44, props.theme.colors.secondary)};

  @media screen and (max-width: 1200px) {
    margin: 30px 0 0 0;
  }

  h1,
  h2 {
    margin: 0 0 ${props => props.theme.helpers.toRem(46)};
    ${props => props.theme.helpers.fontSize(60)}
    font-weight: 700;
    color: ${props => props.theme.colors.main};
  }
`;

const RelatedPosts = styled(Section)`
  margin: ${props => props.theme.helpers.toRem(122)} 0 ${props => props.theme.helpers.toRem(46)};
`;

const BlogPost: NextPage<Props> = ({ config, navigation, page }: Props) => {
  const components: { marks: PortableTextReactComponents['marks'] } = {
    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        const target = !value.href.startsWith('/') ? '_blank' : '';

        return (
          <a href={value.href} rel={rel} target={target}>
            {children}
          </a>
        )
      }
    }
  };

  return (
    <Layout navigation={navigation}>
      <GlobalStyle />

      <Head>
        <title>{page.title} &middot; {config.title || 'Léo Magalhães'}</title>
        <meta name="description" content={`${toPlainText(page.content).substring(0, 200)}...` || config.description || 'Coragem, determinação, talento e carisma, elementos que se encaixaram na vida de um garoto chamando Léo Magalhães.'} />

        <meta property="og:title" content={`${page.title} &middot; ${config.title || 'Léo Magalhães'}`} key="og-title" />
        <meta property="og:description" content={`${toPlainText(page.content).substring(0, 200)}...` || config.description || 'Coragem, determinação, talento e carisma, elementos que se encaixaram na vida de um garoto chamando Léo Magalhães.'} key="og-description" />
        <meta property="og:image" content={sanityImage(page.image || '').url()} key="og-image" />
      </Head>

      <Section>
        <Container>
          <SectionHeader>
            <h2 data-aos="fade-down">{page.title.toLocaleLowerCase()}</h2>
          </SectionHeader>

          <SectionContent data-aos="fade-up" data-aos-delay="400">
            <Post>
              {page.image && <PostImage>
                <Image
                  width={700}
                  height={740}
                  src={sanityImage(page.image).width(700).height(740).url()}
                  alt={`Imagem da pageagem "${page.title}"`} />
              </PostImage>}

              <PostContent>
                <PortableText value={page.content} components={components} />
              </PostContent>
            </Post>
          </SectionContent>
        </Container>
      </Section>

      {page.highlightsBlock.highlights.length > 0 && <RelatedPosts data-aos="fade-up">
        <Container>
          <SectionHeader>
            <h3>{page.highlightsBlock.title}</h3>
          </SectionHeader>

          <SectionContent>
            <Highlights highlights={page.highlightsBlock.highlights} />
          </SectionContent>
        </Container>
      </RelatedPosts>}
    </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(groq`
    *[_type == "page" && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current
  `);

  return {
    paths: slugs.map((slug: string) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params as Params;

  const fetch = await client.fetch(groq`{
    "config": *[_type == "config" && _id == 'config'][0],
    "navigation": *[_type == "navigation" && !(_id in path("drafts.**"))] | order(orderRank asc){
      _id,
      title,
      external,
      externalUrl,
      blank,
      internalPage->,
    },
    "page": *[_type == "page" && $slug == slug.current][0]
  }`, { slug });

  const config = fetch.config;
  const navigation = fetch.navigation;
  const page = fetch.page;

  if (!page) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      config,
      navigation,
      page,
    },
    revalidate: 60
  }
};

export default BlogPost;
