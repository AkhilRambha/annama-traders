import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Eye, Star } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, index }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="group relative flex flex-col bg-background rounded-sm shadow-sm hover:shadow-luxe transition duration-500 overflow-hidden border border-border"
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-accent/10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-gold text-white text-[10px] uppercase tracking-wider rounded-sm font-semibold">
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2 py-1 bg-primary text-white text-[10px] uppercase tracking-wider rounded-sm font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => addToCart(product)}
            className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:scale-110 hover:bg-gold hover:text-white transition"
            aria-label="Add to Cart"
          >
            <ShoppingBag size={20} />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:scale-110 hover:bg-gold hover:text-white transition"
            aria-label="Quick View"
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-3 md:p-5 flex flex-col flex-1">
        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1 line-clamp-1">
          {product.category}
        </div>
        <h3 className="font-serif text-sm md:text-lg text-primary line-clamp-1 md:line-clamp-2 mb-2 group-hover:text-gold-deep transition-colors">
          {product.name}
        </h3>
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
          <span className="text-primary font-medium text-xs md:text-base">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={`md:w-3 md:h-3 ${i < 4 ? "fill-gold text-gold" : "fill-gold/30 text-gold/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
