export type AspectRatio = '16:9' | '9:16' | '21:9' | '1:1' | '3:4' | '4:3';

export type MediaType = 'image' | 'video';

export type ProjectMedia = {
  id: string;
  projectId: string;
  mediaType: MediaType;
  url: string;
  thumbnailUrl?: string;
  aspectRatio: AspectRatio;
  title?: string;
  duration?: string;
  displayOrder: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  categoryId?: string;
  category: string;
  description: string;
  client?: string;
  releaseDate?: string;
  softwareUsed: string[];
  projectType: string; // e.g. 'Video Edit', 'Motion Graphics', 'Poster Series', 'Social Reel'
  thumbnail: string;
  videoUrl?: string; // Cloudinary streaming URL if primary video exists
  posters: string[]; // Image URLs for gallery fallback / posters
  media: ProjectMedia[]; // Unified media items (videos + images with aspect ratio)
  isFeatured: boolean;
  displayOrder: number;
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
};

export type Showreel = {
  id: string;
  title: string;
  description?: string;
  videoUrl: string; // Cloudinary streaming URL
  thumbnailUrl: string;
  duration?: string;
  aspectRatio: AspectRatio;
  isFeatured: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon identifier
  deliverables?: string[];
  displayOrder: number;
  isVisible: boolean;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description?: string;
  displayOrder: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  displayOrder: number;
};

export type Testimonial = {
  id: string;
  clientName: string;
  company?: string;
  role?: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
  displayOrder: number;
  isPublished: boolean;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string;
  displayOrder: number;
  isVisible: boolean;
};

export type HeroSettings = {
  name: string;
  title: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  profileImageUrl: string;
  resumeUrl: string;
};

export type AboutSettings = {
  biography: string;
  tagline: string;
  subline: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
};

export type CMSData = {
  hero: HeroSettings;
  about: AboutSettings;
  categories: Category[];
  projects: Project[];
  showreels: Showreel[];
  services: Service[];
  experiences: Experience[];
  skills: Skill[];
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
};
