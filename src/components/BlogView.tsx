import { useState } from "react";
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ChevronRight, 
  BookOpen, 
  Mail 
} from "lucide-react";
import { BLOG_POSTS, BlogPostItem } from "../data";

export default function BlogView() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const activePost = BLOG_POSTS.find(post => post.id === selectedPostId);

  // Render Full Article Details View
  if (activePost) {
    return (
      <div id="blog-post-detail" className="max-w-3xl mx-auto py-8 px-4 space-y-10">
        
        {/* Back navigation */}
        <button
          id="blog-detail-back-btn"
          onClick={() => setSelectedPostId(null)}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-400" />
          <span>Back to all essays</span>
        </button>

        {/* Article Meta Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300">
              {activePost.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activePost.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{activePost.readTime} reading</span>
            </div>
          </div>
          
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {activePost.title}
          </h1>
          
          <p className="text-zinc-400 text-sm sm:text-base font-semibold leading-relaxed font-sans pt-1 border-l-2 border-purple-500 pl-4">
            {activePost.summary}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-900" />

        {/* Article Markdown body */}
        <article className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
          {activePost.content.split("\n\n").map((para, idx) => {
            if (para.startsWith("1.") || para.startsWith("-")) {
              const items = para.split("\n");
              return (
                <ul key={idx} className="space-y-2 list-disc pl-5 text-zinc-300 my-4">
                  {items.map((li, i) => (
                    <li key={i}>{li.replace(/^[1\-]\.\s+|^-\s+/, "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx} className="whitespace-pre-line">{para}</p>;
          })}
        </article>

        {/* Footer info inside post */}
        <div className="mt-16 p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-white">Subscribe for essays</h4>
            <p className="text-xs text-zinc-500 font-sans">Get Muttaki's unredacted stack notes sent straight to your inbox.</p>
          </div>
          <a
            id="blog-post-subscribe-cta"
            href="#subscribe"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = ["mailto:", "muttakiadnansami", "@", "gmail.com", "?subject=Subscribe to Blog"].join("");
            }}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            Join Newsletter
          </a>
        </div>

      </div>
    );
  }

  // Render Blog Grid Listing View
  return (
    <div id="blog-view" className="space-y-16 py-8">
      
      {/* Hero Header */}
      <section id="blog-hero" className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-mono tracking-widest text-purple-200 uppercase font-semibold">
            FIELD ESSAYS
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Field notes on AI, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
            design & growth.
          </span>
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Behind-the-scenes logs, blueprints, and strategies on systems architecture, cinematic branding, and digital scaling.
        </p>
      </section>

      {/* Blog Essays Grid */}
      <section id="blog-list" className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              id={`blog-item-card-${post.id}`}
              key={post.id} 
              className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6 border border-white/5 group cursor-pointer"
              onClick={() => setSelectedPostId(post.id)}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/10">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-purple-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <button
                id={`blog-read-btn-${post.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPostId(post.id);
                }}
                className="text-xs font-semibold text-purple-400 hover:text-white flex items-center gap-1.5 transition-colors pt-4 group cursor-pointer"
              >
                Read article
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* More coming notice banner */}
        <div className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 text-center text-xs font-mono text-zinc-500 max-w-sm mx-auto">
          More essays coming weekly. Keep tracking.
        </div>
      </section>

    </div>
  );
}
