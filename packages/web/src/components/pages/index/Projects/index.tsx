import styled from 'styled-components';
import { rgba } from 'polished';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';

import WorkCard from './WorkCard';

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
`;

const Work = ({ section, work }: Props): JSX.Element | null => {
  if (!work?.length) return null;

  return (
    <Wrap
      id="work"
      section={section}
      data-aos="fade">

      <Container>
        <SectionHeader>
          <h2 data-aos="fade-down" data-aos-delay="200">{section?.title || 'novidades'}</h2>
          {section.description && <p>{section.description}</p>}
        </SectionHeader>

        <SectionContent data-aos="fade-up">
          <WorkList>
            {work.map(workItem => <WorkCard key={workItem._id} work={workItem} />)}
          </WorkList>
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Work;
