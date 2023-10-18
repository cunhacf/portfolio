'use client'
import type { NextPage } from 'next';
import styled from 'styled-components';

import Section, { SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';
import { useTranslation } from '@/components/Translation';

const Content = styled.div`
  h1 {
    color: ${props => props.theme.colors.secondary};
  }
`;

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <Container>
        <Section>
          <SectionHeader>
            <h1>{t('error404Title')}</h1>
            <p>{t('error404Text')}</p>
          </SectionHeader>
        </Section>
      </Container>
    </Content>
  )
};

export default NotFoundPage;
