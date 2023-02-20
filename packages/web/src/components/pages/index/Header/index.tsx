import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { PortableText } from '@portabletext/react';

import { Container } from '@/components/Layout';
import { helpers } from '@/components/theme';

import IconYouTube from '@root/public/img/icon-youtube.svg';
import IconInstagram from '@root/public/img/logo-instagram.svg';
import IconFacebook from '@root/public/img/logo-facebook-square.svg';
import IconTwitter from '@root/public/img/logo-twitter.svg';
import IconTikTok from '@root/public/img/logo-tiktok.svg';
import IconGitHub from '@root/public/img/logo-github.svg';
import IconLinkedIn from '@root/public/img/logo-linkedin.svg';

import sanityImage from '@root/utils/sanityImage';
import Contact from '@root/src/components/Contact';

interface Props {
  config: SanitySiteConfig;
  section: SanityHomeHeader;
}

const Wrap = styled.div`
  margin-top: 30px;

  ${Container} {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;
  }
`;

const HeaderIntro = styled.div`
  padding: 70px 0;
  display: flex;
  flex-direction: column;
  grid-column: auto / span 3;

  h1 {
    max-width: 550px;
    margin: 0;
    ${props => props.theme.helpers.fontSize(40)}
    font-weight: 500;
  }

  p {
    max-width: 414px;
    margin: 20px 0 0 0;
  }

  div {
    margin-top: auto;
  }
`;

const HeaderImage = styled.div`
  height: 580px;
  grid-column: auto / span 3;
  border-radius: 20px;
  overflow: hidden;

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
          <Image
            width={960}
            height={960}
            src={sanityImage(section.image).width(960).height(960).quality(100).url()}
            quality={100}
            alt="Fundo do topo"
            loading="eager" />
        </HeaderImage>}
      </Container>
    </Wrap>
  )
};

export default Header;
