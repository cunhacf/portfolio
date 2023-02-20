interface SanitySocialNetworks {
  type: 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'youtube' | 'linkedin' | 'github';
  url: string;
}

interface SanitySiteConfig extends SanityDocument {
  title?: string;
  description?: string;
  networks?: SanitySocialNetworks[];
  contactUrl?: string;
}
