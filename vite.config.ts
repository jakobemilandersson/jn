import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import pkg from './package.json'

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  // Production uses '/' (custom domain jakob.now).
  // PR preview builds set VITE_BASE_PATH=/jn/pull/<pr-number>/ so that
  // all asset URLs resolve correctly under the gh-pages subdirectory.
  base: process.env.VITE_BASE_PATH ?? '/',
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@features": path.resolve(__dirname, "src/features"),
      "@entities": path.resolve(__dirname, "src/entities"),
      "@shared": path.resolve(__dirname, "src/shared")
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.test.{ts,tsx}',
        'src/**/index.ts',
        'src/main.tsx',
        'src/app/**',
        'src/pages/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  }
})
