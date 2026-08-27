import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import { FloatingNav } from '@/components/floating-nav';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Footer } from '@/components/footer';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thafthaz.com';

// Comprehensive SEO & Brand Metadata for Thafthaz
export const metadata: Metadata = {
  title: {
    default: 'Thafthaz | Official Portfolio | Video Editor, Videographer & Graphic Designer in Mangalore',
    template: '%s | Thafthaz',
  },
  description:
    'Thafthaz is a premier Video Editor, Videographer & Graphic Designer based in Mangalore, Karnataka. Specializing in commercial video editing, motion graphics, brand films, poster design, and visual communication.',
  keywords: [
    'Thafthaz',
    'thafthaz',
    'Thafthaz Portfolio',
    'Thafthaz Studio',
    'Thafthaz Mangalore',
    'Thafthaz official site',
    'Thafthaz Video Editor',
    'Thafthaz Graphic Designer',
    'Thafthaz Videographer',
    'Thafthaz contact',
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
    'St Aloysius Visual Communication',
  ],
  authors: [{ name: 'Thafthaz', url: siteUrl }],
  creator: 'Thafthaz',
  publisher: 'Thafthaz Creative Studio',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Thafthaz | Official Portfolio | Video Editor, Videographer & Graphic Designer',
    description:
      'Official portfolio of Thafthaz, premier Video Editor, Videographer & Graphic Designer based in Mangalore, Karnataka. Cinematic editing, motion design, and visual identities.',
    url: siteUrl,
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
      'Official portfolio of Thafthaz, premier Video Editor, Videographer & Graphic Designer based in Mangalore, Karnataka.',
    images: ['/assets/profile/profile.jpeg'],
    creator: '@thafthaz',
  },
  category: 'Creative Arts & Design',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Multi-Schema JSON-LD Structured Data for High PageRank & AEO (Answer Engine Optimization)
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Person Entity (for Google Knowledge Graph & AI Search)
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Thafthaz',
        alternateName: ['Thafthaz Studio', 'Thafthaz Portfolio', 'Thafthaz Mangalore'],
        jobTitle: 'Video Editor, Videographer & Graphic Designer',
        description:
          'Graphic Designer & Visual Communicator holding a B.Sc. in Visual Communication from St. Aloysius College, Mangalore. Specializing in commercial video editing, brand visual identity, and motion graphics.',
        url: siteUrl,
        image: `${siteUrl}/assets/profile/profile.jpeg`,
        telephone: '+91 82773 89481',
        email: 'hello@thafthaz.com',
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'St. Aloysius College, Mangalore',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mangalore',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
        knowsAbout: [
          'Video Editing',
          'Videography',
          'Graphic Design',
          'Motion Graphics',
          'Poster Design',
          'Visual Identity',
          'Commercial Film Production',
          'Color Grading',
        ],
        sameAs: [
          'https://github.com/Samran04/thafthaz-portfolio',
        ],
      },
      // 2. ProfessionalService / Local Business Entity
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: 'Thafthaz Creative Studio',
        url: siteUrl,
        logo: `${siteUrl}/assets/profile/profile.jpeg`,
        image: `${siteUrl}/assets/profile/profile.jpeg`,
        telephone: '+91 82773 89481',
        email: 'hello@thafthaz.com',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mangalore',
          addressRegion: 'Karnataka',
          postalCode: '575001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 12.9141,
          longitude: 74.856,
        },
        areaServed: ['Mangalore', 'Karnataka', 'India', 'Global'],
        founder: { '@id': `${siteUrl}/#person` },
      },
      // 3. WebSite Entity (for Search Sitelinks & Brand Authority)
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Thafthaz Official Website',
        description: 'Official Portfolio of Thafthaz - Video Editor & Graphic Designer in Mangalore',
        publisher: { '@id': `${siteUrl}/#person` },
        inLanguage: 'en-IN',
      },
      // 4. FAQ Schema for AEO (Perplexity, ChatGPT, Gemini, SearchGPT Citation Optimization)
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who is Thafthaz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Thafthaz is a premier Video Editor, Videographer, and Graphic Designer based in Mangalore, Karnataka. He holds a B.Sc. in Visual Communication from St. Aloysius College, Mangalore, and specializes in commercial video editing, motion graphics, poster design, and visual brand identities.',
            },
          },
          {
            '@type': 'Question',
            name: 'What services does Thafthaz offer in Mangalore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Thafthaz offers commercial video editing, on-site videography, motion graphics animation, brand identity design, poster design, and Instagram Reels / TikTok video production.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is Thafthaz located and does he accept remote client work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Thafthaz is based in Mangalore, Karnataka, India, and works with clients both locally in Karnataka and remotely for international commercial projects.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I contact Thafthaz for a project or commission?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can contact Thafthaz directly via phone at +91 82773 89481, email at hello@thafthaz.com, or through his official website portfolio at https://thafthaz.com/contact.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <FloatingNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

