import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Instagram, Facebook, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from("leads").insert({
        name: form.name, email: form.email, phone: form.phone,
        message: form.message, lead_type: "inquiry", status: "new", lead_score: 50,
      });
      setSubmitted(true);
    } catch {
      toast({ title: "Failed", description: "Please try again or WhatsApp us.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <WhatsAppButton />
      <div className="pt-24 pb-12">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <div className="section-label mb-2 text-center">Get In Touch</div>
            <h1 className="text-4xl font-bold text-center mb-8">Contact Bongani</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Phone, label: "+27 76 013 7093", href: "tel:+27760137093" },
                { icon: Mail, label: "bongscafee@gmail.com", href: "mailto:bongscafee@gmail.com" },
                { icon: Instagram, label: "@bongscafe_mk8", href: "https://www.instagram.com/bongscafe_mk8" },
              ].map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="stat-card items-center text-center hover:border-primary/30 border border-transparent transition-all">
                  <c.icon className="w-5 h-5 text-secondary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground">{c.label}</span>
                </a>
              ))}
            </div>

            {submitted ? (
              <div className="bg-card rounded-2xl p-8 border border-border text-center">
                <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Message Received!</h3>
                <p className="text-muted-foreground">Bongani will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border space-y-4">
                <div className="section-label mb-2">Send a Message</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs text-muted-foreground mb-1.5 block">Name *</label>
                    <input required type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-dark" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs text-muted-foreground mb-1.5 block">Phone *</label>
                    <input required type="tel" placeholder="+27 ..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-dark" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-dark" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground mb-1.5 block">Message *</label>
                    <textarea required rows={4} placeholder="What vehicle are you interested in?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-dark resize-none" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
