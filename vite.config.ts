import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// @ts-ignore
import svgrPlugin from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';
import babel from 'vite-babel-plugin';

const isProd = process.env.NODE_ENV === 'production';
const assetsDir = 'landings/assets';

export default defineConfig({
  plugins: [
    react(),
    babel(),
    tsconfigPaths(),
    svgrPlugin(),
    legacy({
      targets: ['defaults'],
      modernPolyfills: ['es.global-this', 'es.array.flat-map'],
    }),
  ],
  server: { hmr: { overlay: false } },
  build: {
    assetsInlineLimit: 0,
    terserOptions: {
      format: {
        comments: false,
      },
    },
    assetsDir: assetsDir,
    minify: isProd ? 'terser' : false,
    rollupOptions: {
      output: {
        assetFileNames: (file) => {
          if (file.name?.endsWith('.css')) {
            return `${assetsDir}/[name]-[hash].min.css`;
          } else {
            return `${assetsDir}/[name].[hash].[ext]`;
          }
        },
      },
      plugins: [visualizer({ open: false, template: 'network' })],
    },
  },
});
