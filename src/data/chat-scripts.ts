import { PRODUCTS, RECOMMENDATION_BUNDLES } from './products';
import type { ChatMessage, Product } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface BotResponse {
  text: string;
  type: ChatMessage['type'];
  options?: string[];
  products?: Product[];
  leadForm?: boolean;
  /** If set, the caller should update flowState to this value */
  nextFlowState?: string;
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

// ─── Lead Scoring ─────────────────────────────────────────────────────────────
export function detectLeadTrigger(input: string): 'high' | 'medium' | null {
  const t = lc(input);
  // High intent
  if (contains(t, ['i want this', 'i like this', 'can i order', 'how to buy', 'purchase', 'place an order', 'how much', 'pricing', 'wholesale', 'quantity'])) return 'high';
  // Medium intent
  if (contains(t, ['price', 'cost', 'available', 'availability', 'in stock', 'deliver', 'how long', 'when can'])) return 'medium';
  return null;
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
  if (contains(t, ['cutlery', 'forks', 'spoons', 'flatware'])) return 'cutlery';
  if (contains(t, ['bar', 'cocktail', 'shaker', 'bartend'])) return 'restaurant-bar';
  if (contains(t, ['utensil', 'spatula', 'ladle', 'tongs', 'kitchenware', 'kitchen tool'])) return 'kitchenware';
  if (contains(t, ['housekeeping', 'cleaning', 'laundry', 'linen'])) return 'housekeeping';
  if (contains(t, ['room appliance', 'kettle', 'minibar', 'mini bar', 'safe', 'iron'])) return 'room-appliances';
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
  const { flowState, buyerType, lastBotQuestion } = conversationContext;

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

  // Home cookware drill-down: set vs individual response
  if (flowState === 'home-cookware' && lastBotQuestion?.includes('full set or individual')) {
    if (contains(t, ['full', 'set', 'complete'])) {
      return {
        text: "Great. How many people are you usually cooking for?",
        type: 'options',
        options: ['1–2 people', '3–5 people', '6+ people'],
      };
    }
    if (contains(t, ['individual', 'single', 'specific'])) {
      return {
        text: "What type of item are you looking for?",
        type: 'options',
        options: ['Frying pan', 'Saucepan', 'Stock pot', 'Dutch oven'],
      };
    }
    // "Not sure" → guide them
    return {
      text: "No problem. How many people are you usually cooking for? That'll help me pick the right size.",
      type: 'options',
      options: ['1–2 people', '3–5 people', '6+ people'],
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
    } else if (contains(t, ['even heat', 'performance', 'premium'])) {
      products = getProductsById(['ck-003', 'ck-002', 'ck-005']);
      explanation = "because you want premium heat performance";
    }
    return {
      text: `Based on what you shared, here are the best-fit options. We recommended these ${explanation}. Would you like to compare them, narrow by budget, or connect with our team?`,
      type: 'product-cards',
      products,
      options: ['Compare these', 'Speak to the team', 'Browse more'],
    };
  }

  // ── SMALL KITCHEN continuation ─────────────────────────────────────────────
  if (flowState === 'small-kitchen' && (lastBotQuestion?.includes('budget-friendly') || lastBotQuestion?.includes('premium'))) {
    if (contains(t, ['budget', 'cheap', 'affordable', 'value'])) {
      return {
        text: "Here's a practical budget-friendly starter setup. We recommended these because you're setting up a small kitchen and want the best value.",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.smallKitchenBudget),
        options: ['Compare these', 'Speak to the team', 'Browse more'],
      };
    }
    if (contains(t, ['premium', 'long-lasting', 'quality', 'best'])) {
      return {
        text: "Here's a premium starter setup built to last. We recommended these because you want quality that lasts for years.",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.smallKitchenPremium),
        options: ['Compare these', 'Speak to the team', 'Browse more'],
      };
    }
    // "Show me both"
    return {
      text: "Here are both options side by side — budget-friendly and premium. Pick what feels right for your kitchen.",
      type: 'product-cards',
      products: getProductsById([...RECOMMENDATION_BUNDLES.smallKitchenBudget, ...RECOMMENDATION_BUNDLES.smallKitchenPremium].filter((v, i, a) => a.indexOf(v) === i)),
      options: ['Speak to the team', 'Browse more categories'],
    };
  }

  // ── GIFT continuation ──────────────────────────────────────────────────────
  if (flowState === 'gift' && lastBotQuestion?.includes('wedding')) {
    // User answered with occasion type → ask product preference
    return {
      text: "Would you prefer:\n• A cookware set\n• Coffee essentials\n• Glassware / porcelain\n• A mixed kitchen starter bundle",
      type: 'options',
      options: ['Cookware set', 'Coffee essentials', 'Glassware / porcelain', 'Mixed kitchen bundle'],
    };
  }

  if (flowState === 'gift' && (lastBotQuestion?.includes('cookware set') || lastBotQuestion?.includes('Would you prefer'))) {
    // User selected product type → ask quality tier
    if (contains(t, ['cookware', 'cook'])) {
      return {
        text: "Would you like me to suggest something practical, premium, or presentation-focused?",
        type: 'options',
        options: ['Practical', 'Premium', 'Presentation-focused'],
      };
    }
    if (contains(t, ['coffee'])) {
      return {
        text: "Here are our coffee essentials that make great gifts:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.coffeeHome),
        options: ['Speak to the team', 'Browse more'],
      };
    }
    if (contains(t, ['glass', 'porcelain'])) {
      return {
        text: "Beautiful choices for a gift. Here are our best glassware and porcelain options:",
        type: 'product-cards',
        products: getProductsById(['gl-002', 'pc-001']),
        options: ['Speak to the team', 'Browse more'],
      };
    }
    // Mixed bundle
    return {
      text: "Here's a curated mixed kitchen starter bundle — perfect for a new home:",
      type: 'product-cards',
      products: getProductsById(RECOMMENDATION_BUNDLES.homeGiftPractical),
      options: ['Speak to the team', 'Browse more'],
    };
  }

  if (flowState === 'gift' && lastBotQuestion?.includes('practical, premium')) {
    if (contains(t, ['practical'])) {
      return {
        text: "Here's a practical gift set — functional and thoughtful. We recommended this because you want something useful and ready to use.",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.homeGiftPractical),
        options: ['Speak to the team', 'Browse more'],
      };
    }
    if (contains(t, ['premium'])) {
      return {
        text: "Here's a premium gift selection — elegant and long-lasting.",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.homeGiftPremium),
        options: ['Speak to the team', 'Browse more'],
      };
    }
    // Presentation
    return {
      text: "Here's a presentation-focused selection — beautiful for gifting:",
      type: 'product-cards',
      products: getProductsById(RECOMMENDATION_BUNDLES.homeGift),
      options: ['Speak to the team', 'Browse more'],
    };
  }

  // ── KNIFE drill-down ───────────────────────────────────────────────────────
  if (flowState === 'knives' && lastBotQuestion?.includes('home use or')) {
    if (contains(t, ['home', 'personal', 'everyday'])) {
      return {
        text: "For home use, a good starting point is a Chef's knife (all-purpose), Utility knife (everyday tasks), and Paring knife (detail work). Here's our recommended starter set:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.knifeHome),
        options: ['I want the professional option too', 'Speak to the team', 'Browse more'],
      };
    }
    if (contains(t, ['professional', 'pro', 'commercial', 'restaurant'])) {
      return {
        text: "For a professional kitchen, I'd recommend a German steel set with a block for easy access. Here's our top pick:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.knifePro),
        options: ['Show me the home option too', 'Speak to the team', 'Browse more'],
      };
    }
    // Both
    return {
      text: "Here are both options — our home essentials set and the professional grade block. Choose what fits your cooking style:",
      type: 'product-cards',
      products: getProductsById(RECOMMENDATION_BUNDLES.knifeSelection),
      options: ['Speak to the team', 'Browse more'],
    };
  }

  // ── COFFEE drill-down ──────────────────────────────────────────────────────
  if (flowState === 'coffee' && (lastBotQuestion?.includes('home use, office') || lastBotQuestion?.includes('home use or'))) {
    if (contains(t, ['home'])) {
      return {
        text: "Are you looking for:\n• Coffee machines\n• Brewing essentials (pour-over, French press)\n• Serving accessories\n• A complete coffee setup",
        type: 'options',
        options: ['Coffee machines', 'Brewing essentials', 'Serving accessories', 'Complete coffee setup'],
      };
    }
    if (contains(t, ['office'])) {
      return {
        text: "For an office setup, here are the essentials — a reliable brewer and the basics:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.coffeeHome),
        options: ['Speak to the team', 'Browse more'],
      };
    }
    // Café / Commercial
    return {
      text: "For café use, here are our commercial-grade coffee options:",
      type: 'product-cards',
      products: getProductsById(RECOMMENDATION_BUNDLES.coffeeCafe),
      options: ['I need a complete café setup', 'Speak to the team', 'Browse more'],
    };
  }

  // Coffee: sub-selection after home
  if (flowState === 'coffee' && lastBotQuestion?.includes('Coffee machines')) {
    if (contains(t, ['machine'])) {
      return {
        text: "Here's our best home-to-office range machine:",
        type: 'product-cards',
        products: getProductsById(['cf-002']),
        options: ['Show me brewing options too', 'Speak to the team'],
      };
    }
    if (contains(t, ['brew', 'pour', 'french'])) {
      return {
        text: "Here's our home barista brewing kit — pour-over, French press and more:",
        type: 'product-cards',
        products: getProductsById(['cf-001']),
        options: ['Speak to the team', 'Browse more'],
      };
    }
    if (contains(t, ['complete', 'full', 'everything'])) {
      return {
        text: "Here's the complete coffee setup — machine, grinder, brewing and serving accessories:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.coffeeSetup),
        options: ['Speak to the team', 'Browse more'],
      };
    }
    // Serving / default
    return {
      text: "Here are the coffee essentials we'd recommend:",
      type: 'product-cards',
      products: getProductsById(RECOMMENDATION_BUNDLES.coffeeSetup),
      options: ['Speak to the team', 'Browse more'],
    };
  }

  // ── COMMERCIAL: café front/back of house ───────────────────────────────────
  if ((flowState === 'commercial-cafe' || buyerType === 'cafe') && lastBotQuestion?.includes('front-of-house')) {
    if (contains(t, ['front', 'dining', 'service', 'guest'])) {
      return {
        text: "For front-of-house, I can help with glassware, porcelain, buffet ware, and bar accessories. Here are some top picks:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.cafeFrontOfHouse),
        options: ["I'd like more options", 'Connect with the team'],
      };
    }
    if (contains(t, ['back', 'kitchen', 'cooking', 'preparation'])) {
      return {
        text: "For back-of-house, here are the essentials I'd recommend for a café kitchen:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.cafeBackOfHouse),
        options: ["I'd like more options", 'Connect with the team'],
      };
    }
    // Both
    return {
      text: "Great — a full setup. For cafés, we usually narrow this into coffee essentials, kitchen tools/equipment, and guest-facing items like glassware or serving pieces. What do you need first?",
      type: 'options',
      options: ['Coffee equipment', 'Kitchen tools & cookware', 'Glassware & serving pieces', 'All of the above'],
    };
  }

  // ── COMMERCIAL: hotel/resort category drill-down ───────────────────────────
  if (flowState === 'commercial-hotel' && lastBotQuestion?.includes('sourcing right now')) {
    if (contains(t, ['kitchen', 'equipment'])) {
      return {
        text: "Here are our top kitchen equipment and cookware options for hospitality operations:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.hotelKitchen),
        options: ['I need more categories', 'Connect with the team'],
      };
    }
    if (contains(t, ['dinner', 'tableware'])) {
      return {
        text: "Here's our dinnerware and tableware shortlist for hotels:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.hotelDinnerware),
        options: ['I need more categories', 'Connect with the team'],
      };
    }
    if (contains(t, ['glass'])) {
      return {
        text: "Here's our glassware selection for hospitality:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.hotelGlassware),
        options: ['I need more categories', 'Connect with the team'],
      };
    }
    if (contains(t, ['cutlery'])) {
      return {
        text: "Here's our cutlery range — everyday dining to fine dining:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.hotelCutlery),
        options: ['I need more categories', 'Connect with the team'],
      };
    }
    if (contains(t, ['housekeeping'])) {
      return {
        text: "Here's our housekeeping supplies for hotel operations:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.hotelHousekeeping),
        options: ['I need more categories', 'Connect with the team'],
      };
    }
    if (contains(t, ['appliance'])) {
      return {
        text: "Here's our in-room appliances for guest rooms:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.hotelAppliances),
        options: ['I need more categories', 'Connect with the team'],
      };
    }
    // Mixed / default
    return {
      text: "This sounds like a larger requirement. I can help shortlist categories now, and I can also collect your contact details so the Astrabon team can follow up with the right recommendations.",
      type: 'text',
      options: ['Collect my details', 'Browse categories first'],
    };
  }

  // ── COMMERCIAL: bulk — browse categories ───────────────────────────────────
  if (flowState === 'commercial-bulk' && lastBotQuestion?.includes('Browse categories')) {
    return {
      text: "Which categories are you most interested in?",
      type: 'options',
      options: ['Kitchen equipment', 'Dinnerware & tableware', 'Glassware', 'Cutlery', 'Housekeeping', 'Appliances', 'Mixed requirement'],
    };
  }

  // ── OFFICE flow ────────────────────────────────────────────────────────────
  if (flowState === 'office' && lastBotQuestion?.includes('office')) {
    return {
      text: "For an office setup, here are the essentials we'd recommend — a coffee brewer, kettle, and basic kitchen tools:",
      type: 'product-cards',
      products: getProductsById(RECOMMENDATION_BUNDLES.officeSetup),
      options: ['Speak to the team', 'Browse more categories'],
    };
  }

  // ── DISCOVERY: user answered buyer type ────────────────────────────────────
  if (flowState === 'discovery' && lastBotQuestion?.includes('home use, a café')) {
    if (contains(t, ['home'])) {
      return {
        text: "Which type of products are you looking for?",
        type: 'options',
        options: ['Cookware', 'Kitchenware & accessories', 'Knives', 'Coffee essentials', 'Glassware', 'Something else'],
        nextFlowState: 'home-cookware',
      };
    }
    if (contains(t, ['café', 'cafe'])) {
      return {
        text: "Understood. Are you looking for front-of-house items, back-of-house items, or both?",
        type: 'options',
        options: ['Front-of-house (service & presentation)', 'Back-of-house (kitchen & cooking)', 'Both'],
        nextFlowState: 'commercial-cafe',
      };
    }
    if (contains(t, ['restaurant', 'hotel'])) {
      return {
        text: "We can help with larger hospitality requirements. Which categories are you sourcing right now?",
        type: 'options',
        options: ['Kitchen equipment', 'Dinnerware & tableware', 'Glassware', 'Cutlery', 'Mixed requirement'],
        nextFlowState: 'commercial-hotel',
      };
    }
    if (contains(t, ['office'])) {
      return {
        text: "For an office setup, here are the essentials we'd recommend — a coffee brewer, kettle, and basic kitchen tools:",
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES.officeSetup),
        options: ['Speak to the team', 'Browse more categories'],
        nextFlowState: 'office',
      };
    }
    if (contains(t, ['gift'])) {
      return {
        text: "Nice. Is this for a wedding, housewarming, or another occasion?",
        type: 'options',
        options: ['Wedding', 'Housewarming', 'Birthday', 'Other occasion'],
        nextFlowState: 'gift',
      };
    }
    // Default → ask product category
    return {
      text: "Which type of products are you looking for?",
      type: 'options',
      options: ['Cookware', 'Knives', 'Coffee essentials', 'Glassware', 'Porcelain', 'Buffet ware', 'Something else'],
    };
  }

  // ── Lead capture continuation: name received ───────────────────────────────
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
        nextFlowState: 'home-cookware',
      };

    case 'small-kitchen':
      return {
        text: "For a small kitchen, most customers do best with a compact essentials setup. I'd suggest: 1 frying pan, 1 saucepan, 1 stock pot, and a knife set. Do you want the most budget-friendly setup, or something more premium and long-lasting?",
        type: 'options',
        options: ['Budget-friendly', 'Premium & long-lasting', 'Show me both'],
        nextFlowState: 'small-kitchen',
      };

    case 'gift':
      return {
        text: "Nice. Is this for a wedding, housewarming, or another occasion?",
        type: 'options',
        options: ['Wedding', 'Housewarming', 'Birthday', 'Other occasion'],
        nextFlowState: 'gift',
      };

    case 'commercial-cafe':
      return {
        text: "Understood. Are you looking for front-of-house items, back-of-house items, or both?",
        type: 'options',
        options: ['Front-of-house (service & presentation)', 'Back-of-house (kitchen & cooking)', 'Both'],
        nextFlowState: 'commercial-cafe',
      };

    case 'commercial-hotel':
      return {
        text: "We can help with larger hospitality requirements. Which categories are you sourcing right now?",
        type: 'options',
        options: ['Kitchen equipment', 'Dinnerware & tableware', 'Glassware', 'Cutlery', 'Housekeeping', 'Appliances', 'Mixed requirement'],
        nextFlowState: 'commercial-hotel',
      };

    case 'commercial-bulk':
      return {
        text: "This sounds like a larger requirement. I can help shortlist categories now, and I can also collect your contact details so the Astrabon team can follow up with the right recommendations.",
        type: 'options',
        options: ['Collect my details', 'Browse categories first'],
        nextFlowState: 'commercial-bulk',
      };

    case 'office':
      return {
        text: "For an office, the most common setup is a coffee brewer, electric kettle, and basic kitchen tools. Want me to show you a recommended setup?",
        type: 'options',
        options: ['Show me the setup', 'I need something specific'],
        nextFlowState: 'office',
      };

    case 'knives':
      return {
        text: "That depends on how you cook. Are you shopping for home use or a professional kitchen?",
        type: 'options',
        options: ['Home use', 'Professional kitchen', "Both"],
        nextFlowState: 'knives',
      };

    case 'coffee':
      return {
        text: "Sure. Is this for home use, office use, or café use?",
        type: 'options',
        options: ['Home', 'Office', 'Café / Commercial'],
        nextFlowState: 'coffee',
      };

    case 'glassware':
    case 'buffet':
    case 'porcelain':
    case 'industrial':
    case 'cutlery':
    case 'restaurant-bar':
    case 'kitchenware':
    case 'housekeeping':
    case 'room-appliances': {
      const catMap: Record<string, { label: string; bundle: keyof typeof RECOMMENDATION_BUNDLES }> = {
        glassware: { label: 'Glassware', bundle: 'hotelGlassware' },
        buffet: { label: 'Buffet Ware', bundle: 'hotelHospitality' },
        porcelain: { label: 'Porcelain & Dinnerware', bundle: 'hotelDinnerware' },
        industrial: { label: 'Industrial Equipment', bundle: 'hotelKitchen' },
        cutlery: { label: 'Cutlery', bundle: 'cutlerySet' },
        'restaurant-bar': { label: 'Restaurant & Bar Accessories', bundle: 'barAccessories' },
        kitchenware: { label: 'Kitchenware & Accessories', bundle: 'kitchenwareStarter' },
        housekeeping: { label: 'Housekeeping', bundle: 'housekeepingBundle' },
        'room-appliances': { label: 'Room Appliances', bundle: 'roomAppliances' },
      };
      const cat = catMap[intent];
      return {
        text: `Great choice. Here are our top ${cat.label} options:`,
        type: 'product-cards',
        products: getProductsById(RECOMMENDATION_BUNDLES[cat.bundle]),
        options: ['I want more options', 'Connect with the team'],
      };
    }

    case 'comparison':
      if (contains(t, ['knife', 'knives'])) {
        return {
          text: "That depends on how you cook. A good starting point is usually a Chef's knife (all-purpose), Utility knife (everyday tasks), and Paring knife (detail work). Are you shopping for home use or professional kitchen use?",
          type: 'options',
          options: ['Home use', 'Professional kitchen'],
          nextFlowState: 'knives',
        };
      }
      if (contains(t, ['coffee'])) {
        return {
          text: "For coffee setup comparison, it really comes down to volume and control. A pour-over is great for precision at home. A semi-auto espresso machine suits a café. Shall I show you both?",
          type: 'options',
          options: ['Home coffee setup', 'Café coffee setup', 'Show me all options'],
          nextFlowState: 'coffee',
        };
      }
      // Default: non-stick vs stainless
      return {
        text: "Here's the simple difference:\n\n• Non-stick: best for easy everyday cooking and cleanup\n• Stainless steel: better for durability and professional results\n\nIf you mostly cook quick everyday meals, non-stick is usually easier. If you cook often and want long-term durability, stainless steel is often the better choice.\n\nDo you want me to recommend options for convenience or durability?",
        type: 'options',
        options: ['Convenience (non-stick)', 'Durability (stainless)', 'Show me both'],
        nextFlowState: 'comparison',
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
        options: ['Yes, pass my request along', "I'll contact directly"],
      };

    case 'faq-warranty':
      return {
        text: "Astrabon products come with manufacturer warranties. For specific warranty questions on a product, the team can confirm the details for you.",
        type: 'options',
        options: ['Connect me with the team', 'Continue browsing'],
      };

    case 'discovery':
    default: {
      // Improved fallback variants (PRD §9)
      const hasKeyword = t.length > 4 && !contains(t, ['hi', 'hello', 'hey', 'thanks', 'thank', 'ok', 'yes', 'no']);

      // Out-of-scope (user asks something we can't help with)
      if (contains(t, ['order status', 'tracking', 'my order', 'payment', 'checkout', 'refund status', 'my account'])) {
        return {
          text: "I can best help with product discovery, comparisons, and purchase guidance for Astrabon items. For order-related questions, please reach out to the Astrabon team directly. In the meantime, tell me what type of item you need and I'll narrow it down.",
          type: 'options',
          options: ['Browse cookware', 'Browse knives', 'Browse coffee essentials', 'Contact the team'],
        };
      }

      // Clarification needed (vague repeat)
      if (hasKeyword && conversationContext.messageCount > 3) {
        return {
          text: "To recommend the right option, I need one quick detail: is this for home use, hospitality, or commercial use?",
          type: 'options',
          options: ['Home use', 'Hospitality / Hotel', 'Commercial / Restaurant', 'Office'],
          nextFlowState: 'discovery',
        };
      }

      // No match found
      if (hasKeyword && conversationContext.messageCount > 2) {
        return {
          text: "I'm not fully confident I found the right fit from that description. Would you like to browse by category instead, or tell me whether this is for home use or business use?",
          type: 'options',
          options: ['Browse by category', 'Home use', 'Business use'],
        };
      }
      return {
        text: "Got it. Is this for home use, a café, a restaurant, a hotel, or another business?",
        type: 'options',
        options: ['Home use', 'Café', 'Restaurant / Hotel', 'Office', 'Buying as a gift'],
        nextFlowState: 'discovery',
      };
    }
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
