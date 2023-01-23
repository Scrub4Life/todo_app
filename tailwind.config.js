/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vlg: "hsl(0, 0%, 98%)",
        vlgb: "hsl(236, 33%, 92%)",
        lgb: "hsl(233, 11%, 84%)",
        dgb: "hsl(236, 9%, 61%)",
        vdgb: "hsl(235, 19%, 35%)",
        background1: "hsl(192, 100%, 67%)",
        backgrund2: "hsl(280, 87%, 65%)",
        listBgColor: "hsl(233, 14%, 35%)",
      },
      fontFamily: {
        body: ["Josefin Sans"],
      },
    },
  },
  plugins: [],
};
