import { useState } from "react";
import { 
  Sparkles, 
  Video, 
  Layers, 
  Cpu, 
  Zap, 
  TrendingUp, 
  X,
  Workflow,
  Lightbulb,
  ArrowUpRight
} from "lucide-react";
import { TOOLS_STACK, ToolItem } from "../data";
import { motion, AnimatePresence } from "motion/react";

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
  },
  "n8n": {
    workflow: "Constructing advanced self-hosted webhooks pipelines, auto-parsing email attachments, and routing customer leads into centralized trackers.",
    examples: ["Engineered the entire Operator GPT Slack & Jira intake pipeline", "Automated the executive email triage for enterprise partners"]
  },
  "Make": {
    workflow: "Wired for rapid multi-app integrations, instant database syncing, and orchestrating live client notification prompts across communication channels.",
    examples: ["Wired the Cal.com to Airtable and Notion automated portals for Studio AI"]
  },
  "Zapier": {
    workflow: "Rapid deployment of third-party notifications, CRM syncing, and connecting boutique platforms to our primary database logs.",
    examples: ["Synced incoming typeforms into HubSpot pipelines instantly"]
  },
  "Notion": {
    workflow: "Centralized client command portals, document repositories, high-fidelity strategy sharing, and holding relational customer brief databases.",
    examples: ["Created automated custom Notion workspaces for Studio AI leads", "Houses Ristop and Artna project roadmaps"]
  },
  "Airtable": {
    workflow: "Serving as a robust structured backend database, driving dynamic content triggers, and tracking active workflow states.",
    examples: ["Wired up lead qualifying algorithms to calculate automatic project budget scopes"]
  },
  "Adobe Photoshop": {
    workflow: "Invaluable for manual asset cleanup, compositing AI images, color matching layers, and preparing clean texture maps.",
    examples: ["Polished the final portrait frames and fine-tuned UI product mockups"]
  },
  "Premiere Pro": {
    workflow: "Compiling video renders, sound staging, multi-track timeline editing, and aligning motion clips with custom-generated musical beats.",
    examples: ["Wired the audio and cinematic video tracks for Lumen Fashion Film"]
  },
  "After Effects": {
    workflow: "Creating high-fidelity HUD elements, particle tracks, glow accents, and precise camera tracking markers for sci-fi commercial spots.",
    examples: ["Rendered glitch transitions and glowing laser tracks for Vela Space Video"]
  },
  "DaVinci Resolve": {
    workflow: "Applying cinematic LUTs, tuning color curves, HDR master grading, and producing deep rich black levels for premium display output.",
    examples: ["Color-graded the deep obsidian black metals of the Obsidian smartwatch commercial"]
  },
  "Figma": {
    workflow: "Constructing the primary visual interface layouts, interactive prototype frames, and collaborative vector briefs before building.",
    examples: ["Designed the wireframes for the Ristop studio portfolio and client views"]
  },
  "Canva": {
    workflow: "Quickly drafting marketing graphics, visual briefs, and formatting client summaries in dynamic, easily accessible presentation shapes.",
    examples: ["Laid out rapid social media previews for client campaign reviews"]
  },
  "Framer": {
    workflow: "Building high-performance premium landing screens, animating custom scrolling indicators, and staging seamless glass hover effects.",
    examples: ["Created the sleek digital launch page for Northwave SaaS and partners"]
  },
  "Google Analytics": {
    workflow: "Analyzing traffic channels, diagnosing customer onboarding dropoff zones, and computing attribution metrics.",
    examples: ["Mapped the 350k unique page views for Aurora DTC campaign funnel"]
  },
  "Meta Ads": {
    workflow: "Deploying high-converting visual creative iterations, tracking pixel fires, and scaling custom lookalike client databases.",
    examples: ["Ran Meta Ads for Halo DTC achieving a consistent 3.2x ROAS"]
  },
  "Google Ads": {
    workflow: "Bidding on high-intent search terms, setting up YouTube video creative targets, and configuring conversion tracking tags.",
    examples: ["Engineered local search campaigns for high-intent enterprise founders"]
  },
  "HubSpot": {
    workflow: "Automating enterprise lead sequences, tracking founder contract stages, and setting up centralized email drip sequences.",
    examples: ["Houses active sales funnels and contacts for Ristop ventures"]
  }
};

export default function ToolsView() {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  const categories = [
    {
      name: "AI",
      label: "Artificial Intelligence (8 tools)",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      description: "Foundational models, spatial video creation engines, synthetic voices, and style models used daily to craft premium brand worlds.",
      accentBorder: "border-purple-500/20",
      accentBg: "bg-purple-500/5"
    },
    {
      name: "Creative",
      label: "Cinematic Creative (6 tools)",
      icon: <Video className="w-5 h-5 text-pink-400" />,
      description: "Flagship media platforms, color graders, audio synthesizers, and editing benches to produce high-end commercial cinema.",
      accentBorder: "border-pink-500/20",
      accentBg: "bg-pink-500/5"
    },
    {
      name: "Automation",
      label: "Business Automation (5 tools)",
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      description: "Low-code system webhooks, database triggers, autonomous email bots, and client dashboard synchronizers.",
      accentBorder: "border-blue-500/20",
      accentBg: "bg-blue-500/5"
    },
    {
      name: "Growth",
      label: "Growth & Acquisition (4 tools)",
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      description: "High-intent search engine optimization, funnel diagnostics, CRM pipelines, and audience-mapping platforms.",
      accentBorder: "border-emerald-500/20",
      accentBg: "bg-emerald-500/5"
    },
    {
      name: "Design",
      label: "UI/UX & Brand Design (3 tools)",
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      description: "Collaborative mockups, layout builders, vectors styling platforms, and front-stage web frameworks.",
      accentBorder: "border-teal-500/20",
      accentBg: "bg-teal-500/5"
    }
  ];

  return (
    <div id="tools-view" className="space-y-16 py-8">
      
      {/* Hero Header */}
      <section id="tools-hero" className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-mono tracking-widest text-purple-200 uppercase font-semibold">
            THE STACK LIST
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Tools I live in every day.
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          By the grace of Allah, I'm comfortable in every tool on this page — these are the apps I trust to deliver cinematic, automated and growth-ready work for clients. Click on any tool to unlock dynamic insights!
        </p>
      </section>

      {/* Categorized Tools Groupings */}
      <section id="tools-categories" className="max-w-6xl mx-auto px-4 space-y-16">
        {categories.map((cat) => {
          const categoryTools = TOOLS_STACK.filter(tool => tool.category === cat.name);
          return (
            <div 
              id={`tools-category-block-${cat.name.toLowerCase()}`}
              key={cat.name} 
              className="space-y-6"
            >
              
              {/* Category Sub-Header */}
              <div className={`p-6 rounded-2xl border ${cat.accentBorder} ${cat.accentBg} backdrop-blur-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-850">
                      {cat.icon}
                    </div>
                    <h2 className="font-display text-lg font-bold text-white">
                      {cat.label}
                    </h2>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans max-w-2xl leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Tools Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryTools.map((tool) => (
                  <div 
                    id={`tool-card-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                    key={tool.name} 
                    onClick={() => setSelectedTool(tool)}
                    className="glass-card rounded-xl p-5 border border-white/5 space-y-3 cursor-pointer hover:border-purple-500/30 group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-display font-bold text-sm text-white group-hover:text-purple-300 transition-colors">{tool.name}</h3>
                      <span className="text-[9px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                        {tool.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {tool.description}
                    </p>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] font-mono text-purple-400">View Workflow Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </section>

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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#04050d] border border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 overflow-hidden z-10 shadow-2xl"
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

    </div>
  );
}
