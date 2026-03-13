import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminLeads() {
  const qc = useQueryClient();
  const { data: leads } = useQuery({ queryKey: ["admin-leads"], queryFn: async () => { const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false }); return data || []; } });

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-leads"] });
  };

  const statusColors: Record<string, string> = { new: "tag-gold", contacted: "tag-aqua", qualified: "tag-aqua", converted: "bg-secondary/20 text-secondary border border-secondary/30 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", lost: "tag-red" };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Lead CRM</h1>
          <span className="text-sm text-muted-foreground">{leads?.length || 0} total leads</span>
        </div>
        <div className="bg-card rounded-2xl border border-border overflow-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead><tr className="border-b border-border">{["Name","Phone","Email","Type","Vehicle Interest","Score","Status","Date"].map(h => <th key={h} className="text-left px-4 py-3 text-xs section-label whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {(leads || []).map((l: any) => (
                <tr key={l.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{l.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{l.email || "—"}</td>
                  <td className="px-4 py-3"><span className="tag-aqua text-[10px]">{l.lead_type}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-[140px] truncate">{l.vehicle_interest || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: `${l.lead_score}%` }} />
                      </div>
                      <span className="text-xs tabular text-muted-foreground">{l.lead_score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)} className="bg-muted text-xs rounded-lg px-2 py-1 border border-border text-foreground">
                      {["new","contacted","qualified","converted","lost"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{new Date(l.created_at).toLocaleDateString("en-ZA")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!leads || leads.length === 0) && <div className="text-center py-12 text-muted-foreground">No leads yet</div>}
        </div>
      </div>
    </AdminLayout>
  );
}
