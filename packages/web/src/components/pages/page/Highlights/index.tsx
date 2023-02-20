import styled from 'styled-components';

import Highlight from './Highlight';

interface Props {
  highlights?: SanityPageHighlight[];
}

const Wrap = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(42)};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: ${props => props.theme.helpers.toRem(90)};
  position: relative;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    margin-top: 40px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${props => props.theme.helpers.toRem(40)};
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.helpers.toRem(20)};
  }
`;

const Highlights = ({ highlights }: Props): JSX.Element | null => {
  if (!highlights?.length) return null;

  return (
    <Wrap>
      {highlights.map((highlight, index) => <Highlight key={`highlight-${index}`} highlight={highlight} />)}
    </Wrap>
  );
};

export default Highlights;
