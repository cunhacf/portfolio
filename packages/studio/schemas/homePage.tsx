import { defineField, defineType } from 'sanity';
import { HiOutlineHome } from 'react-icons/hi';

export default defineType({
  name: 'homePage',
  type: 'document',
  title: 'Homepage',
  icon: HiOutlineHome,
  fields: [
    defineField({
      name: 'header',
      type: 'object',
      title: 'Header',
      options: {
        collapsible: true,
      },
      fields: [
        { name: 'image', type: 'image', title: 'Imagem', description: 'Tamanho: 960x960' },
        {
          name: 'text',
          type: 'array',
          title: 'Text',
          of: [{ type: 'block' }]
        }
      ]
    }),
    defineField({
      name: 'contentBlocks',
      type: 'array',
      title: 'Content Blocks',
      of: [{
        name: 'contentBlock',
        type: 'object',
        title: 'Content Block',
        fields: [{
          name: 'blockType',
          type: 'string',
          title: 'Type',
          options: {
            list: [
              { title: 'Work', value: 'work' },
              { title: 'Projects', value: 'projects' },
              { title: 'Contact', value: 'contact' },
            ]
          },
          validation: Rule => [
            Rule.required().error('Type is required')
          ]
        }, {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: Rule => [
            Rule.required().error('Title is required')
          ]
        }, {
          name: 'description',
          type: 'string',
          title: 'Description'
        }]
      }]
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
      const formattedTitle = language ? `Homepage ${formattedLanguage}` : 'Homepage';

      return {
        title: formattedTitle
      }
    }
  }
});
