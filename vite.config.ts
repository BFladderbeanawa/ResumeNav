import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    ignorePatterns: [".next/**", ".agents/**", "node_modules/**", "next-env.d.ts"],
  },
  lint: {
    ignorePatterns: [".next/**", ".agents/**", "node_modules/**", "next-env.d.ts"],
    plugins: ["react", "nextjs", "jsx-a11y", "import", "vitest"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    passWithNoTests: true,
  },
});
