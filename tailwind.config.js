/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightLightMint: "#E3F7EF",
        lightMint: "#A8E6CF",
        darkMint: "#54CEA6",
        inputPlaceholder: "#F2F2F5",
        hrColor: "#EDEDED",
        lightBlack: "#525252",
      },
    },
  },
  plugins: [],
};
