import { Sparkles, Award, Zap, TrendingUp, Cpu, HeartHandshake, Eye } from "lucide-react";
import GeoDashboard from "./GeoDashboard";

interface AboutViewProps {
  navigate: (path: string) => void;
  portraitPath: string;
}

export default function AboutView({ navigate, portraitPath }: AboutViewProps) {
  const coreValues = [
    {
      title: "Premium craft",
      icon: <Award className="w-5 h-5 text-purple-400" />,
      text: "Every pixel, prompt and pipeline is engineered like a flagship product. No templates, no generic output, absolute custom luxury."
    },
    {
      title: "Outcome obsessed",
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
      text: "We measure work by revenue, retention and reach — not arbitrary deliverables. If it doesn't move your business metric, we don't build it."
    },
    {
      title: "Built for speed",
      icon: <Zap className="w-5 h-5 text-pink-400" />,
      text: "AI-native workflows let us ship in days what traditional agency teams ship in months. Extreme operational leverage for growth-oriented brands."
    }
  ];

  return (
    <div id="about-view" className="space-y-20 py-8">
      
      {/* Biography Hero Section */}
      <section id="about-hero" className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Photo frame */}
          <div className="md:col-span-5 flex justify-center">
            <a 
              href="https://i.ibb.co.com/vx4Jx1q1/screen.png" 
              target="_blank" 
              rel="noopener noreferrer nofollow" 
              title="Muttaki Adnan - Founder, Creative Director Profile Image"
              className="relative group block"
            >
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-25 blur-lg group-hover:opacity-35 transition duration-500" />
              <img 
                src={portraitPath} 
                alt="Muttaki Adnan Portrait - AI Creative Director & Growth Architect based in Dhaka, Bangladesh" 
                title="Muttaki Adnan - AI Creative Director"
                itemProp="image"
                className="relative rounded-2xl w-full max-w-[280px] sm:max-w-sm aspect-square object-cover border border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* Bio text block */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto md:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] font-mono tracking-widest text-purple-200 uppercase font-semibold">
                BIOGRAPHY PROFILE
              </span>
            </div>
            
            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Hi, I'm Muttaki Adnan.
              </h1>
              <p className="text-xs sm:text-sm font-mono tracking-wider text-purple-400 leading-relaxed max-w-[320px] xs:max-w-md sm:max-w-none mx-auto">
                AI Creative Director &bull; Growth Architect &bull; Visual Strategist &bull; Founder, Ristop
              </p>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto md:mx-0">
              I help ambitious founders and brands fuse cinematic storytelling, AI automation and growth engineering into one compounding system. My work sits at the intersection of art and intelligence — built for the next decade, not the last one.
            </p>
            
            <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-xl mx-auto md:mx-0">
              Through my digital ventures, **Ristop** and **Artna Production Ltd**, I've partnered with venture-backed CEOs, high-growth Shopify stores, and fast-moving startups to replace slow, manual operations with fully autonomous AI-native backends and visual assets.
            </p>

            <div className="pt-4 flex justify-center md:justify-start">
              <button
                id="about-cta-contact"
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                Work with me
                <HeartHandshake className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section id="about-values" className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
            THE CODE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Core Operating Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((val) => (
            <div 
              id={`value-card-${val.title.toLowerCase().replace(" ", "-")}`}
              key={val.title} 
              className="glass-card rounded-2xl p-8 space-y-4 border border-white/5"
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center glow-purple">
                {val.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {val.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                {val.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Statement Section */}
      <section id="about-vision" className="max-w-5xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border-t-2 border-t-purple-500">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 blur-[120px] pointer-events-none" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                <Eye className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Changing the industry standard.
              </h2>
            </div>
            
            <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
              <p>
                Most agencies pick a single lane — design, tech, or marketing. They operate in siloes, requiring founders to stitch together communication between multiple teams, resulting in friction, slow shipping speeds, and mismatched strategies.
              </p>
              <p>
                The next generation of brands needs all three lanes working as one unified, high-octane engine. My mission with Ristop and Artna is to set a brand new standard: a digital studio that ships premium cinematic visuals, integrates custom database automation webhooks, and scales measurable growth loops — all under one single roof, executed with absolute flagship precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC GEO-INTELLIGENCE TELEMETRY BOARD */}
      <section id="about-geo-section" className="max-w-5xl mx-auto px-4 mt-16">
        <GeoDashboard />
      </section>

    </div>
  );
}
