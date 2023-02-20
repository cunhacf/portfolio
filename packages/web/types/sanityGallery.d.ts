interface SanityGallery extends SanityDocument {
  title: string;
  slug: SanitySlug;
  date: string;
  cover: SanityImage;
  images: SanityImage[];
}
