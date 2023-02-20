interface SanityPageHighlight {
  title: string;
  image: SanityImage;
}

interface SanityPage extends SanityDocument {
  title: string;
  slug: SanitySlug;
  image?: SanityImage;
  content: import('@portabletext/react').TypedObject;
  highlightsBlock: {
    title: string,
    highlights: SanityPageHighlight[]
  }
}
