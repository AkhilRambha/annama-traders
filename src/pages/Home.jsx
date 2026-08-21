import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Home as HomeIcon, Calendar, Heart, ShoppingBag, Star, Quote } from "lucide-react";

import { ProductCard } from "@/components/ecommerce/ProductCard";
import { useAdmin } from "@/context/AdminContext";

import traditional from "@/assets/sarees/pt3.jfif";
import bridal from "@/assets/sarees/pt5.jfif";
import silk from "@/assets/sarees/silk.jfif";
import designer from "@/assets/sarees/kalm3.jfif";
import shopBg from "@/assets/sarees/Shop.jfif";
import banner from "@/assets/sarees/banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function HomePage() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const { products, heroImages, categories: CATEGORIES, offers } = useAdmin();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  const legacyImages = [traditional, heroImages[1] || shopBg, heroImages[2] || banner];
  const [legacyImgIdx, setLegacyImgIdx] = useState(0);

  const [heroImgIdx, setHeroImgIdx] = useState(0);

  useEffect(() => {
    const legacyInterval = setInterval(() => {
      setLegacyImgIdx((prev) => (prev + 1) % legacyImages.length);
    }, 4000);
    
    const heroInterval = setInterval(() => {
      setHeroImgIdx((prev) => (prev + 1) % heroImages.length);
    }, 3500);

    return () => {
      clearInterval(legacyInterval);
      clearInterval(heroInterval);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden pt-28">
        <motion.div style={{ scale }} className="absolute inset-0">
          <img src={banner} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-deep/85 via-primary/80 to-maroon-deep/90" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, oklch(0.78 0.14 82 / 0.5), transparent 50%)",
            }}
          />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center w-full z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            className="lg:col-span-6 text-primary-foreground"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.4em] text-accent font-semibold">
                New Collection Out Now
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif text-4xl md:text-6xl xl:text-7xl leading-[1.05] text-balance mb-6"
            >
              Exquisite drapes for every <br/>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
                className="font-script gold-text block mt-2 text-5xl md:text-7xl xl:text-8xl ml-8"
              >
                occasion.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg text-primary-foreground/80 leading-relaxed font-serif italic mb-10"
            >
              Shop our curated collection of Banarasi, Kanchi Pattu, and Kalamkari sarees online. 
              Authentic Indian craftsmanship delivered directly to your doorstep.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-full text-sm uppercase tracking-[0.2em] shadow-luxe hover:bg-accent/90 transition"
              >
                Shop Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Dynamic Floating Image Stack */}
          <div className="hidden lg:block lg:col-span-6 relative h-[600px] perspective-1000">
            {heroImages.map((img, i) => {
              const pos = (i - heroImgIdx + heroImages.length) % heroImages.length;
              const isCenter = pos === 0;
              const isRight = pos === 1;
              
              return (
                <motion.div
                  key={i}
                  animate={{
                    x: isCenter ? "-50%" : isRight ? "20%" : "-120%",
                    y: isCenter ? 0 : isRight ? 40 : -40,
                    scale: isCenter ? 1 : 0.85,
                    rotate: isCenter ? 0 : isRight ? 6 : -6,
                    opacity: isCenter ? 1 : 0.6,
                    zIndex: isCenter ? 30 : 10,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute top-12 left-1/2 w-64 h-[420px] rounded-sm overflow-hidden shadow-luxe border border-gold/40 origin-center"
                >
                  <div className={`absolute inset-0 bg-black/30 z-10 transition-opacity duration-1000 ${isCenter ? 'opacity-0' : 'opacity-100'}`} />
                  <img src={img} alt="Hero Saree" className="w-full h-full object-cover" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent/60 text-xs uppercase tracking-[0.4em] flex flex-col items-center gap-2"
        >
          Scroll to explore
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-12 bg-accent/40"
          />
        </motion.div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="py-6 gradient-royal text-primary-foreground border-y border-accent/30 overflow-hidden">
        <div className="flex gap-16 animate-[shimmer_30s_linear_infinite] whitespace-nowrap font-serif italic text-xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-16 shrink-0">
              {CATEGORIES.map((t, j) => (
                <span key={j} className={j % 2 === 0 ? "text-accent" : ""}>
                  {t} ✦
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY OCCASION */}
      <section className="py-20 lg:py-28 max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.4em] text-gold-deep mb-4">Curated Edits</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Shop by <em className="font-script gold-text not-italic">Occasion</em></h2>
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 md:gap-8 pb-6 hide-scrollbar snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
          {[
            { title: "Bridal Heirloom", img: bridal },
            { title: "Festive Grace", img: silk },
            { title: "Evening Soiree", img: designer },
            { title: "Temple Rituals", img: traditional }
          ].map((occ, i) => (
            <Link key={i} to="/collections" className="group block relative aspect-[3/4] w-[200px] md:w-auto flex-shrink-0 md:flex-shrink snap-start overflow-hidden rounded-sm border border-border/50 shadow-sm hover:shadow-luxe transition-all">
              <img src={occ.img} alt={occ.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-primary-foreground">
                <span className="font-serif text-lg md:text-xl tracking-wide group-hover:text-gold transition-colors">{occ.title}</span>
                <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28 bg-background">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-gold-deep mb-4">
              — Fresh from the Loom
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-primary max-w-2xl">
              New <em className="font-script gold-text not-italic">Arrivals.</em>
            </h2>
          </div>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary border-b border-gold pb-1 hover:gap-3 transition-all"
          >
            Shop All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-6 hide-scrollbar snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0">
          {newArrivals.map((product, index) => (
            <div key={product.id} className="w-[160px] sm:w-[280px] lg:w-auto flex-shrink-0 lg:flex-shrink snap-start">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* EXQUISITE JEWELLERY */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 bg-background">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-gold-deep mb-4">
              — Timeless Adornments
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-primary max-w-2xl">
              Exquisite <em className="font-script gold-text not-italic">Jewellery.</em>
            </h2>
          </div>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary border-b border-gold pb-1 hover:gap-3 transition-all"
          >
            Explore Collection <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-6 hide-scrollbar snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0">
          {products.filter(p => p.category === "Jewellery").slice(0, 4).map((product, index) => (
            <div key={product.id} className="w-[160px] sm:w-[280px] lg:w-auto flex-shrink-0 lg:flex-shrink snap-start">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* COMBINED OFFERS SECTION */}
      {offers && offers.filter(o => o.isActive).length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 bg-background">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.4em] text-gold-deep mb-4">Limited Time</div>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Exclusive <em className="font-script gold-text not-italic">Offers</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.filter(o => o.isActive).map((offer) => (
              <div key={offer.id} className="group relative overflow-hidden rounded-lg aspect-[16/9] md:aspect-[3/2] flex flex-col justify-end p-8 shadow-sm">
                <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="relative z-10 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl mb-2 text-gold">{offer.title}</h3>
                  <p className="font-light text-sm md:text-base opacity-90 max-w-sm mb-6">{offer.description}</p>
                  <Link to="/collections" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-gold transition-colors">
                    Shop Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* UNIQUE CRAFT SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-primary text-primary-foreground">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] md:h-[450px] lg:aspect-[4/3] w-full overflow-hidden rounded-sm bg-maroon-deep"
          >
            {legacyImages.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt="Craftsmanship" 
                className={`absolute inset-0 w-full h-full object-contain mix-blend-luminosity transition-opacity duration-1000 ${
                  idx === legacyImgIdx ? "opacity-80" : "opacity-0"
                }`} 
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="text-gold font-serif italic text-xl md:text-2xl mb-1">"Every thread tells a story of heritage."</div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-primary-foreground/70">— Master Weavers</div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              {legacyImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-500 ${idx === legacyImgIdx ? 'w-6 bg-gold' : 'w-2 bg-white/30'}`}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-xs uppercase tracking-[0.4em] text-gold mb-6">Our Legacy</div>
            <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-[1.1]">Preserving the <em className="font-script text-gold not-italic">authentic art</em> of Indian weaving.</h2>
            <p className="text-primary-foreground/70 leading-relaxed mb-8 text-lg">
              For over three generations, Alankrita has collaborated directly with master artisans across India. We believe in ethical sourcing, sustaining traditional handloom techniques, and bringing you sarees that aren't just garments, but heirloom pieces of art.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-primary transition uppercase tracking-widest text-sm font-semibold rounded-sm">
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-royal" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${shopBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-primary-foreground">
          <div className="text-center max-w-2xl mx-auto">
            <div className="divider-ornament text-accent mb-6">
              <Sparkles size={14} />
            </div>
            <h2 className="font-serif text-5xl md:text-6xl">
              A showroom in four <em className="font-script gold-text not-italic">gentle steps.</em>
            </h2>
          </div>

          <div className="mt-20 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-gold/40" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
              {[
                {
                  n: "01",
                  icon: ShoppingBag,
                  t: "Shop Online",
                  d: "Add your favorite sarees to cart directly from our collections.",
                },
                {
                  n: "02",
                  icon: Calendar,
                  t: "Checkout",
                  d: "Provide your delivery details securely. No immediate payment required.",
                },
                {
                  n: "03",
                  icon: HomeIcon,
                  t: "We Deliver",
                  d: "Your order is dispatched and delivered safely to your doorstep.",
                },
                {
                  n: "04",
                  icon: Heart,
                  t: "Pay on Delivery",
                  d: "Review your purchase and pay comfortably upon receiving.",
                },
              ].map(({ n, icon: Icon, t, d }, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.2, type: "spring", stiffness: 100 }}
                  key={n}
                  className={`relative flex flex-col items-center text-center group ${
                    index % 2 === 0 ? "md:translate-y-0" : "md:translate-y-12"
                  }`}
                >
                  {/* Circle Icon */}
                  <div className="w-20 h-20 rounded-full bg-maroon-deep border border-gold/40 flex items-center justify-center mb-8 shadow-luxe group-hover:scale-110 group-hover:border-gold transition-all duration-500 relative z-10">
                    <Icon size={28} className="text-accent group-hover:text-gold transition-colors duration-500" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold text-primary text-[10px] font-bold flex items-center justify-center shadow-md">
                      {n}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="bg-background/10 backdrop-blur-md border border-white/10 p-6 lg:p-8 rounded-sm shadow-xl group-hover:bg-background/20 transition-all w-full flex-1">
                    <h3 className="font-serif text-2xl mb-3 text-gold-deep group-hover:text-gold transition-colors">{t}</h3>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed font-light">{d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SAREES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28 bg-accent/5">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-gold-deep mb-4">
              — Editor's Pick
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-primary max-w-2xl">
              Featured <em className="font-script gold-text not-italic">Masterpieces.</em>
            </h2>
          </div>
        </div>



        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-6 hide-scrollbar snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0 mt-10">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="w-[160px] sm:w-[280px] lg:w-auto flex-shrink-0 lg:flex-shrink snap-start">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 bg-maroon-deep text-primary-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Words of Love</div>
              <h2 className="font-serif text-4xl md:text-5xl">Our <em className="font-script text-gold not-italic">Brides & Patrons</em></h2>
            </div>
            <Quote className="text-gold/20 w-20 h-20 hidden md:block" />
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0">
            {[
              { name: "Priya Reddy", location: "Hyderabad", text: "The Kanchi Pattu I bought for my sister's wedding was absolutely stunning. The quality of the zari is unmatched, and the home trial made deciding so easy." },
              { name: "Ananya Sharma", location: "Mumbai", text: "Alankrita feels like a closely guarded secret. The Banarasi silk drapes like a dream. Thank you for preserving such authentic craftsmanship." },
              { name: "Lakshmi Iyer", location: "Chennai", text: "I've purchased three sarees from their designer collection. Each piece is a masterpiece. The packaging and delivery were flawless." }
            ].map((test, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[400px] bg-background/5 border border-white/10 p-8 rounded-sm snap-start backdrop-blur-sm">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-gold text-gold" />)}
                </div>
                <p className="font-serif text-lg leading-relaxed text-primary-foreground/90 italic mb-8">"{test.text}"</p>
                <div className="mt-auto">
                  <div className="text-sm font-semibold tracking-wider uppercase text-gold">{test.name}</div>
                  <div className="text-xs text-primary-foreground/50 tracking-widest uppercase mt-1">{test.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-28 text-center border-t border-border">
        <h2 className="font-serif text-5xl md:text-6xl text-primary leading-tight">
          Your next saree is waiting <em className="font-script gold-text not-italic">at home.</em>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Explore our collection and order online, or book a home trial.
        </p>
        <Link
          to="/collections"
          className="mt-10 inline-flex items-center gap-3 px-10 py-5 gradient-royal text-primary-foreground rounded-full text-sm uppercase tracking-[0.25em] shadow-luxe hover:scale-105 transition"
        >
          View All Collections <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}

export default HomePage;
