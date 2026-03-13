import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Fuel, Gauge, Settings2, Calendar, ArrowRight } from "lucide-react";
import type { Vehicle } from "@/lib/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMileage(km: number) {
  return new Intl.NumberFormat("en-ZA").format(km) + " km";
}

export default function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const mainImage = vehicle.images?.[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.32, 0.72, 0, 1] }}
    >
      <Link to={`/vehicles/${vehicle.id}`} className="block group">
        <div className="vehicle-card">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <img
              src={mainImage}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-card" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {vehicle.is_featured && (
                <span className="tag-gold text-[10px]">Featured</span>
              )}
              {vehicle.is_sold && (
                <span className="tag-red text-[10px]">Sold</span>
              )}
            </div>

            {/* Monthly estimate */}
            {vehicle.monthly_est && !vehicle.is_sold && (
              <div className="absolute bottom-3 left-3">
                <div className="glass-panel rounded-lg px-2.5 py-1.5">
                  <div className="text-[9px] text-muted-foreground uppercase tracking-wider">From</div>
                  <div className="text-sm font-bold text-secondary tabular">
                    R {vehicle.monthly_est.toLocaleString("en-ZA")}/mo
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title + Price */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="text-[10px] section-label mb-0.5">{vehicle.year} · {vehicle.color || vehicle.body_type}</div>
                <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {vehicle.make} {vehicle.model}
                </h3>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-bold text-primary tabular">
                  {formatPrice(vehicle.price)}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="flex flex-col items-center gap-1 bg-muted/50 rounded-lg p-2">
                <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[11px] font-medium tabular text-foreground">{formatMileage(vehicle.mileage)}</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-muted/50 rounded-lg p-2">
                <Fuel className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[11px] font-medium text-foreground">{vehicle.fuel}</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-muted/50 rounded-lg p-2">
                <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[11px] font-medium text-foreground">{vehicle.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-2">
              <button className="flex-1 btn-primary text-xs h-9">
                View Vehicle
              </button>
              <a
                href={`https://wa.me/27760137093?text=Hi Bongani, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (R${vehicle.price.toLocaleString()})`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25 transition-all duration-150 flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
