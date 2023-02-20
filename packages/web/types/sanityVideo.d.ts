interface SanityVideo extends SanityDocument {
  title: string;
  videoUrl: string;
  viewCount?: number;
  image?: SanityImage;
}
