import { Rule } from 'sanity';
import { HiOutlineHome } from 'react-icons/hi';

export default {
  name: 'homePage',
  type: 'document',
  title: 'Homepage',
  documentId: 'homePage',
  icon: HiOutlineHome,
  i18n: true,
  fields: [
    {
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
    },
    {
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
          validation: (Rule: Rule) => [
            Rule.required().error('Type is required')
          ]
        }, {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule: Rule) => [
            Rule.required().error('Title is required')
          ]
        }, {
          name: 'description',
          type: 'string',
          title: 'Description'
        }]
      }],
      preview: {
        select: {
          title: 'title'
        }
      }
    },
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Homepage'
      }
    }
  }
};
