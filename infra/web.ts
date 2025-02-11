import { auth } from "./auth";

export const www = new sst.aws.SvelteKit("www", {
  path: "packages/www",
  link: [auth],
  dev: {
    url: "http://localhost:5173",
  },
});
