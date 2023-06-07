/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "admin-layout-sidemenu-opened": "17rem",
        "admin-layout-sidemenu-closed": "7.5rem",
      },
      width: {
        "sidemenu-opened": "13rem",
        "sidemenu-closed": "3.5rem",
        "admin-layout-sidemenu-opened": "calc(100vw - 13rem)",
        "admin-layout-sidemenu-closed": "calc(100vw - 3.5rem)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
