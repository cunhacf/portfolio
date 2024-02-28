interface SanityImageMetadata {
  blurHash: string;
  dimensions: {
    aspectRatio: number;
    height: number;
    width: number;
  };
  hasAlpha: false
  isOpaque: true
  lqip: string;
}

interface SanityImageAsset extends SanityDocument {
  assetId: string;
  size: number;
  sha1hash: string;
  url: string;
  extension: string;
  path: string;
  originalFilename: string;
  mimeType: string;
  metadata: SanityImageMetadata;
  uploadId: string;
}

interface SanityImage extends SanityDocument {
  asset: SanityImageAsset;
  alt: string;
}
