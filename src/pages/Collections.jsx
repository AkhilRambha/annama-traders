import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { ProductCard } from "@/components/ecommerce/ProductCard";
import { useAdmin } from "@/context/AdminContext";

function CollectionsPage() {
  const { products: PRODUCTS, categories: CATEGORIES } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("q") || "";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Preserve search query if it exists
    const currentParams = new URLSearchParams(searchParams);
    
    if (category === "All") {
      currentParams.delete("category");
    } else {
      currentParams.set("category", category);
    }
    
    setSearchParams(currentParams);
  };

  const clearSearch = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete("q");
    setSearchParams(currentParams);
  };

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-36 pb-24 px-6 lg:px-10 max-w-screen-2xl mx-auto flex flex-col">
      
      {/* Header & Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-serif text-5xl md:text-6xl text-primary mb-4">Our Collections</h1>
        <p className="text-muted-foreground text-lg">
          Discover our hand-picked selection of authentic Indian sarees. 
          From Kanchi Pattu to modern designer drapes, find your perfect style.
        </p>
      </div>

      {/* Top Filter Bar (Modern Pill Design) */}
      <div className="sticky top-[110px] z-30 bg-background/90 backdrop-blur-md py-4 mb-10 border-b border-border overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-3 w-max mx-auto px-4">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest transition whitespace-nowrap ${
              activeCategory === "All" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-accent/10 text-muted-foreground hover:bg-accent/20 hover:text-primary"
            }`}
          >
            All Sarees
          </button>
          
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest transition whitespace-nowrap ${
                activeCategory === category 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-accent/10 text-muted-foreground hover:bg-accent/20 hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-muted-foreground text-sm uppercase tracking-wider">
          Showing <span className="font-bold text-primary">{filteredProducts.length}</span> results
        </p>
      </div>

      {/* Main Product Grid */}
      <main>
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-32 text-center flex flex-col items-center justify-center bg-accent/5 rounded-sm border border-border">
            <Filter size={48} className="text-gold mb-4 opacity-50" />
            <h3 className="font-serif text-2xl text-primary mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any sarees matching your search criteria.
            </p>
            <div className="flex gap-4">
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="px-8 py-3 bg-gold text-white hover:bg-gold-deep transition rounded-full uppercase text-xs tracking-widest shadow-md"
                >
                  Clear Search
                </button>
              )}
              {activeCategory !== "All" && (
                <button 
                  onClick={() => handleCategoryChange("All")}
                  className="px-8 py-3 border border-gold text-gold-deep hover:bg-gold hover:text-white transition rounded-full uppercase text-xs tracking-widest shadow-md"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CollectionsPage;
