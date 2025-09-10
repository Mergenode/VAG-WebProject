/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'v-dark': '#1a202c',
        'v-blue': '#2563eb',
        'v-light-gray': '#f1f5f9',
        'v-gray': '#a0aec0',
        'v-bone': '#f9f6ee',
      },
    },
  },
  plugins: [],
}