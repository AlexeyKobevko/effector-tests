module.exports = {
  mode: 'jit',
  content: ['index.html', 'src/**/*.tsx', 'src/**/*.ts', 'src/pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
      },
      screens: {
        'm-xs': '320px',
        'm-sm': '360px',
        'm-md': '480px',
        'm-lg': '600px',
        'm-xlg': '640px',
        't-sm': '768px',
        't-md': '992px',
        't-lg': '1024px',
        'd-xs': '1200px',
        'd-sm': '1280px',
        'd-md': '1368px',
        'd-lg': '1440px',
        'd-xlg': '1536px',
      },
      zIndex: {
        1: 1,
        100: 100,
        1000: 1000,
      },
    },
  },
  variants: {
    extend: {
      scrollbar: ['rounded'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
  corePlugins: {
    preflight: false,
    float: false,
    animation: false,
    container: false,
    boxShadowColor: false,
    backgroundOpacity: false,
    textOpacity: false,
    borderOpacity: false,
  },
};
