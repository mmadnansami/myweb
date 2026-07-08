import { 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

interface ServicesViewProps {
  navigate: (path: string) => void;
}

export default function ServicesView({ navigate }: ServicesViewProps) {
  const servicesList = [
    {
      id: "cinematic-creative-direction",
      title: "Cinematic Creative Direction",
      subtitle: "VISUAL MAJESTY",
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      description: "I design story-driven worlds for your brand — concept, art direction, shot design, post — engineered to feel premium on every screen.",
      bullets: [
        "Concept & treatment modeling",
        "Storyboards & visual shot lists",
        "Directorial set supervision & camera styling",
        "Color grading & high-end post-production supervision",
        "Hero brand films, premium product launches & cinematic ads"
      ],
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      accentGlow: "glow-purple"
    },
    {
      id: "ai-driven-business-automation",
      title: "AI-Driven Business Automation",
      subtitle: "OPERATIONAL LEVERAGE",
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      description: "Custom AI agents and automation pipelines that handle support, sales ops, content, and reporting — connected to the tools you already use.",
      bullets: [
        "In-depth enterprise AI strategy audit",
        "Custom intelligent agents (web chat, voice transcription, active email parsing)",
        "End-to-end multi-step workflow automation (n8n, Make, Zapier)",
        "CRM & analytics dashboard synchronization (HubSpot, Airtable, Notion)",
        "Internal company knowledge-base AI search assistants"
      ],
      badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      accentGlow: "glow-purple"
    },
    {
      id: "scalable-growth-strategy",
      title: "Scalable Growth Strategy",
      subtitle: "REVENUE PIPELINES",
      icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
      description: "Sharp positioning + tested funnels + compounding growth loops. We don't chase tactics — we engineer systems that pay back month after month.",
      bullets: [
        "Market positioning & high-converting brand messaging books",
        "High-AOV package offer & lead capture funnel architecture",
        "Paid ad creatives coupled with organic search engine indexing blueprints",
        "Retention, email drip lifecycles, and user viral refer loops",
        "Quarterly diagnostic growth roadmaps"
      ],
      badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/20",
      accentGlow: "glow-purple"
    }
  ];

  return (
    <div id="services-view" className="space-y-20 py-8">
      
      {/* Hero Header */}
      <section id="services-hero" className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-mono tracking-widest text-purple-200 uppercase font-semibold">
            SERVICES SCHEMES
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Design, intelligence and growth <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
            working as one system.
          </span>
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Three pillars that compound. Used together, they turn good businesses into iconic ones. Experience absolute creative quality without the bloated overhead of conventional agency frameworks.
        </p>
      </section>

      {/* Services Grid detail blocks */}
      <section id="services-detailed-list" className="max-w-5xl mx-auto space-y-16 px-4">
        {servicesList.map((service, index) => (
          <div 
            id={`service-card-${service.id}`}
            key={service.id}
            className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row gap-10 border border-white/5"
          >
            {/* Background glowing gradients */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/5 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none" />

            {/* Left Header info */}
            <div className="md:w-2/5 space-y-4">
              <span className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold tracking-widest ${service.badgeColor}`}>
                {service.subtitle}
              </span>
              <div className="flex items-center gap-3 pt-2">
                <div className={`w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center ${service.accentGlow}`}>
                  {service.icon}
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  {service.title}
                </h2>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed pt-2">
                {service.description}
              </p>
              
              <div className="pt-6 hidden md:block">
                <button
                  id={`service-start-btn-desktop-${service.id}`}
                  onClick={() => navigate("/contact")}
                  className="px-6 py-3 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Start Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Deliverables Bullet points */}
            <div className="md:w-3/5 space-y-6 md:border-l md:border-zinc-900 md:pl-10">
              <h3 className="text-xs font-mono tracking-wider text-zinc-500 uppercase font-semibold">
                CORE DELIVERABLES & OUTCOMES
              </h3>
              <ul className="space-y-3.5">
                {service.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 md:hidden">
                <button
                  id={`service-start-btn-mobile-${service.id}`}
                  onClick={() => navigate("/contact")}
                  className="w-full py-4 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Start Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </section>

    </div>
  );
}
