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
`;

const Content = styled.div``;

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
            src={sanityImage(gallery.cover).width(414).height(310).url()}
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
