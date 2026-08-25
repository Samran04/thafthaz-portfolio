import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Thafthaz - Video Editor & Graphic Designer in Mangalore',
    short_name: 'Thafthaz',
    description:
      'Official portfolio of Thafthaz, premier Video Editor, Videographer & Graphic Designer based in Mangalore, Karnataka.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030d10',
    theme_color: '#39FF14',
    icons: [
      {
        src: '/assets/profile/profile.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/assets/profile/profile.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
