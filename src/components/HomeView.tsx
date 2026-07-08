import { useState } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Clock, 
  Zap, 
  Cpu, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  X,
  Workflow,
  Lightbulb
} from "lucide-react";
import { PORTFOLIO_PROJECTS, TOOLS_STACK, TESTIMONIALS, ToolItem } from "../data";
import { motion, AnimatePresence } from "motion/react";
import GeoDashboard from "./GeoDashboard";

const TOOL_DETAILS_MAP: Record<string, { workflow: string; examples: string[] }> = {
  "ChatGPT": {
    workflow: "Used for high-level conceptual mapping, drafting initial creative scripts, analyzing business client briefs, and generating system webhook code blocks.",
    examples: ["Created script layouts for Lumen Fashion Film", "Assembled logic steps for Studio AI Intake Engine"]
  },
  "Midjourney": {
    workflow: "Daily driver for hyper-realistic cinematic keyframes, character styling reference, high-end commercial imagery assets, and luxury product texture styling.",
    examples: ["Generated clothing concepts for Lumen autumn line", "Created hyper-detailed background assets for Aurora DTC"]
  },
  "Runway": {
    workflow: "Synthesizing dynamic motion from static Midjourney keyframes, manipulating visual pacing, and utilizing motion brush controls for precise camera pans.",
    examples: ["Rendered floating-city transitions in Lumen Fashion Film", "Animated cinematic movement in Vela Synthwave Video"]
  },
  "Sora": {
    workflow: "Directing high-consistency complex physical tracking shots, rendering long-duration 3D cinematic spaces, and creating zero-gravity spatial camera arcs.",
    examples: ["Rendered the global high-tech server networks for Northwind Commercial Spot", "Created sci-fi futuristic holographic UI mockups"]
  },
  "Claude": {
    workflow: "The logic powerhouse. Used to write clean code layouts, parse dense document specifications, construct custom database mappings, and design structured webhooks.",
    examples: ["Programmed the Operator GPT Claude PDF parsing prompt", "Constructed the relational layout logic in Studio AI"]
  },
  "ElevenLabs": {
    workflow: "Emotional dialogue prompting, multi-language narration staging, high-fidelity brand vocal cloning, and custom sound effects synthesis.",
    examples: ["Rendered deep cinematic narration for Northwind", "Synthesized industrial hums and switch clicks for Obsidian Smartwatch"]
  },
  "Flux": {
    workflow: "Rendering crisp text-in-image typography, designing highly detailed brand merchandise layouts, and producing rapid style variations.",
    examples: ["Created stylized logos and packaging typography for Aurora product boxes"]
  },
  "Stable Diffusion": {
    workflow: "Fine-tuning custom visual styles using LoRA checkpoints, using ControlNet for perfect human pose alignment, and scaling upscaler models to 8K resolution.",
    examples: ["Trained the custom Aurora brand styling model", "Inpainted high-detail clock face mechanics in Obsidian Smartwatch"]
  }
};

interface HomeViewProps {
  navigate: (path: string) => void;
  portraitPath: string;
  heroBgPath: string;
}

export default function HomeView({ navigate, portraitPath, heroBgPath }: HomeViewProps) {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  // Selected Work Grid: show a diverse selection of 6 items on home page
  const selectedProjects = PORTFOLIO_PROJECTS.slice(0, 6);

  // Key tools for preview (8 tools)
  const previewTools = TOOLS_STACK.filter(t => 
    ["ChatGPT", "Midjourney", "Runway", "Sora", "Claude", "ElevenLabs", "Flux", "Stable Diffusion"].includes(t.name)
  );

  return (
    <div id="home-view" className="space-y-24">
      
      {/* 1. HERO SECTION */}
      <section id="home-hero" className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-24 overflow-hidden">
        {/* Dynamic Abstract Background Asset with Glass Overlays & High-contrast glowing arc */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBgPath} 
            alt="Futuristic Neural Waves Background" 
            className="w-full h-full object-cover opacity-20 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020308]/20 via-[#020308]/85 to-[#020308]" />
          
          {/* Majestic Neon Arc light beam at the top of the viewport (matches Fintech & NEONE mockup) */}
          <div className="neon-glow-arc" />
          
          {/* Ambient glowing backup blobs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10 mt-6">
          
          {/* Top Pill - Available Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl animate-fade-in shadow-xl shadow-purple-950/10">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>
            <span className="text-[11px] font-mono tracking-widest text-purple-200 uppercase font-semibold">
              Available for custom enterprise projects
            </span>
          </div>

          {/* Majestic Display Header using Delight Bold */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white leading-[1.05] max-w-4xl mx-auto">
              Innovating Tomorrow. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-blue-400 text-glow">
                Building Today.
              </span>
            </h1>
            <p className="text-zinc-500 font-mono text-[9px] sm:text-xs md:text-sm tracking-[0.08em] sm:tracking-[0.2em] uppercase pt-2 max-w-[290px] xs:max-w-md sm:max-w-none mx-auto leading-relaxed">
              Muttaki Adnan &bull; AI Creative Director &bull; Growth Architect &bull; Visual Strategist
            </p>
          </div>

          {/* Subheader */}
          <p className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto font-sans leading-relaxed font-light">
            I direct cinematic AI-generated films, brand worlds, and automated systems for founders and high-growth brands. Fusing ultimate digital aesthetics with custom autonomous backends to compound your operational leverage.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="hero-cta-contact"
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-2xl shadow-white/5 hover:-translate-y-0.5 cursor-pointer"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
            <button
              id="hero-cta-portfolio"
              onClick={() => navigate("/portfolio")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-950/40 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-md hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Portfolios
            </button>
          </div>

          {/* Glass Trust Bar (Matches Image 2 exactly) */}
          <div className="pt-8 max-w-3xl mx-auto">
            <div className="inline-flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-xl text-[10px] sm:text-[11px] font-mono text-zinc-400 shadow-xl">
              <span className="flex items-center gap-1.5"><span className="text-purple-400">★</span> Rated 5.0/5 on Upwork</span>
              <span className="hidden sm:inline text-zinc-700">|</span>
              <span className="flex items-center gap-1.5"><span className="text-blue-400">✔</span> Elite Provider</span>
              <span className="hidden sm:inline text-zinc-700">|</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✦</span> 24h Global Response</span>
              <span className="hidden sm:inline text-zinc-700">|</span>
              <span className="flex items-center gap-1.5"><span className="text-purple-400">✔</span> Founder, Ristop</span>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section id="home-intro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-5 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
          
          {/* Portrait Column */}
          <div className="md:col-span-5 flex justify-center relative">
            <a 
              href="https://i.ibb.co.com/vx4Jx1q1/screen.png" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Muttaki Adnan - AI Creative Director, Growth Architect & Visual Strategist"
              className="relative group block"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur-xl group-hover:opacity-40 transition duration-1000" />
              <img 
                src={portraitPath} 
                alt="Muttaki Adnan - AI Creative Director, Growth Architect & Visual Strategist in Dhaka, Bangladesh" 
                title="Muttaki Adnan Portrait - AI Creative Director"
                itemProp="image"
                className="relative rounded-2xl w-full max-w-[280px] sm:max-w-xs md:max-w-none aspect-square object-cover border border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* Description & Badge Tags Column */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300 font-medium">
                <Award className="w-3.5 h-3.5" />
                Top 1% Provider
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Partner
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 font-medium">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                24h Response
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Muttaki Adnan
              </h2>
              <p className="text-xs sm:text-sm font-mono tracking-wider text-purple-400 leading-relaxed max-w-[320px] xs:max-w-md sm:max-w-none mx-auto">
                AI Creative Director &bull; Growth Architect &bull; Visual Strategist &bull; Founder, Ristop
              </p>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
              Based in Bangladesh, I operate at the frontier of digital craftsmanship. I fuse absolute visual luxury with highly intelligent back-office automations and growth modeling. The result? A single compounding asset that runs on complete auto-pilot, positioning your brand at the absolute top of your industry.
            </p>

            <div className="pt-2 flex justify-center md:justify-start">
              <button 
                id="intro-contact-btn"
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-800 text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Let's discuss your project
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PILLARS SECTION */}
      <section id="home-pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">
            THE SYSTEM ARCHITECTURE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">
            A complete system for modern brands.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            I don't offer single services in isolation. I design a comprehensive engine where storytelling, systems logic, and scaling funnel models multiply each other.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 - Glass Card */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between space-y-8 border border-white/5 hover:border-purple-500/20 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center glow-purple group-hover:border-purple-400/40 transition-colors">
                <Cpu className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                AI Creative Direction
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                End-to-end AI-generated brand films, commercials & visual worlds. Hollywood quality, startup speed. Crafted to make your brand feel premium on every screen.
              </p>
            </div>
            <button
              id="pillar-link-direction"
              onClick={() => navigate("/services")}
              className="text-xs font-semibold text-purple-400 hover:text-white flex items-center gap-1.5 transition-colors pt-4 group cursor-pointer"
            >
              Learn more about film craft
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pillar 2 - Highlighted Glowing Purple Card (Matches Image 2 exactly) */}
          <div className="rounded-2xl p-8 flex flex-col justify-between space-y-8 bg-gradient-to-br from-purple-600 to-indigo-800 border border-purple-400/50 shadow-2xl shadow-purple-500/20 relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-purple-500/30 group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-900/40 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                AI-Driven Automation
              </h3>
              <p className="text-purple-100/90 text-sm leading-relaxed font-sans font-light">
                Custom agents, webhooks, workflows, and back-office systems that run your operations while you sleep. Connected directly to the platforms you already use.
              </p>
            </div>
            <button
              id="pillar-link-automation"
              onClick={() => navigate("/services")}
              className="text-xs font-semibold text-white hover:text-purple-200 flex items-center gap-1.5 transition-colors pt-4 group relative z-10 cursor-pointer"
            >
              Learn more about integrations
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pillar 3 - Glass Card */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between space-y-8 border border-white/5 hover:border-pink-500/20 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center glow-purple group-hover:border-pink-400/40 transition-colors">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                Scalable Growth Strategy
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                High-converting acquisition funnels, positioning logic, paid ads formulas, and retention growth loops engineered for compounding revenue gains.
              </p>
            </div>
            <button
              id="pillar-link-growth"
              onClick={() => navigate("/services")}
              className="text-xs font-semibold text-pink-400 hover:text-white flex items-center gap-1.5 transition-colors pt-4 group cursor-pointer"
            >
              Learn more about growth engines
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. SELECTED WORK SECTION */}
      <section id="home-portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">
              CASE STUDIES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">
              Crafted with cinematic precision.
            </h2>
          </div>
          <button
            id="portfolio-see-all-btn"
            onClick={() => navigate("/portfolio")}
            className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-sm font-medium hover:text-white transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            See full portfolio
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedProjects.map((project) => (
            <div 
              id={`portfolio-card-${project.id}`}
              key={project.id} 
              className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => navigate(`/portfolio/${project.id}`)}
            >
              {/* Cover Photo */}
              <div className="relative aspect-video overflow-hidden">
                <a 
                  href={project.image} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={`${project.title} - AI Creative Project Cover`}
                  onClick={(e) => e.stopPropagation()}
                  className="block w-full h-full"
                >
                  <img 
                    src={project.image} 
                    alt={`${project.title} - AI Creative Work by Muttaki Adnan`} 
                    title={`${project.title} - AI Case Study`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </a>
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md text-[10px] font-mono font-medium text-purple-300">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Summary metadata */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-zinc-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Measurable Metric Highlight */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">KEY METRIC</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">{project.metric}</span>
                  </div>
                  <span className="text-xs font-semibold text-purple-400 group-hover:text-white flex items-center gap-1 transition-colors">
                    View Case Study
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section id="home-stats" className="bg-gradient-to-r from-purple-950/10 via-zinc-900/30 to-blue-950/10 border-y border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-2">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
                120+
              </span>
              <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                Projects Shipped
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
                40+
              </span>
              <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                Happy Founders
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-white">
                10x
              </span>
              <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                Avg. Workflow Speed
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-white">
                24/7
              </span>
              <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                AI Assistant Active
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TOOLS PREVIEW SECTION */}
      <section id="home-tools-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">
            THE STACK
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">
            Tools in my daily stack.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            By the grace of Allah, I have trained thousands of hours inside these tools to deliver absolute digital excellence. Click on any tool card to see exactly how I integrate it!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {previewTools.map((tool) => (
            <div 
              id={`tool-preview-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
              key={tool.name} 
              onClick={() => setSelectedTool(tool)}
              className="glass-card rounded-xl p-6 text-center space-y-2 flex flex-col justify-center items-center cursor-pointer hover:border-purple-500/30 group transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-bold text-zinc-300 text-xs shadow-inner group-hover:border-purple-500/30 transition-all">
                {tool.name.substring(0, 2).toUpperCase()}
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-purple-300 transition-colors">{tool.name}</h3>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">{tool.category}</p>
              <span className="text-[9px] font-mono text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">View workflow</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            id="tools-preview-see-all-btn"
            onClick={() => navigate("/tools")}
            className="text-xs font-semibold text-purple-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors mx-auto group cursor-pointer"
          >
            See the full stack of 25+ systems
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Dynamic Pop-up Modal */}
        <AnimatePresence>
          {selectedTool && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop Blur */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTool(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Modal Body */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-[#04050d] border border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 overflow-hidden z-10 shadow-2xl text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedTool(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="space-y-1.5 pr-8">
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md uppercase tracking-wider font-semibold">
                    {selectedTool.category} STACK TOOL
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white pt-2">
                    {selectedTool.name}
                  </h3>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Core Function</h4>
                  <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                    {selectedTool.description}
                  </p>
                </div>

                {/* Workflow integration */}
                <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Workflow className="w-4.5 h-4.5" />
                    <h4 className="text-xs font-mono uppercase tracking-wider">How I Use It in My Workflow</h4>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans pt-1">
                    {TOOL_DETAILS_MAP[selectedTool.name]?.workflow || "Leveraged daily to streamline client assets delivery, ensure precise layout mapping, or automate administrative data syncs."}
                  </p>
                </div>

                {/* Examples */}
                {TOOL_DETAILS_MAP[selectedTool.name]?.examples && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Lightbulb className="w-4.5 h-4.5" />
                      <h4 className="text-[11px] font-mono uppercase tracking-widest">Real-world Application Examples</h4>
                    </div>
                    <ul className="space-y-2 pt-1">
                      {TOOL_DETAILS_MAP[selectedTool.name].examples.map((ex, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400 font-sans">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Close CTAs */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    Close Insights
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section id="home-testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">
            PROOF
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">
            Results that speak for themselves.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              id={`testimonial-card-${idx}`}
              key={idx} 
              className="glass-card rounded-2xl p-8 flex flex-col justify-between space-y-6"
            >
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed italic">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-900">
                <img 
                  src={t.avatarUrl} 
                  alt={t.author} 
                  className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{t.author}</h4>
                  <p className="text-xs font-mono text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ABOUT THE FOUNDER OVERVIEW */}
      <section id="home-founder-about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-l-4 border-l-purple-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">
                ABOUT MUTTAKI ADNAN
              </span>
              
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Fusing creative brilliance with automation intelligence.
              </h2>
              
              <div className="text-zinc-400 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                <p>
                  I am the founder of **Ristop** and **Artna Production Ltd**, where we engineer high-end corporate digital assets and video assets. I am also the author of a leading workbook detailing modular growth funnels and automation architectures for digital executives.
                </p>
                <p>
                  My core specialization is delivering premium, minimalist visual branding paired with advanced API webhooks, customized databases, and growth architecture models. I work with a small, hand-selected group of founders each quarter to ensure premium execution quality.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <span className="text-zinc-500 block uppercase text-[10px]">ORGANIZATION</span>
                  <span className="text-zinc-200 font-semibold">Founder, Ristop</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <span className="text-zinc-500 block uppercase text-[10px]">PRODUCTION</span>
                  <span className="text-zinc-200 font-semibold">Artna Production Ltd</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 block uppercase text-[10px]">LOCATION</span>
                  <span className="text-zinc-200 font-semibold">Based in Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-center text-center space-y-6 lg:border-l lg:border-zinc-900 lg:pl-12">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center glow-purple">
                <Sparkles className="w-6.5 h-6.5 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white">Ready to automate & scale?</h3>
                <p className="text-xs text-zinc-500 font-mono">BOOK A SECURE DISCOVERY CALL DIRECTLY</p>
              </div>
              <button
                id="founder-cta-contact"
                onClick={() => navigate("/contact")}
                className="w-full py-4 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all cursor-pointer"
              >
                Book a Discovery Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC GEO-INTELLIGENCE TELEMETRY BOARD */}
      <section id="home-geo-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <GeoDashboard />
      </section>

    </div>
  );
}
