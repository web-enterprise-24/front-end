/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  extend: {
   fontFamily: {
    "koh-santepheap": ['"Koh Santepheap"', "serif"],
   },
   fontWeight: {
    thin: "100",
    light: "300",
    normal: "400",
    bold: "700",
    black: "900",
   },
  },
 },
 plugins: [daisyui],
};
