/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      width: {
        "fill-available": "-webkit-fill-available"
      },
      height: {
        "fill-available": "-webkit-fill-available"
      }
    }
  },
  plugins: []
};
