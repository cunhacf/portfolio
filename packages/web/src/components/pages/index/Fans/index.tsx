import styled from 'styled-components';
import Link from 'next/link';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';
import { helpers } from '@/components/theme';

import sanityImage from '@root/utils/sanityImage';

import IconHeart from '@root/public/img/icon-heart.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  section: SanityHomeFans;
}

const Wrap = styled(Section)<Props>`
  margin-top: ${props => props.theme.helpers.toRem(32)};
  padding: ${props => props.theme.helpers.toRem(354)} 0 ${props => props.theme.helpers.toRem(1268)};
  position: relative;
  overflow: hidden;
  background: url(${props => props.section.bg ? sanityImage(props.section.bg).url() : ''}) top center no-repeat;
  background-size: contain;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    margin-top: ${props => props.theme.helpers.toRem(-70)};
    padding: ${props => props.theme.helpers.toRem(500)} 0 ${props => props.theme.helpers.toRem(500)};
    background-size: cover;
  }

  ${Container} {
    display: grid;
    grid-column-gap: ${props => props.theme.helpers.toRem(16)};
    grid-template-columns: repeat(8, 1fr);

    @media screen and (max-width: 1200px) {
      display: block;
    }
  }

  ${SectionHeader},
  ${SectionContent} {
    grid-column: 6 / span 3;
    text-align: center;

    @media screen and (max-width: 1200px) {
      text-align: right;
    }
  }

  ${SectionContent} {
    margin-top: ${props => props.theme.helpers.toRem(5)};
  }
`;

const Button = styled(Link)`
  padding: 0;
  border: 0;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  color: ${props => props.theme.colors.secondary};
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.colors.main};

    span {
      background: ${props => props.theme.colors.main};
    }
  }

  svg {
    vertical-align: top;
  }

  span {
    margin-left: ${props => props.theme.helpers.toRem(15)};
    padding: ${props => props.theme.helpers.toRem(12)} ${props => props.theme.helpers.toRem(32)};
    border-radius: ${props => props.theme.helpers.toRem(10)};
    font-family: General Sans;
    ${props => props.theme.helpers.fontSize(25)}
    font-weight: 600;
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.mainDark};
    transition: all 0.2s;
  }
`;

const Fans = ({ section }: Props): JSX.Element | null => {
  if (section?.disabled) return null;

  return (
    <Wrap
      id="central-de-fas"
      section={section}
      data-aos="fade">

      <Container>
        <SectionHeader>
          <h2 data-aos="fade-down" data-aos-delay="200">{section?.title || 'central de fãs'}</h2>
        </SectionHeader>

        <SectionContent data-aos="fade-up" data-aos-delay="200">
          {(section.button.label && section.button.url) && (
            <Button
              href={section.button.url}
              target="_blank"
              rel="noopener noreferrer">

              <IconHeart
                width={helpers.toRem(107)}
                height={helpers.toRem(100)} />
              <span>{section.button.label}</span>
            </Button>
          )}
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Fans;
