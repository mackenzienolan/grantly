// @ts-check
import react from "@astrojs/react";
import aws from "astro-sst";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: aws(),
  vite: {
    plugins: [tailwindcss()],
  },
});
