import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce1: 'bounce 1s infinite',
        bounce2: 'bounce 1s infinite 0.3s',
        bounce3: 'bounce 1s infinite 0.6s',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1rem)' },
        },
      },
    }
  },
  plugins: [],
};
export default config;
