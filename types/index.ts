export interface Post {
  id?: number;
  i18n?: string;
  slug?: string;
  layout?: string;
  category?: string;
  categorySlug?: string;
  chapter?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  scripts?: string;
  headings?: string;
  content?: string;
  readMins?: number;
  words?: number;
  author?: string;
  tags?: string[];
  featureImage?: string;
  featureImageWidth?: number;
  featureImageHeight?: number;
  featureVideo?: string;
  createdAt?: string;
  updatedAt?: string;
}