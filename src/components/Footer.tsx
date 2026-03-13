import { Link } from "react-router-dom";
import { Car, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Car className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-bold">Bongani Mahlangu</div>
                <div className="text-[10px] section-label">Auto Sales</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              No.1 Vehicle Sales Executive & Finance Consultant. Your dream car, approved fast.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/bongscafe_mk8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/bongani.clinton.mahlangu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="section-label mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/vehicles", label: "Browse Vehicles" },
                { to: "/ai-car-finder", label: "AI Car Finder" },
                { to: "/finance", label: "Get Pre-Approved" },
                { to: "/success-stories", label: "Success Stories" },
                { to: "/about", label: "About Bongani" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="section-label mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Finance With All Major Banks</li>
              <li>Nationwide Vehicle Delivery</li>
              <li>Refer & Get Paid Program</li>
              <li>Fast Finance Approvals</li>
              <li>Trade-In Valuations</li>
              <li>Vehicle History Reports</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-label mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/27760137093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                  +27 76 013 7093
                </a>
              </li>
              <li>
                <a
                  href="mailto:bongscafee@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                  bongscafee@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                South Africa (Nationwide)
              </li>
            </ul>
            <a
              href="https://wa.me/27760137093"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Bongani Mahlangu Auto Sales. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="tag-aqua">32,000+ Facebook Followers</span>
            <span className="tag-gold">Nationwide Delivery</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">
  Website powered by <span className="text-primary font-semibold">Innocentellectual Tech Solutions</span>
</p>
    </footer>
  );
}
