import { PRODUCTS, RECOMMENDATION_BUNDLES } from './products';
import type { ChatMessage, Product } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface BotResponse {
  text: string;
  type: ChatMessage['type'];
  options?: string[];
  products?: Product[];
  leadForm?: boolean;
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function getProductsById(ids: string[]): Product[] {
  return ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as Product[];
}

function lc(s: string) {
  return s.toLowerCase();
}

function contains(input: string, keywords: string[]): boolean {
  const lower = lc(input);
  return keywords.some(k => lower.includes(k));
}

// ─── Main Intent Classifier ───────────────────────────────────────────────────
export function classifyIntent(input: string): string {
  const t = lc(input);

  // Buyer type signals
  if (contains(t, ['restaurant', 'café', 'cafe', 'coffee shop', 'bistro'])) return 'commercial-cafe';
  if (contains(t, ['hotel', 'resort', 'hospitality', 'motel'])) return 'commercial-hotel';
  if (contains(t, ['bulk', 'wholesale', 'large order', 'boq'])) return 'commercial-bulk';
  if (contains(t, ['gift', 'wedding', 'housewarming', 'present'])) return 'gift';
  if (contains(t, ['office', 'workplace', 'breakroom'])) return 'office';

  // Product specific
  if (contains(t, ['non-stick', 'nonstick', 'frying pan', 'pan', 'pot', 'cookware', 'cooking'])) return 'home-cookware';
  if (contains(t, ['knife', 'knives', 'chopping', 'cutting'])) return 'knives';
  if (contains(t, ['coffee', 'espresso', 'brew', 'barista'])) return 'coffee';
  if (contains(t, ['glass', 'wine', 'crystal', 'glassware'])) return 'glassware';
  if (contains(t, ['buffet', 'chafing', 'catering'])) return 'buffet';
  if (contains(t, ['porcelain', 'plates', 'dinnerware', 'tableware'])) return 'porcelain';
  if (contains(t, ['oven', 'equipment', 'industrial', 'commercial kitchen'])) return 'industrial';
  if (contains(t, ['small kitchen', 'starter', 'essentials', 'starter set'])) return 'small-kitchen';

  // Comparison
  if (contains(t, ['difference', 'compare', 'vs', 'better', 'which'])) return 'comparison';

  // FAQ
  if (contains(t, ['deliver', 'shipping', 'ship'])) return 'faq-shipping';
  if (contains(t, ['return', 'refund', 'exchange'])) return 'faq-returns';
  if (contains(t, ['contact', 'reach', 'phone', 'email', 'support'])) return 'faq-contact';
  if (contains(t, ['warranty', 'guarantee'])) return 'faq-warranty';

  // Quick prompts (exact match to widget prompt chips)
  if (contains(t, ['help me find cookware', 'find cookware'])) return 'home-cookware';
  if (contains(t, ['restaurant or café', 'buying for a restaurant'])) return 'commercial-cafe';
  if (contains(t, ['compare cookware'])) return 'comparison';
  if (contains(t, ['kitchen starter', 'starter essential'])) return 'small-kitchen';
  if (contains(t, ['help me choose knives', 'choose knives'])) return 'knives';
  if (contains(t, ['find coffee', 'coffee essential'])) return 'coffee';

  return 'discovery';
}

// ─── Response Generator ───────────────────────────────────────────────────────
export function generateBotResponse(
  userInput: string,
  conversationContext: {
    flowState: string;
    buyerType: string | null;
    category: string | null;
    priority: string | null;
    messageCount: number;
    lastBotQuestion?: string;
  }
): BotResponse {
  const intent = classifyIntent(userInput);
  const t = lc(userInput);
  const { flowState, buyerType, priority, lastBotQuestion } = conversationContext;

  // ── WITHIN-FLOW RESPONSES ──────────────────────────────────────────────────

  // Home cookware drill-down: household size response
  if (flowState === 'home-cookware' && lastBotQuestion?.includes('cooking for')) {
    const size = contains(t, ['1', '2', 'one', 'two', 'myself', 'solo']) ? 'small'
      : contains(t, ['3', '4', '5', 'three', 'four', 'five', 'family']) ? 'medium'
      : 'large';
    return {
      text: `Got it${size === 'small' ? ' — a compact setup would work well' : size === 'medium' ? ' — a mid-size set is usually ideal' : ' — you\'ll want larger capacity'}. What matters most?`,
      type: 'options',
      options: ['Non-stick convenience', 'Durability', 'Easy cleaning', 'Even heat performance'],
    };
  }

  // Home cookware drill-down: priority response → show products
  if (flowState === 'home-cookware' && lastBotQuestion?.includes('matters most')) {
    let products = getProductsById(RECOMMENDATION_BUNDLES.homeEveryday);
    let explanation = "for everyday home cooking";
    if (contains(t, ['non-stick', 'convenience', 'easy'])) {
      products = getProductsById(['ck-001', 'ck-004', 'ck-002']);
      explanation = "because you said easy cleanup and convenience matter most";
    } else if (contains(t, ['durable', 'durability', 'long'])) {
      products = getProductsById(['ck-002', 'ck-003', 'ck-005']);
      explanation = "because you prioritised durability";
    }
    return {
      text: `Based on what you shared, here are the best-fit options. We recommended these ${explanation}. Would you like to compare them, narrow by budget, or connect with our team?`,
      type: 'product-cards',
      products,
      options: ['Compare these', 'Speak to the team', 'Browse more'],
    };
  }

  // Commercial: front/back of house
  if ((flowState === 'commercial-cafe' || buyerType === 'cafe') && lastBotQuestion?.includes('front-of-house')) {
    if (contains(t, ['front', 'dining', 'service', 'guest'])) {
      return {
        text: "For front-of-house, I can help with glassware, porcelain, buffet ware, and bar accessories. Here are some top picks:",
        type: 'product-cards',
        products: getProductsById(['gl-001', 'pc-001', 'bf-001']),
        options: ["I'd like more options", 'Connect with the team'],
      };
    }
    if (contains(t, ['back', 'kitchen', 'cooking', 'preparation'])) {
      return {
        text: "For back-of-house, here are the essentials I'd recommend for a café kitchen:",
        type: 'product-cards',
        products: getProductsById(['cf-002', 'ck-005', 'kn-002']),
        options: ["I'd like more options", 'Connect with the team'],
      };
    }
    // Both
    return {
      text: "Great — a full setup. This looks like a business requirement. Let me collect your details so the Astrabon team can follow up with the right recommendations.",
      type: 'text',
      options: ['Yes, connect me with the team', 'Not yet, show me more first'],
    };
  }

  // Lead capture continuation: name received
  if (flowState === 'lead-capture' && lastBotQuestion?.includes('name')) {
    return {
      text: `Thank you! And your email address?`,
      type: 'text',
    };
  }

  // Lead capture: email received
  if (flowState === 'lead-capture' && lastBotQuestion?.includes('email')) {
    return {
      text: `Perfect. One last thing — your WhatsApp number (optional, so we can reach you faster):`,
      type: 'text',
    };
  }

  // ── FRESH INTENT RESPONSES ─────────────────────────────────────────────────

  switch (intent) {
    case 'home-cookware':
      return {
        text: "Sure. Are you looking for a full set or individual items like frying pans, saucepans, or stock pots?",
        type: 'options',
        options: ['Full set', 'Individual items', "Not sure, help me decide"],
      };

    case 'small-kitchen':
      return {
        text: "For a small kitchen, most customers do best with a compact essentials setup. I'd suggest: 1 frying pan, 1 saucepan, 1 stock pot, and a knife set. Do you want the most budget-friendly setup, or something more premium and long-lasting?",
        type: 'options',
        options: ['Budget-friendly', 'Premium & long-lasting', 'Show me both'],
      };

    case 'gift':
      return {
        text: "Nice. Is this for a wedding, housewarming, or another occasion?",
        type: 'options',
        options: ['Wedding', 'Housewarming', 'Birthday', 'Other occasion'],
      };

    case 'commercial-cafe':
      return {
        text: "Understood. Are you looking for front-of-house items, back-of-house items, or both?",
        type: 'options',
        options: ['Front-of-house (service & presentation)', 'Back-of-house (kitchen & cooking)', 'Both'],
      };

    case 'commercial-hotel':
      return {
        text: "We can help with larger hospitality requirements. Which categories are you sourcing right now?",
        type: 'options',
        options: ['Kitchen equipment', 'Dinnerware & tableware', 'Glassware', 'Cutlery', 'Mixed requirement'],
      };

    case 'commercial-bulk':
      return {
        text: "This sounds like a larger requirement. I can help shortlist categories now, and I can also collect your contact details so the Astrabon team can follow up with the right recommendations.",
        type: 'options',
        options: ['Collect my details', 'Browse categories first'],
      };

    case 'knives':
      return {
        text: "That depends on how you cook. Are you shopping for home use or a professional kitchen?",
        type: 'options',
        options: ['Home use', 'Professional kitchen', "Both"],
      };

    case 'coffee':
      return {
        text: "Sure. Is this for home use, office use, or café use?",
        type: 'options',
        options: ['Home', 'Office', 'Café / Commercial'],
      };

    case 'glassware':
    case 'buffet':
    case 'porcelain':
    case 'industrial': {
      const catMap: Record<string, string> = {
        glassware: 'Glassware',
        buffet: 'Buffet Ware',
        porcelain: 'Porcelain & Dinnerware',
        industrial: 'Industrial Equipment',
      };
      const catProducts = PRODUCTS.filter(p => p.category === intent).slice(0, 3);
      return {
        text: `Great choice. Here are our top ${catMap[intent]} options:`,
        type: 'product-cards',
        products: catProducts.length ? catProducts : getProductsById(RECOMMENDATION_BUNDLES.hotelHospitality),
        options: ['I want more options', 'Connect with the team'],
      };
    }

    case 'comparison':
      if (contains(t, ['knife', 'knives'])) {
        return {
          text: "That depends on how you cook. A good starting point is usually a Chef's knife (all-purpose), Utility knife (everyday tasks), and Paring knife (detail work). Are you shopping for home use or professional kitchen use?",
          type: 'options',
          options: ['Home use', 'Professional kitchen'],
        };
      }
      if (contains(t, ['coffee'])) {
        return {
          text: "For coffee setup comparison, it really comes down to volume and control. A pour-over is great for precision at home. A semi-auto espresso machine suits a café. Shall I show you both?",
          type: 'options',
          options: ['Home coffee setup', 'Café coffee setup', 'Show me all options'],
        };
      }
      // Default: non-stick vs stainless
      return {
        text: "Here's the simple difference:\n\n• Non-stick: best for easy everyday cooking and cleanup\n• Stainless steel: better for durability and professional results\n\nIf you mostly cook quick everyday meals, non-stick is usually easier. If you cook often and want long-term durability, stainless steel is often the better choice.\n\nDo you want me to recommend options for convenience or durability?",
        type: 'options',
        options: ['Convenience (non-stick)', 'Durability (stainless)', 'Show me both'],
      };

    case 'faq-shipping':
      return {
        text: "Astrabon offers delivery support. For exact delivery details on your order, I can help route your request to the team. Would you like me to collect your details?",
        type: 'options',
        options: ['Yes, collect my details', 'No thanks'],
      };

    case 'faq-returns':
      return {
        text: "Astrabon has a money-back guarantee within 10 days and 24-hour return support. For item-specific questions, I can collect your details and have the team confirm the exact process.",
        type: 'options',
        options: ['Connect me with the team', 'Continue browsing'],
      };

    case 'faq-contact':
      return {
        text: "You can reach Astrabon directly through their website. Alternatively, I can collect your request here and pass it along to the team.",
        type: 'options',
        options: ['Yes, pass my request along', 'I\'ll contact directly'],
      };

    case 'faq-warranty':
      return {
        text: "Astrabon products come with manufacturer warranties. For specific warranty questions on a product, the team can confirm the details for you.",
        type: 'options',
        options: ['Connect me with the team', 'Continue browsing'],
      };

    case 'discovery':
    default:
      return {
        text: "Got it. Is this for home use, a café, a restaurant, a hotel, or another business?",
        type: 'options',
        options: ['Home use', 'Café', 'Restaurant / Hotel', 'Office', 'Buying as a gift'],
      };
  }
}

// ─── Specific Flow Responses ───────────────────────────────────────────────────
export function getProductResponseForSelections(
  buyerType: string | null,
  category: string | null,
  priority: string | null
): BotResponse {
  // Build explanation
  const buyerLabel = buyerType === 'home' ? 'everyday home cooking'
    : buyerType === 'cafe' ? 'café operations'
    : buyerType === 'restaurant' ? 'restaurant use'
    : buyerType === 'hotel' ? 'hospitality use'
    : 'your needs';

  const priorityLabel = priority || 'your preferences';

  const explanation = `We recommended these options because you're shopping for ${buyerLabel} and prioritised ${priorityLabel}.`;

  let bundleKey: keyof typeof RECOMMENDATION_BUNDLES = 'homeEveryday';

  if (buyerType === 'cafe') bundleKey = 'cafeSetup';
  else if (buyerType === 'restaurant') bundleKey = 'restaurantKitchen';
  else if (buyerType === 'hotel') bundleKey = 'hotelHospitality';
  else if (category === 'knives') bundleKey = 'knifeSelection';
  else if (category === 'coffee') bundleKey = 'coffeeSetup';
  else if (priority?.toLowerCase().includes('non-stick')) bundleKey = 'homeEveryday';
  else if (priority?.toLowerCase().includes('durability')) bundleKey = 'homeEveryday';

  return {
    text: `${explanation}\n\nWould you like to compare these, narrow by budget, or connect with the Astrabon team?`,
    type: 'product-cards',
    products: getProductsById(RECOMMENDATION_BUNDLES[bundleKey]),
    options: ['Compare these', 'Connect with the team', 'Browse more'],
  };
}

// Full demo mode script (PRD "Sample end-to-end conversation" - home buyer)
export const DEMO_SCRIPT = [
  {
    id: 0,
    userText: "I need cookware for everyday cooking.",
    botText: "Sure. Is this for 1–2 people, 3–5 people, or a larger household?",
    type: 'options' as const,
    options: ['1–2 people', '3–5 people', '6+ people'],
  },
  {
    id: 1,
    userText: "3–5.",
    botText: "Got it. What matters most: easy cleanup, durability, or premium performance?",
    type: 'options' as const,
    options: ['Easy cleanup', 'Durability', 'Premium performance'],
  },
  {
    id: 2,
    userText: "Easy cleanup.",
    botText: "Based on that, I'd recommend these options:\n\nWe recommended these because you're shopping for everyday home cooking and said easy cleanup matters most.\n\nWould you like the most practical option first, or the best long-term option?",
    type: 'product-cards' as const,
    products: getProductsById(['ck-001', 'ck-002', 'ck-003']),
    options: ["Show most practical", "Show best long-term", "Speak to the team"],
  },
  {
    id: 3,
    userText: "I like this one. Can I get more info?",
    botText: "Great choice! I can pass this to the Astrabon team so they can help you quickly. Please share your details and they'll follow up within 24 hours.",
    type: 'lead-form' as const,
  },
];
