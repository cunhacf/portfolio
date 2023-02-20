interface SanityRecordPlatform {
  type: 'spotify' | 'apple-music' | 'deezer' | 'tidal' | 'amazon-music' | 'youtube-music' | 'sua-musica';
  url: string;
}

interface SanityRecord extends SanityDocument {
  name: string;
  releaseDate: string;
  cover: SanityImage;
  platforms?: SanityRecordPlatform[];
}
