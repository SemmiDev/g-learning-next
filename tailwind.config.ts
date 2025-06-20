import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}', // must use this line to compile and generate our RizzUI components style
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px', // only need to control product grid mode in ultra 4k device
    },
    extend: {
      colors: {
        gray: {
          0: 'rgb(var(--gray-0) / <alpha-value>)',
          50: 'rgb(var(--gray-50) / <alpha-value>)',
          100: 'rgb(var(--gray-100) / <alpha-value>)',
          200: 'rgb(var(--gray-200) / <alpha-value>)',
          300: 'rgb(var(--gray-300) / <alpha-value>)',
          400: 'rgb(var(--gray-400) / <alpha-value>)',
          500: 'rgb(var(--gray-500) / <alpha-value>)',
          600: 'rgb(var(--gray-600) / <alpha-value>)',
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
          900: 'rgb(var(--gray-900) / <alpha-value>)',
          lighter: 'rgb(var(--gray-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--gray-default) / <alpha-value>)',
          dark: 'rgb(var(--gray-dark) / <alpha-value>)',
        },
        blue: {
          0: 'rgb(var(--blue-0) / <alpha-value>)',
          50: 'rgb(var(--blue-50) / <alpha-value>)',
          100: 'rgb(var(--blue-100) / <alpha-value>)',
          200: 'rgb(var(--blue-200) / <alpha-value>)',
          300: 'rgb(var(--blue-300) / <alpha-value>)',
          400: 'rgb(var(--blue-400) / <alpha-value>)',
          500: 'rgb(var(--blue-500) / <alpha-value>)',
          600: 'rgb(var(--blue-600) / <alpha-value>)',
          700: 'rgb(var(--blue-700) / <alpha-value>)',
          800: 'rgb(var(--blue-800) / <alpha-value>)',
          900: 'rgb(var(--blue-900) / <alpha-value>)',

          // required by rizzui
          lighter: 'rgb(var(--info-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--info-default) / <alpha-value>)',
          dark: 'rgb(var(--info-dark) / <alpha-value>)',
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        primary: {
          lighter: 'rgb(var(--primary-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--primary-default) / <alpha-value>)',
          dark: 'rgb(var(--primary-dark) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          lighter: 'rgb(var(--secondary-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--secondary-default) / <alpha-value>)',
          dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },
        danger: {
          lighter: 'rgb(var(--danger-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--danger-default) / <alpha-value>)',
          dark: 'rgb(var(--danger-dark) / <alpha-value>)',
        },
        warning: {
          lighter: 'rgb(var(--warning-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--warning-default) / <alpha-value>)',
          dark: 'rgb(var(--warning-dark) / <alpha-value>)',
        },
        info: {
          lighter: 'rgb(var(--info-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--info-default) / <alpha-value>)',
          dark: 'rgb(var(--info-dark) / <alpha-value>)',
        },
        success: {
          lighter: 'rgb(var(--success-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--success-default) / <alpha-value>)',
          dark: 'rgb(var(--success-dark) / <alpha-value>)',
        },

        // required by rizzui
        red: {
          lighter: 'rgb(var(--danger-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--danger-default) / <alpha-value>)',
          dark: 'rgb(var(--danger-dark) / <alpha-value>)',
        },
        orange: {
          lighter: 'rgb(var(--warning-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--warning-default) / <alpha-value>)',
          dark: 'rgb(var(--warning-dark) / <alpha-value>)',
        },
        green: {
          lighter: 'rgb(var(--success-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--success-default) / <alpha-value>)',
          dark: 'rgb(var(--success-dark) / <alpha-value>)',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        lexend: ['var(--font-lexend)'],
      },
      fontSize: {
        '2xs': ['.625rem', '.75rem'],
        '1.5xl': ['1.375rem', '1.875rem'],
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      flex: {
        '2': '2 2 0%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      // required this to prevent any style on readOnly input elements
      addVariant('not-read-only', '&:not(:read-only)')
    }),
  ],
}
export default config
