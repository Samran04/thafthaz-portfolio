import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import { FloatingNav } from '@/components/floating-nav';
import { SmoothScroll } from '@/components/smooth-scroll';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Comprehensive SEO Metadata optimized for Mangalore Video Editor, Videographer & Graphic Designer
export const metadata: Metadata = {
  title: 'Thafthaz | Video Editor, Videographer & Graphic Designer in Mangalore',
  description:
    'Thafthaz is a premier Video Editor, Videographer & Creative Graphic Designer based in Mangalore, Karnataka. Specializing in cinematic video production, motion graphics, brand films, and spatial poster designs.',
  keywords: [
    'Video Editor in Mangalore',
    'Videographer in Mangalore',
    'Graphic Designer Mangalore',
    'Motion Graphics Artist Mangalore',
    'Karnataka Video Production',
    'Mangalore Creative Agency',
    'Commercial Video Editing',
    'Poster Designer Mangalore',
    'Cinematography Mangalore',
    'Reel Editor Mangalore',
  ],
  authors: [{ name: 'Thafthaz' }],
  creator: 'Thafthaz',
  publisher: 'Thafthaz Exhibition',
  metadataBase: new URL('https://thafthaz.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Thafthaz | Video Editor, Videographer & Graphic Designer in Mangalore',
    description:
      'Premier Video Editor, Videographer & Creative Graphic Designer based in Mangalore. Cinematic video editing, motion graphics, and poster design.',
    url: 'https://thafthaz.com',
    siteName: 'Thafthaz Portfolio',
    images: [
      {
        url: '/assets/profile/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Thafthaz - Video Editor & Graphic Designer in Mangalore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thafthaz | Video Editor, Videographer & Graphic Designer in Mangalore',
    description:
      'Premier Video Editor, Videographer & Creative Graphic Designer based in Mangalore. Cinematic video editing, motion graphics, and poster design.',
    images: ['/assets/profile/profile.jpeg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD Structured Data for Local Creative Professional SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Thafthaz - Video Editor, Videographer & Graphic Designer',
    image: 'https://thafthaz.com/assets/profile/profile.jpeg',
    '@id': 'https://thafthaz.com',
    url: 'https://thafthaz.com',
    telephone: '+919000000000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9141,
      longitude: 74.856,
    },
    knowsAbout: [
      'Video Editing',
      'Videography',
      'Graphic Design',
      'Motion Graphics',
      'Poster Design',
      'Color Grading',
      'Short-Form Reels',
    ],
    priceRange: '$$$',
  };

  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
