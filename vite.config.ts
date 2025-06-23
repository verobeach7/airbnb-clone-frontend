import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // localhost가 아닌 내가 지정한 Domain을 사용할 수 있게 함
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
