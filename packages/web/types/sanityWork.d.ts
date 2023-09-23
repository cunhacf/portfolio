interface SanityWork extends SanityDocument {
  title: string;
  description: string;
  releaseDate: string;
  cover: SanityImage;
  size?: 'normal' | 'big';
  url?: string;
  color: import('@sanity/color-input').ColorValue;
  inverted?: boolean;
}
