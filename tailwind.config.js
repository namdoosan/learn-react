module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Blue Palette
        blue: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3', // Default blue
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
          950: '#0A3B8A', // Darker for deep backgrounds
        },
        // Complementary Accent Color (e.g., Orange/Amber)
        orange: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800', // Default orange
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        // You can add a subtle gray palette for text and borders
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        indigo: { // For darker gradient shades
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3', // Deep indigo for backgrounds
          900: '#312E81',
        },
        cyan: { // For subtle accent
          700: '#0891B2',
        },
        green: { // Added for the dashboard card example
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        purple: { // Added for the dashboard card example
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
        }
      },
      // Adding new animations for a dynamic, modern feel
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
      },
      animation: {
        blob: 'blob 7s infinite cubic-bezier(0.64, 0.04, 0.29, 0.98)',
        'animation-delay-2000': 'animation-delay: 2s;',
        'animation-delay-4000': 'animation-delay: 4s;',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure 'Inter' is imported in your global CSS
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}