import { motion } from "framer-motion";
import { Star, Play, Quote } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

function TestimonialsPage() {
  const { reviews } = useAdmin();

  return (
    <div className="bg-primary min-h-screen text-primary-foreground">
      <div className="pt-36 pb-24 px-6 lg:px-10 max-w-screen-xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <Quote className="absolute top-0 left-1/2 -translate-x-1/2 text-white/5 w-32 h-32 -mt-10 -z-10" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-gold mb-6"
          >
            — Words of Love
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none text-white mb-8"
          >
            Our Happy <em className="font-script gold-text not-italic text-6xl md:text-8xl lg:text-9xl">Patrons</em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-primary-foreground/70 text-lg font-serif italic"
          >
            See what our brides and customers have to say about their Alankrita experience. 
            Real reviews, real smiles.
          </motion.p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.15 }}
              className="break-inside-avoid bg-background/5 border border-gold/20 shadow-sm hover:shadow-luxe transition duration-500 rounded-sm overflow-hidden flex flex-col backdrop-blur-sm group"
            >
              {/* Visual Content (Video/Photo) */}
              {(review.type === "video" || review.type === "photo") && (
                <div className="relative overflow-hidden">
                  <img 
                    src={review.thumbnail} 
                    alt="Customer" 
                    className="w-full object-cover max-h-[400px] group-hover:scale-105 transition duration-700" 
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition duration-500" />
                  
                  {review.type === "video" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition cursor-pointer shadow-lg">
                        <Play className="text-white fill-white ml-1" size={24} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Review Content */}
              <div className="p-8 flex-1 flex flex-col relative">
                {review.type === "text" && (
                  <Quote className="absolute top-6 right-6 text-gold/10" size={64} />
                )}
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      size={14} 
                      className={index < review.rating ? "fill-gold text-gold" : "fill-white/20 text-white/20"} 
                    />
                  ))}
                </div>
                
                <p className="text-white/90 font-serif italic text-xl leading-relaxed mb-8">
                  "{review.content}"
                </p>
                
                <div className="mt-auto pt-6 border-t border-gold/20">
                  <h4 className="font-bold text-gold text-sm uppercase tracking-widest">{review.name}</h4>
                  <p className="text-xs text-primary-foreground/50 mt-2 uppercase tracking-widest">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA section inside testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 p-12 lg:p-24 bg-gradient-to-br from-gold/10 via-background/5 to-transparent text-center border border-gold/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
          <h2 className="relative z-10 font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-10 leading-tight">
            Ready to find your <br/><em className="font-script text-gold not-italic">perfect drape?</em>
          </h2>
          <a
            href="https://wa.me/917093010264"
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center gap-3 px-12 py-5 border border-gold text-gold hover:bg-gold hover:text-primary transition-colors uppercase tracking-[0.3em] text-xs font-semibold"
          >
            Book a Home Trial
          </a>
        </motion.div>

      </div>
    </div>
  );
}

export default TestimonialsPage;
