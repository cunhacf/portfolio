import { defineField, defineType } from 'sanity';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: HiOutlineDocumentText,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => [
        Rule.required().error('Title is required'),
      ]
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 200
      },
      validation: Rule => [
        Rule.required().error('Slug is required'),
        Rule.custom(slug => (slug?.current && slug.current.length <= 200) ? true : 'Slug cannot exceed 200 characters')
      ]
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image'
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }]
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
      title: 'title',
      language: 'language',
      slug: 'slug.current',
      image: 'image'
    },
    prepare: ({ title, language, slug, image }: { [key: string]: string }) => {
      const formattedLanguage = language ? `(${language.toUpperCase()})` : null;
      const formattedTitle = language ? `${title} ${formattedLanguage}` : title;

      return {
        title: formattedTitle,
        subtitle: `/${slug}`,
        media: image
      }
    }
  }
});
