import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import { FloatingNav } from '@/components/floating-nav';
import { SmoothScroll } from '@/components/smooth-scroll';
import './globals.css';

// Load premium web fonts with Next.js built-in optimization.
// Fonts are served from Google and included as CSS variables.
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Metadata is used by Next.js for SEO and page previews.
export const metadata: Metadata = {
  title: 'Thafthaz | Creative Portfolio',
  description: 'A premium interactive portfolio for a video editor and graphic designer.',
};

// RootLayout wraps every page in the App Router.
// It adds global fonts and shared UI like smooth scrolling and navigation.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
