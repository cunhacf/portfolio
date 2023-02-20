import { Rule } from 'sanity';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default {
  name: 'work',
  type: 'document',
  title: 'Work',
  icon: HiOutlineMusicNote,
  orderings: [orderRankOrdering],
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
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: (Rule: Rule) => [
        Rule.required().error('Description is required')
      ]
    },
    {
      name: 'releaseDate',
      type: 'date',
      title: 'Release date',
      validation: (Rule: Rule) => [
        Rule.required().error('Release date is required')
      ]
    },
    {
      name: 'cover',
      type: 'image',
      title: 'Cover',
      description: 'Size: 660x660',
      validation: (Rule: Rule) => [
        Rule.required().error('Cover is required'),
      ]
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL'
    },
    {
      name: 'color',
      type: 'color',
      title: 'Color',
      validation: (Rule: Rule) => [
        Rule.required().error('Color is required'),
      ]
    },
    orderRankField({ type: 'work' })
  ]
};
