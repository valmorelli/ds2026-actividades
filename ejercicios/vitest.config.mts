import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests",
      DATABASE_URL: "postgresql://usuario:pass@localhost:5432/libreria_test"
    },
  },
});