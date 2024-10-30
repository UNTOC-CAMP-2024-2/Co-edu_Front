/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightMint: "#A8E6CF",
        darkMint: "#54CEA6",
        inputPlaceholder: "#F2F2F5",
        hrColor: "#EDEDED",
      },
    },
  },
  plugins: [],
};
