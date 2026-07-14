export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  video?: string;
  description: string;
  isFeatured?: boolean;
};

// All 10 image assets in assets/featured-projects are mapped to real entries.
// Featured items are shown on the homepage snapped exhibition, others are in /work archive.
export const projects: Project[] = [
  {
    slug: 'featured-video',
    title: 'Visual Rhythms',
    category: 'Video Editing',
    image: '/assets/featured-projects/IMG-20250827-WA0025.jpg',
    // Fallback public video for demonstration. Easily replaceable with local MP4.
    video: 'https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-light-leaks-background-3532-large.mp4',
    description: 'A cinematic exploration of light leaks and spatial rhythm. Focusing on seamless edits and sound synchronization.',
    isFeatured: true,
  },
  {
    slug: 'featured-poster',
    title: 'Typographic Restraint',
    category: 'Poster Design',
    image: '/assets/featured-projects/IMG-20250827-WA0062.jpg',
    description: 'An editorial poster series examining grid systems, high-contrast layouts, and negative space.',
    isFeatured: true,
  },
  {
    slug: 'featured-motion',
    title: 'Kinetic Interactions',
    category: 'Motion Design',
    image: '/assets/featured-projects/IMG-20250827-WA0073.jpg',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32104-large.mp4',
    description: 'A study of fluid motion dynamics, particle systems, and neon green light interactions.',
    isFeatured: true,
  },
  {
    slug: 'featured-composition',
    title: 'Minimalist Identity',
    category: 'Branding',
    image: '/assets/featured-projects/IMG-20250827-WA0077.jpg',
    description: 'Visual identity system featuring refined editorial styling, clean lines, and strict dark cyan color theory.',
    isFeatured: true,
  },
  {
    slug: 'neon-glow',
    title: 'Neon Atmospheric Study',
    category: 'Art Direction',
    image: '/assets/featured-projects/IMG-20250827-WA0046.jpg',
    description: 'Investigating light scattering and glow effects across dark charcoal canvases.',
    isFeatured: false,
  },
  {
    slug: 'editorial-spread',
    title: 'Editorial Line & Rhythms',
    category: 'Typography',
    image: '/assets/featured-projects/IMG-20250827-WA0061.jpg',
    description: 'A publication spread prioritizing typographic hierarchy, line spacing, and clean layouts.',
    isFeatured: false,
  },
  {
    slug: 'visual-atmosphere',
    title: 'Cinematic Shadows',
    category: 'Photography',
    image: '/assets/featured-projects/IMG-20250827-WA0070.jpg',
    description: 'Capturing depth, shadow, and architectural lines through a high-contrast lens.',
    isFeatured: false,
  },
  {
    slug: 'brand-identity',
    title: 'Geometric Layouts',
    category: 'Branding',
    image: '/assets/featured-projects/IMG-20250827-WA0079.jpg',
    description: 'Corporate branding layout structured entirely around mathematical grids and precise alignments.',
    isFeatured: false,
  },
  {
    slug: 'kinetic-type',
    title: 'Typographic Motion',
    category: 'Motion Graphics',
    image: '/assets/featured-projects/IMG-20250827-WA0082.jpg',
    description: 'Experimental design sequence where type sizes scale dynamically with camera movement.',
    isFeatured: false,
  },
  {
    slug: 'spatial-design',
    title: 'Architectural Depth',
    category: 'Graphic Design',
    image: '/assets/featured-projects/IMG-20250827-WA0085.jpg',
    description: 'Exploring two-dimensional representations of architectural depth, perspective, and lighting.',
    isFeatured: false,
  },
];

