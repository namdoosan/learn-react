
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet warna pink yang lebih lengkap
        pink: {
          50: '#FFF0F5',   // Lavender Blush (sangat muda)
          100: '#FFE4E1',  // Misty Rose
          200: '#FFC0CB',  // Pink
          300: '#FFB6C1',  // Light Pink (Anda sudah punya ini sebagai light)
          400: '#FF69B4',  // Hot Pink (Anda sudah punya ini sebagai DEFAULT)
          500: '#FF1493',  // Deep Pink (Anda sudah punya ini sebagai dark)
          600: '#E00078',  // Sedikit lebih gelap
          700: '#C00060',  // Lebih gelap lagi
          800: '#A00048',
          900: '#800030',
        },
        purple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE', // Untuk gradien yang lebih halus
          // ... bisa tambahkan shades purple lainnya jika diperlukan
        }
      },
      // Menambahkan definisi animasi dan keyframes
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        sparkle: 'sparkle 1.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite', // Jika Anda menggunakan ini
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Jika Anda menggunakan ini
        'bounce': 'bounce 1s infinite', // Jika Anda menggunakan ini
      },
    },
  },
  plugins: [],
}