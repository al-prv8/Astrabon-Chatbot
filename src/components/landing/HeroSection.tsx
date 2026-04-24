'use client';

import { motion } from 'framer-motion';
import { MessageSquare, ChevronDown } from 'lucide-react';

export function HeroSection() {
  const handleOpenChat = () => {
    // Dispatch a custom event that AstrabonWidget listens to
    window.dispatchEvent(new CustomEvent('astrabon:open-chat'));
  };

  return (
    <div className="relative h-screen max-md:h-[100dvh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop"
          alt="Premium cookware in a professional kitchen"
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
        />
        {/* Cinema Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-20 max-md:mt-12">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/8 border border-white/15 text-[10px] md:text-xs font-bold tracking-[0.25em] text-white/80 uppercase mb-6 md:mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI-Powered Sales Assistant · Phase 1
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 md:mb-8 leading-[1.05] drop-shadow-2xl"
          >
            Cook Smarter.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-300 to-primary italic">
              Shop Simpler.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base md:text-xl text-white/75 max-w-2xl mx-auto mb-10 md:mb-14 font-light leading-relaxed"
          >
            Meet Dhon — Astrabon&apos;s intelligent assistant who guides you to the perfect cookware, kitchen tools, and hospitality supplies — in seconds. For home cooks and commercial buyers alike.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              id="hero-chat-cta"
              onClick={handleOpenChat}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-text-on-primary font-bold tracking-wide hover:bg-amber-400 hover:shadow-[0_0_40px_rgba(200,152,94,0.6)] transition-all duration-300 group shadow-[0_4px_20px_rgba(200,152,94,0.4)]"
            >
              <MessageSquare className="w-5 h-5" />
              Start Shopping
              <span className="w-1.5 h-1.5 rounded-full bg-text-on-primary opacity-60 group-hover:opacity-100 animate-pulse" />
            </button>
            <a
              href="#categories"
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-semibold tracking-wide hover:border-white/50 hover:bg-white/8 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Products
              <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-8 mt-16 md:mt-20 border-t border-white/10 pt-8"
          >
            {[
              { number: '500+', label: 'Products' },
              { number: '10+', label: 'Categories' },
              { number: '24/7', label: 'AI Support' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl md:text-3xl text-white font-bold">{stat.number}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-white/70">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </div>
  );
}
