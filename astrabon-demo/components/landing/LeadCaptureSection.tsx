'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export function LeadCaptureSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/40 to-bg" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">
                Get In Touch
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-text-primary font-bold mb-5">
                Ready to Find the{' '}
                <span className="italic text-primary">Right Products?</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto font-light text-lg leading-relaxed">
                Whether you have a specific requirement or want to explore what Astrabon can offer — fill in your details and we&apos;ll be in touch.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-border-subtle">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-success" />
                    </div>
                    <h3 className="font-serif text-2xl text-text-primary font-semibold mb-3">
                      We&apos;ll be in touch!
                    </h3>
                    <p className="text-text-secondary font-light max-w-sm">
                      The Astrabon team has received your enquiry and will follow up within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-primary text-sm font-medium hover:underline"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold block mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full bg-surface-alt/50 border border-border-subtle rounded-xl px-4 py-3.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold block mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full bg-surface-alt/50 border border-border-subtle rounded-xl px-4 py-3.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold block mb-2">
                        WhatsApp / Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+960 xxx xxxx"
                        className="w-full bg-surface-alt/50 border border-border-subtle rounded-xl px-4 py-3.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold block mb-2">
                        What are you looking for?
                      </label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="e.g. Cookware sets for a 5-person household, or commercial kitchen equipment for a new restaurant..."
                        rows={4}
                        className="w-full bg-surface-alt/50 border border-border-subtle rounded-xl px-4 py-3.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-primary text-text-on-primary font-bold tracking-wide hover:bg-amber-400 transition-all duration-300 disabled:opacity-70 shadow-[0_4px_20px_rgba(200,152,94,0.35)]"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Enquiry
                        </>
                      )}
                    </button>

                    <p className="text-center text-text-muted text-xs">
                      Or use the chat assistant in the bottom-right corner for instant recommendations.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
