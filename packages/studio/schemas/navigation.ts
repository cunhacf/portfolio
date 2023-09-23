import { Rule } from 'sanity';
import { BiNavigation } from 'react-icons/bi';
import { orderRankField } from '@sanity/orderable-document-list';

export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  icon: BiNavigation,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => [
        Rule.required().error('Title is required')
      ]
    },
    {
      name: 'external',
      type: 'boolean',
      title: 'Externo',
      initialValue: false,
      hidden: ({ document }: any) => document.children?.length,
    },
    {
      name: 'internalPage',
      type: 'reference',
      title: 'Page',
      to: [{ type: 'page' }],
      hidden: ({ document }: any) => document.external || document.children?.length,
      validation: (Rule: Rule) => [
        Rule.custom((value, { document }: any) => {
          if (!document.external && !document.children?.length && !value) {
            return 'Page is required';
          }

          return true;
        })
      ]
    },
    {
      name: 'externalUrl',
      type: 'string',
      title: 'URL',
      hidden: ({ document }: any) => !document.external || document.children?.length,
      validation: (Rule: Rule) => [
        Rule.custom((value, { document }: any) => {
          if (document.external && !document.children?.length && !value) {
            return 'URL is required';
          }

          return true;
        })
      ]
    },
    {
      name: 'blank',
      type: 'boolean',
      title: 'Open in new tab',
      hidden: ({ document }: any) => !document.external || document.children?.length,
    },
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true
    },
    orderRankField({ type: 'navigation' })
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language'
    },
    prepare: ({ title, language }: { [key: string]: string }) => {
      const formattedLanguage = language ? `(${language.toUpperCase()})` : null;
      const formattedTitle = language ? `${title} ${formattedLanguage}` : title;

      return {
        title: formattedTitle
      }
    }
  }
};
