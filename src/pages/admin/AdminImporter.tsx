import { useRef, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminImporter() {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);

  const parseCSV = (text: string) => {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
    return lines.slice(1).map(line => {
      const vals = line.split(",");
      const obj: any = {};
      headers.forEach((h, i) => { obj[h] = vals[i]?.trim() || ""; });
      return obj;
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const rows = parseCSV(ev.target?.result as string);
      setPreview(rows.slice(0, 5));
      setDone(false);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!fileRef.current?.files?.[0]) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const rows = parseCSV(ev.target?.result as string);
      const vehicles = rows.map(r => ({
        make: r.make || "Unknown", model: r.model || "Unknown",
        year: parseInt(r.year) || 2020, price: parseFloat(r.price) || 0,
        mileage: parseInt(r.mileage) || 0, fuel: r.fuel || "Petrol",
        transmission: r.transmission || "Automatic", body_type: r.body_type || "Sedan",
        color: r.color || null, description: r.description || null,
        images: [], is_featured: false, is_sold: false,
      }));
      const { error } = await supabase.from("vehicles").insert(vehicles);
      if (error) { toast({ title: "Import failed", description: error.message, variant: "destructive" }); }
      else { setDone(true); toast({ title: `${vehicles.length} vehicles imported!` }); }
      setImporting(false);
    };
    reader.readAsText(fileRef.current.files[0]);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">CSV Vehicle Importer</h1>
        <p className="text-muted-foreground text-sm mb-6">Upload a CSV file with columns: make, model, year, price, mileage, fuel, transmission, body_type, color, description</p>

        <div className="bg-card rounded-2xl border border-dashed border-border p-8 text-center mb-6">
          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-3">Click to upload your CSV file</p>
          <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} className="hidden" id="csv-upload" />
          <label htmlFor="csv-upload" className="btn-outline cursor-pointer text-sm">Choose CSV File</label>
        </div>

        {preview.length > 0 && (
          <div className="mb-4">
            <p className="text-xs section-label mb-3">Preview (first 5 rows)</p>
            <div className="bg-card rounded-xl border border-border overflow-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-border">{Object.keys(preview[0]).map(k => <th key={k} className="px-3 py-2 text-left section-label">{k}</th>)}</tr></thead>
                <tbody>{preview.map((row, i) => <tr key={i} className="border-b border-border/50">{Object.values(row).map((v: any, j) => <td key={j} className="px-3 py-2 text-muted-foreground">{v}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <button onClick={handleImport} disabled={importing || done} className="btn-primary mt-4 text-sm disabled:opacity-50">
              {done ? <><CheckCircle className="w-4 h-4" /> Imported!</> : importing ? "Importing..." : "Import All Vehicles"}
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
