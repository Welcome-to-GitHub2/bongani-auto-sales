import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Extended palette
        gold: "hsl(var(--primary))",
        aqua: "hsl(var(--secondary))",
        urgency: "hsl(var(--accent))",
        surface: "hsl(var(--card))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "slide-in-right": { from: { opacity: "0", transform: "translateX(20px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0px 0px hsl(45 81% 52% / 0)" },
          "50%": { boxShadow: "0 0 20px 4px hsl(45 81% 52% / 0.3)" },
        },
        "scanner": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.25s cubic-bezier(0.32, 0.72, 0, 1)",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "scanner": "scanner 3s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, hsl(45 81% 52%), hsl(45 81% 68%))",
        "gradient-aqua": "linear-gradient(135deg, hsl(170 100% 45%), hsl(190 100% 60%))",
        "gradient-dark": "linear-gradient(180deg, hsl(222 47% 8%), hsl(222 47% 11%))",
        "gradient-hero": "linear-gradient(180deg, hsl(222 47% 11% / 0.1) 0%, hsl(222 47% 11% / 0.7) 60%, hsl(222 47% 11%) 100%)",
        "gradient-card": "linear-gradient(180deg, transparent 40%, hsl(220 26% 17% / 0.95) 100%)",
      },
      transitionTimingFunction: {
        "snap": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      boxShadow: {
        "gold": "0 0 20px 0px hsl(45 81% 52% / 0.3)",
        "aqua": "0 0 20px 0px hsl(170 100% 45% / 0.3)",
        "card": "0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.15)",
        "card-hover": "0 20px 40px -10px rgb(0 0 0 / 0.4), 0 8px 16px -4px rgb(0 0 0 / 0.2)",
        "elevated": "0 8px 30px rgb(0 0 0 / 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
