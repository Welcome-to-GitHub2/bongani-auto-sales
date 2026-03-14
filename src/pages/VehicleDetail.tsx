import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Fuel,
  Gauge,
  Settings2,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Phone,
  Check
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/lib/supabase";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [currentImg, setCurrentImg] = useState(0);

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id!)
        .single();

      if (error) throw error;

      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="pt-24 page-container">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-card rounded-2xl" />
            <div className="h-8 bg-card rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />

        <div className="text-center pt-24">
          <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>

          <Link to="/vehicles" className="btn-primary">
            Browse All Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const images =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : vehicle.image_url
      ? [vehicle.image_url]
      : [
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
        ];

  const waMsg = `Hi Bongani! I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} listed at ${formatPrice(vehicle.price)}.`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <WhatsAppButton message={waMsg} />

      <div className="pt-24 pb-12">
        <div className="page-container">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicles
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            <div>
              <div className="relative bg-card rounded-2xl overflow-hidden aspect-[16/10] mb-3">
                <img
                  src={images[currentImg]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImg((i) => (i - 1 + images.length) % images.length)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-panel flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setCurrentImg((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-panel flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="stat-card">
                  <Calendar className="w-4 h-4" />
                  <div>{vehicle.year}</div>
                </div>

                <div className="stat-card">
                  <Gauge className="w-4 h-4" />
                  <div>{vehicle.mileage?.toLocaleString()} km</div>
                </div>

                <div className="stat-card">
                  <Fuel className="w-4 h-4" />
                  <div>{vehicle.fuel}</div>
                </div>

                <div className="stat-card">
                  <Settings2 className="w-4 h-4" />
                  <div>{vehicle.transmission}</div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="section-label mb-1">
                {vehicle.year} {vehicle.body_type}
              </div>

              <h1 className="text-2xl font-bold mb-1">
                {vehicle.make} {vehicle.model}
              </h1>

              <div className="text-3xl font-bold text-primary mb-4">
                {formatPrice(vehicle.price)}
              </div>

              <a
                href={`https://wa.me/27760137093?text=${encodeURIComponent(
                  waMsg
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                Enquire on WhatsApp
              </a>

              <Link
                to={`/finance?vehicle=${vehicle.id}`}
                className="btn-outline w-full justify-center mt-3"
              >
                Apply for Finance
              </Link>

              <a
                href="tel:+27760137093"
                className="btn-ghost w-full justify-center mt-3 border border-border"
              >
                <Phone className="w-4 h-4" />
                Call Bongani
              </a>

              <div className="mt-6 space-y-2">
                {[
                  "Finance with all major banks",
                  "Nationwide delivery available",
                  "Finance approval within 24 hours",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-secondary" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}