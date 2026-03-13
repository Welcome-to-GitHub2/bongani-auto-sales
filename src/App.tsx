import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Index from "./pages/Index";
import VehiclesPage from "./pages/Vehicles";
import VehicleDetailPage from "./pages/VehicleDetail";
import AICarFinderPage from "./pages/AICarFinder";
import FinancePage from "./pages/Finance";
import SuccessStoriesPage from "./pages/SuccessStories";
import ReviewsPage from "./pages/Reviews";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/admin/Dashboard";
import AdminVehiclesPage from "./pages/admin/AdminVehicles";
import AdminLeadsPage from "./pages/admin/AdminLeads";
import AdminImporterPage from "./pages/admin/AdminImporter";
import AdminFinancePage from "./pages/admin/AdminFinance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>

        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
          <Route path="/ai-car-finder" element={<AICarFinderPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/vehicles" element={<AdminVehiclesPage />} />
          <Route path="/admin/leads" element={<AdminLeadsPage />} />
          <Route path="/admin/importer" element={<AdminImporterPage />} />
          <Route path="/admin/finance" element={<AdminFinancePage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;