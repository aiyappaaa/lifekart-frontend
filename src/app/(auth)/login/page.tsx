"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FadeIn } from '@/components/motion/FadeIn';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API latency before we wire up FastAPI
    setTimeout(() => {
      setToken('dev_mock_jwt_token_12345');
      router.push('/subscriptions');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
        ← Return to OS
      </Link>

      <FadeIn delay={0.1} className="w-full max-w-md z-10">
        <GlassPanel className="p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 shadow-glow mb-4">
              <span className="text-xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Access Terminal</h1>
            <p className="text-sm text-white/50">Authenticate to view lifetime analytics</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Work Email</label>
              <input
                type="email"
                required
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                placeholder="aiyappa@lifekart.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-white/5 accent-white" />
                Keep me signed in
              </label>
              <a href="#" className="text-xs text-white/70 hover:text-white transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Authenticating...' : 'Initialize Session →'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-white/40">
              No clearance? <Link href="/signup" className="text-white hover:underline">Request access</Link>
            </p>
          </div>
        </GlassPanel>
      </FadeIn>
    </div>
  );
}