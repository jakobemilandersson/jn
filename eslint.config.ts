import type { ESLint } from "eslint";

import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import prettier from "eslint-config-prettier";

export default [
    /* ---------------------------------- */
    /* 1️⃣ Type-aware linting (src only)   */
    /* ---------------------------------- */
    {
        files: ["src/**/*.{ts,tsx}"],

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

        settings: {
            "import/resolver": {
                typescript: {
                    project: "./tsconfig.json",
                },
            },

            "boundaries/elements": [
                { type: "app", pattern: "src/app/*" },
                { type: "pages", pattern: "src/pages/*" },
                { type: "widgets", pattern: "src/widgets/*" },
                { type: "features", pattern: "src/features/*" },
                { type: "entities", pattern: "src/entities/*" },
                { type: "shared", pattern: "src/shared/*" },
            ],
        },

        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/consistent-type-imports": "error",

            "import/no-relative-parent-imports": "error",
            "import/no-unresolved": "error",

            "boundaries/element-types": [
                "error",
                {
                    default: "disallow",
                    rules: [
                        { from: "app", allow: ["pages"] },
                        { from: "pages", allow: ["widgets", "features", "entities", "shared"] },
                        { from: "widgets", allow: ["features", "entities", "shared"] },
                        { from: "features", allow: ["entities", "shared"] },
                        { from: "entities", allow: ["shared"] },
                        { from: "shared", allow: ["shared"] },
                    ],
                },
            ],

            "import/no-internal-modules": [
                "error",
                {
                    allow: [
                        "@app/**",
                        "@pages/**",
                        "@widgets/*",
                        "@features/*",
                        "@entities/*",
                        "@shared/*",
                    ],
                },
            ],
        },
    },

    /* ---------------------------------- */
    /* 2️⃣ Tooling & config files (no TS) */
    /* ---------------------------------- */
    {
        files: ["*.ts", "*.config.ts", "setupTests.ts"],
        languageOptions: {
            parser: tsParser,
        },
    },

    /* ---------------------------------- */
    /* 3️⃣ Prettier                       */
    /* ---------------------------------- */
    prettier,
];
