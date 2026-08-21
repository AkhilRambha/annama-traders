import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", occasion: "", message: "" });
  const [focused, setFocused] = useState("");

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const text =
      `*Private Concierge Request*%0A%0A` +
      `Name: ${form.name}%0A` +
      `Email: ${form.email}%0A` +
      `Phone: ${form.phone}%0A` +
      `Occasion: ${form.occasion}%0A` +
      `Message: ${form.message}`;
    window.open(`https://wa.me/917093010264?text=${text}`, "_blank");
  };

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="bg-primary min-h-screen text-primary-foreground">
      {/* HERO */}
      <section className="relative pt-40 pb-20 border-b border-gold/20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.5em] text-gold mb-6"
          >
            — Private Concierge
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none text-white"
          >
            Book your <em className="font-script gold-text not-italic text-6xl md:text-8xl lg:text-9xl">Showroom</em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 max-w-xl mx-auto text-primary-foreground/70 text-lg font-serif italic"
          >
            Request a private home viewing or speak to our styling advisors.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-5 gap-16 lg:gap-24">
        {/* INFO */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 space-y-12"
        >
          <div>
            <h2 className="font-serif text-3xl text-gold mb-4">Direct Access</h2>
            <p className="text-primary-foreground/60 leading-relaxed font-light">
              For immediate assistance or to schedule an urgent bridal consultation, reach out to us directly. We respond within the hour.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { icon: Phone, label: "Phone & WhatsApp", value: "+91 86886 32684", href: "tel:+918688632684" },
              { icon: Mail, label: "Email Inquiries", value: "annammatraders98@gmail.com", href: "mailto:annammatraders98@gmail.com" },
              { icon: MapPin, label: "Flagship Studio", value: "Nagole, Hyderabad, Telangana" },
              { icon: Clock, label: "Consultation Hours", value: "Mon – Sat · 9:00 AM to 9:00 PM" },
            ].map(({ icon: Icon, label, value, href }) => {
              const Inner = (
                <div className="flex items-start gap-5 group">
                  <div className="mt-1 text-gold group-hover:text-white transition-colors">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.4em] text-primary-foreground/50 mb-1 group-hover:text-gold transition-colors">
                      {label}
                    </div>
                    <div className="font-serif text-lg text-white/90">{value}</div>
                  </div>
                </div>
              );
              return href ? <a key={label} href={href} className="block">{Inner}</a> : <div key={label}>{Inner}</div>;
            })}
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3"
        >
          <div className="bg-background/5 border border-gold/20 p-8 md:p-14 backdrop-blur-sm">
            <h2 className="font-serif text-3xl text-white mb-10">Request an Appointment</h2>

            <form onSubmit={sendToWhatsApp} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    required
                    className="w-full bg-transparent border-b border-gold/30 pb-3 outline-none text-white focus:border-gold transition-colors"
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs uppercase tracking-widest ${focused === "name" || form.name ? "-top-4 text-gold text-[9px]" : "top-0 text-primary-foreground/40"}`}>
                    Your Name *
                  </label>
                </div>
                
                <div className="relative">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused("")}
                    required
                    className="w-full bg-transparent border-b border-gold/30 pb-3 outline-none text-white focus:border-gold transition-colors"
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs uppercase tracking-widest ${focused === "phone" || form.phone ? "-top-4 text-gold text-[9px]" : "top-0 text-primary-foreground/40"}`}>
                    Phone Number *
                  </label>
                </div>
              </div>

              <div className="relative">
                <select
                  value={form.occasion}
                  onChange={update("occasion")}
                  className="w-full bg-transparent border-b border-gold/30 pb-3 outline-none text-white focus:border-gold transition-colors appearance-none cursor-pointer font-serif text-lg"
                >
                  <option value="" className="bg-primary text-white">Select Occasion</option>
                  <option value="Bridal" className="bg-primary">Wedding / Bridal Collection</option>
                  <option value="Festive" className="bg-primary">Festive Wear</option>
                  <option value="Casual" className="bg-primary">Casual Elegance</option>
                  <option value="Other" className="bg-primary">Other</option>
                </select>
              </div>

              <div className="relative pt-4">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  className="w-full bg-transparent border-b border-gold/30 pb-3 outline-none text-white focus:border-gold transition-colors resize-none font-serif"
                />
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs uppercase tracking-widest ${focused === "message" || form.message ? "top-0 text-gold text-[9px]" : "top-4 text-primary-foreground/40"}`}>
                  Tell us what you're looking for (Colors, Styles, Budget)
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-4 py-5 border border-gold text-gold hover:bg-gold hover:text-primary transition-colors uppercase tracking-[0.3em] text-xs font-semibold"
              >
                Submit Request <Send size={14} />
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default ContactPage;
