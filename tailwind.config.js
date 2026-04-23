/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family-body)', 'sans-serif'],
        serif: ['var(--font-family-display)', 'serif'],
        display: ['var(--font-family-display)', 'serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-soft': 'var(--color-primary-soft)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          alt: 'var(--color-surface-alt)',
          50: 'var(--color-surface-50)',
          100: 'var(--color-surface-100)',
          200: 'var(--color-surface-200)',
        },
        bg: 'var(--color-bg)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          'on-primary': 'var(--color-text-on-primary)',
        },
        'border-subtle': 'var(--color-border-subtle)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        glass: {
          heavy: 'var(--glass-heavy)',
          atlas: 'var(--glass-atlas)',
          card: {
            start: 'var(--glass-card-start)',
            end: 'var(--glass-card-end)',
          },
        },
      },
      backgroundImage: {
        'luxury-gradient': 'radial-gradient(circle at top right, #1a1208 0%, #050505 100%)',
        'metal-sheen': 'linear-gradient(120deg, transparent 30%, var(--color-sheen) 50%, transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
};
