import { Shield, Truck, TrendingUp, Car } from "lucide-react";

export default function WhyBuySection() {

  const reasons = [
    {
      icon: Shield,
      title: "Finance With Major Banks",
      text: "Finance approvals through ABSA, WesBank, MFC, Standard Bank and more."
    },
    {
      icon: TrendingUp,
      title: "Fast 24hr Approvals",
      text: "Most finance applications are approved within 24 hours."
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      text: "Your vehicle can be delivered anywhere in South Africa."
    },
    {
      icon: Car,
      title: "Trade-Ins Accepted",
      text: "Upgrade your current vehicle with a competitive trade-in offer."
    }
  ];

  return (
    <section className="section bg-card border-y border-border">

      <div className="page-container">

        <div className="text-center mb-12">

          <div className="section-label mb-2">
            Why Choose Bongani
          </div>

          <h2>
            Why Buy From Bongani Mahlangu
          </h2>

          <p className="text-muted-foreground mt-2 text-sm">
            Trusted by thousands of South African vehicle buyers.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {reasons.map((item, i) => (

            <div
              key={i}
              className="bg-background border border-border rounded-2xl p-6 text-center"
            >

              <div className="flex justify-center mb-4">

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

                  <item.icon className="w-6 h-6 text-primary" />

                </div>

              </div>

              <h3 className="font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}