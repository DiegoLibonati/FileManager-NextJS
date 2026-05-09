/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8357fe",
        secondary: "#fc8efe",
        black: "#000000",
        white: "#FFFFFF",
        lightGray: "#777",
        background: "#fbfbfb",
      },
    },
  },
  plugins: [],
};

export default config;
