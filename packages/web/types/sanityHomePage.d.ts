interface SanityHomeHeader {
  image: SanityImage;
  text: import('@portabletext/react').TypedObject;
}

interface SanityHomeSection {
  title: string;
  description?: string;
}

interface SanityHomeContentBlock extends SanityHomeSection {
  blockType: 'work' | 'projects' | 'contact';
}

interface SanityHomePage extends SanityDocument {
  header: SanityHomeHeader;
  contentBlocks: SanityHomeContentBlock[];
}
