import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import sanityImage from '@root/utils/sanityImage';

interface Props {
  gallery: SanityGallery;
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  grid-column: auto / span 1;
  grid-row: auto / span 1;

  &:nth-child(1) {
    padding: ${props => props.theme.helpers.toRem(120)} ${props => props.theme.helpers.toRem(34)} ${props => props.theme.helpers.toRem(120)} 0;
    justify-content: center;
    grid-column: auto / span 3;
    grid-row: auto / span 2;
  }

  &:nth-child(2) {
    padding-bottom: ${props => props.theme.helpers.toRem(47)};
    justify-content: flex-end;
    grid-column: 4 / span 2;
  }

  &:nth-child(3) {
    padding-top: ${props => props.theme.helpers.toRem(47)};
    justify-content: flex-start;
    grid-column: 4 / span 2;
  }

  &:nth-child(4) {
    padding-left: ${props => props.theme.helpers.toRem(34)};
    grid-column: 6 / span 3;
    grid-row: 1 / span 1;
  }

  &:nth-child(5) {
    margin-left: auto;
    grid-column: 7 / span 2;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    @media screen and (max-width: 1200px) {
      margin: 0;
      padding: 0;
      grid-column: auto / span 1;
      grid-row: auto / span 1;
    }
  }
`;

const Content = styled.div`
  ${Wrap}:nth-child(2) & {
    margin-bottom: 20%;
  }

  ${Wrap}:nth-child(3) & {
    margin-top: -28%;
  }

  ${Wrap}:nth-child(2) &,
  ${Wrap}:nth-child(3) & {
    @media screen and (max-width: 1200px) {
      margin: 0;
    }
  }
`;

const Cover = styled.div`
  img {
    width: 100%;
    height: auto;
    vertical-align: top;
    border-radius: ${props => props.theme.helpers.toRem(30)};
  }
`;

const Button = styled(Link)`
  margin-top: ${props => props.theme.helpers.toRem(-30)};
  padding: ${props => props.theme.helpers.toRem(12)} ${props => props.theme.helpers.toRem(25)};
  display: inline-block;
  border-radius: ${props => props.theme.helpers.toRem(10)};
  ${props => props.theme.helpers.fontSize(27)}
  font-weight: 600;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.mainDark};

  @media screen and (max-width: 1200px) {
    ${props => props.theme.helpers.fontSize(20)}
  }

  &:hover {
    background: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.mainDark};
  }
`;

const Name = styled.h3`
  margin: ${props => props.theme.helpers.toRem(7)} 0 0;
  ${props => props.theme.helpers.fontSize(52)}
  font-weight: 600;
  color: ${props => props.theme.colors.secondaryAlt};

  @media screen and (max-width: 1200px) {
    ${props => props.theme.helpers.fontSize(35)}
  }
`;

const GalleryDate = styled.p`
  margin: ${props => props.theme.helpers.toRem(4)} 0 0;
  ${props => props.theme.helpers.fontSize(26)}
  font-weight: 600;
  color: ${props => props.theme.colors.secondaryAlt};

  @media screen and (max-width: 1200px) {
    ${props => props.theme.helpers.fontSize(20)}
  }
`;

const GalleryCard = ({ gallery }: Props): JSX.Element => {
  const parsedDate = new Date(gallery.date + 'T00:00');
  const day = Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(parsedDate);
  const month = Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(parsedDate).replace('.', '');
  const year = Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(parsedDate);

  return (
    <Wrap>
      <Content>
        <Cover>
          <Image
            width={852}
            height={852}
            src={sanityImage(gallery.cover).width(852).height(852).url()}
            alt={`Capa do álbum "${gallery.title}"`} />
        </Cover>

        <Button href={`/fotos/${gallery.slug.current}`}>acessar álbum</Button>
        <Name>{gallery.title}</Name>
        <GalleryDate>{day}.{month}.{year}</GalleryDate>
      </Content>
    </Wrap>
  );
};

export default GalleryCard;
