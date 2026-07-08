import { useState } from "react";
import { 
  ArrowLeft, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  X,
  Workflow,
  Layers,
  Eye,
  Camera,
  Activity,
  ArrowRight
} from "lucide-react";
import { PORTFOLIO_PROJECTS } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface CaseStudyViewProps {
  projectId: string;
  navigate: (path: string) => void;
}

export default function CaseStudyView({ projectId, navigate }: CaseStudyViewProps) {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");
  const [selectedShot, setSelectedShot] = useState<string | null>(null);

  const project = PORTFOLIO_PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return (
      <div id="case-study-not-found" className="max-w-xl mx-auto py-24 text-center space-y-6">
        <h2 className="font-display text-2xl font-bold text-white">Case study not found</h2>
        <p className="text-zinc-400 text-sm">
          The requested project could not be found. It may have been archived or updated.
        </p>
        <button
          id="back-to-portfolio-fallback"
          onClick={() => navigate("/portfolio")}
          className="px-6 py-3 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  // Key visual shots gallery configuration based on the project category
  const keyShots = [
    project.image,
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // conceptual layout
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"  // details node diagram
  ];

  const processSteps = [
    {
      phase: "Phase 1: Discovery & Strategy Mapping",
      title: "Deconstructing current challenges",
      desc: "Conducted exhaustive visual and technical audit on current marketing creative models and administrative pipelines. Mapped conversion rates and operational lag times to create clean benchmarks."
    },
    {
      phase: "Phase 2: High-Octane Prompt Staging",
      title: "Synthesizing custom assets",
      desc: "Trained specialized style models inside Stable Diffusion, designed custom Midjourney reference meshes, and built emotional text-to-speech files inside ElevenLabs pipelines."
    },
    {
      phase: "Phase 3: Integration & Scale Execution",
      title: "Deploying webhooks and video grade",
      desc: "Wired secure, reliable cloud triggers in n8n and Make, color-gradedcinematic sequences in DaVinci Resolve, and launched campaign landing flows optimized for maximum conversions."
    }
  ];

  return (
    <div id="case-study-view" className="max-w-4xl mx-auto py-8 px-4 space-y-12 relative z-10">
      
      {/* Back button */}
      <button
        id="case-study-back-btn"
        onClick={() => navigate("/portfolio")}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-400" />
        <span>Back to all projects</span>
      </button>

      {/* Hero Header */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono tracking-widest text-purple-300 uppercase font-semibold">
            {project.category}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-850 text-xs font-mono text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Splash Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <a 
          href={project.image} 
          target="_blank" 
          rel="noopener noreferrer" 
          title={`${project.title} - AI Creative Work Splash`}
          className="block w-full h-full"
        >
          <img 
            src={project.image} 
            alt={`${project.title} - AI Creative Project Splash by Muttaki Adnan`} 
            title={`${project.title} - Full-Screen Splash`}
            className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </a>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Metric banner overlay */}
        <div className="absolute bottom-6 left-6 right-6 p-6 sm:p-8 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 block tracking-widest uppercase">PRIMARY MEASURABLE OUTCOME</span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">{project.metric}</span>
          </div>
          <div className="text-left sm:text-right font-sans text-sm text-zinc-300 font-semibold max-w-sm">
            {project.metricLabel}
          </div>
        </div>
      </div>

      {/* Detailed Sections layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-6">
        
        {/* Main Content Column */}
        <div className="md:col-span-8 space-y-12">
          
          {/* Section 1: The Challenge */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              Project Challenge
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>

          {/* Section 2: Visuals (Before / After Comparison) */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                Visual Transformation
              </h2>
              {/* Tab Selector */}
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveTab("before")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "before"
                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Legacy State
                </button>
                <button
                  onClick={() => setActiveTab("after")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "after"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Muttaki System
                </button>
              </div>
            </div>

            {/* Interactive Tab Visual Frame */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col justify-end p-6">
              <AnimatePresence mode="wait">
                {activeTab === "before" ? (
                  <motion.div
                    key="before"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end p-6"
                  >
                    <div className="absolute inset-0 bg-red-950/20 mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="relative z-10 space-y-2">
                      <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20 uppercase tracking-widest font-bold">
                        INEFFICIENT LEGACY ARCHITECTURE
                      </span>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans max-w-xl">
                        {project.beforeAfter.split(" vs. ")[0] || "Characterized by boring layouts, high production costs, manual onboarding processes, and generic static graphics templates with low engagement."}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="after"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end p-6"
                  >
                    <img 
                      src={project.image} 
                      alt="Transformed State" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="relative z-10 space-y-2">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 uppercase tracking-widest font-bold">
                        DEPLOYED SYSTEM STATE
                      </span>
                      <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed font-sans max-w-xl">
                        {project.beforeAfter.split(" vs. ")[1] || "Fully automated pipeline with high-end customized styling, custom cloud triggers, instant customer portals, and hyper-realistic immersive spaces."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Section 3: Custom Deployed Solution */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Solution Implemented
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>

          {/* Section 4: Process Breakdown */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
              Process Breakdown
            </h2>
            
            <div className="space-y-4">
              {processSteps.map((step, idx) => (
                <div 
                  id={`process-step-${idx}`}
                  key={idx} 
                  className="p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md hover:border-purple-500/20 transition-all flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-mono text-purple-400 font-bold shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-purple-400 tracking-wider uppercase block">
                      {step.phase}
                    </span>
                    <h3 className="font-display text-base font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Key Shots Gallery */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
              Key Project Shots
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              {keyShots.map((shot, idx) => (
                <a 
                  id={`gallery-thumb-${idx}`}
                  key={idx}
                  href={shot}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Key Shot ${idx + 1} for ${project.title}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedShot(shot);
                  }}
                  className="aspect-video rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/30 cursor-pointer relative block group transition-all"
                >
                  <img 
                    src={shot} 
                    alt={`Key Showcase Shot ${idx + 1} of ${project.title} by Muttaki Adnan`}
                    title={`Key Shot ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Side Metrics/Results Column */}
        <div className="md:col-span-4 space-y-8">
          
          {/* Key Metrics block */}
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-6">
            <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              MEASURED RESULTS
            </h3>
            
            <ul className="space-y-4">
              {project.results.map((res, index) => (
                <li key={index} className="space-y-1.5">
                  <div className="flex items-start gap-2 text-sm text-zinc-200">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-sans leading-relaxed font-semibold">{res}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Prompt Booking CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/10 to-blue-950/10 border border-purple-950/30 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-white">Need similar results?</h4>
              <p className="text-xs text-zinc-500 font-sans">Let's audit your brand worlds & operational overheads.</p>
            </div>
            <button
              id="case-study-cta-book"
              onClick={() => navigate("/contact")}
              className="w-full py-3 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all cursor-pointer"
            >
              Book a Strategy Call
            </button>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for Key Shots */}
      <AnimatePresence>
        {selectedShot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedShot(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/15 z-10 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedShot(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <img 
                src={selectedShot} 
                alt="Expanded Shot preview" 
                className="max-w-full max-h-[80vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
