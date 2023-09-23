import { useEffect } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

const PageSection = styled(Section)`
  margin-top: 20px;
`;

const PageHeader = styled(SectionHeader)`
  h1 {
    ${props => props.theme.helpers.fontSize(45)}
    color: ${props => props.theme.colors.secondary};
  }
`;

const Page: NextPage<Props> = ({ config, navigation, page }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (page?.language !== router.locale) {
      const localeRef: SanityPage | undefined = page?._translations?.find((ref: SanityDocument) => ref.language === router.locale) as SanityPage;

      if (localeRef) {
        router.push(
          router.defaultLocale === localeRef.language
            ? `/${localeRef.slug.current}`
            : `/${router.locale}/${localeRef.slug.current}`
        );
      }
    }
  }, [router, page]);

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
        <title>{`${page.title} · ${config.title}`}</title>
        <meta name="description" content={`${toPlainText(page.content).substring(0, 200)}...` || config.description} />

        <meta property="og:title" content={`${page.title} &middot; ${config.title}`} key="og-title" />
        <meta property="og:description" content={`${toPlainText(page.content).substring(0, 200)}...` || config.description} key="og-description" />
        {page.image && <meta property="og:image" content={sanityImage(page.image).url()} key="og-image" />}

        {page._translations?.map(translation => translation.language !== router.locale && <link
          key={translation.language}
          rel="alternate"
          hrefLang={translation.language}
          href={
            router.defaultLocale === translation.language
              ? `/${(translation as SanityPage).slug.current}`
              : `/${translation.language}/${(translation as SanityPage).slug.current}`
          } />)}
      </Head>

      <PageSection>
        <Container>
          <PageHeader>
            <h1>{page.title}</h1>
          </PageHeader>

          <PageContent>
            <PortableText value={page.content} components={components} />
          </PageContent>
        </Container>
      </PageSection>
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
    "config": *[_type == "config" && language == $locale][0],
    "navigation": *[_type == "navigation" && !(_id in path("drafts.**")) && language == $locale] | order(orderRank asc){
      _id,
      title,
      external,
      externalUrl,
      blank,
      internalPage->
    },
    "page": *[_type == "page" && $slug == slug.current][0]{
      language,
      _createdAt,
      _updatedAt,
      content,
      image,
      slug,
      title,
      "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
        language,
        slug
      }
    }
  }`, { slug, locale });

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
      ...(await serverSideTranslations(locale as string, [
        'common'
      ]))
    },
    revalidate: 60
  }
};

export default Page;
