import type { ESLint } from "eslint";

import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import prettier from "eslint-config-prettier";

export default [
    {
        files: ["**/*.{ts,tsx}"],

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module",
            },
        },

        plugins: {
            "@typescript-eslint": tseslint as unknown as ESLint.Plugin,
            import: importPlugin as unknown as ESLint.Plugin,
            boundaries: boundaries as unknown as ESLint.Plugin,
        },

        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
        },
    },

    prettier,
];
