import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import client1 from "@/assets/img000000.jpg";
import client2 from "@/assets/img00000.jpg";
import client3 from "@/assets/img0000.jpg";
import client4 from "@/assets/img000.jpg";

const clientImages = [client1, client2, client3, client4];

export default function SuccessStoriesPage() {

  const { data: testimonials } = useQuery({
    queryKey: ["all-testimonials"],
    queryFn: async () => {

      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });

  return (

    <div className="min-h-screen bg-background flex flex-col">

      <Navbar />
      <WhatsAppButton />

      <div className="pt-24 pb-12">

        <div className="page-container">

          <div className="text-center mb-12">

            <div className="section-label mb-2">Happy Clients</div>

            <h1 className="text-4xl font-bold mb-4">Success Stories</h1>

            <p className="text-muted-foreground max-w-xl mx-auto">
              Thousands of South Africans have found their dream car through Bongani.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {(testimonials || []).map((t, i) => (

              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl overflow-hidden border border-border"
              >

                <img
                  src={clientImages[i % clientImages.length]}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-primary">★</span>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    "{t.content}"
                  </p>

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {t.name.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.location} · {t.vehicle}
                      </div>
                    </div>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

          <div className="text-center mt-12">

            <p className="text-muted-foreground mb-4">
              Ready to write your own success story?
            </p>

            <Link to="/finance" className="btn-primary">
              Get Pre-Approved
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}