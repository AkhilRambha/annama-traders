import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";

export default function TermsOfService() {
  const { legalPages } = useAdmin();

  return (
    <div className="bg-primary min-h-screen text-primary-foreground pt-36 pb-24 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs uppercase tracking-[0.5em] text-gold mb-6 text-center">
            — Legal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-12 text-center">
            Terms of <em className="font-script gold-text not-italic">Service</em>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none text-primary-foreground/70 font-light leading-relaxed whitespace-pre-wrap">
            {legalPages.terms}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
