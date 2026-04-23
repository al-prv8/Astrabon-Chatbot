'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import {
  FlameKindling, Scissors, Coffee, Wine, Utensils, Building2,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'cookware',
    label: 'Cookware & Sets',
    description: 'Pots, pans, full cooking sets for home & commercial',
    icon: FlameKindling,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=600&auto=format&fit=crop',
    prompt: 'Help me find cookware',
    accent: 'from-orange-500/20 to-amber-500/10',
  },
  {
    id: 'knives',
    label: 'Knives & Accessories',
    description: 'Chef knives, sets, and cutting accessories',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1518796745738-41048802f99a?q=80&w=600&auto=format&fit=crop',
    prompt: 'Help me choose knives',
    accent: 'from-slate-500/20 to-zinc-500/10',
  },
  {
    id: 'coffee',
    label: 'Coffee Essentials',
    description: 'Machines, brewers, and serving accessories',
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
    prompt: 'Find coffee essentials',
    accent: 'from-amber-700/20 to-yellow-700/10',
  },
  {
    id: 'glassware',
    label: 'Glassware & Porcelain',
    description: 'Premium crystal, wine glasses, fine dinnerware',
    icon: Wine,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
    prompt: 'Show me glassware options',
    accent: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    id: 'buffet',
    label: 'Buffet & Restaurant Ware',
    description: 'Chafing dishes, serving equipment, presentation',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop',
    prompt: "I'm buying for a restaurant or café",
    accent: 'from-primary/20 to-amber-600/10',
  },
  {
    id: 'industrial',
    label: 'Industrial Equipment',
    description: 'Commercial-grade ovens, fryers, and kitchen systems',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1556909195-de0e2a9e3bab?q=80&w=600&auto=format&fit=crop',
    prompt: 'Show kitchen starter essentials',
    accent: 'from-stone-500/20 to-neutral-500/10',
  },
];

export function CategoriesSection() {
  const handleCategoryClick = (prompt: string) => {
    window.dispatchEvent(new CustomEvent('astrabon:open-chat', { detail: { prompt } }));
  };

  return (
    <section id="categories" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-luxury-gradient opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">
              Our Range
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-text-primary font-bold mb-5">
              Everything Your{' '}
              <span className="italic text-primary">Kitchen Needs</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto font-light text-lg leading-relaxed">
              From a single pan to a full commercial kitchen fit-out — browse by category or let our assistant guide you.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.id} delay={i * 80}>
                <motion.button
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick(cat.prompt)}
                  className="group relative w-full text-left rounded-2xl overflow-hidden border border-border-subtle hover:border-primary/40 transition-all duration-400 glass-card"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent} to-transparent`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent" />

                    {/* Icon */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-lg text-text-primary font-semibold mb-1 group-hover:text-primary transition-colors">
                          {cat.label}
                        </h3>
                        <p className="text-text-muted text-sm font-light leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                        Ask the assistant →
                      </span>
                    </div>
                  </div>
                </motion.button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="text-center mt-14">
          <button
            onClick={() => handleCategoryClick('Show me everything you have')}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-primary/40 text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-text-on-primary hover:border-primary transition-all duration-300"
          >
            Browse All Categories
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
