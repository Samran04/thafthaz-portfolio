'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Film, FolderKanban, Sparkles, Mail, Home } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '#services', label: 'Services', icon: Sparkles },
  { href: '#showreel', label: 'Showreel', icon: Film },
  { href: '/work', label: 'Work', icon: FolderKanban },
  { href: '#about', label: 'Contact', icon: Mail },
];

export function FloatingNav() {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldShow = currentScrollY < 80 || currentScrollY < lastScrollY || mobileMenuOpen;
      setVisible(shouldShow);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <div className="fixed top-4 inset-x-0 z-50 flex w-full justify-center pointer-events-none px-4">
            <motion.header
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto flex items-center justify-center rounded-full border border-white/10 bg-[#0b1417]/90 px-4 py-2 text-white shadow-2xl shadow-black/80 backdrop-blur-xl w-auto gap-2 sm:gap-4 max-w-[calc(100vw-2rem)]"
            >
              {/* Fixed Logo */}
              <Link
                href="/"
                className="group flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] font-semibold text-white transition hover:text-[#39FF14]"
              >
                Thafthaz
                <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14] inline-block animate-pulse"></span>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center justify-center gap-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-3.5 py-1 text-xs uppercase tracking-[0.2em] font-medium text-[#8ea1a7] whitespace-nowrap transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Tablet & Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex lg:hidden flex-shrink-0 h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#39FF14]/40"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={15} className="text-[#39FF14]" /> : <Menu size={15} />}
              </button>
            </motion.header>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 flex flex-col gap-2 rounded-[2rem] border border-white/10 bg-[#0b1417]/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden max-w-sm mx-auto"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8ea1a7]">Thafthaz Portfolio</span>
              <span className="h-2 w-2 rounded-full bg-[#39FF14] animate-pulse"></span>
            </div>

            <nav className="flex flex-col gap-1 py-2">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white transition hover:bg-white/5 hover:text-[#39FF14]"
                  >
                    <Icon size={15} className="text-[#39FF14]" /> {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
