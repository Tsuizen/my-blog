module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  corePlugins: {
    preflight: false
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          '.btn-light': '#a2e9f2'
        }
      }
    ]
  }
};
