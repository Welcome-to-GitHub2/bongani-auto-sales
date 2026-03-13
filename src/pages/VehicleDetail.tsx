import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Fuel, Gauge, Settings2, Calendar, MapPin, ChevronLeft, ChevronRight, Phone, Mail, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/lib/supabase";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [currentImg, setCurrentImg] = useState(0);

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("vehicles").select("*").eq("id", id!).single();
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
          <Link to="/vehicles" className="btn-primary">Browse All Vehicles</Link>
        </div>
      </div>
    );
  }

  const images = vehicle.images?.length > 0 ? vehicle.images : ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"];
  const waMsg = `Hi Bongani! I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} listed at ${formatPrice(vehicle.price)}. Can you give me more info?`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <WhatsAppButton message={waMsg} />

      <div className="pt-24 pb-12">
        <div className="page-container">
          {/* Back */}
          <Link to="/vehicles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicles
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Left: Gallery + Details */}
            <div>
              {/* Gallery */}
              <div className="relative bg-card rounded-2xl overflow-hidden aspect-[16/10] mb-3">
                <img
                  src={images[currentImg]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                {vehicle.is_featured && (
                  <div className="absolute top-4 left-4">
                    <span className="tag-gold">Featured</span>
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImg((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImg((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImg === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: Calendar, label: "Year", value: vehicle.year.toString() },
                  { icon: Gauge, label: "Mileage", value: new Intl.NumberFormat("en-ZA").format(vehicle.mileage) + " km" },
                  { icon: Fuel, label: "Fuel", value: vehicle.fuel },
                  { icon: Settings2, label: "Transmission", value: vehicle.transmission },
                ].map((stat) => (
                  <div key={stat.label} className="stat-card">
                    <div className="flex items-center gap-1.5 mb-1">
                      <stat.icon className="w-3.5 h-3.5 text-secondary" />
                      <span className="text-[10px] section-label">{stat.label}</span>
                    </div>
                    <div className="text-sm font-bold tabular">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              {vehicle.description && (
                <div className="bg-card rounded-2xl p-5 border border-border">
                  <h3 className="text-sm font-bold mb-3 section-label">Vehicle Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{vehicle.description}</p>
                </div>
              )}
            </div>

            {/* Right: Price + CTA */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="section-label mb-1">{vehicle.year} {vehicle.color || vehicle.body_type}</div>
                <h1 className="text-2xl font-bold mb-1">{vehicle.make} {vehicle.model}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">South Africa · Nationwide Delivery</span>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="text-3xl font-bold text-primary tabular mb-1">{formatPrice(vehicle.price)}</div>
                  {vehicle.monthly_est && (
                    <div className="text-sm text-muted-foreground">
                      From <span className="text-secondary font-medium tabular">R {vehicle.monthly_est.toLocaleString("en-ZA")}/mo</span> · 72 months
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/27760137093?text=${encodeURIComponent(waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enquire on WhatsApp
                  </a>
                  <Link to={`/finance?vehicle=${vehicle.id}`} className="btn-outline w-full justify-center text-sm">
                    Apply for Finance
                  </Link>
                  <a href="tel:+27760137093" className="btn-ghost w-full justify-center text-sm border border-border">
                    <Phone className="w-4 h-4" />
                    Call +27 76 013 7093
                  </a>
                </div>
              </motion.div>

              {/* Trust signals */}
              <div className="bg-card rounded-2xl p-4 border border-border space-y-2.5">
                {[
                  "Finance with all major banks",
                  "Nationwide delivery available",
                  "Full service history checked",
                  "Finance approval within 24 hours",
                  "Refer a friend & get paid",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0" />
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
