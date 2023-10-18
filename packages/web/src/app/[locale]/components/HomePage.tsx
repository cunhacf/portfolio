'use client'
import type { NextPage } from 'next';
import styled from 'styled-components';

import Header from './Header';
import Work from './Work';
import Projects from './Projects';
import Contact from './Contact';

interface Props {
  config: SanitySiteConfig;
  homePage: SanityHomePage;
  work: SanityWork[];
  projects: SanityProject[];
}

const Content = styled.div``;

const HomePage: NextPage<Props> = ({
  config,
  homePage,
  work,
  projects,
}: Props) => {
  return (
    <Content>
      <Header
        section={homePage.header}
        config={config} />

      {homePage.contentBlocks?.map((contentBlock, index) => {
        switch (contentBlock.blockType) {
          case 'work':
            return (
              <Work
                key={`contentBlock-${index}`}
                section={contentBlock}
                work={work} />
            )
          case 'projects':
            return (
              <Projects
                key={`contentBlock-${index}`}
                section={contentBlock}
                projects={projects} />
            )
          case 'contact':
            return (
              <Contact
                key={`contentBlock-${index}`}
                section={contentBlock}
                config={config} />
            )
        }
      })}
    </Content>
  )
};

export default HomePage;
