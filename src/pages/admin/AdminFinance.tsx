import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminFinance() {
  const { data: apps } = useQuery({ queryKey: ["admin-finance"], queryFn: async () => { const { data } = await supabase.from("finance_applications").select("*").order("created_at", { ascending: false }); return data || []; } });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Finance Applications</h1>
          <span className="text-sm text-muted-foreground">{apps?.length || 0} applications</span>
        </div>
        <div className="bg-card rounded-2xl border border-border overflow-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead><tr className="border-b border-border">{["Name","Phone","Income","Loan Amt","Deposit","Probability","Monthly Est","Status","Date"].map(h => <th key={h} className="text-left px-4 py-3 text-xs section-label whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {(apps || []).map((a: any) => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{a.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.phone}</td>
                  <td className="px-4 py-3 tabular text-foreground">R {a.monthly_income?.toLocaleString("en-ZA")}</td>
                  <td className="px-4 py-3 tabular text-muted-foreground">R {a.loan_amount?.toLocaleString("en-ZA") || "—"}</td>
                  <td className="px-4 py-3 tabular text-muted-foreground">R {a.deposit?.toLocaleString("en-ZA")}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold tabular text-sm ${(a.approval_probability||0) >= 70 ? "text-secondary" : (a.approval_probability||0) >= 45 ? "text-primary" : "text-accent"}`}>
                      {a.approval_probability || 0}%
                    </span>
                  </td>
                  <td className="px-4 py-3 tabular text-primary font-medium">R {a.monthly_estimate?.toLocaleString("en-ZA") || "—"}</td>
                  <td className="px-4 py-3"><span className="tag-gold text-[10px]">{a.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(a.created_at).toLocaleDateString("en-ZA")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!apps || apps.length === 0) && <div className="text-center py-12 text-muted-foreground">No finance applications yet</div>}
        </div>
      </div>
    </AdminLayout>
  );
}
