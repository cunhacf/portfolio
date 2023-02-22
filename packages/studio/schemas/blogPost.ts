import { Rule, Slug } from 'sanity';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default {
  name: 'blogPost',
  type: 'document',
  title: 'Postagem',
  icon: HiOutlineDocumentText,
  i18n: true,
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
      title: 'Imagem',
      validation: (Rule: Rule) => [
        Rule.required().error('Imagem é obrigatória'),
      ]
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }]
    },
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
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
        subtitle: `/blog/${slug}`,
        media: image
      }
    }
  }
};
