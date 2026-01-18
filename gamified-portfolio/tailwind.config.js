/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Game Palette
                'game-bg': '#30362f',      // Deep Moss/Charcoal
                'game-secondary': '#625834', // Olive
                'game-primary': '#a59132',   // Gold
                'game-text': '#fffbdb',      // Cream
                'game-accent': '#da7422',    // Orange

                // Mapped for backwards compatibility/semantics
                primary: {
                    DEFAULT: '#a59132',
                    500: '#a59132',
                    600: '#8a7a2a', // Darker gold
                    400: '#c2ab3b', // Lighter gold
                },
                accent: {
                    DEFAULT: '#da7422',
                    500: '#da7422',
                    400: '#e68a35',
                },
                dark: {
                    950: '#30362f', // Main bg
                    900: '#2a2f29',
                    800: '#625834', // Secondary bg use
                    300: '#fffbdb', // Main text
                    200: '#e8e4c9',
                    100: '#dce0d9',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'slide-left': 'slideLeft 0.5s ease-out',
                'slide-right': 'slideRight 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'glow': 'glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideRight: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
