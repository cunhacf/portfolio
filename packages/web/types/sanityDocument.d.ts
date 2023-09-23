interface SanityDocument {
  _id: string;
  _createdAt: string;
  language?: string;
  _translations?: SanityDocument[];
}
