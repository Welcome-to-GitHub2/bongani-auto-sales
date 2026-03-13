import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const reviews = [
  { name: "Sipho D.", stars: 5, platform: "Google", text: "Absolutely top-notch service. My BMW was delivered within 3 days and the finance was sorted in 24 hours. Bongani is the best in the business!" },
  { name: "Thandi M.", stars: 5, platform: "Facebook", text: "I was skeptical but Bongani delivered on every promise. My Fortuner is perfect and the monthly payment is exactly what he quoted. 100% recommend." },
  { name: "Lethabo K.", stars: 5, platform: "Google", text: "Best car buying experience I've ever had. No hassle, no hidden fees. Just honest, fast service. Already referred 5 friends!" },
  { name: "Zanele N.", stars: 5, platform: "WhatsApp", text: "From WhatsApp to delivery in 4 days. Bongani kept me updated every step. My C-Class is a dream." },
  { name: "Mpho S.", stars: 5, platform: "Google", text: "Bongani got me approved when 2 other dealers said no. He knows the banks inside out. My Hilux is perfect for my construction business." },
  { name: "Nomsa B.", stars: 5, platform: "Facebook", text: "The refer & get paid program is real! I referred 3 friends and got paid for each one. Great service all round." },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <WhatsAppButton />
      <div className="pt-24 pb-12">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="section-label mb-2">Client Reviews</div>
            <h1 className="text-4xl font-bold mb-3">What Clients Say</h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 text-primary fill-primary" />)}</div>
              <span className="font-bold text-lg">5.0</span>
              <span className="text-muted-foreground">· 1,000+ reviews</span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-5 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex">{Array.from({ length: r.stars }).map((_, j) => <span key={j} className="text-primary text-sm">★</span>)}</div>
                  <span className="tag-aqua text-[10px]">{r.platform}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{r.text}"</p>
                <div className="font-medium text-sm">{r.name}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/finance" className="btn-primary">Start Your Journey <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
