interface SanityDocument {
  _id: string;
  _createdAt: string;
  language: string;
  slug: SanitySlug;
  _translations?: SanityDocument[];
}
