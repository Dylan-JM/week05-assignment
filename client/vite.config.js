import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        findevents: resolve(__dirname, "findevents/index.html"),
        createevents: resolve(__dirname, "createevents/index.html"),
        displayevent: resolve(__dirname, "displayevent/index.html"),
      },
    },
  },
});
