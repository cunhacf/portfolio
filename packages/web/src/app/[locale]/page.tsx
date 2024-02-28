import { Metadata } from 'next';
import { groq } from 'next-sanity';

import { i18n } from '@/i18n-config';

import client from '@root/client';
import sanityImage from '@root/utils/sanityImage';

import HomePage from './components/HomePage';

interface Params {
  locale: string;
}

interface Props {
  config: SanitySiteConfig;
  homePage: SanityHomePage;
  work: SanityWork[];
  projects: SanityProject[];
}

const getData = async (locale: string): Promise<Props> => {
  const fetch = await client.fetch(groq`{
    "config": *[_type == "config" && language == $locale][0],
    "homePage": *[_type == "homePage" && language == $locale][0]{
      ...,
      header{
        ...,
        image{
          alt,
          asset->{
            ...,
            metadata
          }
        }
      }
    },
    "work": *[_type == "work" && !(_id in path("drafts.**")) && language == $locale]{
      ...,
      cover{
        alt,
        asset->{
          ...,
          metadata
        }
      }
    } | order(orderRank asc),
    "projects": *[_type == "project" && !(_id in path("drafts.**")) && language == $locale]{
      ...,
      cover{
        alt,
        asset->{
          ...,
          metadata
        }
      }
    } | order(orderRank asc),
  }`, { locale }, { next: { revalidate: 60 } });

  const config = fetch.config;
  const homePage = fetch.homePage;
  const work = fetch.work;
  const projects = fetch.projects;

  return {
    config,
    homePage,
    work,
    projects,
  };
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { locale } = params as Params;
  const { config, homePage } = await getData(locale);
  const { locales } = i18n;

  const metadata: Metadata = {
    title: config.title,
    openGraph: {
      title: config.title
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {}
    }
  };

  locales.forEach(l => {
    if (locale === l) return;

    metadata.alternates!.languages![l] = `/${l}`;
  });

  if (config.description) metadata.description = config.description;
  if (homePage.header.image) metadata.openGraph!.images = sanityImage(homePage.header.image).url();

  return metadata;
};

const Page = async ({ params }: { params: Params }) => {
  const { locale } = params;
  const { homePage, work, projects, config } = await getData(locale);

  return <HomePage homePage={homePage} work={work} projects={projects} config={config} />;
};

export default Page;
