/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#F48F56',
        'green': '#9FF9CC',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms") 
  ],
}