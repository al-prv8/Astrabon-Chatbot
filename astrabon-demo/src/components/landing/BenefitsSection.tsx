'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import { Globe, Zap, ShieldCheck, Clock, TrendingUp, Star } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Intelligent Recommendations',
    description:
      "Powered by AI that understands the difference between a home cook's daily pan and a hotel's commercial cookware requirement.",
  },
  {
    icon: Globe,
    title: 'B2C & B2B Expertise',
    description:
      'Whether you\'re buying a single frying pan or sourcing 200 chafing dishes for a resort — our assistant adapts to your scale.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Product Guidance',
    description:
      'Every recommendation comes with a plain-English explanation of why it fits — no jargon, no guesswork.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description:
      'Browse and get recommendations any time. The Astrabon team follows up within 24 hours on every lead.',
  },
  {
    icon: TrendingUp,
    title: 'Commercial Sourcing',
    description:
      "Working on a hotel, restaurant, or café fit-out? We'll connect you with the right people for bulk pricing and custom BOQ.",
  },
  {
    icon: Star,
    title: 'Premium Brand Range',
    description:
      'Curated selection of cookware, glassware, knives, coffee equipment and more — from everyday essentials to professional grade.',
  },
];

export function BenefitsSection() {
  return (
    <section id="commercial" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant kitchen"
          className="w-full h-full object-cover opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-bg/95" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">
              Why Astrabon AI
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-text-primary font-bold mb-5">
              A Smarter Way to{' '}
              <span className="italic text-primary">Source Kitchen Supplies</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto font-light text-lg leading-relaxed">
              Purpose-built for buyers who value expert guidance — not a scrolling product list.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 80}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-7 border border-border-subtle hover:border-primary/30 transition-all duration-400 group h-full"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg text-text-primary font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary font-light text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
