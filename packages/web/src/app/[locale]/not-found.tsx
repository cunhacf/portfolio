import type { Metadata } from 'next';
import { groq } from 'next-sanity';

import client from '@root/client';
import sanityImage from '@root/utils/sanityImage';

import NotFoundPage from './components/NotFoundPage';

interface Params {
  locale: string;
}

interface Props {
  config: SanitySiteConfig;
  homePage: SanityHomePage;
}

const getData = async (locale: string): Promise<Props> => {
  const fetch = await client.fetch(groq`{
    "config": *[_type == "config" && language == $locale][0],
    "homePage": *[_type == "homePage" && language == $locale][0],
  }`, { locale }, { next: { revalidate: 60 } });

  const config = fetch.config;
  const homePage = fetch.homePage;

  return {
    config,
    homePage,
  };
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { locale } = params as Params;
  const { config, homePage } = await getData(locale);

  const metadata: Metadata = {
    title: `404 · ${config.title}`,
    openGraph: {
      title: `404 · ${config.title}`
    }
  };

  if (config.description) metadata.description = config.description;
  if (homePage.header.image) metadata.openGraph!.images = sanityImage(homePage.header.image).url();

  return metadata;
};

const Page = () => {
  return <NotFoundPage />
};

export default Page;
