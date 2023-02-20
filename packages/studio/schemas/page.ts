import { Rule, Slug } from 'sanity';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: HiOutlineDocumentText,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Título',
      validation: (Rule: Rule) => [
        Rule.required().error('Título é obrigatório'),
      ]
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 200
      },
      validation: (Rule: Rule) => [
        Rule.required().error('Slug é obrigatória'),
        Rule.custom((slug: Slug) => slug.current.length <= 200 ? true : 'Slug não pode exceder 200 caracteres')
      ]
    },
    {
      name: 'image',
      type: 'image',
      title: 'Imagem'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }]
    },
    {
      name: 'highlightsBlock',
      type: 'object',
      title: 'Bloco de Destaques',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Título',
          validation: (Rule: Rule) => [
            Rule.custom((value, { document }: any) => {
              if (document.highlightsBlock.highlights.length > 0 && !value) {
                return 'Título é obrigatório';
              }

              return true;
            })
          ]
        },
        {
          name: 'highlights',
          type: 'array',
          of: [{
            type: 'object',
            fields: [{
              name: 'title',
              type: 'string',
              title: 'Título',
              validation: (Rule: Rule) => [
                Rule.required().error('Título é obrigatório'),
              ]
            },
            {
              name: 'image',
              type: 'image',
              title: 'Imagem',
              validation: (Rule: Rule) => [
                Rule.required().error('Imagem é obrigatória'),
              ]
            }],
          }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      image: 'image'
    },
    prepare({ title, slug, image }: { [key: string]: string }) {
      return {
        title,
        subtitle: `/${slug}`,
        media: image
      }
    }
  }
};
