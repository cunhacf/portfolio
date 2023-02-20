interface SanityBlogPost extends SanityDocument {
  title: string;
  slug: SanitySlug;
  image?: SanityImage;
  content: import('@portabletext/react').TypedObject;
}
