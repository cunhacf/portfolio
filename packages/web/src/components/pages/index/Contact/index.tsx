import styled from 'styled-components';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';

import ContactComponent from '@/components/Contact';

interface Props {
  config: SanitySiteConfig;
  section: SanityHomeContentBlock;
}

const Wrap = styled(Section)`

`;

const Contact = ({ config, section }: Props): JSX.Element | null => {
  return (
    <Wrap id="contact">
      <Container>
        <SectionHeader>
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </SectionHeader>

        <SectionContent>
          <ContactComponent config={config} />
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Contact;
