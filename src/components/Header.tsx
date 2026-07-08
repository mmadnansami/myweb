import { useState, useEffect } from "react";
import { 
  Linkedin, 
  Facebook, 
  Instagram, 
  Menu, 
  X, 
  PhoneCall, 
  Sparkles,
  LogIn,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { auth, signInWithGoogle, logout } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export default function Header({ currentPath, navigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error("Sign in failed:", e);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Sign out failed:", e);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Tools Stack", path: "/tools" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  const socials = [
    { 
      name: "LinkedIn", 
      icon: <Linkedin className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />, 
      url: "https://linkedin.com/in/muttakiadnan" 
    },
    { 
      name: "Facebook", 
      icon: <Facebook className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />, 
      url: "https://facebook.com/muttakiadnan" 
    },
    { 
      name: "Instagram", 
      icon: <Instagram className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />, 
      url: "https://instagram.com/muttakiadnan" 
    }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header id="app-header" className="glass-nav sticky top-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Branding */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick("/")}>
            <div className="relative group flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/50 flex items-center justify-center glow-purple">
                <img 
                  src="https://i.ibb.co.com/vx4Jx1q1/screen.png" 
                  alt="Muttaki Adnan Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  MUTTAKI ADNAN
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  AI Creative Director
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== "/" && currentPath.startsWith(link.path));
              return (
                <button
                  id={`nav-link-${link.name.toLowerCase().replace(" ", "-")}`}
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Desktop Socials + Auth + Book a Call */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3 border-r border-zinc-800 pr-4">
              {socials.map((social) => (
                <a
                  id={`social-link-${social.name.toLowerCase()}`}
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Google Authentication Section */}
            {!authLoading && (
              <div className="flex items-center gap-3">
                {user ? (
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-500/40 glow-purple" title={`Logged in as ${user.displayName}`}>
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-xs text-white">
                          <UserIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <button
                      id="header-sign-out"
                      onClick={handleSignOut}
                      className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-2.5 py-1.5 rounded-lg border border-zinc-800 transition-all cursor-pointer"
                    >
                      <LogOut className="w-3 h-3 text-red-400" />
                      Exit
                    </button>
                  </div>
                ) : (
                  <button
                    id="header-sign-in"
                    onClick={handleSignIn}
                    className="text-[11px] font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 px-3 py-1.5 rounded-lg border border-purple-500/20 transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-purple-400" />
                    Sign In
                  </button>
                )}
              </div>
            )}
            
            <button
              id="header-cta-book"
              onClick={() => handleNavClick("/contact")}
              className="relative overflow-hidden group px-5 py-2.5 rounded-xl bg-white text-black font-sans text-xs font-semibold uppercase tracking-wider hover:bg-zinc-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-white/10 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-black" />
              Book a Call
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              id="mobile-menu-cta"
              onClick={() => handleNavClick("/contact")}
              className="px-3 py-1.5 rounded-lg bg-white text-black font-sans text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all cursor-pointer"
            >
              Book
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentPath === link.path || (link.path !== "/" && currentPath.startsWith(link.path));
                  return (
                    <button
                      id={`mobile-nav-${link.name.toLowerCase().replace(" ", "-")}`}
                      key={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className={`text-left px-4 py-3 rounded-xl font-sans text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-white/10 text-white" 
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </button>
                  );
                })}
              </div>

              {/* Socials & Call action */}
              <div className="pt-4 border-t border-zinc-800 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-4">
                  {socials.map((social) => (
                    <a
                      id={`mobile-social-${social.name.toLowerCase()}`}
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                <button
                  id="mobile-drawer-cta-book"
                  onClick={() => handleNavClick("/contact")}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-sans text-xs font-semibold uppercase tracking-widest hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-black" />
                  Book a Strategy Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
