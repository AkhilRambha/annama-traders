import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import shop from "@/assets/sarees/Shop.jfif";
import a1 from "@/assets/sarees/silk7.jfif";
import a2 from "@/assets/sarees/pt6.jfif";
import a3 from "@/assets/sarees/kalam2.jfif";

function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="bg-background">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={shop} 
          alt="Shop" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-transparent to-background" />
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xs md:text-sm uppercase tracking-[0.5em] text-gold mb-8"
          >
            — Our Story —
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-serif text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] text-primary-foreground max-w-5xl mx-auto"
          >
            A Legacy of <br/><em className="font-script gold-text not-italic">Weaves</em>
          </motion.h1>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="space-y-12 font-serif text-2xl md:text-4xl text-primary leading-tight"
        >
          <p>
            <span className="font-script gold-text text-6xl md:text-8xl">A</span>nnamma Traders began with a quiet observation — that buying a saree should feel like an heirloom moment, not a transaction.
          </p>
          <p className="text-muted-foreground text-xl md:text-3xl italic font-light">
            "So in 2020, we turned the model inside out. We pack a trunk. We come to you."
          </p>
        </motion.div>
      </section>

      {/* EDITORIAL GALLERY */}
      <section className="py-20 lg:py-40 bg-accent/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="relative h-[120vh] hidden lg:block">
            <motion.div style={{ y: y1 }} className="absolute top-0 left-0 w-2/3 aspect-[3/4] shadow-luxe rounded-sm overflow-hidden">
              <img src={a1} alt="Saree detail" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute bottom-20 right-0 w-2/3 aspect-square shadow-luxe rounded-sm overflow-hidden z-10">
              <img src={a2} alt="Saree detail" className="w-full h-full object-cover" />
            </motion.div>
          </div>
          
          {/* Mobile Gallery (Static) */}
          <div className="lg:hidden grid grid-cols-2 gap-4">
             <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-luxe"><img src={a1} alt="" className="w-full h-full object-cover" /></div>
             <div className="aspect-square rounded-sm overflow-hidden shadow-luxe mt-12"><img src={a2} alt="" className="w-full h-full object-cover" /></div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-gold-deep mb-6">Behind the Weave</div>
            <h2 className="font-serif text-5xl md:text-6xl text-primary leading-tight mb-10">
              Slow shopping.<br/><em className="font-script gold-text not-italic">Deeper joy.</em>
            </h2>
            <div className="space-y-10">
              {[
                { t: "Craft over catalogue", d: "Every saree is hand-picked directly from weavers. We select for the purity of the zari and the intricacy of the weave, never just for the SKU count." },
                { t: "Presence over pressure", d: "We sit, we chat, we drape. The right saree announces itself when you feel it against your skin. There is no rush." },
                { t: "Relationships over transactions", d: "A saree is generational. Most of our patrons return to us to buy for their daughters' weddings." },
              ].map((v, i) => (
                <motion.div 
                  key={v.t}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="pl-6 border-l border-gold/50"
                >
                  <div className="font-serif text-2xl text-primary mb-3">{v.t}</div>
                  <div className="text-muted-foreground leading-relaxed">{v.d}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FULL WIDTH IMAGE BREAK */}
      <section className="h-[60vh] lg:h-[80vh] relative">
        <img src={a3} alt="Collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
           <h2 className="font-script text-6xl md:text-8xl text-gold drop-shadow-lg">Woven with devotion</h2>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
