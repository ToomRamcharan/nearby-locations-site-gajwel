/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        surface: "#1A1A2E",
        glass: "rgba(255,255,255,0.05)",
        indigo: "#6366F1",
        violet: "#A78BFA",
        sky: "#38BDF8",
        muted: "#6B7280"
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      backdropBlur: { glass: "12px" },
      borderColor: { glass: "rgba(255,255,255,0.1)" }
    }
  },
  plugins: []
}
