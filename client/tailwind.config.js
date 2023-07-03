/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin' 
import  twelements from 'tw-elements/dist/plugin.cjs'
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT(
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          darkSlateGray: '#2F4F4F',
          panTone:'#425363'
        },
      },
    },
    plugins: [flowbitePlugin,twelements],
  }
)

