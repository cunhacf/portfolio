import styled from 'styled-components';

import GalleryCard from './GalleryCard';

interface Props {
  galleries?: SanityGallery[];
}

const Wrap = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(42)};
  padding: 0 ${props => props.theme.helpers.toRem(78)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${props => props.theme.helpers.toRem(121)};
  position: relative;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    padding: 0;
    grid-gap: 60px;
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
`;

const Galleries = ({ galleries }: Props): JSX.Element | null => {
  if (!galleries?.length) return null;

  return (
    <Wrap>
      {galleries.map(gallery => <GalleryCard key={gallery._id} gallery={gallery} />)}
    </Wrap>
  );
};

export default Galleries;
