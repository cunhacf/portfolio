import { defineField, defineType } from 'sanity';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
  name: 'work',
  type: 'document',
  title: 'Work',
  icon: HiOutlineMusicNote,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => [
        Rule.required().error('Title is required')
      ]
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: Rule => [
        Rule.required().error('Description is required')
      ]
    }),
    defineField({
      name: 'releaseDate',
      type: 'date',
      title: 'Release date',
      validation: Rule => [
        Rule.required().error('Release date is required')
      ]
    }),
    defineField({
      name: 'cover',
      type: 'image',
      title: 'Cover',
      description: 'Size: 660x660',
      validation: Rule => [
        Rule.required().error('Cover is required'),
      ]
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Size',
      initialValue: 'normal',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Big', value: 'big' },
        ],
      },
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL'
    }),
    defineField({
      name: 'color',
      type: 'color',
      title: 'Color',
      validation: Rule => [
        Rule.required().error('Color is required'),
      ]
    }),
    defineField({
      name: 'inverted',
      type: 'boolean',
      title: 'Inverted',
      initialValue: false,
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true
    }),
    orderRankField({ type: 'work' })
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      image: 'cover'
    },
    prepare: ({ title, image, language }: { [key: string]: string }) => {
      const formattedLanguage = language ? `(${language.toUpperCase()})` : null;
      const formattedTitle = language ? `${title} ${formattedLanguage}` : title;

      return {
        title: formattedTitle,
        media: image
      }
    }
  }
});
