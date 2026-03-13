import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminVehicles() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ make: "", model: "", year: new Date().getFullYear(), price: "", mileage: "", fuel: "Petrol", transmission: "Automatic", body_type: "Sedan", color: "", description: "", is_featured: false });

  const { data: vehicles } = useQuery({ queryKey: ["admin-vehicles"], queryFn: async () => { const { data } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false }); return data || []; } });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("vehicles").insert({ ...form, price: parseFloat(form.price), mileage: parseInt(form.mileage.toString()), images: [], is_sold: false });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Vehicle added!" });
    qc.invalidateQueries({ queryKey: ["admin-vehicles"] });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this vehicle?")) return;
    await supabase.from("vehicles").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-vehicles"] });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Vehicles</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm"><Plus className="w-4 h-4" />Add Vehicle</button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-card rounded-2xl p-5 border border-border mb-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[["make","Make","text"],["model","Model","text"],["year","Year","number"],["price","Price (R)","number"],["mileage","Mileage (km)","number"],["color","Color","text"]].map(([k,l,t]) => (
              <div key={k}>
                <label className="text-xs text-muted-foreground mb-1 block">{l}</label>
                <input type={t} required={k!=="color"} value={(form as any)[k]} onChange={(e) => setForm({...form,[k]:e.target.value})} className="input-dark" />
              </div>
            ))}
            {[["fuel","Fuel",["Petrol","Diesel","Hybrid","Electric"]],["transmission","Transmission",["Automatic","Manual"]],["body_type","Body Type",["Sedan","SUV","Hatchback","Bakkie","Coupe"]]].map(([k,l,opts]) => (
              <div key={k as string}>
                <label className="text-xs text-muted-foreground mb-1 block">{l as string}</label>
                <select value={(form as any)[k as string]} onChange={(e) => setForm({...form,[k as string]:e.target.value})} className="input-dark">
                  {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div className="col-span-2 md:col-span-3">
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm({...form,description:e.target.value})} className="input-dark resize-none" />
            </div>
            <div className="col-span-2 md:col-span-3 flex gap-2">
              <button type="submit" className="btn-primary text-sm">Save Vehicle</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost border border-border text-sm">Cancel</button>
            </div>
          </form>
        )}

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">{["Vehicle","Price","Mileage","Fuel","Status","Actions"].map(h => <th key={h} className="text-left px-4 py-3 text-xs section-label">{h}</th>)}</tr></thead>
            <tbody>
              {(vehicles || []).map((v: any) => (
                <tr key={v.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{v.year} {v.make} {v.model}</td>
                  <td className="px-4 py-3 tabular text-primary font-bold">R {v.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground tabular">{v.mileage.toLocaleString()} km</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.fuel}</td>
                  <td className="px-4 py-3">{v.is_sold ? <span className="tag-red text-[10px]">Sold</span> : <span className="tag-aqua text-[10px]">Available</span>}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(v.id)} className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-accent transition-colors"><Trash2 className="w-4 h-4" /></button>
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
