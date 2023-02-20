type SanityNavigationChildInternalPage = SanityPropertyCategory & {
  _type: string;
};

interface SanityNavigationChild {
  title: string;
  external: boolean;
  internalPage?: SanityNavigationChildInternalPage;
  externalUrl?: string;
  blank: boolean;
}

interface SanityNavigation extends SanityDocument {
  title: string;
  external: boolean;
  internalPage?: SanityNavigationChildInternalPage;
  externalUrl?: string;
  blank: boolean;
  order: number;
}
