import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				denz: {
					blue: '#4D8AF0',          // TeamGantt huvudblå
					'dark-blue': '#3A78DE',   // Mörkare blå för hover
					'deep-blue': '#2B68CD',
					light: '#F5F7FA',         // Ljus bakgrund
					lighter: '#FFFFFF',       // Vit bakgrund
					dark: '#354052',          // Huvudtextfärg
					darker: '#2A3141',
					darkest: '#242A38',
					'card-bg': '#FFFFFF',     // Kortbakgrund
					'success': '#66CB9F',     // TeamGantt-grön
					'warning': '#FFCF5C',     // TeamGantt-gul
					'danger': '#F36D6D',      // TeamGantt-röd
					'info': '#4D8AF0',        // TeamGantt-blå
					'purple': '#9F7AEA',      // TeamGantt-lila
					'teal': '#38B2AC',        // TeamGantt-turkos
					'text': {
						primary: '#354052',   // TeamGantt huvudtextfärg
						secondary: '#8A94A6', // TeamGantt sekundär textfärg
					},
					'border': '#E6EAF0',      // TeamGantt kanttfärg
					'gray': {
						50: '#F9FAFC',
						100: '#F5F7FA',
						200: '#E6EAF0',
						300: '#D3DCE6',
						400: '#C0CCDA',
						500: '#8A94A6',
						600: '#606F7B',
						700: '#3C4858',
						800: '#354052',
						900: '#242A38',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				shimmer: {
					'100%': {
						transform: 'translateX(100%)',
					},
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				fadeIn: 'fadeIn 0.5s ease-in-out forwards',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				shimmer: 'shimmer 2s infinite',
			},
			boxShadow: {
				'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				'none': 'none',
				'card': '0 2px 5px rgba(0, 0, 0, 0.05)',
				'card-hover': '0 4px 8px rgba(0, 0, 0, 0.08)',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						color: '#E9ECEF',
						a: {
							color: '#4C6EF5',
							'&:hover': {
								color: '#3B5FE6',
							},
						},
						h1: {
							fontSize: '24px',
							fontWeight: 600,
							lineHeight: 1.4,
						},
						h2: {
							fontSize: '20px',
							fontWeight: 600,
							lineHeight: 1.4,
						},
						h3: {
							fontSize: '18px',
							fontWeight: 500,
							lineHeight: 1.4,
						},
						h4: {
							fontSize: '16px',
							fontWeight: 600,
							lineHeight: 1.4,
						},
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
