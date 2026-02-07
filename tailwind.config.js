/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Color Palette - Matching wireframe exactly
      colors: {
        primary: {
          DEFAULT: '#0D9488',      // Main teal - buttons, active states
          light: 'rgba(13, 148, 136, 0.1)',
          lighter: 'rgba(13, 148, 136, 0.05)',
          'light-15': 'rgba(13, 148, 136, 0.15)',
          'light-08': 'rgba(13, 148, 136, 0.08)',
          'light-20': 'rgba(13, 148, 136, 0.2)',
        },
        secondary: {
          DEFAULT: '#115E59',      // Darker teal - secondary buttons, links
        },
        dark: {
          DEFAULT: '#032625',       // Main dark text
          light: 'rgba(3, 38, 37, 0.7)',
          lighter: 'rgba(3, 38, 37, 0.5)',
          lightest: 'rgba(3, 38, 37, 0.3)',
          '20': 'rgba(3, 38, 37, 0.2)',
          '05': 'rgba(3, 38, 37, 0.05)',
          '03': 'rgba(3, 38, 37, 0.03)',
        },
        danger: {
          DEFAULT: '#EF4444',      // Error/delete states
          light: 'rgba(239, 68, 68, 0.1)',
          '15': 'rgba(239, 68, 68, 0.15)',
        },
        white: '#FFFFFF',
        gray: {
          placeholder: '#e0e0e0',  // Placeholder gray
        },
      },
      
      // Typography - Exact font sizes from wireframe
      fontSize: {
        'xs': ['11px', { lineHeight: '1.4' }],
        'sm': ['12px', { lineHeight: '1.5' }],
        'base': ['14px', { lineHeight: '1.5' }],
        'md': ['16px', { lineHeight: '1.5' }],
        'lg': ['18px', { lineHeight: '1.6' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.5' }],
        '3xl': ['28px', { lineHeight: '1.5' }],
        '4xl': ['32px', { lineHeight: '1.5' }],
        '5xl': ['42px', { lineHeight: '1.5' }],
      },
      
      // Spacing - Custom spacing values from wireframe
      spacing: {
        'sidebar': '250px',
        '15': '15px',
        '30': '30px',
        '40': '40px',
        '50': '50px',
        '60': '60px',
        '80': '80px',
      },
      
      // Border Radius - Exact values from wireframe
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        '10': '10px',
        '12': '12px',
      },
      
      // Font Family - System fonts from wireframe
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      
      // Box Shadow
      boxShadow: {
        'card': '0 2px 8px rgba(13, 148, 136, 0.1)',
        'modal': '0 4px 20px rgba(0, 0, 0, 0.2)',
        'error': '0 2px 8px rgba(239, 68, 68, 0.2)',
      },
      
      // Max Width
      maxWidth: {
        'screen-xl': '1440px',
        'form': '600px',
        'form-wide': '900px',
      },
    },
  },
  plugins: [],
}

