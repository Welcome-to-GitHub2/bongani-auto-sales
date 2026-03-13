import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Truck, TrendingUp, Calculator } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import VehicleCard from "@/components/VehicleCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import BankTrustBar from "@/components/BankTrustBar";
import WhyBuySection from "@/components/WhyBuySection";
import DeliveryWall from "@/components/DeliveryWall";




import { supabase } from "@/lib/supabase";

import heroBg from "@/assets/hero-bg.jpg";

/* CLIENT DELIVERY PHOTOS */
import client1 from "@/assets/img000000.jpg";
import client2 from "@/assets/img00000.jpg";
import client3 from "@/assets/img0000.jpg";
import client4 from "@/assets/img000.jpg";

/* ROTATING TESTIMONIAL IMAGES */
const clientImages = [client1, client2, client3, client4];

export default function Index() {

  /* VEHICLE QUERY */
  const { data: featuredVehicles } = useQuery({
    queryKey: ["latest-vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("is_sold", false)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;

      return data;
    },
  });

  /* TESTIMONIAL QUERY */
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <Navbar />
      <WhatsAppButton />

      {/* HERO */}
      <section className="relative min-h-svh flex items-end pb-16 overflow-hidden">

        <div className="absolute inset-0">
          <img src={heroBg} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        <div className="page-container relative z-10 pt-24">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >

            <span className="tag-aqua">Trusted Vehicle Sales Executive</span>

            <h1 className="text-foreground mb-6 leading-[1.05] text-5xl">
              Your Next Car <span className="text-gradient-gold">Approved.</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-6 max-w-xl">
  Finance with all major banks. Fast approvals. Nationwide delivery.
</p>

{/* TRUST BULLETS */}
<div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
  <span>Finance with ABSA, WesBank, MFC, Standard Bank, Marquis </span>
  <span>✔ Fast approvals</span>
  <span>✔ Nationwide delivery</span>
</div>


{/* BANK LOGOS */}
{/* BANK PARTNERS */}
<div className="mb-8">

  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
    Finance available through
  </p>

  <div className="flex flex-wrap gap-4">

    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-5 py-3 flex items-center justify-center hover:bg-white/10 transition">
      <img src="/banks/absa.svg" className="h-6 object-contain" />
    </div>

    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-5 py-3 flex items-center justify-center hover:bg-white/10 transition">
      <img src="/banks/wesbank.svg" className="h-6 object-contain" />
    </div>

    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-5 py-3 flex items-center justify-center hover:bg-white/10 transition">
      <img src="/banks/mfc.svg" className="h-6 object-contain" />
    </div>

    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-5 py-3 flex items-center justify-center hover:bg-white/10 transition">
      <img src="/banks/standardbank.svg" className="h-6 object-contain" />
    </div>

    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-5 py-3 flex items-center justify-center hover:bg-white/10 transition">
      <img src="/banks/marquis.svg" className="h-6 object-contain" />
    </div>

  </div>

</div>

<div className="flex gap-3">

              <Link to="/vehicles" className="btn-primary">
                Browse Vehicles
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link to="/ai-car-finder" className="btn-outline">
                <Sparkles className="w-4 h-4" />
                AI Car Finder
              </Link>

              <Link to="/finance" className="btn-ghost border border-border">
                <Calculator className="w-4 h-4" />
                Finance Calculator
              </Link>

            </div>

          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar />

      {/* LATEST VEHICLES */}
      <section className="section">

        <div className="page-container">

          <div className="flex items-end justify-between mb-10">

            <div>
              <div className="section-label mb-2">Hand-Picked Inventory</div>

              <h2 className="text-foreground">Latest Arrivals</h2>

              <p className="text-muted-foreground text-sm mt-1">
                Premium selection hand-picked for you.
              </p>
            </div>

            <Link to="/vehicles" className="btn-ghost text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

          {featuredVehicles && featuredVehicles.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {featuredVehicles.map((vehicle, i) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
              ))}

            </div>

          ) : (

            <div className="grid grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="vehicle-card h-80 animate-pulse bg-muted rounded-xl" />
              ))}
            </div>

          )}

        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials && testimonials.length > 0 && (

        <section className="section bg-card border-t border-border">

          <div className="page-container">

            <div className="text-center mb-10">
              <div className="section-label mb-2">Social Proof</div>
              <h2>Thousands of Happy Buyers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {testimonials.map((t, i) => (

                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >

                  {/* CUSTOMER PHOTO */}
                  <div className="aspect-[4/3] overflow-hidden">
  <img
    src={clientImages[i % clientImages.length]}
    alt="Happy customer delivery"
    className="w-full h-full object-cover"
  />
</div>

                  {/* TESTIMONIAL */}
                  <div className="p-5">

                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <span key={j} className="text-primary text-sm">★</span>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      "{t.content}"
                    </p>

                    <div className="flex items-center gap-2">

                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">
                          {t.name.charAt(0)}
                        </span>
                      </div>

                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.location} · {t.vehicle}
                        </div>
                      </div>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </section>

      )}

      <Footer />

    </div>
  );
}