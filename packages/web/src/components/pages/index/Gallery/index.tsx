import styled from 'styled-components';
import { rgba } from 'polished';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';

import GalleryCard from './GalleryCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  section: SanityHomeGallery;
  galleries?: SanityGallery[];
}

const Wrap = styled(Section)<Props>`
  margin-top: ${props => props.theme.helpers.toRem(118)};
  position: relative;
  z-index: 1;

  &:before {
    content: '';
    width: 99999px;
    height: ${props => props.theme.helpers.toRem(1283)};
    margin-right: ${props => props.theme.helpers.toRem(-517)};
    position: absolute;
    top: ${props => props.theme.helpers.toRem(-180)};
    right: 100%;
    border-radius: ${props => props.theme.helpers.toRem(30)};
    background: ${props => rgba(props.theme.colors.mainDark, 0.7)};
    z-index: -1;

    @media screen and (max-width: 640px) {
      margin-right: 0;
      right: 50%;
    }
  }

  ${SectionHeader} {
    margin-bottom: ${props => props.theme.helpers.toRem(-95)};

    @media screen and (max-width: 1200px) {
      margin-bottom: 40px;
    }
  }
`;

const GalleryList = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: minmax(0, auto);
  grid-column-gap: ${props => props.theme.helpers.toRem(16)};
  grid-row-gap: ${props => props.theme.helpers.toRem(32)};

  &:not(:first-child) {
    margin-top: ${props => props.theme.helpers.toRem(64)};
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Gallery = ({ section, galleries }: Props): JSX.Element | null => {
  if (!galleries?.length || section?.disabled) return null;

  const chunk = (array: Array<any>, size: number) => {
    const chunks = [];
    array = [].concat(...array);

    while (array.length) {
      chunks.push(
        array.splice(0, size)
      )
    }

    return chunks;
  };

  const galleriesGroups = chunk(galleries, 5);

  return (
    <Wrap
      id="fotos"
      section={section}
      data-aos="fade">

      <Container>
        <SectionHeader>
          <h2 data-aos="fade-down" data-aos-delay="200">{section?.title || 'fotos'}</h2>
        </SectionHeader>

        <SectionContent data-aos="fade-up" data-aos-delay="200">
          {galleriesGroups.map((galleries, index) => <GalleryList key={`gallery-list-${index}`}>
            {galleries.map(gallery => <GalleryCard key={gallery._id} gallery={gallery} />)}
          </GalleryList>)}
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Gallery;
