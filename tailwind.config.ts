import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/layout/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				'3xl': '1900px',
			},
			zIndex: {
				searchPanel: '5',

				header: '10',

				//aside
				aside: '20',

				contextAside: '25',

				modalOverlay: '15',
				modal: '30',

				ss_theme: '100',

				// footer
				footer: '10',
			},
			height: {
				'screen-2': 'calc(100vh - (theme("spacing.headerP")))',
				'304': '304px',
				'442': '442px',
				'440': '440px',
			},
			minHeight: {
				'screen-2': 'calc(100vh - (theme("spacing.headerP")))',
			},
			spacing: {
				header: '80px',
				headerP: 'calc(80px + 20px + 20px)',
			},
			colors: {
				green: {
					50: '#F0FDF4',
					100: '#DCFCE7',
					200: '#BBF7D0',
					300: '#86EFAC',
					400: '#4ADE80',
					500: '#00E599',
					600: '#16A34A',
					700: '#15803D',
					800: '#00B85B',
					900: '#14532D',
				},
				ablue: {
					50: '#EDE7FF',
					100: '#D0C4FE',
					200: '#AE9CFE',
					300: '#8973FF',
					400: '#02a8fb',
					500: '#11265E',
					600: '#2f86f8',
					700: '#0028F0',
					800: '#0022EB',
					900: '#0016E6',
					1000: '#3334FF',
				},
				agrey: {
					50: '#898D8F',
					100: '#DBE6E7',
					200: '#F0F5F6',
					300: '#dfe5e8',
					400: '#BBBAD2',
					500: '#313536',
					600: '#737289',
					700: '#5F5F74',
					800: '#3F4054',
					900: '#001648',
				},
				ared: {
					50: '#FFEBEF',
					100: '#FFCDD3',
					200: '#F39B9B',
					300: '#EB7375',
					400: '#F65251',
					500: '#FA3F0B',
					600: '#ED3636',
					700: '#DB2C30',
					800: '#CE2429',
					900: '#BF151C',
				},
				ghostly_grey: {
					50: '#F2F3F7',
					100: '#DEE2EA',
					200: '#C9CFDB',
					300: '#B2BACB',
					400: '#A0A9BD',
					500: '#8E99B0',
					600: '#7E899E',
					700: '#6B7485',
					800: '#5A616E',
					900: '#464B55',
				},
				dark: {
					50: '#97a0a9',
					100: '#5c6975',
					200: '#4D5763',
					300: '#464B50',
					400: '#2e3035',
					500: '#35373c',
					600: '#151516',
					700: '#27282d',
					800: '#191f2f',
					900: '#111516',
				},
				light: {
					50: '#edeef1',
					100: '#f7f9fb',
					200: '#eff6ff',
					300: '#d1d5db',
					400: '#f3f4f6',
					500: '#e5e7eb',
					600: '#9a9ca0',
					700: '#f1f3f5',
					800: '#ffffff',
					900: '#f9fafb',
				},
				abrandc: {
					dark: {
						black: '#12172c',
						blackish: '#0C0D21',
						grey: '#1E1F31',
						blue: '#3334FF',
						red: '#F65251',
						green: '#00F696',
						iaddedthisblack: '#18181A',
						bghoverblack: '#2E3035', //i added this
					},
					light: {
						grey: '#F9F8FF',
						blue: '#3334FF',
						red: '#FC4137',
						green: '#009545',
						dark_grey: '#1E1F31',
					},
					white: '#FFFFFF',
				},
			},
			animation: {
				fadeIn: 'fadeIn 200ms ease-in-out',
				fadeOut: 'fadeOut 200ms ease-in-out forwards',
			},

			keyframes: () => ({
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '100%' },
				},
				fadeOut: {
					'0%': { opacity: '100%' },
					'100%': { opacity: '0%' },
				},
			}),
			fontFamily: {
				inter: ['Inter'],
			},
			boxShadow: {
				'3xl': '8px 8px 56px 0px rgba(174, 174, 192, 0.16)', // Custom boxShadow
			},
			borderRadius: {
				'32': '32px',
			},
			width: {
				'476': '476px',
				'327': '327px',
				'396': '396px',
			},
			padding: {
				custom: 'var(--8, 8px) var(--24, 24px)',
			},
		},
	},
	plugins: [
		function ({ addComponents }) {
			const newContainer = {
				'.container-2': {
					maxWidth: '100%',
					paddingLeft: '24px',
					paddingRight: '24px',

					// '@screen sm': {
					// 	maxWidth: '640px',
					// },
					// '@screen md': {
					// 	maxWidth: '704px',
					// },
					'@screen lg': /* 1024px */ {
						paddingLeft: '50px',
						paddingRight: '50px',
						paddingTop: '40px',
						paddingBottom: '40px',
					},
					// '@screen xl': /* 1280px */ {
					// 	maxWidth: '1100px',
					// },

					// '@screen 2xl': /* 1536px */ {
					// 	paddingLeft: '50px',
					// 	paddingRight: '50px',
					// 	paddingTop: '40px',
					// 	paddingBottom: '40px',
					// },
				},

				'.subcontainer': {
					display: 'flex',

					// add gap starting from lg
					'@screen lg': {
						gap: 'var(--gap, 50px)',
					},
				},

				// 'h-screen-2': 'calc(100vh - (theme('spacing.header') + theme('spacing.lay_top_offset')))'
			};

			addComponents(newContainer);
		},
	],
};
export default config;
