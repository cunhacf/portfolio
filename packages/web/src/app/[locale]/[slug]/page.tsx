import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { groq } from 'next-sanity';

import client from '@root/client';
import sanityImage from '@root/utils/sanityImage';

import PageComponent from './components/Page';

interface Params {
  slug: string;
  locale: string;
}

interface Props {
  config: SanitySiteConfig;
  page?: SanityPage;
}

export const generateStaticParams = async () => {
  const paths = await client.fetch(groq`
    *[_type == "page" && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current
  `);

  return paths.map((slug: string) => ({ slug }));
};

const getData = async (slug: string, locale: string): Promise<Props> => {
  const fetch = await client.fetch(groq`{
    "config": *[_type == "config" && language == $locale][0],
    "page": *[_type == "page" && $slug == slug.current][0]{
      language,
      _createdAt,
      _updatedAt,
      content,
      image{
        alt,
        asset->{
          ...,
          metadata
        }
      },
      slug,
      title,
      "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
        language,
        slug
      }
    }
  }`, { slug, locale }, { next: { revalidate: 60 } });

  const config = fetch.config;
  const page = fetch.page;

  return {
    config,
    page
  };
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { locale, slug } = params as Params;
  const { config, page } = await getData(slug, locale);

  if (!page) return null;

  const metadata: Metadata = {
    title: `${page.title} · ${config.title}`,
    openGraph: {
      title: `${page.title} · ${config.title}`
    },
    alternates: {
      canonical: `/${locale}/${page.slug.current}`,
      languages: {}
    }
  };

  page._translations?.forEach(translation => {
    if (translation.language === locale) return;

    metadata.alternates!.languages![translation.language as any] = `/${translation.language}/${translation.slug.current}`;
  });

  if (config.description) metadata.description = config.description;
  if (page.image) metadata.openGraph!.images = sanityImage(page.image).url();

  return metadata;
};

const Page = async ({ params }: { params: Params }) => {
  const { locale, slug } = params;
  const { page } = await getData(slug, locale);

  if (!page) return notFound();

  return <PageComponent page={page} />;
}

export default Page;
