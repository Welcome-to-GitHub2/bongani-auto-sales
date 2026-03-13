import { motion } from "framer-motion";
import { Shield, Truck, Users, Banknote, Clock, Star } from "lucide-react";

const signals = [
  { icon: Banknote, label: "Finance With All Major Banks" },
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: Users, label: "32,000+ Facebook Followers" },
  { icon: Star, label: "Thousands of Happy Buyers" },
  { icon: Clock, label: "Fast Finance Approvals" },
  { icon: Shield, label: "Refer & Get Paid Program" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-border bg-muted/30 py-3 overflow-hidden">
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...signals, ...signals].map((signal, i) => (
          <div key={i} className="flex items-center gap-2 flex-shrink-0">
            <signal.icon className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">{signal.label}</span>
            <span className="text-border mx-2">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
