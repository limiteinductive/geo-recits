import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { presetScalpel } from "unocss-preset-scalpel";
import presetAttributify from "@unocss/preset-attributify";
import { presetIcons } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetUno from "@unocss/preset-uno";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [
        presetScrollbar({ numberToUnit: (value) => `${value}px` }),
        presetAttributify(),
        presetScalpel(),
        presetIcons(),
        presetUno(),
        presetWebFonts({
          provider: "google",
          fonts: {
            sans: "Poppins",
            mono: ["Fira Code", "Fira Mono:400,700"],
            lobster: "Lobster",
          },
        }),
      ],
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  optimizeDeps: { include: ["mapbox-gl"] },
});
