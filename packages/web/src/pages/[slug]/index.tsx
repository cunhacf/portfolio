import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import styled from 'styled-components';
import { groq } from 'next-sanity';
import { ParsedUrlQuery } from 'querystring';
import { PortableText, PortableTextReactComponents, toPlainText } from '@portabletext/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { Container } from '@/components/Layout';

import client from '@root/client';
import sanityImage from '@root/utils/sanityImage';
import Section, { SectionContent as PageContent, SectionHeader } from '@root/src/components/Section';

interface Params extends ParsedUrlQuery {
  type: string;
}

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
  page: SanityPage;
}

const PageHeader = styled(SectionHeader)`
  h1 {
    color: ${props => props.theme.colors.secondary};
  }
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
    <Layout config={config} navigation={navigation}>

      <Head>
        <title>{page.title} &middot; {config.title}</title>
        <meta name="description" content={`${toPlainText(page.content).substring(0, 200)}...` || config.description} />

        <meta property="og:title" content={`${page.title} &middot; ${config.title}`} key="og-title" />
        <meta property="og:description" content={`${toPlainText(page.content).substring(0, 200)}...` || config.description} key="og-description" />
        {page.image && <meta property="og:image" content={sanityImage(page.image).url()} key="og-image" />}

        {page.__i18n_base && <link rel="alternate" hrefLang={page.__i18n_base.__i18n_lang} href={`/${(page.__i18n_base as SanityPage).slug.current}`} />}
        {page.__i18n_refs?.map(i18nRef => <link key={i18nRef.__i18n_lang} rel="alternate" hrefLang={i18nRef.__i18n_lang} href={`/${i18nRef.__i18n_lang}/${(i18nRef as SanityPage).slug.current}`} />)}
      </Head>

      <Section>
        <Container>
          <PageHeader>
            <h1>{page.title}</h1>
          </PageHeader>

          <PageContent>
            <PortableText value={page.content} components={components} />
          </PageContent>
        </Container>
      </Section>
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

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
  const { slug } = params as Params;

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
    "page": *[_type == "page" && $slug == slug.current][0]{
      __i18n_lang,
      __i18n_refs[]->,
      __i18n_base->,
      _createdAt,
      _updatedAt,
      content,
      image,
      slug,
      title
    }
  }`, { slug, locale });

  const config = fetch.config;
  const navigation = fetch.navigation;
  const page = fetch.page;

  if (page?.__i18n_lang !== locale) {
    const localeRef = page?.__i18n_base
      ? page?.__i18n_base
      : page?.__i18n_refs.find((ref: SanityDocument) => ref.__i18n_lang === locale);

    if (localeRef) {
      return {
        redirect: {
          destination: page?.__i18n_base ? `/${localeRef.slug.current}` : `/${locale}/${localeRef.slug.current}`,
          permanent: false
        }
      }
    }
  }

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
      ...(await serverSideTranslations(locale as string, [
        'common'
      ]))
    },
    revalidate: 60
  }
};

export default BlogPost;
