/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'koh-santepheap': ['"Koh Santepheap"', 'serif'],
			},
			fontWeight: {
				thin: '100',
				light: '300',
				normal: '400',
				bold: '700',
				black: '900',
			},
		},
	},
	plugins: [
		daisyui,
		require('tailwind-scrollbar')({
			nocompatible: true,
			preferredStrategy: 'pseudoelements',
		}),
		require('tailwind-scrollbar-hide'),
	],
	daisyui: {
		themes: ['light', 'dark', 'cupcake', 'emerald'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'emerald', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
};
