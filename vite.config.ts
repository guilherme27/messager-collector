import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['**/node_modules/**', '**/dist/**'],
        includeSource: ['src/**/*.spec.ts'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
