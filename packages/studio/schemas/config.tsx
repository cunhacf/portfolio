import { defineArrayMember, defineField, defineType } from 'sanity';
import { HiOutlineCog } from 'react-icons/hi';

export default defineType({
  name: 'config',
  type: 'document',
  title: 'General Settings',
  icon: HiOutlineCog,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Carlos Fernandes'
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description'
    }),
    defineField({
      name: 'networks',
      type: 'array',
      title: 'Social Networks',
      of: [
        defineArrayMember({
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
            validation: Rule => [
              Rule.required().error('Network is required')
            ]
          }, {
            name: 'url',
            type: 'url',
            title: 'URL',
            validation: Rule => [
              Rule.required().error('URL is required')
            ]
          }],
          preview: {
            select: {
              title: 'type',
              subtitle: 'url'
            }
          }
        })
      ]
    }),
    defineField({
      name: 'contactUrl',
      type: 'url',
      title: 'Contact URL',
      validation: Rule => [
        Rule.uri({ scheme: ['http', 'https', 'mailto'] }).error('Invalid scheme')
      ]
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true
    })
  ],
  preview: {
    select: {
      language: 'language'
    },
    prepare: ({ language }: { [key: string]: string }) => {
      const formattedLanguage = language ? `(${language.toUpperCase()})` : null;
      const formattedTitle = language ? `General Settings ${formattedLanguage}` : 'General Settings';

      return {
        title: formattedTitle
      }
    }
  }
});
