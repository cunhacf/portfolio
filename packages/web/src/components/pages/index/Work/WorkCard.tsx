import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { lighten } from 'polished';

import sanityImage from '@root/utils/sanityImage';

interface Props {
  work: SanityWork;
}

const Wrap = styled.div`
  padding: 20px 30px 0;
  border-radius: ${props => props.theme.helpers.toRem(20)};
  overflow: hidden;
  border-radius: 20px;
  overflow: hidden;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.main};
  transition: all 0.2s;

  a {
    color: inherit;

    &:hover {
      color: inherit;
    }
  }
`;

const Title = styled.div`
  height: 120px;

  h3 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(32)}
    font-weight: 600;
    transition: all 0.2s;

    @media screen and (max-width: 480px) {
      line-height: 1;
    }
  }

  p {
    margin: 0;
  }
`;

const Cover = styled.div`
  margin: 30px -60px -130px 0;
  position: relative;
  top: 0;
  left: 0;
  border-top-left-radius: 20px;
  overflow: hidden;
  transition: top 0.2s ease-in-out, left 0.2s ease-in-out;

  ${Wrap}:hover & {
    top: -10px;
    left: -10px;
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: top;
  }
`;

const WorkCard = ({ work }: Props): JSX.Element => {
  const cardContent = (
    <>
      <Title>
        <h3>{work.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: work.description }} />
      </Title>

      <Cover>
        <Image
          width={660}
          height={660}
          src={sanityImage(work.cover).width(660).height(660).url()}
          alt={`Imagem do projeto "${work.title}"`} />
      </Cover>
    </>
  );

  return (
    <Wrap style={{ backgroundColor: work.color.hex }}>
      {work.url ? (
        <Link href={work.url} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </Wrap>
  );
};

export default WorkCard;
