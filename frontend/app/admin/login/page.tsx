'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { isSupabaseConfigured, getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@thafthaz.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (email === 'admin@thafthaz.com' && password === 'thafthaz2026') {
        localStorage.setItem('thafthaz_admin_auth', 'true');
        router.push('/admin');
        return;
      }

      if (isSupabaseConfigured) {
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
          const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (authError) throw authError;
          localStorage.setItem('thafthaz_admin_auth', 'true');
          router.push('/admin');
          return;
        }
      }

      throw new Error('Invalid credentials. Password or email incorrect.');
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials. Please check password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030d10] px-6 text-white">
      <div className="w-full max-w-md space-y-8 rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14]">
            <ShieldCheck size={24} />
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-white">Thafthaz CMS</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8ea1a7]">Admin Control Panel</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8ea1a7] mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-[#8ea1a7]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-[#071114] py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 focus:border-[#39FF14] focus:outline-none"
                placeholder="admin@thafthaz.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8ea1a7] mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3.5 text-[#8ea1a7]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-[#071114] py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 focus:border-[#39FF14] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14] py-3 text-xs uppercase tracking-[0.2em] font-semibold text-black transition hover:bg-[#39FF14]/90"
          >
            {loading ? 'Authenticating...' : 'Sign In to CMS'} <ArrowRight size={14} />
          </button>
        </form>

        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/30">
          Powered by Supabase Auth & Cloudinary
        </p>
      </div>
    </div>
  );
}
