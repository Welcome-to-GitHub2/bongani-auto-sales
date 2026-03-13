import { Link, useLocation, Outlet } from "react-router-dom";
import { BarChart3, Car, Users, FileText, Upload, Home } from "lucide-react";

const navItems = [
  { href: "/admin", icon: BarChart3, label: "Dashboard" },
  { href: "/admin/vehicles", icon: Car, label: "Vehicles" },
  { href: "/admin/leads", icon: Users, label: "Leads" },
  { href: "/admin/finance", icon: FileText, label: "Finance Apps" },
  { href: "/admin/importer", icon: Upload, label: "CSV Importer" },
];

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-56 bg-sidebar flex-shrink-0 border-r border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <div className="text-sm font-bold text-sidebar-foreground">BM Auto Sales</div>
          <div className="text-[10px] section-label">Admin Dashboard</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className={`sidebar-item ${location.pathname === item.href ? "active" : ""}`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Link to="/" className="sidebar-item">
            <Home className="w-4 h-4" />
            View Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
