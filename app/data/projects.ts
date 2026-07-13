export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: 'featured-video',
    title: 'Featured video',
    category: 'Video',
    image: '/assets/featured-projects/IMG-20250827-WA0025.jpg',
  },
  {
    slug: 'featured-poster',
    title: 'Featured poster',
    category: 'Poster',
    image: '/assets/featured-projects/IMG-20250827-WA0062.jpg',
  },
  {
    slug: 'featured-motion',
    title: 'Featured motion',
    category: 'Motion',
    image: '/assets/featured-projects/IMG-20250827-WA0073.jpg',
  },
  {
    slug: 'featured-composition',
    title: 'Featured composition',
    category: 'Branding',
    image: '/assets/featured-projects/IMG-20250827-WA0077.jpg',
  },
];
