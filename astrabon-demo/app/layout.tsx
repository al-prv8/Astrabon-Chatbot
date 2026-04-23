import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/tokens.css';
import './globals.css';
import { Providers } from '@/components/ui/Providers';
import { AstrabonWidget } from '@/components/chatbot/AstrabonWidget';

const inter = Inter({ subsets: ['latin'], variable: '--font-family-body' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-family-display' });

export const metadata: Metadata = {
  title: 'Astrabon | Smart Kitchen & Cookware Assistant',
  description:
    'Find the right cookware, kitchen tools, and hospitality supplies with Astrabon\'s AI assistant. Expert guidance for home cooks and commercial buyers.',
  keywords: 'cookware, kitchenware, knives, coffee equipment, glassware, Maldives, hospitality supply',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} bg-bg text-text-primary font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <AstrabonWidget />
        </Providers>
      </body>
    </html>
  );
}
