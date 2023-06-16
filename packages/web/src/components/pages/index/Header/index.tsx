import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { PortableText } from '@portabletext/react';

import { Container } from '@/components/Layout';

import sanityImage from '@root/utils/sanityImage';
import Contact from '@root/src/components/Contact';

interface Props {
  config: SanitySiteConfig;
  section: SanityHomeHeader;
}

const Wrap = styled.div`
  margin-top: 30px;

  @media screen and (max-width: 960px) {
    margin-top: 0;
  }

  ${Container} {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;

    @media screen and (max-width: 960px) {
      display: flex;
      flex-direction: column;
      grid-gap: 20;
    }
  }
`;

const HeaderIntro = styled.div`
  padding: 70px 0;
  display: flex;
  flex-direction: column;
  grid-column: auto / span 3;

  @media screen and (max-width: 960px) {
    padding: 0 0;
  }

  h1 {
    max-width: 550px;
    margin: 0;
    ${props => props.theme.helpers.fontSize(40)}
    font-weight: 500;

    @media screen and (max-width: 640px) {
      ${props => props.theme.helpers.fontSize(30)}
    }
  }

  p {
    max-width: 414px;
    margin: 20px 0 0 0;
  }

  & > div {
    margin-top: auto;

    @media screen and (max-width: 960px) {
      margin-top: 60px;
    }
  }
`;

const HeaderImage = styled.div`
  height: 580px;
  grid-column: auto / span 3;
  border-radius: 20px;
  overflow: hidden;

  @media screen and (max-width: 960px) {
    width: 100%;
    max-height: 320px;
    margin: 0 auto;
    order: -1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
  }
`;

const Header: NextPage<Props> = ({
  config,
  section
}: Props) => {
  return (
    <Wrap>
      <Container>
        <HeaderIntro>
          <PortableText value={section.text} />

          <Contact config={config} />
        </HeaderIntro>

        {section?.image && <HeaderImage>
          <picture>
            <source media="(max-width: 959px)" srcSet={sanityImage(section.image).width(960).height(960).quality(100).auto('format').url()} />
            <source media="(min-width: 960px)" srcSet={sanityImage(section.image).width(670).height(580).quality(100).auto('format').url()} />

            <Image
              width={960}
              height={960}
              src={sanityImage(section.image).width(960).height(960).quality(100).auto('format').url()}
              quality={100}
              alt="Fundo do topo"
              loading="eager"
              priority />
          </picture>
        </HeaderImage>}
      </Container>
    </Wrap>
  )
};

export default Header;
