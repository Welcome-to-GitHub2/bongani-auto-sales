import React from "react";

export default function BankTrustBar() {

  const banks = [
    "ABSA",
    "WesBank",
    "MFC",
    "Standard Bank",
    "Marquis Finance"
  ];

  return (
    <section className="border-y border-border bg-card py-10">

      <div className="page-container text-center">

        <p className="section-label mb-3">
          Finance Available With
        </p>

        <h3 className="text-xl font-semibold mb-6">
          Trusted By Major South African Banks
        </h3>

        <p className="text-muted-foreground mb-8 text-sm">
          Finance available with all major South African banks.
        </p>

        <div className="flex flex-wrap justify-center gap-6">

          {banks.map((bank) => (
            <div
              key={bank}
              className="px-5 py-3 bg-background border border-border rounded-xl text-sm font-semibold"
            >
              {bank}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}