/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin' 
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT(
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          darkSlateGray: '#2F4F4F',
          panTone:'#394353',
          headerColor:'#EA3C12'
        },
      },
    },
    plugins: [flowbitePlugin],
  }
)

