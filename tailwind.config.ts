import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // SolYB brand palette — terre cuite (#C4472A) alignée sur le site public
        coral: {
          DEFAULT: '#C4472A',
          50: '#FBEDE9',
          100: '#F6D6CC',
          200: '#EAB0A0',
          300: '#DD8970',
          400: '#D0644A',
          500: '#C4472A',
          600: '#A53A21',
          700: '#842E1A',
          800: '#5E2113',
          900: '#3D150C',
        },
        solar: {
          DEFAULT: '#F5A623',
          50: '#FFFBF0',
          100: '#FEF3D0',
          200: '#FDE6A1',
          300: '#FCD772',
          400: '#FBCA43',
          500: '#F5A623',
          600: '#D98A0A',
          700: '#A96C07',
          800: '#794E05',
          900: '#493003',
        },
        turquoise: {
          DEFAULT: '#00D4AA',
          400: '#33DBAE',
          500: '#00D4AA',
          600: '#00A888',
          700: '#007D66',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        rose: {
          DEFAULT: '#F43F7A',
          400: '#FB7DA6',
          500: '#F43F7A',
          600: '#E11D5A',
          700: '#BE1250',
        },
        lime: {
          DEFAULT: '#84CC16',
          400: '#A3E635',
          500: '#84CC16',
          600: '#65A30D',
          700: '#4D7C0F',
        },
        sky: {
          DEFAULT: '#0EA5E9',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        darkbg: {
          base: '#0A0A0F',
          surface: '#13131A',
          card: '#1C1C26',
          border: '#2A2A38',
        },
        // Keep existing colors intact for admin compatibility
        primary: {
          DEFAULT: '#2563eb',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563eb',
          600: '#1e40af',
          700: '#1e3a8a',
          800: '#1e3a8a',
          900: '#1e293b',
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
