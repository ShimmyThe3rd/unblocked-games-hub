module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(96, 165, 250, 0.25), 0 20px 50px rgba(15, 23, 42, 0.75)'
      },
      colors: {
        night: '#020817',
        panel: '#0f172a',
        panelSoft: '#111827',
        accent: '#22c55e',
        neon: '#38bdf8'
      }
    }
  },
  plugins: []
};
