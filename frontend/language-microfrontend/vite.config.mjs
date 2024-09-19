import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

// Define configuration
export default defineConfig({
  plugins: [
    federation({
      name: "host-app",
      remotes: {
        remote_app: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
});
