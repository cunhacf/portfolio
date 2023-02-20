import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { lighten } from 'polished';

import sanityImage from '@root/utils/sanityImage';

interface Props {
  work: SanityWork;
}

const Wrap = styled.div`
  border-radius: ${props => props.theme.helpers.toRem(20)};
  overflow: hidden;
  background: ${props => props.theme.colors.secondary};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.theme.colors.main};
  }
`;

const Thumb = styled.div`
  border-radius: ${props => props.theme.helpers.toRem(20)};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
  }
`;

const Title = styled.div`
  padding: ${props => props.theme.helpers.toRem(18)} ${props => props.theme.helpers.toRem(25)} ${props => props.theme.helpers.toRem(28)};

  @media screen and (max-width: 480px) {
    padding: 10px 12px;
  }

  ${Wrap}:hover & {
    h3 {
      color: ${props => props.theme.colors.secondary};
    }
  }

  h3 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(27)}
    font-weight: 700;
    color: ${props => lighten(0.44, props.theme.colors.secondary)};
    transition: all 0.2s;

    @media screen and (max-width: 480px) {
      line-height: 1;
    }
  }
`;

const WorkCard = ({ work }: Props): JSX.Element => {
  const cardContent = (
    <>
    </>
  );

  return (
    <Wrap>
      {work.url ? (
        <Link href={work.url}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </Wrap>
  );
};

export default WorkCard;
