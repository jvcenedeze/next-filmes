/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(15rem,1fr))",
      },
      aspectRatio: {
        "2/3": "2 / 3",
        "2/1": "2 / 1",
      },
      minWidth: {
        36: "9rem",
      },
      spacing: {
        26: "6.5rem",
      },
    },
  },
  plugins: [],
};
