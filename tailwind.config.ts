import type { Config } from "tailwindcss";
const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors:{
			primaryDark:'#275258',
			primaryLight:'#22908d',
			background:'#d3d3d3',
			helper:'#d22c67'
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  backgroundImage: {
			// Linear Gradient
			'PrimaryGradient': 'linear-gradient(90deg, #275258 0%, #22908d 100%)',
			// Gradient with opacity (adjusting opacity through RGBA or Tailwind utilities)
			'PrimaryGradientOpacity': 'linear-gradient(90deg, rgba(39, 82, 88, 0.8) 0%, rgba(34, 144, 141, 0.8) 100%)',
		  },
		  boxShadow: {
			// Custom shadow with primaryDark color
			'primaryDark': '0 4px 6px rgba(39, 82, 88, 0.4)',
			// Custom shadow with primaryLight color
			'primaryLight': '0 4px 6px rgba(34, 144, 141, 0.3)',
			// Custom shadow with helper color
			'helper': '0 4px 6px rgba(210, 44, 103, 0.4)',
			// Custom shadow with background color
			'background': '0 4px 6px rgba(211, 211, 211, 0.5)',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
