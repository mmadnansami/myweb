import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";

import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import PortfolioView from "./components/PortfolioView";
import CaseStudyView from "./components/CaseStudyView";
import ToolsView from "./components/ToolsView";
import AboutView from "./components/AboutView";
import BlogView from "./components/BlogView";
import ContactView from "./components/ContactView";

const portraitPath = "https://i.ibb.co.com/vx4Jx1q1/screen.png";
const heroBgPath = "/src/assets/images/futuristic_hero_bg_1783434538482.jpg";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Capture standard a clicks and route them client-side if they are internal links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href && anchor.host === window.location.host) {
        const path = anchor.pathname;
        // Exclude file downloads or other non-view links
        if (!path.includes(".") && !anchor.hasAttribute("download")) {
          e.preventDefault();
          navigate(path);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Track mouse for premium interactive spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Dynamic SEO Metadata Manager for SPA Client-Side Routing
  useEffect(() => {
    let title = "Muttaki Adnan | AI Creative Director, Growth Architect & Visual Strategist";
    let description = "Muttaki Adnan is an elite AI Creative Director, Growth Architect, and Visual Strategist based in Dhaka, Bangladesh. Partnering with global brands to automate workflows, build system pipelines, and produce immersive cinematic visuals.";
    
    if (currentPath === "/" || currentPath === "") {
      title = "Muttaki Adnan | AI Creative Director & Growth Architect";
      description = "Muttaki Adnan is an elite AI Creative Director, Growth Architect, and Visual Strategist based in Dhaka, Bangladesh. Partnering with global brands to automate workflows, build system pipelines, and produce immersive cinematic visuals.";
    } else if (currentPath.startsWith("/services")) {
      title = "Advanced AI Services & Workflows | Muttaki Adnan";
      description = "Discover elite automation systems, custom API architectures, high-end creative direction, and conversion modeling designed to run on complete auto-pilot by Muttaki Adnan.";
    } else if (currentPath === "/portfolio") {
      title = "Immersive Cinematic AI & Systems Portfolio | Muttaki Adnan";
      description = "Explore cutting-edge projects spanning cinematic AI films, automated n8n pipelines, custom web products, and elite brand scaling assets.";
    } else if (currentPath.startsWith("/portfolio/")) {
      const caseId = currentPath.substring("/portfolio/".length);
      const cleanName = caseId.replace(/-/g, " ").toUpperCase();
      title = `Case Study: ${cleanName} | Muttaki Adnan`;
      description = `In-depth case study and systems engineering breakdown of ${cleanName} designed and deployed for luxury partners.`;
    } else if (currentPath.startsWith("/tools")) {
      title = "The Ultimate Automation & Creative Stack | Muttaki Adnan";
      description = "Browse the custom-configured visual models, local LLMs, serverless frameworks, and low-code orchestrators powering Muttaki Adnan's automation pipelines.";
    } else if (currentPath.startsWith("/about")) {
      title = "The Story & Design Philosophy | Muttaki Adnan";
      description = "Founder of Ristop and Artna Production Ltd. Discover Muttaki Adnan's vision, background, elite creative strategy, and digital craftsmanship.";
    } else if (currentPath.startsWith("/blog")) {
      title = "Insights on AI, Automation & Scalable Growth | Muttaki Adnan";
      description = "Read deep-dive articles, expert workflows, n8n templates, and visual design tutorials curated for elite digital founders.";
    } else if (currentPath.startsWith("/contact")) {
      title = "Secure a Strategy & Discovery Consultation | Muttaki Adnan";
      description = "Book a secure strategy session, send a direct encrypted message, or sign in to pin a collaborative note on our live Firestore guestbook.";
    }

    document.title = title;
    
    // Update Meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute("content", description);
    
    // Update OG title & description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);
    
    // Update Twitter title & description
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://muttakiadnan.com${currentPath}`);
  }, [currentPath]);

  // Router dispatcher
  const renderView = () => {
    if (currentPath === "/" || currentPath === "") {
      return (
        <HomeView 
          navigate={navigate} 
          portraitPath={portraitPath} 
          heroBgPath={heroBgPath} 
        />
      );
    }
    
    if (currentPath.startsWith("/services")) {
      return <ServicesView navigate={navigate} />;
    }
    
    if (currentPath === "/portfolio") {
      return <PortfolioView navigate={navigate} />;
    }
    
    if (currentPath.startsWith("/portfolio/")) {
      const id = currentPath.substring("/portfolio/".length);
      return <CaseStudyView projectId={id} navigate={navigate} />;
    }
    
    if (currentPath.startsWith("/tools")) {
      return <ToolsView />;
    }
    
    if (currentPath.startsWith("/about")) {
      return <AboutView navigate={navigate} portraitPath={portraitPath} />;
    }
    
    if (currentPath.startsWith("/blog")) {
      return <BlogView />;
    }
    
    if (currentPath.startsWith("/contact")) {
      return <ContactView />;
    }

    // Default Fallback to Home View
    return (
      <HomeView 
        navigate={navigate} 
        portraitPath={portraitPath} 
        heroBgPath={heroBgPath} 
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#020308] selection:bg-purple-500/30 selection:text-white">
      
      {/* Interactive mouse spotlight following cursor */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45 mouse-spotlight" />
      
      {/* Dynamic ambient glass spots in background */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-900/25 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" />

      {/* Animated drifting glass spots in background */}
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none animate-[bounce_12s_infinite_alternate]" />
      <div className="absolute top-2/3 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none animate-[bounce_15s_infinite_alternate]" />

      {/* Header element */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Primary Main Content layout */}
      <main id="primary-content" className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer element */}
      <Footer navigate={navigate} />

      {/* Floating Interactive AI Assistant */}
      <AIAssistant />

    </div>
  );
}
