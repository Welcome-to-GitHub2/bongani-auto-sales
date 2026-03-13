import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Car, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleCard from "@/components/VehicleCard";
import { supabase, type Vehicle } from "@/lib/supabase";

type Message = {
  role: "user" | "assistant";
  content: string;
  vehicles?: Vehicle[];
};

const SUGGESTIONS = [
  "I need a reliable SUV under R350k for a family of 4",
  "Show me diesel bakkies under R500k",
  "What's the best first car under R200k?",
  "I want a sedan with automatic transmission under R400k",
  "Find me a fuel-efficient hatchback under R300k",
];

export default function AICarFinderPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Bongani's AI Car Finder. Tell me what you're looking for and I'll match you with the perfect vehicle from our inventory. What are your budget, vehicle type, and preferences?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const sendMessage = async (text: string) => {
  if (!text.trim() || isLoading) return;

  const userMsg: Message = { role: "user", content: text };
  const newMessages = [...messages, userMsg];

  setMessages(newMessages);
  setInput("");
  setIsLoading(true);

  try {
    const lower = text.toLowerCase();

    // Extract budget
    // Detect income
const incomeMatch = lower.match(/(\d+)\s?(k|000)?\s?(salary|income)?/);
let income: number | null = null;

if (incomeMatch) {
  const value = parseInt(incomeMatch[1]);
  income = lower.includes("k") ? value * 1000 : value;
}


    const budgetMatch = lower.match(/r?(\d+)\s?k?/);
    let budget: number | null = null;

    if (budgetMatch) {
      const num = parseInt(budgetMatch[1]);
      budget = lower.includes("k") ? num * 1000 : num;
    }

    // Detect vehicle type
    let bodyType: string | null = null;

    if (lower.includes("suv")) bodyType = "SUV";
    if (lower.includes("bakkie")) bodyType = "Bakkie";
    if (lower.includes("hatchback")) bodyType = "Hatchback";
    if (lower.includes("sedan")) bodyType = "Sedan";

    // Detect fuel
    let fuel: string | null = null;

    if (lower.includes("diesel")) fuel = "Diesel";
    if (lower.includes("petrol")) fuel = "Petrol";

    // Build query
    let query = supabase
      .from("vehicles")
      .select("*")
      .eq("is_sold", false);

    if (budget) query = query.lte("price", budget);

    if (bodyType) query = query.eq("body_type", bodyType);

    if (fuel) query = query.eq("fuel", fuel);

    const { data: vehicles } = await query.order("price").limit(3);

    let affordabilityNote = "";

if (income && vehicles) {
  const monthlyBudget = income * 0.25;

  vehicles.forEach(v => {
    const monthly = v.price * 0.02; // simple estimate

    if (monthly <= monthlyBudget) {
      affordabilityNote =
        "Based on your income, this vehicle should be comfortably affordable.";
    } else {
      affordabilityNote =
        "This vehicle may be slightly above your ideal monthly budget.";
    }
  });
}


    let reply = "";

    if (!vehicles || vehicles.length === 0) {
      reply =
        "I couldn't find an exact match, but here are some vehicles you might like:";
      
      const { data: fallback } = await supabase
        .from("vehicles")
        .select("*")
        .eq("is_sold", false)
        .order("price")
        .limit(3);

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: reply,
          vehicles: fallback || [],
        },
      ]);
    } else {
     reply = `I found ${vehicles.length} vehicle${
  vehicles.length > 1 ? "s" : ""
} that match your request.

${affordabilityNote}

You can also click any vehicle to view details or apply for finance.`;

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: reply,
          vehicles,
        },
      ]);
    }
  } catch (err) {
    setMessages([
      ...newMessages,
      {
        role: "assistant",
        content:
          "Something went wrong while searching. Please try again or WhatsApp Bongani directly.",
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <WhatsAppButton />

      <div className="pt-20 flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card py-4">
          <div className="page-container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h1 className="text-base font-bold">AI Car Finder</h1>
                <p className="text-xs text-muted-foreground">Powered by Bongani's inventory</p>
              </div>
            </div>
            <button
              onClick={() => setMessages([{ role: "assistant", content: "Hi! I'm Bongani's AI Car Finder. Tell me what you're looking for and I'll match you with the perfect vehicle from our inventory. What are your budget, vehicle type, and preferences?" }])}
              className="btn-ghost text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6">
          <div className="page-container max-w-3xl mx-auto space-y-6">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant" ? "bg-secondary/20" : "bg-primary/20"
                }`}>
                  {msg.role === "assistant" ? (
                    <Sparkles className="w-4 h-4 text-secondary" />
                  ) : (
                    <span className="text-xs font-bold text-primary">You</span>
                  )}
                </div>
                <div className={`flex-1 max-w-lg ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-3`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-card border border-border text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.vehicles && msg.vehicles.length > 0 && (
                    <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {msg.vehicles.map((v, vi) => (
                        <VehicleCard key={v.id} vehicle={v} index={vi} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.div
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-secondary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {messages.length === 1 && (
              <div>
                <p className="text-xs section-label mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card py-4">
          <div className="page-container max-w-3xl mx-auto">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Describe what you need: "SUV under R400k, diesel, 7-seater..."'
                className="input-dark flex-1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
