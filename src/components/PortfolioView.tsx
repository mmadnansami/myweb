import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  Zap, 
  TrendingUp 
} from "lucide-react";
import { PORTFOLIO_PROJECTS } from "../data";

interface PortfolioViewProps {
  navigate: (path: string) => void;
}

type FilterCategory = "All" | "AI Creative Direction" | "AI Automation" | "Growth Strategy";

export default function PortfolioView({ navigate }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");

  const categories: { name: FilterCategory; icon: React.ReactNode }[] = [
    { name: "All", icon: <Layers className="w-3.5 h-3.5" /> },
    { name: "AI Creative Direction", icon: <Cpu className="w-3.5 h-3.5 text-purple-400" /> },
    { name: "AI Automation", icon: <Zap className="w-3.5 h-3.5 text-blue-400" /> },
    { name: "Growth Strategy", icon: <TrendingUp className="w-3.5 h-3.5 text-pink-400" /> }
  ];

  const filteredProjects = selectedCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(project => project.category === selectedCategory);

  return (
    <div id="portfolio-view" className="space-y-16 py-8">
      
      {/* Hero Header */}
      <section id="portfolio-hero" className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-mono tracking-widest text-purple-200 uppercase font-semibold">
            SELECTED RECORD
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Work that moves <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
            brands forward.
          </span>
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Click any project card below to unpack the full, unredacted case study — detailing the initial challenge, the before/after operational pivot, our custom AI solution, and the measurable results.
        </p>
      </section>

      {/* Dynamic Filter Tabs */}
      <section id="portfolio-filters" className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2.5 px-4">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              id={`filter-tab-${cat.name.toLowerCase().replace(" ", "-")}`}
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border cursor-pointer ${
                isActive 
                  ? "bg-white text-black border-white shadow-lg" 
                  : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                isActive ? "bg-black/10 text-black" : "bg-white/5 text-zinc-500"
              }`}>
                {cat.name === "All" 
                  ? PORTFOLIO_PROJECTS.length 
                  : PORTFOLIO_PROJECTS.filter(p => p.category === cat.name).length
                }
              </span>
            </button>
          );
        })}
      </section>

      {/* Complete Project Grid */}
      <section id="portfolio-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              id={`portfolio-item-${project.id}`}
              key={project.id} 
              className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => navigate(`/portfolio/${project.id}`)}
            >
              {/* Thumbnail Cover */}
              <div className="relative aspect-video overflow-hidden">
                <a 
                  href={project.image} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={`${project.title} - AI Project Cover`}
                  onClick={(e) => e.stopPropagation()}
                  className="block w-full h-full"
                >
                  <img 
                    src={project.image} 
                    alt={`${project.title} - AI Creative Work by Muttaki Adnan`} 
                    title={`${project.title} - AI Portfolio`}
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

              {/* Summary details */}
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

                {/* Metric breakdown */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-zinc-500 block tracking-widest uppercase">IMPACT RESULTS</span>
                    <span className="text-sm font-mono font-bold text-emerald-400 block">{project.metric}</span>
                    <span className="text-[11px] text-zinc-400 block truncate max-w-[180px]">{project.metricLabel}</span>
                  </div>
                  <span className="text-xs font-semibold text-purple-400 group-hover:text-white flex items-center gap-1 transition-colors shrink-0">
                    Unpack Case
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
