import { Rule, Slug } from 'sanity';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: HiOutlineDocumentText,
  i18n: true,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => [
        Rule.required().error('Title is required'),
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
        Rule.required().error('Slug is required'),
        Rule.custom((slug: Slug) => slug.current.length <= 200 ? true : 'Slug cannot exceed 200 characters')
      ]
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }]
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
