import { Rule } from 'sanity';
import { HiOutlineCog } from 'react-icons/hi';

export default {
  name: 'config',
  type: 'document',
  title: 'General Settings',
  documentId: 'config',
  icon: HiOutlineCog,
  i18n: true,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Carlos Fernandes'
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description'
    },
    {
      name: 'networks',
      type: 'array',
      title: 'Social Networks',
      of: [{
        name: 'network',
        type: 'object',
        fields: [{
          name: 'type',
          type: 'string',
          title: 'Network',
          options: {
            list: [
              { title: 'Instagram', value: 'instagram' },
              { title: 'Facebook', value: 'facebook' },
              { title: 'Twitter', value: 'twitter' },
              { title: 'TikTok', value: 'tiktok' },
              { title: 'YouTube', value: 'youtube' },
              { title: 'GitHub', value: 'github' },
              { title: 'LinkedIn', value: 'linkedin' },
            ]
          },
          validation: (Rule: Rule) => [
            Rule.required().error('Network is required')
          ]
        }, {
          name: 'url',
          type: 'url',
          title: 'URL',
          validation: (Rule: Rule) => [
            Rule.required().error('URL is required')
          ]
        }],
        preview: {
          select: {
            title: 'type',
            subtitle: 'url'
          }
        }
      }]
    },
    {
      name: 'contactUrl',
      type: 'url',
      title: 'Contact URL',
      validation: (Rule: Rule) => [
        Rule.uri({ scheme: ['http', 'https', 'mailto'] }).error('Invalid scheme')
      ]
    },
  ],
  preview: {
    prepare: () => {
      return {
        title: 'General Settings'
      }
    }
  }
};
