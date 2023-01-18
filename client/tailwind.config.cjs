/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      dropShadow: {
				hard: "0px 2px 6px black",
				navText: "0px 0px 3px #2f3e47"
			},
			colors: {
				discoPurple: "rgb(231, 201, 228)",
				discoDarkPurple: "rgb(132, 51, 149)",
				discoYellow: "#e08966"
			},
			fontFamily: {
				'DiscoFont': ['DiscoFont'],
        oswald: ['Oswald', 'sans-serif']
			},
      animation: {
				"fallIn": 'fallIn 1.2s ease-in-out 1',
			},
			keyframes: {
				"fallIn": {
					
					'0%, 40%': { 
						transform: 'rotate(-3deg)',
						"animation-timing-function": "ease-in-out",
					},
					'20%, 60%': { 
						transform: 'rotate(3deg)',
						"animation-timing-function": "ease-in-out",
					},
					'80%': { 
						transform: 'rotate(0deg)',  
						"animation-timing-function": "ease-in-out",
					},
				}
			}
    }
  },
  plugins: [require('daisyui'), require('flowbite/plugin')],
  daisyui: {
    themes: ["cupcake"],
  },
};
