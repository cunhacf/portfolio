import styled from 'styled-components';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';

import ProjectCard from '@/components/ProjectCard';

interface Props {
  section: SanityHomeContentBlock;
  work?: SanityWork[];
}

const Wrap = styled(Section)<Props>`

`;

const WorkList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${props => props.theme.helpers.toRem(20)};
  position: relative;
  z-index: 1;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Work = ({ section, work }: Props): JSX.Element | null => {
  if (!work?.length) return null;

  return (
    <Wrap
      id="work"
      section={section}>

      <Container>
        <SectionHeader>
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </SectionHeader>

        <SectionContent>
          <WorkList>
            {work.map(workItem => <ProjectCard key={workItem._id} project={workItem} />)}
          </WorkList>
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Work;
