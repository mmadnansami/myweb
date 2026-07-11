export interface PortfolioItem {
  id: string;
  title: string;
  category: "AI Creative Direction" | "AI Automation" | "Growth Strategy";
  tags: string[];
  image: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  beforeAfter: string;
  solution: string;
  results: string[];
}

export interface ToolItem {
  name: string;
  category: "Creative" | "Design" | "AI" | "Automation" | "Growth";
  description: string;
  logoUrl?: string; // We can use elegant icons or placeholders
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  category: "AI Automation" | "Creative Direction" | "Growth";
  date: string;
  readTime: string;
  summary: string;
  content: string;
}

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: "lumen-ai-fashion-film",
    title: "Lumen — AI Fashion Film",
    category: "AI Creative Direction",
    tags: ["Midjourney", "Runway Gen-3", "Cinematic AI"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=70",
    metric: "+412% engagement",
    metricLabel: "2.4M organic views across platforms",
    challenge: "Lumen Studio needed a high-end cinematic advertisement for their autumn line but lacked the traditional $150k production budget and the 3-month lead time.",
    beforeAfter: "Traditional studio photoshoots with fixed scenery vs. fluid, dreamlike AI-generated cinematic worlds displaying high-fashion wear across floating glass cities.",
    solution: "Directed a 60-second end-to-end AI fashion film using Midjourney for aesthetic shot control, Runway Gen-3 for fluid animation, and Adobe Premiere for sound staging.",
    results: [
      "2.4 Million organic impressions in 14 days",
      "+412% increase in social media engagement rate",
      "Produced at less than 8% of a traditional video shoot budget"
    ]
  },
  {
    id: "northwind-ai-commercial-spot",
    title: "Northwind — AI Commercial Spot",
    category: "AI Creative Direction",
    tags: ["Sora", "SVD", "Adobe Premiere"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=70",
    metric: "1.2M impressions",
    metricLabel: "4.5x conversion lift over standard creatives",
    challenge: "Northwind SaaS wanted a futuristic promo spot that illustrated global high-tech tracking, which is impossible to shoot with physical cameras.",
    beforeAfter: "Boring screencast SaaS dashboard walk-throughs vs. a gripping, cinematic sci-fi commercial tracking global server networks using holographic visuals.",
    solution: "Leveraged advanced spatial AI video tools to create high-octane 3D network visualizations combined with deep cinematic audio synthesis from ElevenLabs.",
    results: [
      "4.5x conversion rate boost on cold ad campaigns",
      "1.2 Million impressions generated with zero ad budget",
      "Featured in leading design and AI newsletters"
    ]
  },
  {
    id: "aurora-ai-brand-visual-world",
    title: "Aurora — AI Brand Visual World",
    category: "AI Creative Direction",
    tags: ["Flux", "Stable Diffusion", "Creative Direction"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=70",
    metric: "+180% CTR",
    metricLabel: "350k unique product page visitors",
    challenge: "Aurora DTC sought to define a completely unique and magical visual style for their brand assets, separate from stock photography.",
    beforeAfter: "Stock photos shared by thousands of competitors vs. custom hyper-realistic cosmic landscapes highlighting product concepts under colorful aurora lightings.",
    solution: "Engineered a custom Stable Diffusion XL & Flux styling pipeline that creates infinite brand assets on demand with a uniform visual grammar.",
    results: [
      "350,000 unique product page visits from visual branding campaigns",
      "+180% click-through rate lift on visual advertisements",
      "Established a comprehensive, evergreen brand book in 5 days"
    ]
  },
  {
    id: "vela-ai-directed-music-video",
    title: "Vela — AI-Directed Music Video",
    category: "AI Creative Direction",
    tags: ["Runway", "ElevenLabs", "After Effects"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=70",
    metric: "+50% Spotify saves",
    metricLabel: "1.8M streams in first month",
    challenge: "Indie artist Vela wanted an immersive, psychedelic space-travel music video to accompany their flagship synthwave track release.",
    beforeAfter: "A budget-constrained green-screen video vs. a fully realized neon retro-futuristic space odyssey with zero physical limits.",
    solution: "Used ElevenLabs audio elements matched with custom-prompted Runway video tracks, stitched together in After Effects with high-energy glitch transitions.",
    results: [
      "1.8 Million streams reached in the launch month",
      "+50% increase in Spotify pre-saves and shares",
      "Voted Best AI Music Video in a local digital arts festival"
    ]
  },
  {
    id: "obsidian-ai-product-launch-film",
    title: "Obsidian — AI Product Launch Film",
    category: "AI Creative Direction",
    tags: ["Cinematic AI", "DaVinci Resolve", "Midjourney"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=70",
    metric: "Sold out in 12 hours",
    metricLabel: "95% positive customer sentiment rating",
    challenge: "A premium smartwatch brand wanted to announce their signature watch using dark, moody, industrial textures (flowing obsidian glass, chrome plates).",
    beforeAfter: "Expensive CGI studios requiring weeks of render times vs. immediate, hyper-detailed product cinematic assets rendering in ultra-high resolution.",
    solution: "Prompted and structured detailed luxury-item commercials, layering flowing liquid glass elements and precise CAD mockups with DaVinci Resolve color grading.",
    results: [
      "First batch of watches completely sold out within 12 hours of launch",
      "95% positive brand sentiment on launch day across forums",
      "90% cheaper than traditional product CGI animation studios"
    ]
  },
  {
    id: "operator-gpt-internal-ai-ops",
    title: "Operator GPT — Internal AI Ops",
    category: "AI Automation",
    tags: ["n8n", "OpenAI API", "Slack Integrations"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=70",
    metric: "-20hrs/week saved",
    metricLabel: "100% automated document parsing and routing",
    challenge: "A rapidly growing digital agency was wasting 20+ hours a week per account manager manual sorting, parsing, and entering client brief PDFs into Jira.",
    beforeAfter: "Manual copy-pasting of complex customer inquiries vs. instant automatic AI-driven parsing, sentiment check, and smart Jira ticket delegation.",
    solution: "Designed an n8n webhook workflow that intercept client briefs, uses Claude to parse requirements, and assigns them to developers instantly.",
    results: [
      "Saved 20+ hours per week for account executives",
      "100% error-free transcription and task assignment",
      "Reduced client onboarding lag from 48 hours to 2 minutes"
    ]
  },
  {
    id: "studio-ai-client-onboarding-engine",
    title: "Studio AI — Client Onboarding Engine",
    category: "AI Automation",
    tags: ["Make", "Zapier", "Airtable", "Notion"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=70",
    metric: "0min response delay",
    metricLabel: "90% feedback score on automated intake",
    challenge: "Muttaki Adnan's studio (Ristop) needed an automatic, zero-friction client booking system that qualifies leads, spins up Notion workspaces, and sends contracts.",
    beforeAfter: "Emails going back and forth for 3 days to schedule a call vs. automatic calendar booking, qualification checks, and workspace provisioning in under 20 seconds.",
    solution: "Built an integrated system pairing Make, Notion API, and Cal.com to auto-profile leads, assign them difficulty scores, and set up custom client portals.",
    results: [
      "Reduced manual operational overhead by 100% during bookings",
      "Leads receive a customized Notion dashboard within 15 seconds of booking",
      "A 90% positive score from enterprise clients on onboarding"
    ]
  },
  {
    id: "inboxzero-ai-executive-email-agent",
    title: "InboxZero AI — Executive Email Agent",
    category: "AI Automation",
    tags: ["n8n", "Gmail API", "GPT-4o"],
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=600&q=70",
    metric: "98% triage accuracy",
    metricLabel: "500+ daily emails automatically managed",
    challenge: "An enterprise CEO was constantly buried under 500+ emails daily, missing crucial venture partnerships and client fires.",
    beforeAfter: "The CEO spending 3 hours a day responding to low-priority pitches vs. an AI inbox buffer that summarizes context and prepares draft replies.",
    solution: "Configured an n8n agent mapping incoming emails against historical patterns, highlighting urgent matters in a private Slack channel, and drafting perfect context-aware replies.",
    results: [
      "CEO inbox time reduced by 85%",
      "98% accuracy in prioritizing critical emails over sales pitches",
      "Zero missed partnership opportunities since implementation"
    ]
  },
  {
    id: "northwave-saas-growth-system",
    title: "Northwave SaaS — Growth System",
    category: "Growth Strategy",
    tags: ["Growth Loops", "Positioning", "Funnels"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=70",
    metric: "+340% MRR growth",
    metricLabel: "$120k incremental pipeline generated",
    challenge: "Northwave was stuck at $20k MRR due to high churn and expensive paid acquisition that didn't scale.",
    beforeAfter: "Leaky user signups with high immediate drop-off vs. a value-driven growth engine with educational onboarding loops that drive compounding referrals.",
    solution: "Overhauled their positioning from a general utility tool to an elite operations hub, and integrated a viral sharing mechanism inside the platform dashboard.",
    results: [
      "MRR soared from $20k to $88k in 90 days (+340% growth)",
      "User referral rate grew from 1.5% to 12.8%",
      "Generated an extra $120k of contract pipeline with $0 ad spend"
    ]
  },
  {
    id: "halo-dtc-paid-creative-system",
    title: "Halo DTC — Paid + Creative System",
    category: "Growth Strategy",
    tags: ["Paid Ads", "Offer Design", "LTV Systems"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=70",
    metric: "3.2x ROAS achieved",
    metricLabel: "2.1M target consumer reach",
    challenge: "Halo DTC had rising Facebook ad costs, reducing their margins to near zero. They needed a holistic offer and retention restructuring.",
    beforeAfter: "Single-item low-margin sales vs. structured high-value bundles combined with tailored AI ads that dynamically target custom user demographics.",
    solution: "Designed high-average-order-value (AOV) bundle kits, paired with high-converting AI-rendered video creative models driving cold traffic.",
    results: [
      "Achieved a consistent 3.2x ROAS over 6 months",
      "Pushed Average Order Value (AOV) up by 62%",
      "Reached 2.1 Million target customers with high brand recall"
    ]
  }
];

export const TOOLS_STACK: ToolItem[] = [
  // Creative
  { name: "Adobe Photoshop", category: "Creative", description: "Advanced asset preparation, graphic design, and precise manual texture touch-ups." },
  { name: "Premiere Pro", category: "Creative", description: "Industry-standard video editing, deep color editing, and high-fidelity video assembly." },
  { name: "After Effects", category: "Creative", description: "Premium visual effects, animations, overlay stitching, and advanced keyframe control." },
  { name: "DaVinci Resolve", category: "Creative", description: "Cinematic grade color correction, color wheels, and high-end video mastering." },
  { name: "CapCut", category: "Creative", description: "Quick, snappy social creative exports and trend-aligned sound synchronizations." },
  { name: "Adobe Illustrator", category: "Creative", description: "Vector identity branding, elegant layouts, and scalable custom typography." },

  // Design
  { name: "Figma", category: "Design", description: "Collaborative interface mockup creation, vector editing, and asset wireframing." },
  { name: "Canva", category: "Design", description: "Rapid drag-and-drop collateral design for marketing briefs and social networks." },
  { name: "Framer", category: "Design", description: "Stunning, high-performance interactive landings with custom-curated transitions." },

  // AI
  { name: "ChatGPT", category: "AI", description: "Advanced conceptual brainstorming, script writing, workflow layouts, and code assembly." },
  { name: "Midjourney", category: "AI", description: "Unrivaled high-fidelity cinematic image prompting and fine-tuned asset generation." },
  { name: "Runway", category: "AI", description: "Next-gen video generation, motion brush controls, and frame interpolation." },
  { name: "Sora", category: "AI", description: "High-consistency complex spatial physical video rendering and advanced camera moves." },
  { name: "Claude", category: "AI", description: "Logical reasoning, system architecture, copywriting, and document parsing." },
  { name: "ElevenLabs", category: "AI", description: "Emotional voiceover prompting, sound effects synthesis, and multi-lingual voices." },
  { name: "Flux", category: "AI", description: "Excellent high-detail text-in-image rendering and versatile model adaptations." },
  { name: "Stable Diffusion", category: "AI", description: "Custom fine-tuned visual style model training, controlnet guidance, and inpainting." },

  // Automation
  { name: "n8n", category: "Automation", description: "Advanced node-based custom self-hosted business logic flow engineering." },
  { name: "Make", category: "Automation", description: "Seamless, fast cloud third-party API webhook wiring and scheduled tasks." },
  { name: "Zapier", category: "Automation", description: "Rapid integration triggers across thousands of business apps in minutes." },
  { name: "Notion", category: "Automation", description: "Dynamic relational databases, client portals, and centralized company hubs." },
  { name: "Airtable", category: "Automation", description: "Robust low-code backends, data modeling, and automated email trigger systems." },

  // Growth
  { name: "Google Analytics", category: "Growth", description: "In-depth funnel monitoring, attribution checks, and user flow diagnostics." },
  { name: "Meta Ads", category: "Growth", description: "Paid customer acquisition, visual testing, and scalable demographic targeting." },
  { name: "Google Ads", category: "Growth", description: "High-intent search campaign engineering, search terms matching, and video ads." },
  { name: "HubSpot", category: "Growth", description: "Enterprise sales CRM tracking, lifecycle management, and visual drip mail funnels." }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Muttaki is a true rare breed. He doesn't just deliver gorgeous AI films; he understands exactly how those films plug into the customer journey to drive actual sales. Best investment we've made this year.",
    author: "Sara K.",
    role: "Founder, Lumen Studio",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    quote: "The n8n and ChatGPT automations Muttaki engineered for us took our onboarding wait time down to literally zero. Our operations are running seamlessly while we sleep. It's magic.",
    author: "Mehedi R.",
    role: "CEO, Northstar SaaS",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    quote: "We were burning money on standard stock imagery and typical UGC creators. Muttaki designed a custom AI brand world for Aurora that immediately lifted our ad CTR by 180%. Extremely recommended.",
    author: "Priya M.",
    role: "CMO, Aurora DTC",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80"
  }
];

export const BLOG_POSTS: BlogPostItem[] = [
  {
    id: "the-5-layer-stack-of-an-ai-native-business",
    title: "The 5-Layer Stack of an AI-Native Business",
    category: "AI Automation",
    date: "May 2026",
    readTime: "8 min",
    summary: "How to combine models, custom databases, webhooks, and communication bots to replace repetitive operations with autonomous systems.",
    content: `Running a business in 2026 demands extreme agility. Teams that spend hours copy-pasting customer details, drafting emails manually, or updating legacy trackers are being outpaced by modern lean competitors. 

To win, you must build an AI-native stack consisting of five core layers working as one unified system:

1. **The Intelligence Layer**: Fine-tuned foundational models (such as Gemini 3.5, ChatGPT, or Claude) set up with clear role directives and system guides.
2. **The Integration Layer (Webhooks)**: Connective nodes (like n8n or Make) that detect trigger events (e.g., "new invoice generated", "new calendar booking") and route data immediately.
3. **The Relational Storage Layer**: Cloud hubs (like Airtable or Notion) serving as structured operational databases holding clear data mappings.
4. **The Communication Bridge**: Direct alerts via private channels (Slack/Discord webhook apps) summarizing critical operational items requiring immediate human intervention.
5. **The Active Output Layer**: Automatic draft creators, email responders, or automated files drawers that execute the core task instantly.

By stitching these 5 layers together, you establish a system where your operations run continuously and error-free, saving founders up to 20-30 hours every single week.`
  },
  {
    id: "why-cinematic-branding-beats-paid-ads-in-2026",
    title: "Why Cinematic Branding Beats Paid Ads in 2026",
    category: "Creative Direction",
    date: "Apr 2026",
    readTime: "6 min",
    summary: "With ad platform algorithms saturating and CPCs reaching historic highs, brand storytelling powered by advanced AI cinematic films is the ultimate arbitrage.",
    content: `We've reached a turning point in digital growth: media buying is commoditized. Simply throwing more money at ad networks and chasing algorithmic trends does not build brand equity or lower acquisition costs.

What sets iconic brands apart today is cinematic world-building.

By using advanced AI video pipelines (such as Midjourney, Flux, and Runway Gen-3), visionary creative directors can now direct Hollywood-quality brand films, high-fashion advertisements, and magical product launches at 5% of a traditional video shoot's budget.

When you present a gorgeous, highly distinct visual universe to your customers, it creates immediate trust and premium authority. High-end AI-directed films drive massive organic views, trigger emotional loyalty, and make your brand memorable. In 2026, visual storytelling is the ultimate compounding asset.`
  },
  {
    id: "compounding-funnels-build-once-earn-forever",
    title: "Compounding Funnels: Build Once, Earn Forever",
    category: "Growth",
    date: "Mar 2026",
    readTime: "10 min",
    summary: "Stop chasing ephemeral marketing hacks. Discover the architecture of systems engineered for scalable and repeatable customer acquisition loops.",
    content: `Most marketers chase the latest short-term hack—whether it's a new social algorithm tweak or a trendy sound clip. But hacks decay. 

Compounding brand growth is engineered by building robust Funnel Systems.

A compounding growth funnel works in three steps:
- **High-Value Positioning**: Presenting a crystal-clear, premium offer that addresses a deep, painful client challenge directly.
- **Value-First Lead Capture**: Educating prospects upfront, demonstrating authority, and pre-qualifying leads automatically using smart assessments or Notion templates.
- **The Retention/Referral Loop**: Seamless customer onboarding coupled with organic referral triggers that transform single buyers into advocates.

When these three elements work in harmony, every dollar spent on traffic results in compounding organic referrals, building an evergreen system that delivers reliable pipeline month after month.`
  },
  {
    id: "ai-agents-that-actually-save-you-time",
    title: "AI Agents That Actually Save You Time",
    category: "AI Automation",
    date: "Mar 2026",
    readTime: "7 min",
    summary: "A practical guide to designing trigger-action AI helpers that handle executive email triage, client onboarding, and file management with 100% precision.",
    content: `A lot of people think of AI as a chat window where they type prompts. But the true leverage of AI comes when it works behind the scenes as a proactive Agent.

A real time-saving AI agent needs three things:
- **An Automatic Trigger**: E.g., receiving an email from a VIP client, or a contract being signed in HubSpot.
- **A Multi-Step Flow**: A series of API actions that extract information, translate or evaluate it, and route it to the right place.
- **A Human-in-the-Loop Safeguard**: An option to quickly review and approve the draft before it goes live.

For instance, an Executive Email Agent can parse incoming emails, determine priority, lookup previous chats in your CRM, and draft a response for you. You just hit 'Send'. This single system changes the way you work, giving you hours of creative focus back every single day.`
  }
];
