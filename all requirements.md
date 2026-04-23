PRD: Astrabon Chatbot (Phase 1 – Intelligent Sales Assistant)
Client: Astrabon Maldives
Provider: PRV8 | Privé (Infinite Layer Holdings, Inc.)

1. Product Objective
Deploy an AI-powered chatbot on the Astrabon website that:
Guides users through product discovery


Answers product and usage questions


Captures lead and purchase intent


Increases conversion rate and average order value


Lays the foundation for future transaction automation (Phase 2)



2. Scope of Phase 1 (Clear Boundaries)
INCLUDED
Conversational AI chatbot


Product recommendation engine (rules + AI)


Guided shopping assistance


Lead capture (email / WhatsApp)


Basic analytics


EXCLUDED (Phase 2)
Direct checkout / payment processing


Inventory syncing in real time (can be static or batch-fed)


Order management system


Full e-commerce automation



3. Target Users
Primary:
Website visitors browsing cookware/kitchenware


Secondary:
Returning customers


Users with specific cooking needs (home cooks, small businesses, etc.)



4. Core Use Cases

Use Case 1: Product Discovery
User:
“I’m looking for cookware for everyday use”
Bot:
Asks clarifying questions


Recommends relevant product sets



Use Case 2: Specific Product Search
User:
“Do you have non-stick pans?”
Bot:
Displays relevant products


Explains differences



Use Case 3: Guided Selection
User:
“What should I buy for a small kitchen?”
Bot:
Suggests bundles


Recommends essentials



Use Case 4: Product Education
User:
“What’s the difference between stainless steel and non-stick?”
Bot:
Provides clear, simple explanations



Use Case 5: Lead Capture
User shows intent:
“I’m interested in this set”
Bot:
Captures:


Name


Email / WhatsApp


Routes to Astrabon team



5. Core Features

A. Conversational Interface
Inputs:
Free-text chat


Outputs:
Product suggestions


Educational responses


Guided questions



B. Product Recommendation Engine
Logic:
Keyword + intent detection


Category mapping:


Pots


Pans


Sets


Accessories


Output:
2–5 recommended products


With:


Name


Short description


Image (if available)


CTA (View / Inquire)



C. Guided Selling Flow
Bot asks:
Cooking frequency


Household size


Budget sensitivity


Preferred material



D. Lead Capture System
Trigger Conditions:
High intent detected


Product interest expressed


Capture Fields:
Name


Email


Phone / WhatsApp (optional)


Routing:
Email notification to Astrabon team


Optional WhatsApp routing



E. FAQ Handling
Bot answers:
Shipping questions


Product availability (static)


Usage guidance


Care instructions



6. UX / UI Requirements
(Astrabon has designed UI – we align functionality to it)

A. Chat Widget Behavior
Floating or embedded


Opens on:


Click


Optional delay trigger



B. Conversation Flow
Opening Message:
“Hi! Looking for the right cookware or kitchen essentials? I can help you find the perfect fit.”

C. Suggested Prompts
“Shop cookware”


“Compare materials”


“Find a starter set”



D. Product Display in Chat
Each product includes:
Image


Name


Short benefit


CTA:


“View Product”


“Inquire”



7. Content Requirements (FROM ASTRABON)

Required Data:
1. Product Catalog
Product names


Categories


Descriptions


Images


Pricing (optional for Phase 1)



2. FAQs
Shipping


Returns


Warranty


Materials



3. Brand Tone
Friendly / professional


Educational



8. Backend / Technical Requirements

A. Chat Engine
LLM-powered conversational layer



B. Knowledge Base
Product dataset


FAQ dataset



C. Integration
Website embed (script or iframe)



D. Lead Routing
Email webhook


Optional CRM integration



9. Analytics & Reporting

Track:
Number of conversations


Top user queries


Product interest frequency


Leads captured



Outputs:
Weekly summary (optional)


Insights:


“Most requested product category”


“Drop-off points”



10. Success Metrics

Primary
Increase in:


Product inquiries


Leads captured



Secondary
Engagement rate


Time spent on site



11. Demo Flow (What You Show Them)

Scenario:
User visits site → opens chatbot
User:
“I need cookware for everyday cooking”
Bot:
Asks 2–3 questions


Recommends product set


Explains why


Captures lead



12. Future Phase (Positioning Only)

Phase 2 Will Include:
Direct checkout


Inventory sync


Order tracking


Automated fulfillment



13. What You’re Actually Selling Them
Not:
“A chatbot”
But:
“A 24/7 digital sales assistant that converts visitors into buyers.”

14. What You Might Be Missing

1. Product Bundling = More Revenue
Don’t just show single items:
Suggest:


“Starter kitchen bundle”


“Professional set”



2. Tone Matters
This should feel like:
Helpful store associate

 NOT:


Robotic FAQ bot

3. Lead Capture Timing
Too early = annoying
Too late = missed revenue

Astrabon chatbot scripts
Phase 1: intelligent sales assistant
1) Welcome and opening states
Default welcome
“Hi, welcome to Astrabon. I can help you find the right kitchenware, cookware, coffee essentials, glassware, buffet items, and more. What are you shopping for today?”
Short version
“Hi, I’m the Astrabon assistant. What are you looking for today?”
Suggested prompts
“Show me cookware”


“I need kitchen items for home use”


“I’m buying for a café or restaurant”


“Help me compare materials”


“Recommend a starter set”


“I need knives and accessories”



2) Main discovery script
If user is vague
User: “I need some kitchen items.”
Bot:
“Got it. Is this for home use, a café, a restaurant, a hotel, or another business?”
Then:
“Which type of products are you looking for?”
Cookware


Kitchenware and accessories


Knives and accessories


Coffee essentials


Glassware


Porcelain


Buffet ware


Restaurant-bar accessories


Housekeeping/accessories


Room appliances


Industrial equipment


Then:
“What matters most for you?”
Everyday use


Professional durability


Easy maintenance


Premium presentation


Budget-friendly


Gift or new setup



3) Home shopper flows
A. Home cookware
User: “I need cookware for everyday cooking.”
Bot:
“Sure. Are you looking for a full set or individual items like frying pans, saucepans, or stock pots?”
If user says “full set”:
“Great. How many people are you usually cooking for?”
1–2


3–5


6+


Then:
“What matters most?”
Non-stick convenience


Durability


Easy cleaning


Even heat performance


Then product response:
“Based on that, I’d recommend these options:
A practical cookware set for everyday cooking


A more durable set for frequent use


A premium option if you want longer-lasting performance


Would you like me to show the most practical option first, or the best long-term option?”
B. Small kitchen / starter home
User: “What should I buy for a small kitchen?”
Bot:
“For a small kitchen, most customers do best with a compact essentials setup. I’d suggest:
1 frying pan


1 saucepan


1 stock pot


1 knife set


A few core utensils


Do you want the most budget-friendly setup, or something more premium and long-lasting?”
C. Wedding / housewarming / gift
User: “I need something for a gift.”
Bot:
“Nice. Is this for a wedding, housewarming, or another occasion?”
Then:
“Would you prefer:
A cookware set


Coffee essentials


Glassware / porcelain


A mixed kitchen starter bundle”


Then:
“Would you like me to suggest something practical, premium, or presentation-focused?”

4) Commercial buyer flows
Astrabon’s public positioning suggests strong B2B/hospitality relevance, including supply for resorts, hotels, restaurants, cafés, and related operations. 
A. Restaurant / café / hotel
User: “I’m buying for a café.”
Bot:
“Understood. Are you looking for front-of-house items, back-of-house items, or both?”
Choices:
Front-of-house


Back-of-house


Both


If front-of-house:
“I can help with glassware, porcelain, buffet ware, and restaurant-bar accessories. Which area are you focused on first?”
If back-of-house:
“I can help with cookware, knives, kitchenware, coffee essentials, appliances, and industrial equipment. What do you need first?”
Then:
“What’s most important for your business?”
Heavy-duty performance


Easy cleaning


Consistent presentation


Volume / bulk purchase


Budget control


B. Bulk / BOQ style inquiry
User: “We need items for a hotel or resort.”
Bot:
“We can help with larger hospitality requirements as well. Which categories are you sourcing right now?”
Kitchen systems / equipment


Dinnerware / tableware


Glassware


Cutlery


Housekeeping


Appliances


Mixed requirement


Then lead capture:
“This sounds like a larger requirement. I can help shortlist categories now, and I can also collect your contact details so the Astrabon team can follow up with the right recommendations.”

5) Product comparison scripts
A. Non-stick vs stainless steel
User: “What’s the difference between non-stick and stainless steel?”
Bot:
“Here’s the simple difference:
Non-stick is best if you want easy cooking and easy cleanup.


Stainless steel is better if you want stronger durability and a more professional feel.


If you mostly cook quick everyday meals and want convenience, non-stick is usually easier.
If you cook often and want long-term durability, stainless steel is often the better choice.
Do you want me to recommend options for convenience or durability?”
B. Knife comparison
User: “What knives should I get?”
Bot:
“That depends on how you cook. A good starting point is usually:
Chef’s knife


Utility knife


Paring knife


If you cook often, I’d recommend a more durable professional option.
If you want basic everyday use, I can show simpler essentials first.
Are you shopping for home use or professional kitchen use?”
C. Coffee essentials
User: “I need coffee equipment.”
Bot:
“Sure. Is this for home use, office use, or café use?”
Then:
“Are you looking for:
Coffee machines


Brewing essentials


Serving accessories


A complete coffee setup”



6) Recommendation response templates
Standard recommendation format
“Based on what you shared, here are the best-fit options:
Option 1: Best overall fit
Good for: [use case]
Why: [clear reason]
Option 2: Best value
Good for: [use case]
Why: [clear reason]
Option 3: More premium
Good for: [use case]
Why: [clear reason]
Would you like to view one of these, compare them, or tell me your budget so I can narrow it further?”
If images are available
“I’ve pulled the most relevant options for you. Tap any item to view details, or tell me whether you want the most practical, premium, or durable option.”

7) Lead capture scripts
A. Soft lead capture
“I can also help you save time by having the Astrabon team follow up with the best matching options. Would you like me to collect your contact details?”
B. High-intent lead capture
User: “I like this one.”
Bot:
“Great choice. I can pass this to the Astrabon team so they can help you quickly. Please share:
Your name


Email or WhatsApp number


The product or category you’re interested in”


C. Commercial lead capture
“This looks like a business or bulk requirement. Please share:
Your name


Business name


Contact number or email


What categories you need


Estimated quantity, if known


The Astrabon team can then follow up with the right recommendations.”
D. If user refuses
“No problem. I can still help narrow down your options here.”

8) FAQ / support scripts
Shipping
User: “Do you deliver?”
Bot:
“Astrabon offers delivery support. For exact delivery details on your order, I can help route your request to the team.”
Returns
User: “What’s your return policy?”
Bot:
“Astrabon’s website mentions a money-back guarantee within 10 days and a 24-hour return support message. For item-specific return questions, I can collect your details and have the team confirm the exact process.” 
Support
User: “How do I contact you?”
Bot:
“You can also reach Astrabon directly through their support details on the website. If you’d like, I can collect your request here and pass it along.” 

9) Fallback scripts
No match found
“I’m not fully confident I found the right fit from that description. Would you like to browse by category instead, or tell me whether this is for home use or business use?”
Out-of-scope question
“I can best help with product discovery, comparisons, and purchase guidance for Astrabon items. Tell me what type of item you need, and I’ll narrow it down.”
Clarification needed
“To recommend the right option, I need one quick detail: is this for home use, hospitality, or commercial use?”

Product recommendation logic
Phase 1 decision framework
This should be rules-first, AI-assisted. Do not make the first version overly clever. It should be dependable.

1) Inputs to capture
Primary intent
Browse category


Find a specific item


Compare options


Build a starter set


Bulk / commercial inquiry


Get support / policy info


Buyer type
Home shopper


Gift shopper


Café


Restaurant


Hotel / resort


Office


Other business


Product category
Use Astrabon’s visible categories as the Phase 1 taxonomy:
Kitchenware and accessories


Knife and accessories


Coffee essentials


Buffet ware


Restaurants-bar accessories


Porcelain


Cutlery


Glassware


Room appliances


Industrial equipment


Housekeeping and accessories 


Decision factors
Budget level: value / mid / premium


Usage frequency: occasional / regular / heavy-duty


Priority: convenience / durability / appearance / performance


Quantity: personal / family / bulk


Environment: home / hospitality / commercial



2) Intent classification logic
If user mentions a product type directly
Examples:
“pan”


“knife”


“plates”


“coffee machine”


Route to:
Specific product search
If user mentions need state
Examples:
“everyday cooking”


“small kitchen”


“new café”


“gift”


Route to:
Guided recommendation flow
If user mentions business context
Examples:
“restaurant”


“hotel”


“resort”


“bulk”


Route to:
Commercial / lead-qualified flow
If user asks difference / best / compare
Route to:
Comparison flow

3) Recommendation ranking model
For each candidate product or category bundle, score on:
A. Category match
Exact category match = highest score
Adjacent category match = medium
B. Use-case fit
Example:
Everyday cooking → prioritize versatile essentials


Hospitality → prioritize durability, volume, presentation


Gift → presentation and bundle appeal


C. Buyer type fit
Home → simpler sets, easier maintenance


Commercial → heavy-duty and capacity-led


Hotel / resort → broader hospitality categories


D. Priority fit
Convenience → easy-clean / starter / simple bundles


Durability → stronger materials / commercial-grade options


Appearance → porcelain, glassware, buffet ware, presentation-led options


Performance → professional and higher-spec items


E. Lead value
If inquiry looks large or complex, increase priority of items/categories that justify team follow-up.

4) Recommendation output rules
Rule 1: Always return 2–3 options
Not 10.
Rule 2: Name the reason
Every option needs a plain-English explanation:
“Best for everyday use”


“Best if you want easier cleanup”


“Best for heavier commercial usage”


Rule 3: Push toward a next action
After recommendations, always ask one of:
“Want to compare these?”


“Want to narrow by budget?”


“Want me to connect you with the team?”


Rule 4: Escalate large inquiries
If hospitality / resort / restaurant / bulk is detected, collect lead details early.

5) Example logic trees
A. Everyday cookware
Input:
buyer_type = home


intent = guided recommendation


category = cookware/kitchenware


priority = convenience


frequency = regular


Output:
Everyday starter cookware set


Better durability cookware set


Premium cookware set


Explainability:
Option 1: “Best if you want a practical setup for daily meals.”


Option 2: “Better if you cook often and want longer-lasting performance.”


Option 3: “Best if you want a more premium cooking experience.”


B. Restaurant sourcing
Input:
buyer_type = restaurant


category = back-of-house + front-of-house


priority = durability + presentation


quantity = bulk


Output:
Kitchen equipment / cookware shortlist


Tableware / porcelain / cutlery shortlist


Glassware / bar accessories shortlist


Next step:
Lead capture + team follow-up
C. Coffee setup
Input:
buyer_type = café


category = coffee essentials


priority = performance


quantity = commercial


Output:
Core machine-led setup


Brewing + serving accessories setup


Full café coffee setup



6) Explainability copy framework
Use this structure every time:
“We recommended this because [buyer type/use case], and you said [priority].”
Examples:
“We recommended this option because you’re shopping for everyday home cooking and said easy cleanup matters most.”


“We prioritized this set because you’re buying for hospitality use and need durable items suitable for heavier daily use.”


“We suggested this bundle because you want a practical starter setup rather than individual pieces.”



7) Lead scoring triggers
Capture lead when any of these happen:
Low / medium intent
User asks about 2+ products


User asks for price or availability


User asks for delivery


User revisits recommendations


High intent
User says “I want this”


User says “Can I order?”


User is a hotel / resort / café / restaurant


User asks for quantity or wholesale


User requests follow-up



8) Implementation guardrails
Keep Phase 1 simple
Do:
Category recommendations


Guided narrowing


Lead capture


FAQ handling


Do not do:
Live inventory claims unless provided


Hard promises on delivery timing


Checkout or payment handling


Real-time stock guarantees


That matters because Phase 1 is a chatbot and guided sales assistant, not automated commerce.

9) Best-performing starter prompts for Astrabon
These are the ones I’d put directly in the widget:
“Help me find cookware”


“I’m buying for a restaurant or café”


“Compare cookware materials”


“Show kitchen starter essentials”


“Help me choose knives”


“Find coffee essentials”



10) Recommended voice for the bot
Astrabon should sound like:
helpful


informed


clear


commercially aware


not pushy


A good voice line:
“I’ll help you narrow this down quickly.”
Not:
“Please provide additional parameters for product classification.”
That kind of robotic tone will kill conversion.

Sample end-to-end conversation
Home buyer
User: I need cookware for everyday cooking.
Bot: Sure. Is this for 1–2 people, 3–5 people, or a larger household?
User: 3–5.
Bot: Got it. What matters most: easy cleanup, durability, or premium performance?
User: Easy cleanup.
Bot: Based on that, I’d recommend:
A practical everyday cookware set


A slightly more durable set for frequent use


A premium option if you want a more elevated cooking experience


We recommended these because you’re shopping for everyday home cooking and said easy cleanup matters most. Would you like the most practical option first, or the best long-term option?
Commercial buyer
User: We need items for a café.
Bot: Understood. Are you looking for back-of-house, front-of-house, or both?
User: Both.
Bot: Great. For cafés, we usually narrow this into coffee essentials, kitchen tools/equipment, and guest-facing items like glassware or serving pieces. What do you need first?
User: Coffee equipment and glassware.
Bot: Perfect. I can help shortlist the right categories, and I can also collect your contact details so the Astrabon team can follow up with the best-fit options for your business.

