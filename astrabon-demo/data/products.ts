import type { Product } from '@/types';

export const PRODUCTS: Product[] = [
  // ── COOKWARE ──────────────────────────────────────────────────────────────
  {
    id: 'ck-001',
    name: 'Everyday Non-Stick Pan Set',
    category: 'cookware',
    description: '5-piece non-stick frying pan set ideal for daily home cooking.',
    benefit: 'Best for everyday use & easy cleanup',
    tags: ['Non-Stick', 'Set of 5', 'Home'],
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=800&auto=format&fit=crop',
    badge: 'Best Seller',
    priceRange: '$$',
  },
  {
    id: 'ck-002',
    name: 'Pro Stainless Steel Cookware Set',
    category: 'cookware',
    description: 'Heavy-gauge stainless steel 7-piece set built for frequent use.',
    benefit: 'Superior durability for serious cooks',
    tags: ['Stainless Steel', 'Set of 7', 'Durable'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop',
    badge: 'Most Durable',
    priceRange: '$$$',
  },
  {
    id: 'ck-003',
    name: 'Premium Cast Iron Dutch Oven',
    category: 'cookware',
    description: 'Pre-seasoned cast iron for slow cooking, braising & baking.',
    benefit: 'Premium performance & heat retention',
    tags: ['Cast Iron', 'Premium', 'Versatile'],
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop',
    badge: 'Premium',
    priceRange: '$$$$',
  },
  {
    id: 'ck-004',
    name: 'Compact Starter Kitchen Set',
    category: 'cookware',
    description: 'Frying pan + saucepan + stock pot — perfect for small kitchens.',
    benefit: 'Ideal for small spaces & new homes',
    tags: ['Starter', 'Compact', '3-Piece'],
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=800&auto=format&fit=crop',
    priceRange: '$',
  },
  {
    id: 'ck-005',
    name: 'Commercial-Grade Stock Pots',
    category: 'cookware',
    description: 'Heavy-duty aluminium stock pots for restaurant volume cooking.',
    benefit: 'Built for high-volume commercial use',
    tags: ['Commercial', 'Heavy-Duty', 'Large Volume'],
    image: 'https://images.unsplash.com/photo-1612392062798-6a3d1f8b9c8a?q=80&w=800&auto=format&fit=crop',
    badge: 'Hospitality Grade',
    priceRange: '$$$',
  },

  // ── KNIVES ────────────────────────────────────────────────────────────────
  {
    id: 'kn-001',
    name: 'Essential 3-Piece Knife Set',
    category: 'knives',
    description: "Chef's knife, utility knife & paring knife — everyday essentials.",
    benefit: 'Perfect starter set for home cooks',
    tags: ['3-Piece', 'Starter', 'Everyday'],
    image: 'https://images.unsplash.com/photo-1518796745738-41048802f99a?q=80&w=800&auto=format&fit=crop',
    priceRange: '$$',
  },
  {
    id: 'kn-002',
    name: 'Professional Chef\'s Knife Block',
    category: 'knives',
    description: '8-piece German steel knife set with hardwood block.',
    benefit: 'Professional precision for serious cooking',
    tags: ["German Steel", '8-Piece', 'Professional'],
    image: 'https://images.unsplash.com/photo-1612538498456-e861df91d4d0?q=80&w=800&auto=format&fit=crop',
    badge: 'Professional Grade',
    priceRange: '$$$',
  },

  // ── COFFEE ────────────────────────────────────────────────────────────────
  {
    id: 'cf-001',
    name: 'Home Barista Brewing Kit',
    category: 'coffee',
    description: 'Pour-over, French press & dripper — complete home coffee setup.',
    benefit: 'Café-quality coffee at home',
    tags: ['Pour-Over', 'French Press', 'Home'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    priceRange: '$$',
  },
  {
    id: 'cf-002',
    name: 'Commercial Espresso Machine',
    category: 'coffee',
    description: 'Semi-automatic 15-bar espresso machine for café operations.',
    benefit: 'High-volume café performance',
    tags: ['Espresso', 'Commercial', 'Semi-Auto'],
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop',
    badge: 'Café Grade',
    priceRange: '$$$$',
  },
  {
    id: 'cf-003',
    name: 'Full Café Coffee Setup Bundle',
    category: 'coffee',
    description: 'Espresso machine + grinder + serving accessories — ready to serve.',
    benefit: 'Complete café setup in one bundle',
    tags: ['Bundle', 'Complete Setup', 'Commercial'],
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
    badge: 'Bundle Deal',
    priceRange: '$$$$',
  },

  // ── GLASSWARE ─────────────────────────────────────────────────────────────
  {
    id: 'gl-001',
    name: 'Restaurant Glassware Collection',
    category: 'glassware',
    description: 'Crystal-clear wine, water & cocktail glasses — 48-piece set.',
    benefit: 'Elegant presentation for dining services',
    tags: ['Crystal', '48-Piece', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    badge: 'Hospitality Grade',
    priceRange: '$$$',
  },
  {
    id: 'gl-002',
    name: 'Premium Wine Glass Set',
    category: 'glassware',
    description: 'Lead-free crystal wine glasses — 12-piece home collection.',
    benefit: 'Elevate your dining experience',
    tags: ['Wine', 'Crystal', '12-Piece'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
    priceRange: '$$',
  },

  // ── BUFFET WARE ──────────────────────────────────────────────────────────
  {
    id: 'bf-001',
    name: 'Hotel Buffet Chafing Set',
    category: 'buffet',
    description: 'Stainless steel chafing dishes with stands — full buffet bundle.',
    benefit: 'Professional buffet presentation',
    tags: ['Chafing', 'Hotel', 'Buffet'],
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    badge: 'Hotel Grade',
    priceRange: '$$$',
  },

  // ── PORCELAIN ─────────────────────────────────────────────────────────────
  {
    id: 'pc-001',
    name: 'Fine Dining Porcelain Set',
    category: 'porcelain',
    description: 'White fine porcelain dinnerware — 60-piece restaurant service set.',
    benefit: 'Premium table presentation',
    tags: ['Fine Dining', 'White', '60-Piece'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    badge: 'Restaurant Grade',
    priceRange: '$$$',
  },

  // ── INDUSTRIAL ────────────────────────────────────────────────────────────
  {
    id: 'ind-001',
    name: 'Commercial Convection Oven',
    category: 'industrial',
    description: '6-tray commercial convection oven for bakeries & hotel kitchens.',
    benefit: 'High-capacity professional baking',
    tags: ['Commercial', '6-Tray', 'Oven'],
    image: 'https://images.unsplash.com/photo-1556909195-de0e2a9e3bab?q=80&w=800&auto=format&fit=crop',
    badge: 'Industrial Grade',
    priceRange: '$$$$',
  },
];

// Category-filtered helpers
export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function getProductsByIds(ids: string[]): Product[] {
  return PRODUCTS.filter(p => ids.includes(p.id));
}

// Pre-built recommendation bundles (maps to chatbot flows)
export const RECOMMENDATION_BUNDLES = {
  // Home cookware flows
  homeEveryday: ['ck-001', 'ck-002', 'ck-003'],
  homeSmallKitchen: ['ck-004', 'ck-001', 'kn-001'],
  homeGift: ['ck-003', 'gl-002', 'cf-001'],
  // Commercial
  cafeSetup: ['cf-002', 'cf-003', 'cf-001'],
  restaurantKitchen: ['ck-005', 'ck-002', 'kn-002'],
  hotelHospitality: ['bf-001', 'pc-001', 'gl-001'],
  // Comparison
  nonstickVsStainless: ['ck-001', 'ck-002'],
  knifeSelection: ['kn-001', 'kn-002'],
  coffeeSetup: ['cf-001', 'cf-002', 'cf-003'],
};
