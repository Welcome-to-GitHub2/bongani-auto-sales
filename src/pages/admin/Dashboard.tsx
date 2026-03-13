import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Car, Users, FileText, TrendingUp } from "lucide-react";

type Lead = {
  id: string;
  name: string;
  phone: string;
  lead_type: string;
  status: string;
  created_at: string;
};

export default function AdminDashboard() {

  /* VEHICLE COUNT */
  const { data: vehicleCount } = useQuery({
    queryKey: ["admin-vehicle-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true });

      if (error) throw error;

      return count || 0;
    },
  });

  /* LEAD COUNT */
  const { data: leadCount } = useQuery({
    queryKey: ["admin-lead-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      if (error) throw error;

      return count || 0;
    },
  });

  /* FINANCE APPLICATION COUNT */
  const { data: financeCount } = useQuery({
    queryKey: ["admin-finance-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("finance_applications")
        .select("*", { count: "exact", head: true });

      if (error) throw error;

      return count || 0;
    },
  });

  /* RECENT LEADS */
  const { data: recentLeads } = useQuery({
    queryKey: ["recent-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      return (data || []) as Lead[];
    },
  });

  return (
    <AdminLayout>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {[
            { icon: Car, label: "Vehicles", value: vehicleCount, color: "text-primary" },
            { icon: Users, label: "Total Leads", value: leadCount, color: "text-secondary" },
            { icon: FileText, label: "Finance Apps", value: financeCount, color: "text-accent" },
            { icon: TrendingUp, label: "Conversion Rate", value: "24%", color: "text-primary" },
          ].map((stat) => (

            <div key={stat.label} className="stat-card">

              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs section-label">
                  {stat.label}
                </span>
              </div>

              <div className={`text-3xl font-bold tabular ${stat.color}`}>
                {stat.value ?? "..."}
              </div>

            </div>

          ))}

        </div>

        {/* RECENT LEADS TABLE */}

        <div className="bg-card rounded-2xl border border-border overflow-hidden">

          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-sm">
              Recent Leads
            </h3>
          </div>

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-border">

                {["Name", "Phone", "Type", "Status", "Date"].map((h) => (

                  <th
                    key={h}
                    className="text-left px-4 py-2 text-xs section-label"
                  >
                    {h}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {(recentLeads || []).map((lead) => (

                <tr
                  key={lead.id}
                  className="border-b border-border/50 hover:bg-muted/20"
                >

                  <td className="px-4 py-2.5 font-medium">
                    {lead.name}
                  </td>

                  <td className="px-4 py-2.5 text-muted-foreground">
                    {lead.phone}
                  </td>

                  <td className="px-4 py-2.5">
                    <span className="tag-aqua text-[10px]">
                      {lead.lead_type}
                    </span>
                  </td>

                  <td className="px-4 py-2.5">
                    <span className="tag-gold text-[10px]">
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-4 py-2.5 text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString("en-ZA")}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}