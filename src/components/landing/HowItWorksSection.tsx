'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MessageSquare, Sparkles, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Tell us what you need',
    description:
      'Start a conversation. Tell the assistant if you\'re shopping for everyday home cooking, a café fit-out, a hotel supply project, or anything in between.',
    detail: 'Free text or quick prompts — however you prefer.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Get smart recommendations',
    description:
      'The assistant asks 2–3 targeted questions about your household size, priorities, and budget — then presents the 2–3 best-fit options with clear explanations.',
    detail: 'No overwhelming lists. Just the right choices.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Connect with our team',
    description:
      'Ready to inquire or place a bulk order? The assistant captures your contact details and routes you directly to the Astrabon team for fast follow-up.',
    detail: 'Response within 24 hours guaranteed.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-36 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-surface/30" />
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">
              How It Works
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-text-primary font-bold mb-5">
              Your{' '}
              <span className="italic text-primary">Personal Shopping</span>
              {' '}Expert
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto font-light text-lg leading-relaxed">
              Three simple steps from browsing to buying — powered by intelligent conversation.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={i * 120}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative glass-card rounded-2xl p-8 text-center border border-border-subtle hover:border-primary/30 transition-all duration-400 group"
                >
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6 relative group-hover:bg-primary/20 transition-colors mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-text-on-primary text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-text-primary font-semibold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary font-light text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <p className="text-[11px] text-primary font-medium uppercase tracking-wider">
                    {step.detail}
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
