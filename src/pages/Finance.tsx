import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, CheckCircle, ArrowRight, TrendingUp, Shield, Banknote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const INTEREST_RATE = 0.115; // 11.5% prime-linked
const TERM = 72;

function calcMonthly(principal: number, termMonths: number = TERM) {
  const monthlyRate = INTEREST_RATE / 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
}

function calcMaxVehicle(income: number) {
  const maxPayment = income * 0.3;
  const monthlyRate = INTEREST_RATE / 12;
  return (maxPayment * (Math.pow(1 + monthlyRate, TERM) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, TERM));
}

function approvalProb(income: number, loanAmount: number, deposit: number) {
  const net = loanAmount - deposit;
  const ratio = calcMonthly(net) / income;
  if (ratio <= 0.25) return 95;
  if (ratio <= 0.30) return 82;
  if (ratio <= 0.35) return 65;
  if (ratio <= 0.40) return 45;
  return 25;
}

export default function FinancePage() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculator state
  const [income, setIncome] = useState(25000);
  const [loanAmount, setLoanAmount] = useState(300000);
  const [deposit, setDeposit] = useState(0);
  const [term, setTerm] = useState(72);

  // Form state
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", id_number: "",
    monthly_income: "", employment_type: "employed",
    employer_name: "", vehicle_interest: "", deposit: "0", loan_term_months: "72",
  });

  const netLoan = loanAmount - deposit;
  const monthly = calcMonthly(netLoan, term);
  const maxVehicle = calcMaxVehicle(income);
  const probability = approvalProb(income, loanAmount, deposit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.monthly_income) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const inc = parseFloat(form.monthly_income);
      const loanAmt = parseFloat(form.monthly_income) * 0.3 * 72 / (INTEREST_RATE / 12 + 1);
      const ap = approvalProb(inc, loanAmt, parseFloat(form.deposit) || 0);
      const me = calcMonthly(loanAmt - (parseFloat(form.deposit) || 0), parseInt(form.loan_term_months));

      const { error } = await supabase.from("finance_applications").insert({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        id_number: form.id_number || null,
        monthly_income: inc,
        employment_type: form.employment_type,
        employer_name: form.employer_name || null,
        loan_amount: loanAmt,
        deposit: parseFloat(form.deposit) || 0,
        loan_term_months: parseInt(form.loan_term_months),
        vehicle_interest: form.vehicle_interest || null,
        approval_probability: ap,
        monthly_estimate: Math.round(me),
        status: "pending",
      });

      // Also save as lead
      await supabase.from("leads").insert({
        name: form.full_name,
        email: form.email,
        phone: form.phone,
        lead_type: "finance",
        vehicle_interest: form.vehicle_interest || null,
        income_estimate: inc,
        lead_score: ap,
        status: "new",
      });

      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({ title: "Submission failed", description: "Please try again or WhatsApp us directly.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full text-center bg-card rounded-2xl p-8 border border-border"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
            <p className="text-muted-foreground mb-6">
              Bongani will review your application and contact you within 24 hours with your pre-approval result.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/27760137093?text=Hi Bongani, I just submitted a finance application."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                Follow Up on WhatsApp
              </a>
              <Link to="/vehicles" className="btn-outline justify-center">
                Browse Vehicles While You Wait
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <WhatsAppButton />

      <div className="pt-24 pb-12">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="section-label mb-2">Finance Pre-Approval</div>
            <h1 className="text-3xl font-bold mb-2">Calculate Your Budget</h1>
            <p className="text-muted-foreground mb-8 max-w-lg">
              Get an instant estimate, then submit your pre-approval application. Bongani finances with all major banks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <div>
              <div className="bg-card rounded-2xl p-6 border border-border mb-4">
                <div className="section-label mb-4">Live Finance Calculator</div>

                <div className="space-y-5">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 flex justify-between">
                      <span>Monthly Income</span>
                      <span className="text-foreground font-medium tabular">R {income.toLocaleString("en-ZA")}</span>
                    </label>
                    <input type="range" min={5000} max={150000} step={1000} value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 rounded-full" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 flex justify-between">
                      <span>Vehicle Price</span>
                      <span className="text-foreground font-medium tabular">R {loanAmount.toLocaleString("en-ZA")}</span>
                    </label>
                    <input type="range" min={50000} max={1200000} step={5000} value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 rounded-full" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 flex justify-between">
                      <span>Deposit</span>
                      <span className="text-foreground font-medium tabular">R {deposit.toLocaleString("en-ZA")}</span>
                    </label>
                    <input type="range" min={0} max={loanAmount * 0.5} step={5000} value={deposit}
                      onChange={(e) => setDeposit(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 rounded-full" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 flex justify-between">
                      <span>Loan Term</span>
                      <span className="text-foreground font-medium">{term} months</span>
                    </label>
                    <input type="range" min={12} max={84} step={12} value={term}
                      onChange={(e) => setTerm(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 rounded-full" />
                  </div>
                </div>

                {/* Results */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="stat-card border border-primary/20">
                    <div className="text-[10px] section-label">Monthly Payment</div>
                    <div className="text-2xl font-bold text-primary tabular">R {Math.round(monthly).toLocaleString("en-ZA")}</div>
                    <div className="text-xs text-muted-foreground">{term} months @ 11.5%</div>
                  </div>
                  <div className="stat-card border border-secondary/20">
                    <div className="text-[10px] section-label">Max Vehicle Price</div>
                    <div className="text-2xl font-bold text-secondary tabular">R {Math.round(maxVehicle / 1000)}k</div>
                    <div className="text-xs text-muted-foreground">Based on your income</div>
                  </div>
                </div>

                {/* Approval probability */}
                <div className="mt-4 bg-background rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs section-label">Approval Probability</span>
                    <span className={`text-sm font-bold tabular ${probability >= 70 ? "text-secondary" : probability >= 45 ? "text-primary" : "text-accent"}`}>
                      {probability}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${probability >= 70 ? "bg-secondary" : probability >= 45 ? "bg-primary" : "bg-accent"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${probability}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {probability >= 80 ? "✅ Excellent! Very likely to be approved." :
                      probability >= 60 ? "👍 Good chances. Deposit will help." :
                        "⚠️ Consider a larger deposit or lower vehicle price."}
                  </p>
                </div>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Banknote, label: "All Major Banks" },
                  { icon: Shield, label: "Secure Process" },
                  { icon: TrendingUp, label: "24hr Approval" },
                ].map((item) => (
                  <div key={item.label} className="stat-card text-center items-center">
                    <item.icon className="w-5 h-5 text-secondary mx-auto mb-1" />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div>
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border space-y-4">
                <div className="section-label mb-2">Pre-Approval Application</div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground mb-1.5 block">Full Name *</label>
                    <input type="text" required placeholder="Sipho Dlamini" value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="input-dark" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Email *</label>
                    <input type="email" required placeholder="sipho@email.com" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-dark" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Phone *</label>
                    <input type="tel" required placeholder="+27 76 ..." value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-dark" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">ID Number</label>
                    <input type="text" placeholder="SA ID (optional)" value={form.id_number}
                      onChange={(e) => setForm({ ...form, id_number: e.target.value })} className="input-dark" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Monthly Income *</label>
                    <input type="number" required placeholder="25000" value={form.monthly_income}
                      onChange={(e) => setForm({ ...form, monthly_income: e.target.value })} className="input-dark" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Employment</label>
                    <select value={form.employment_type}
                      onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
                      className="input-dark">
                      <option value="employed">Permanently Employed</option>
                      <option value="self_employed">Self-Employed</option>
                      <option value="contract">Contract Worker</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Employer Name</label>
                    <input type="text" placeholder="Company name" value={form.employer_name}
                      onChange={(e) => setForm({ ...form, employer_name: e.target.value })} className="input-dark" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground mb-1.5 block">Vehicle Interest</label>
                    <input type="text" placeholder='e.g. "Toyota Fortuner" or "Any SUV under R500k"' value={form.vehicle_interest}
                      onChange={(e) => setForm({ ...form, vehicle_interest: e.target.value })} className="input-dark" />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
                  {loading ? "Submitting..." : "Get Pre-Approved Now"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Your information is secure and will only be used for finance purposes.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
