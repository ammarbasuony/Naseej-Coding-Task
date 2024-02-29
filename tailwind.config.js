/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-hover": "#06419E",
        "primary-700": "#0463FB",
        "primary-600": "#3682FC",
        "primary-500": "#68A1FD",
        "primary-400": "#9BC1FD",
        "primary-300": "#CDE0FE",
        "primary-200": "#E6EFFF",
        "primary-100": "#EDF3FE",
        "primary-50": "#F8FAFF",
      },
      fontFamily: {
        primary: ["DMSans", "Rubix", "sans-serif"],
      },
      fontSize: {
        "body-xl": ["20px", "36px"],
        "body-lg": ["18px", "30px"],
        "body-md": ["16px", "28px"],
        "body-sm": ["14px", "24px"],
        "body-xs": ["12px", "20px"],
      },
    },
  },
  plugins: [],
};
