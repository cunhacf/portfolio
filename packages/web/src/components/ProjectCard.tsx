import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import sanityImage from '@root/utils/sanityImage';

interface Props {
  project: SanityWork;
}

const Wrap = styled.div`
  padding: 20px 30px 0;
  border-radius: ${props => props.theme.helpers.toRem(20)};
  overflow: hidden;
  border-radius: 20px;
  overflow: hidden;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.isDark ? props.theme.colors.mainDark : props.theme.colors.main};
  transition: all 0.2s;

  &.inverted {
    color: ${props => props.theme.isDark ? props.theme.colors.main : props.theme.colors.mainDark};

    &:hover {
      color: ${props => props.theme.isDark ? props.theme.colors.mainDark : props.theme.colors.main};
    }
  }

  &:hover {
    background: ${props => props.theme.isDark ? props.theme.colors.secondaryAlt : props.theme.colors.mainDark} !important;
  }

  a,
  a:hover,
  a:focus,
  a:active {
    color: inherit;
  }
`;

const Title = styled.div`
  height: 120px;

  h3 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(32)}
    font-weight: 600;

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

const ProjectCard = ({ project }: Props): JSX.Element => {
  const cardContent = (
    <>
      <Title>
        <h3>{project.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: project.description }} />
      </Title>

      <Cover>
        <Image
          width={1360}
          height={1360}
          src={sanityImage(project.cover).width(1360).height(1360).url()}
          alt={`Imagem do projeto "${project.title}"`} />
      </Cover>
    </>
  );

  return (
    <Wrap
      className={`project-card ${project.inverted ? 'inverted' : ''}`}
      style={{ backgroundColor: project.color.hex }}>

      {project.url ? (
        <Link href={project.url} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </Wrap>
  );
};

export default ProjectCard;
