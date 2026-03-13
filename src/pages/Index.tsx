import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Calculator } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import VehicleCard from "@/components/VehicleCard";
import WhatsAppButton from "@/components/WhatsAppButton";

import { supabase } from "@/lib/supabase";

import heroBg from "@/assets/hero-bg.jpg";

/* CLIENT DELIVERY PHOTOS */
import client1 from "@/assets/img000000.jpg";
import client2 from "@/assets/img00000.jpg";
import client3 from "@/assets/img0000.jpg";
import client4 from "@/assets/img000.jpg";

const clientImages = [client1, client2, client3, client4];

export default function Index() {

  const { scrollY } = useScroll();
const heroY = useTransform(scrollY, [0, 500], [0, 120]);


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
    <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center pb-16 overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
       <motion.img
  src={heroBg}
  style={{ y: heroY }}
  className="absolute inset-0 w-full h-full object-cover object-[center_80%] sm:object-[center_70%] md:object-center"
/>

          {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 backdrop-blur-[1px]" />
        </div>

        {/* HERO CONTENT */}
        <div className="page-container relative z-10 pt-24">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >

            {/* TAG */}
            <span className="tag-aqua shadow-[0_0_18px_rgba(0,255,200,0.25)]">
  Trusted Vehicle Sales Executive
</span>

            {/* HERO TITLE */}
            <h1 className="mb-6 leading-[1.05] text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
  Your Next Car{" "}
  <span className="text-gradient-gold drop-shadow-[0_0_20px_rgba(255,200,0,0.35)]">
    Approved.
  </span>
</h1>

            {/* HERO SUBTITLE */}
           

            {/* TRUST BULLETS */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
             
              
              
            </div>

            {/* BANK LOGOS */}
            <div className="mb-8">

              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
                Finance available through
              </p>

              <div className="flex flex-wrap gap-3">

                <div className="bank-logo">
                  <img src="/banks/absa.svg" className="h-6" />
                </div>

                <div className="bank-logo">
                  <img src="/banks/wesbank.svg" className="h-6" />
                </div>

                <div className="bank-logo">
                  <img src="/banks/mfc.svg" className="h-6" />
                </div>

                <div className="bank-logo">
                  <img src="/banks/standardbank.svg" className="h-6" />
                </div>

                <div className="bank-logo">
                  <img src="/banks/marquis.svg" className="h-6" />
                </div>

              </div>

            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">

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
              <div className="section-label mb-2">
                Hand-Picked Inventory
              </div>

              <h2 className="text-foreground">
                Latest Arrivals
              </h2>

              <p className="text-muted-foreground text-sm mt-1">
                Premium selection hand-picked for you.
              </p>
            </div>

            <Link to="/vehicles" className="btn-ghost text-sm">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

          {featuredVehicles && featuredVehicles.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {featuredVehicles.map((vehicle, i) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  index={i}
                />
              ))}

            </div>

          ) : (

            <div className="grid grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="vehicle-card h-80 animate-pulse bg-muted rounded-xl"
                />
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
              <div className="section-label mb-2">
                Social Proof
              </div>

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

                  {/* IMAGE */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={clientImages[i % clientImages.length]}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <span key={j} className="text-primary text-sm">
                          ★
                        </span>
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
                        <div className="text-sm font-medium">
                          {t.name}
                        </div>

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