import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Banknote, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <WhatsAppButton />
      <div className="pt-24 pb-12">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="section-label mb-3">Meet Bongani</div>
              <h1 className="text-4xl font-bold mb-4">No.1 Vehicle Sales Executive & Finance Consultant</h1>
              <p className="text-muted-foreground leading-relaxed mb-4">Bongani Mahlangu is South Africa's most trusted vehicle sales executive, with thousands of happy clients nationwide. Specialising in fast finance approvals and nationwide delivery, Bongani has built a reputation for honesty, speed, and results.</p>
              <p className="text-muted-foreground leading-relaxed mb-6">With relationships at all major banks — ABSA, FNB, Wesbank, Nedbank, Standard Bank, and MFC — Bongani can get approvals where others can't. His 32,000+ Facebook following is a testament to the community he's built through exceptional service.</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/27760137093" target="_blank" rel="noopener noreferrer" className="btn-primary">WhatsApp Bongani <ArrowRight className="w-4 h-4" /></a>
                <Link to="/vehicles" className="btn-outline">Browse Vehicles</Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, value: "No.1", label: "Sales Executive" },
                { icon: Users, value: "32K+", label: "Facebook Followers" },
                { icon: Banknote, value: "6+", label: "Bank Partners" },
                { icon: Truck, value: "100%", label: "Nationwide Delivery" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card text-center p-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-primary tabular mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
