import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Unocss from 'unocss/vite';
import { presetScalpel } from 'unocss-preset-scalpel';
import presetAttributify from '@unocss/preset-attributify';


export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [
        presetAttributify(),
        presetScalpel(),
      ],
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
