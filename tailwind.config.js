/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#1A5276',
        accent:    '#2E86C1',
        teal:      '#1ABC9C',
        'bg-light':'#D6EAF8',
        text:      '#2C3E50',
        muted:     '#7F8C8D',
        success:   '#27AE60',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
