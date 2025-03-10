
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
				sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
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
					blue: '#4C6EF5',
					'dark-blue': '#3B5FE6',
					'deep-blue': '#2A4ED8',
					dark: '#2A2F36',
					darker: '#1B1F24',
					darkest: '#1B1F24',
					'card-bg': '#2A2F36',
					'success': '#2ECC71',
					'warning': '#F9C74F',
					'danger': '#E63946',
					'info': '#4C6EF5',
					'purple': '#8B5CF6',
					'teal': '#14B8A6',
					'text': {
						primary: '#E9ECEF',
						secondary: '#8A8F98',
					},
					'gray': {
						50: '#F8F9FA',
						100: '#E9ECEF',
						200: '#DEE2E6',
						300: '#CED4DA',
						400: '#ADB5BD',
						500: '#8A8F98',
						600: '#6C757D',
						700: '#495057',
						800: '#343A40',
						900: '#212529',
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
				'glow': '0 0 5px rgba(76, 110, 245, 0.5)',
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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
