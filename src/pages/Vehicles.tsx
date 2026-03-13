import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/lib/supabase";

const bodyTypes = ["All", "Sedan", "SUV", "Hatchback", "Bakkie", "Coupe", "Convertible"];
const fuels = ["All", "Petrol", "Diesel", "Hybrid", "Electric"];
const transmissions = ["All", "Automatic", "Manual"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under R200k", min: 0, max: 200000 },
  { label: "R200k – R350k", min: 200000, max: 350000 },
  { label: "R350k – R500k", min: 350000, max: 500000 },
  { label: "R500k – R750k", min: 500000, max: 750000 },
  { label: "Over R750k", min: 750000, max: Infinity },
];

export default function VehiclesPage() {
  const [search, setSearch] = useState("");
  const [bodyType, setBodyType] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["all-vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("is_sold", false)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const range = priceRanges[priceRange];
  const filtered = vehicles?.filter((v) => {
    const matchSearch = !search ||
      `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(search.toLowerCase());
    const matchBody = bodyType === "All" || v.body_type === bodyType;
    const matchFuel = fuel === "All" || v.fuel === fuel;
    const matchTransmission = transmission === "All" || v.transmission === transmission;
    const matchPrice = v.price >= range.min && v.price <= range.max;
    return matchSearch && matchBody && matchFuel && matchTransmission && matchPrice;
  });

  const activeFilters = [
    bodyType !== "All" ? bodyType : null,
    fuel !== "All" ? fuel : null,
    transmission !== "All" ? transmission : null,
    priceRange !== 0 ? priceRanges[priceRange].label : null,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <WhatsAppButton />

      {/* Header */}
      <div className="pt-24 pb-8 border-b border-border">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="section-label mb-2">Available Now</div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <h1 className="text-3xl font-bold">Vehicle Inventory</h1>
              <div className="text-sm text-muted-foreground tabular">
                {filtered ? filtered.length : "—"} vehicles found
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="page-container py-8 flex-1">
        {/* Search + Filter Bar */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search make, model, year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-ghost border border-border gap-2 ${showFilters ? "text-primary border-primary/40 bg-primary/5" : ""}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((f) => (
              <span key={f} className="tag-gold gap-1">
                {f}
                <button
                  onClick={() => {
                    if (f === bodyType) setBodyType("All");
                    if (f === fuel) setFuel("All");
                    if (f === transmission) setTransmission("All");
                    if (f === priceRanges[priceRange].label) setPriceRange(0);
                  }}
                  className="ml-1 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button onClick={() => { setBodyType("All"); setFuel("All"); setTransmission("All"); setPriceRange(0); }} className="text-xs text-muted-foreground hover:text-foreground">
              Clear all
            </button>
          </div>
        )}

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-2xl p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div>
              <label className="text-xs section-label mb-2 block">Body Type</label>
              <div className="flex flex-wrap gap-1.5">
                {bodyTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setBodyType(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      bodyType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs section-label mb-2 block">Fuel</label>
              <div className="flex flex-wrap gap-1.5">
                {fuels.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFuel(f)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      fuel === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs section-label mb-2 block">Transmission</label>
              <div className="flex flex-wrap gap-1.5">
                {transmissions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTransmission(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      transmission === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs section-label mb-2 block">Price Range</label>
              <div className="flex flex-col gap-1">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setPriceRange(i)}
                    className={`text-left px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      priceRange === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="vehicle-card h-80 animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((vehicle, i) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search term</p>
            <button
              onClick={() => { setSearch(""); setBodyType("All"); setFuel("All"); setTransmission("All"); setPriceRange(0); }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
