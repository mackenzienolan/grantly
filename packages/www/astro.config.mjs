// @ts-check
import react from "@astrojs/react";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import aws from "astro-sst";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    clerk(),
    icon({
      include: {
        lucide: ["*"], // (Default) Loads entire Material Design Icon set
      },
    }),
  ],
  output: "server",
  adapter: aws(),
  vite: {
    plugins: [tailwindcss()],
  },
});
