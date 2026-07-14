'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
];

// FloatingNav shows a minimal navigation bar that hides when scrolling down.
// The nav appears again when the user scrolls up.
export function FloatingNav() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldShow = currentScrollY < 80 || currentScrollY < lastScrollY;
      setVisible(shouldShow);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#0b1417]/85 px-3 py-2 shadow-lg shadow-black/40 backdrop-blur-xl"
        >
          <Link href="/" className="rounded-full px-3.5 py-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-white transition hover:bg-white/5">
            Thafthaz
          </Link>
          {navItems.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3.5 py-1.5 text-xs uppercase tracking-[0.25em] text-[#8ea1a7] transition hover:bg-white/5 hover:text-white">
              {item.label}
            </Link>
          ))}
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
