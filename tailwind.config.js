/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: '"Inter", sans-serif'
      },
      colors: {
        matte: {
          'dark-blue': '#293556',
          'medium-blue': '#2E4583',
          blue: '#3E60C1',
          'light-blue': '#5983FC'
        }
      }
    }
  },
  plugins: []
}
