import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { ProductCard } from "@/components/ecommerce/ProductCard";

export default function Jewellery() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const { products } = useAdmin();
  const jewelleryItems = products.filter(p => p.category === "Jewellery");

  return (
    <div className="bg-background min-h-screen text-foreground pt-20">
      
      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-primary text-primary-foreground">
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1599643478514-4668f6691cb0?q=80&w=2000&auto=format&fit=crop" 
            alt="Jewellery Hero" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles size={16} className="text-gold" />
              <span className="text-xs uppercase tracking-[0.4em] text-gold-deep font-bold">The Royal Collection</span>
              <Sparkles size={16} className="text-gold" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
              Exquisite <em className="font-script gold-text not-italic">Adornments</em>
            </h1>
            <p className="font-light text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Discover a curated selection of handcrafted Kundan, Polki, and Temple jewellery, designed for the modern royal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.4em] text-gold-deep mb-4">Curated Edits</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Shop by <em className="font-script gold-text not-italic">Category</em></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Necklaces & Chokers", img: "https://images.unsplash.com/photo-1599643477874-5c866f466b89?q=80&w=800&auto=format&fit=crop" },
            { title: "Statement Earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" },
            { title: "Bangles & Bracelets", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop" }
          ].map((cat, i) => (
            <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-center text-primary-foreground">
                <span className="font-serif text-2xl group-hover:text-gold transition-colors">{cat.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE CRAFT */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-gold mb-6">— The Heritage</div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8">
              Centuries of <em className="font-script gold-text not-italic">Craftsmanship</em>
            </h2>
            <p className="text-primary-foreground/70 text-lg font-light leading-relaxed mb-6">
              Our jewellery isn't just manufactured; it is birthed by the hands of master artisans whose families have been perfecting these techniques for generations. 
            </p>
            <p className="text-primary-foreground/70 text-lg font-light leading-relaxed">
              From the uncut diamonds of Polki to the intricate gold embossing of Temple work, every piece is a tribute to the rich cultural tapestry of India.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] rounded-sm overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop" 
              alt="Craftsmanship" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* ENTIRE COLLECTION */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-gold-deep mb-4">— Complete Range</div>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">The <em className="font-script gold-text not-italic">Collection.</em></h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {jewelleryItems.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

    </div>
  );
}
