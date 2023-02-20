import { useEffect, useRef, useState } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Slider, { Settings as SliderSettings } from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished';
import { groq } from 'next-sanity';
import { ParsedUrlQuery } from 'querystring';

import Layout, { Container } from '@/components/Layout';

import client from '@root/client';
import sanityImage from '@root/utils/sanityImage';
import Section, { SectionContent, SectionHeader } from '@root/src/components/Section';
import Galleries from '@root/src/components/pages/gallery/Galleries';

import bgGallery from '@root/public/img/bg-gallery.png';
import IconArrowRightRound from '@root/public/img/icon-arrow-right-round.svg';
import useMedia from '@root/utils/useMedia';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Params extends ParsedUrlQuery {
  type: string;
}

interface Props {
  config: SanitySiteConfig;
  navigation: SanityNavigation[];
  gallery: SanityGallery;
  relatedGalleries: SanityGallery[];
}

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${bgGallery.src});
    background-position: bottom center;
    background-repeat: no-repeat;
  }
`;

const Header = styled(SectionHeader)`
  margin-bottom: ${props => props.theme.helpers.toRem(28)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    display: block;
  }

  p {
    margin: 0;
    ${props => props.theme.helpers.fontSize(29)}
    color: ${props => lighten(0.44, props.theme.colors.secondary)};
  }
`;

const Carousel = styled(Slider)`
  .slick-slide {
    position: relative;

    img {
      width: 100%;
      height: auto;
      vertical-align: top;
    }
  }
`;

const SaveButton = styled.a`
  padding: ${props => props.theme.helpers.toRem(12)} ${props => props.theme.helpers.toRem(30)};
  display: inline-block;
  position: absolute;
  bottom: ${props => props.theme.helpers.toRem(155)};
  left: 50%;
  border-radius: ${props => props.theme.helpers.toRem(10)};
  ${props => props.theme.helpers.fontSize(27)}
  font-weight: 600;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.mainDark};
  transform: translateX(-50%);

  @media screen and (max-width: 1200px) {
    margin: 20px 0;
    position: relative;
    bottom: 0;
    ${props => props.theme.helpers.fontSize(18)}
  }

  &:hover {
    background: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.mainDark};
  }
`;

const Thumbs = styled(Slider)`
  margin-top: ${props => props.theme.helpers.toRem(35)};

  @media screen and (max-width: 1640px) {
    margin: 0 60px;
  }

  @media screen and (max-width: 1200px) {
    margin: 0;
  }

  .slick-prev,
  .slick-next {
    width: ${props => props.theme.helpers.toRem(56)};
    height: ${props => props.theme.helpers.toRem(56)};
    color: ${props => props.theme.colors.secondary};
    transition: all 0.2s;

    &:hover {
      color: ${props => props.theme.colors.main};
    }

    svg {
      width: 100%;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
    }

    &:before {
      display: none;
    }
  }

  .slick-prev {
    left: calc(${props => props.theme.helpers.toRem(-56)} - ${props => props.theme.helpers.toRem(30)});

    @media screen and (max-width: 1640px) {
      left: -60px;
    }

    svg {
      transform: rotate(-180deg);
    }
  }

  .slick-next {
    right: calc(${props => props.theme.helpers.toRem(-56)} - ${props => props.theme.helpers.toRem(30)});

    @media screen and (max-width: 1640px) {
      right: -60px;
    }
  }

  .slick-slide {
    &:not(.slick-current) {
      opacity: 0.24;
    }

    img {
      width: 100%;
      height: auto;
      vertical-align: top;
    }
  }
`;

const RelatedGalleries = styled(Section)`
  margin: ${props => props.theme.helpers.toRem(122)} 0 ${props => props.theme.helpers.toRem(46)};
`;

const Gallery: NextPage<Props> = ({ config, navigation, gallery, relatedGalleries }: Props) => {
  const carouselSliderRef = useRef<Slider>(null);
  const thumbsSliderRef = useRef<Slider>(null);
  const slidesToShow = useMedia<number>(['(min-width: 1201px)', '(min-width: 961px)', '(min-width: 1px)'], [8, 6, 4], 8);

  const [sliderState, setSliderState] = useState<{
    carouselSlider: Slider | null,
    thumbsSlider: Slider | null,
  }>({
    carouselSlider: null,
    thumbsSlider: null
  })

  const carouselSliderSettings: SliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const thumbsSliderSettings: SliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    prevArrow: <button type="button" data-role="none" className="slick-arrow slick-prev"><IconArrowRightRound /></button>,
    nextArrow: <button type="button" data-role="none" className="slick-arrow slick-next"><IconArrowRightRound /></button>,
    responsive: [{
      breakpoint: 1200,
      settings: {
        arrows: false,
        swipe: false
      },
    }, {
      breakpoint: 960,
      settings: {
        arrows: false,
        swipe: false
      }
    }]
  };

  useEffect(() => {
    setSliderState({
      carouselSlider: carouselSliderRef.current,
      thumbsSlider: thumbsSliderRef.current
    })
  }, []);

  const sliderGoToIndex = (index: number) => {
    carouselSliderRef.current?.slickGoTo(index);
  };

  const parsedDate = new Date(gallery.date + 'T00:00');
  const day = Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(parsedDate);
  const month = Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(parsedDate).replace('.', '');
  const year = Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(parsedDate);

  return (
    <Layout navigation={navigation}>
      <GlobalStyle />

      <Head>
        <title>{gallery.title} &middot; Fotos &middot; {config.title || 'Léo Magalhães'}</title>
        <meta name="description" content={config.description || 'Coragem, determinação, talento e carisma, elementos que se encaixaram na vida de um garoto chamando Léo Magalhães.'} />
      </Head>

      <Section>
        <Container>
          <Header>
            <h1 data-aos="fade-down">{gallery.title}</h1>
            <p data-aos="fade-down" data-aos-delay="200">{day}.{month}.{year}</p>
          </Header>

          <SectionContent data-aos="fade-up" data-aos-delay="400">
            <Carousel
              {...carouselSliderSettings}
              asNavFor={sliderState.thumbsSlider!}
              ref={carouselSliderRef}>

              {gallery.images.map(image => (
                <div key={image._id}>
                  <Image
                    width={1574}
                    height={886}
                    src={sanityImage(image).width(1574).height(886).url()}
                    alt={image.alt} />

                  <SaveButton href={sanityImage(image).forceDownload('').url()}>salvar a foto</SaveButton>
                </div>
              ))}
            </Carousel>

            <Thumbs
              {...thumbsSliderSettings}
              asNavFor={sliderState.carouselSlider!}
              ref={thumbsSliderRef}>

              {gallery.images.map((image, index) => (
                <div
                  key={image._id}
                  onClick={() => sliderGoToIndex(index)}>
                  <Image
                    width={190}
                    height={108}
                    src={sanityImage(image).width(190).height(108).url()}
                    alt={image.alt} />
                </div>
              ))}
              {gallery.images.length <= 8 && ((new Array(8 - gallery.images.length).fill('')).map((_, index) => <div key={`fake-image-${index}`} onClick={() => {}}></div>))}
            </Thumbs>
          </SectionContent>
        </Container>
      </Section>

      {relatedGalleries.length > 0 && <RelatedGalleries data-aos="fade-up" data-aos-delay="400">
        <Container>
          <SectionHeader>
            <h3>Mais Fotos</h3>
          </SectionHeader>

          <SectionContent>
            <Galleries galleries={relatedGalleries} />
          </SectionContent>
        </Container>
      </RelatedGalleries>}
    </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(groq`
    *[_type == "gallery" && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current
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
    "gallery": *[_type == "gallery" && $slug == slug.current][0],
    "relatedGalleries": *[_type == "gallery" && !(_id in path("drafts.**")) && $slug != slug.current] | order(date asc),
  }`, { slug });

  const config = fetch.config;
  const navigation = fetch.navigation;
  const gallery = fetch.gallery;
  const relatedGalleries = fetch.relatedGalleries;

  if (!gallery) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      config,
      navigation,
      gallery,
      relatedGalleries
    },
    revalidate: 60
  }
};

export default Gallery;
