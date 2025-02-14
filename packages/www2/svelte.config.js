import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "svelte-kit-sst";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: true,
  },
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    // ... other config
  },
};

export default config;
