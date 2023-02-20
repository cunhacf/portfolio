interface SanityWork extends SanityDocument {
  title: string;
  description: string;
  releaseDate: string;
  cover: SanityImage;
  url?: string;
  color: import('@sanity/color-input').ColorValue;
}
