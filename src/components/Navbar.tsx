import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Car, Phone } from "lucide-react";

const navLinks = [
  { href: "/vehicles", label: "Vehicles" },
  { href: "/ai-car-finder", label: "AI Car Finder" },
  { href: "/finance", label: "Finance" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Car className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-foreground leading-tight">Bongani Mahlangu</div>
              <div className="text-[10px] section-label leading-none">Auto Sales</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/27760137093"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex btn-primary text-xs px-4 h-9"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <Link to="/finance" className="hidden md:flex btn-outline text-xs px-4 h-9">
              Get Pre-Approved
            </Link>
            <button
              className="lg:hidden btn-ghost p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <nav className="page-container py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                    location.pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
              <div className="flex gap-2 pt-2 pb-1">
                <a
                  href="https://wa.me/27760137093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary text-sm justify-center"
                >
                  WhatsApp Now
                </a>
                <Link
                  to="/finance"
                  onClick={() => setOpen(false)}
                  className="flex-1 btn-outline text-sm justify-center"
                >
                  Get Pre-Approved
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
