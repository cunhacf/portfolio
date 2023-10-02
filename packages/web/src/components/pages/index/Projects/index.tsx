import styled from 'styled-components';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';

import ProjectCard from '@/components/ProjectCard';

interface Props {
  section: SanityHomeContentBlock;
  projects?: SanityProject[];
}

const Wrap = styled(Section)<Props>`

`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${props => props.theme.helpers.toRem(20)};
  position: relative;
  z-index: 1;

  .project-card {
    max-height: 480px;
  }
`;

const Projects = ({ section, projects }: Props) => {
  if (!projects?.length) return null;

  return (
    <Wrap
      id="projects"
      section={section}>

      <Container>
        <SectionHeader>
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </SectionHeader>

        <SectionContent>
          <ProjectList>
            {projects.map(projectItem => <ProjectCard key={projectItem._id} project={projectItem} />)}
          </ProjectList>
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Projects;
