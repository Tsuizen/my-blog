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
          '.btn-light': {
            'background-color': '#BFDEF2',
            'border-color': '#BFDEF2',
            color: '#4B5563'
          },
          '.btn-light:hover': {
            'background-color': '#7FBDE6',
            'border-color': '#7FBDE6'
          },
          '.bg-light': {
            'background-color': '#BFDEF2'
          },
          '.text-tag': {
            color: '#4B5563'
          }
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#585de2',
          'base-100': '#0E141B',
          '.bg-light': {
            'background-color': '#151E25'
          },
          '.header-bottom-color': '#1E2831'
        }
      }
    ]
  }
};
