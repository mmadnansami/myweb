import { 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Sparkles,
  MapPin
} from "lucide-react";

interface FooterProps {
  navigate: (path: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" }
  ];

  const secondaryLinks = [
    { name: "Tools Stack", path: "/tools" },
    { name: "Contact Hub", path: "/contact" }
  ];

  const socials = [
    { 
      name: "LinkedIn", 
      icon: <Linkedin className="w-5 h-5" />, 
      url: "https://linkedin.com/in/muttakiadnan" 
    },
    { 
      name: "Facebook", 
      icon: <Facebook className="w-5 h-5" />, 
      url: "https://facebook.com/muttakiadnan" 
    },
    { 
      name: "Instagram", 
      icon: <Instagram className="w-5 h-5" />, 
      url: "https://instagram.com/muttakiadnan" 
    }
  ];

  return (
    <footer id="app-footer" className="relative mt-24 border-t border-zinc-900 bg-zinc-950/60 backdrop-blur-xl pt-20 pb-12 overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & Bio Column */}
          <div className="md:col-span-1 flex flex-col space-y-4">
            <p className="text-sm text-zinc-400 font-sans leading-relaxed pt-2">
              Fusing cinematic visual direction, automated workflows, and growth engineering into one compounding revenue engine for founders.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
              QUICK SECTIONS
            </span>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <a
                    id={`footer-link-${link.name.toLowerCase()}`}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.path);
                    }}
                    className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary links */}
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
              RESOURCES
            </span>
            <ul className="space-y-2.5">
              {secondaryLinks.map((link) => (
                <li key={link.path}>
                  <a
                    id={`footer-secondary-link-${link.name.toLowerCase().replace(" ", "-")}`}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.path);
                    }}
                    className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-semibold">
              GET IN TOUCH
            </span>
            <div className="space-y-3" itemScope itemType="https://schema.org/ProfessionalService">
              <span className="hidden" itemProp="name">Muttaki Adnan | AI Creative Systems</span>
              <a
                id="footer-contact-email"
                href="mailto:muttakiadnansami@gmail.com"
                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                itemProp="email"
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>muttakiadnansami@gmail.com</span>
              </a>
              <a
                id="footer-contact-phone"
                href="tel:+8801317680620"
                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                itemProp="telephone"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+880 1317 680620</span>
              </a>
              <div 
                className="text-sm text-zinc-400 flex items-center gap-2"
                itemProp="address" 
                itemScope 
                itemType="https://schema.org/PostalAddress"
              >
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  <span itemProp="streetAddress">Dhaka</span>, <span itemProp="addressLocality">Dhaka</span>, <span itemProp="addressCountry">BD</span>
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-500 pt-1">
                Response Time: <span className="text-zinc-300 font-semibold">&lt; 24 Hours</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Round profile image and name moved to the bottom left corner next to the copyright info */}
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate("/")}>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-purple-500/50 flex items-center justify-center glow-purple shrink-0 transition-transform group-hover:scale-105 duration-200">
                <img 
                  src="https://i.ibb.co.com/vx4Jx1q1/screen.png" 
                  alt="Muttaki Adnan" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-purple-300 transition-colors uppercase">
                  MUTTAKI ADNAN
                </span>
                <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">
                  AI Creative Systems
                </span>
              </div>
            </div>
            
            <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block" />

            <p id="copyright-text" className="text-xs text-zinc-500 font-mono">
              &copy; {currentYear} Muttaki Adnan Sami. All rights reserved. Bangladesh.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {socials.map((social) => (
              <a
                id={`footer-social-${social.name.toLowerCase()}`}
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all duration-200 hover:scale-105"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
