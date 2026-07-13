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

export const metadata: Metadata = {
  title: 'Thafthaz | Creative Portfolio',
  description: 'A premium interactive portfolio for a video editor and graphic designer.',
};

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
