"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { GlassModal } from "@/components/ui/GlassModal";

export default function HomePage() {
  const [isSimOpen, setIsSimOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden selection:bg-white/20">
      {/* Ambient Mesh Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-hero-mesh opacity-30 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[10000ms]" />
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter">
          LifeKart<span className="text-white/30">.OS</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors">
            Access Terminal
          </Link>
          <MagneticButton>
            <Link href="/signup" className="text-sm px-5 py-2.5 rounded-full bg-white text-black font-medium hover:shadow-glow transition-all">
              Initialize Lifetime
            </Link>
          </MagneticButton>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center max-w-7xl mx-auto">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span className="text-xs font-medium tracking-wide text-white/80 uppercase">System Online V2.0</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-6">
            The operating system <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
              for lifetime commerce.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Commit your lifetime consumption patterns. Unlock enterprise-grade wholesale pricing, employer-subsidized delivery schedules, and generational wealth pooling.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
          <MagneticButton onClick={() => setIsSimOpen(true)}>
            <div className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Run Simulation
            </div>
          </MagneticButton>
          
          <MagneticButton>
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-transparent text-white font-medium text-lg hover:bg-white/5 transition-colors backdrop-blur-md">
              View Dashboards
            </Link>
          </MagneticButton>
        </FadeIn>

        {/* Floating Futuristic Dashboard Graphic */}
        <FadeIn delay={0.8} className="w-full max-w-5xl mx-auto mt-24">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 h-full" />
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <GlassPanel className="p-1 md:p-2 ring-1 ring-white/10 overflow-hidden rounded-[2rem]">
                <div className="bg-surface rounded-[1.5rem] w-full aspect-[16/9] md:aspect-[21/9] border border-white/5 flex items-center justify-center relative overflow-hidden group cursor-crosshair">
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="flex flex-col items-center justify-center gap-4 z-10">
                     <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-32 h-32 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shadow-glow backdrop-blur-xl group-hover:scale-110 transition-transform duration-500"
                     >
                        <span className="text-3xl font-light">47%</span>
                     </motion.div>
                     <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">Lifetime Savings Projected</p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </FadeIn>
      </main>

      {/* The Interactive Jaw-Dropping Pop-up */}
      <GlassModal isOpen={isSimOpen} onClose={() => setIsSimOpen(false)}>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Neural Forecasting Array</h2>
              <p className="text-sm text-white/50">Processing lifetime consumption variables...</p>
            </div>
            <button onClick={() => setIsSimOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <span className="block text-xl mb-1">👶 ➔ 🎓</span>
              <h3 className="font-medium text-white/90">Generational Planner</h3>
              <p className="text-xs text-white/40 mt-1">Simulate multi-decade staple procurement.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <span className="block text-xl mb-1">🏢 ➔ 🏠</span>
              <h3 className="font-medium text-white/90">Corporate Subsidy</h3>
              <p className="text-xs text-white/40 mt-1">Calculate employer payroll deductions.</p>
            </div>
          </div>
          
          <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }} 
              animate={{ width: "100%" }} 
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="h-full bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </div>
        </div>
      </GlassModal>
    </div>
  );
}