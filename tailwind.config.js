/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        background: '#F9FAFB',
        border: '#E5E7EB',
        navy: '#0F172A',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        heading: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        subheading: ['16px', { lineHeight: '24px', fontWeight: '600' }],
        body: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        small: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
