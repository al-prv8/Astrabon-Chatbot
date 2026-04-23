'use client';

import Link from 'next/link';
import { ChefHat, Globe, Link2, Share2, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-bg pt-20 pb-10 overflow-hidden border-t border-border-subtle">
      {/* Watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.025]">
        <span className="font-serif font-bold text-[15vw] leading-none text-text-primary absolute -top-10 -left-6 whitespace-nowrap">
          Astrabon
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-text-muted uppercase mb-0.5">Maldives</span>
                <span className="font-serif text-xl font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                  Astrabon
                </span>
              </div>
            </Link>
            <p className="text-text-secondary font-light leading-relaxed max-w-sm mb-8 text-sm">
              Premium kitchenware, cookware, and hospitality supplies for home cooks and commercial buyers across the Maldives and beyond.
            </p>

            <div className="flex items-center gap-4">
              {[Globe, Link2, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl border border-border-subtle flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-serif text-base text-text-primary italic mb-5">Products</h4>
              <ul className="space-y-3 text-sm">
                {['Cookware & Sets', 'Knives', 'Coffee Essentials', 'Glassware', 'Buffet Ware', 'Industrial Equipment'].map(item => (
                  <li key={item}>
                    <a href="#categories" className="text-text-secondary hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-base text-text-primary italic mb-5">Company</h4>
              <ul className="space-y-3 text-sm">
                {['About Us', 'Commercial Sourcing', 'How It Works', 'Our Story'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-text-secondary hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-base text-text-primary italic mb-5">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:hello@astrabon.mv" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" /> hello@astrabon.mv
                  </a>
                </li>
                <li>
                  <a href="tel:+9609600000" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" /> +960 960 0000
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-subtle gap-4">
          <p className="text-text-muted text-xs">
            © 2025 Astrabon Maldives. AI Assistant powered by{' '}
            <span className="text-primary font-medium">PRV8 | Privé</span>.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="text-text-muted hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
