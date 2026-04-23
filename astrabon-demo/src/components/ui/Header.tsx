'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChefHat } from 'lucide-react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Products', href: '#categories' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Commercial', href: '#commercial' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          isScrolled ? 'bg-bg/80 backdrop-blur-xl py-4 shadow-lg border-b border-border-subtle' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 group flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <ChefHat className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-sans text-[10px] font-bold tracking-[0.3em] uppercase mb-0.5 ${isScrolled ? 'text-text-muted' : 'text-white/60'}`}>
                Maldives
              </span>
              <span className={`font-serif text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
                Astrabon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors duration-300 relative group ${isScrolled ? 'text-text-primary' : 'text-white'}`}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#contact"
              className={`px-5 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-text-on-primary hover:border-primary ${
                isScrolled ? 'border-border-subtle text-text-primary' : 'border-white/30 text-white'
              }`}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden z-50 transition-colors ${isScrolled ? 'text-text-primary' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-bg/98 backdrop-blur-2xl transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-text-muted hover:text-primary transition-colors"
        >
          <X className="w-10 h-10" />
        </button>

        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-serif text-4xl text-text-primary font-bold hover:text-primary italic transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 px-10 py-3 rounded-full bg-primary text-text-on-primary font-bold uppercase tracking-widest text-sm"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
