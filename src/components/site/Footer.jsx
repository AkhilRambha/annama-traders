import { Link } from "react-router-dom";
import { Instagram, Phone, Mail, MapPin, ArrowRight, Facebook, Twitter } from "lucide-react";

export function Footer() {
  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "Collections", path: "/collections" },
    { label: "Our Story", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const categories = [
    "Kanchi Pattu",
    "Banarasi Silk",
    "Kalamkari",
    "Designer Sarees",
  ];

  return (
    <footer className="bg-primary pt-24 pb-32 lg:pb-12 text-primary-foreground border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Top Section: Newsletter */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="font-script text-4xl text-gold mb-4">Stay in the Loop</div>
          <p className="text-primary-foreground/70 text-sm max-w-md mb-8 leading-relaxed">
            Subscribe to our newsletter for exclusive offers, early access to new collections, and the latest from Annamma Traders.
          </p>
          <div className="w-full max-w-md relative">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="w-full bg-transparent border-b border-gold/40 pb-3 text-xs uppercase tracking-widest outline-none focus:border-gold transition-colors placeholder:text-primary-foreground/40 text-white"
            />
            <button type="button" className="absolute right-0 bottom-3 text-gold hover:text-white transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Middle Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Info */}
          <div className="lg:pr-8">
            <div className="font-serif text-2xl tracking-widest text-white mb-1">ANNAMMA</div>
            <div className="text-[9px] uppercase tracking-[0.4em] text-gold mb-6">Traders</div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Authentic handloom sarees curated for the modern woman. Bringing the heritage of Indian weaving directly to your doorstep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gold hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-gold hover:text-white transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-gold hover:text-white transition-colors"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-semibold mb-6">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-semibold mb-6">Collections</h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link to={`/collections?category=${cat}`} className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-semibold mb-6">Reach Us</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li className="flex items-start gap-3 hover:text-gold transition-colors">
                <Phone size={16} className="text-gold shrink-0 mt-0.5" /> 
                <span>+91 86886 32684</span>
              </li>
              <li className="flex items-start gap-3 hover:text-gold transition-colors">
                <Mail size={16} className="text-gold shrink-0 mt-0.5" /> 
                <span>annammatraders98@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 hover:text-gold transition-colors">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" /> 
                <span className="leading-tight">Nagole, Hyderabad<br/>Telangana, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/40">
          <div>© 2026 Annamma Traders. All Rights Reserved.</div>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
