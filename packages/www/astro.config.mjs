// @ts-check
import react from "@astrojs/react";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";
import aws from "astro-sst";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), clerk()],
  output: "server",
  adapter: aws(),
  vite: {
    plugins: [tailwindcss()],
  },
});
