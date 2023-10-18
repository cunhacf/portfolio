'use client'
import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';

import { Container } from '@/components/Layout';
import Section, { SectionContent as PageContent, SectionHeader } from '@/components/Section';
import { useTranslation } from '@/components/Translation';

interface Props {
  page: SanityPage;
}

const PageSection = styled(Section)`
  margin-top: 20px;
`;

const PageHeader = styled(SectionHeader)`
  h1 {
    ${props => props.theme.helpers.fontSize(45)}
    color: ${props => props.theme.colors.secondary};
  }
`;

const Page: NextPage<Props> = ({ page }: Props) => {
  const router = useRouter();
  const { defaultLocale, locale } = useTranslation();

  useEffect(() => {
    if (page?.language !== locale) {
      const localeRef: SanityPage | undefined = page?._translations?.find((ref: SanityDocument) => ref.language === locale) as SanityPage;

      if (localeRef) {
        router.replace(`/${locale}/${localeRef.slug.current}`);
      }
    }
  }, [router, page, locale, defaultLocale]);

  const components: { marks: PortableTextReactComponents['marks'] } = {
    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        const target = !value.href.startsWith('/') ? '_blank' : '';

        return (
          <a href={value.href} rel={rel} target={target}>
            {children}
          </a>
        )
      }
    }
  };

  return (
    <PageSection>
      <Container>
        <PageHeader>
          <h1>{page.title}</h1>
        </PageHeader>

        <PageContent>
          <PortableText value={page.content} components={components} />
        </PageContent>
      </Container>
    </PageSection>
  )
};

export default Page;
