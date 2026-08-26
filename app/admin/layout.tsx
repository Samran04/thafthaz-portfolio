'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Film, FolderKanban, User, Sparkles, MessageSquare, ExternalLink, LogOut } from 'lucide-react';

const adminNavItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects & Videos', icon: FolderKanban },
  { href: '/admin/hero-about', label: 'Hero & About', icon: User },
  { href: '/admin/services', label: 'Services', icon: Sparkles },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
];

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    const auth = localStorage.getItem('thafthaz_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('thafthaz_admin_auth');
    router.push('/admin/login');
  };

  // If on login page, render without sidebar shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030d10] text-xs text-[#8ea1a7] uppercase tracking-[0.2em]">
        Verifying Admin Session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#030d10] text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-[#0b1417] p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          {/* Logo & Header */}
          <div className="space-y-1 border-b border-white/5 pb-4">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Thafthaz<span className="h-1.5 w-1.5 rounded-full bg-[#39FF14] animate-pulse"></span>
            </Link>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8ea1a7]">CMS Admin Console</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs uppercase tracking-[0.2em] font-medium transition ${
                    isActive
                      ? 'border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14]'
                      : 'text-[#8ea1a7] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={16} /> {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-6 border-t border-white/5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] hover:text-[#39FF14] transition"
          >
            <ExternalLink size={14} /> View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-red-400 hover:text-red-300 transition pt-2 w-full text-left"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="flex md:hidden items-center justify-between border-b border-white/10 bg-[#0b1417] p-4">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.3em]">Thafthaz CMS</Link>
          <Link href="/admin/projects" className="text-xs text-[#39FF14] uppercase tracking-wider">Projects</Link>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
