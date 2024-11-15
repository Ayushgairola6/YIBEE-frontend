/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    
  ],
  darkMode:'class',
  theme: {
    extend: {
      animation:{
        'spin':"spin 1s linear infinite",
        "spin-slow":"spin 3s linear infinite",
        "animate-pulse"	: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      screens:{
        'max-lg':{'max':'1000px'},
      }
    },
  },
  plugins: [
    function({addUtilities}){
      addUtilities({
        'no-scrollbar':{
          '::-webkit-scrollbar':{"display":"none"}
        }
      })
    }
  ],

}