// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"));
module.exports = {
    extends: ["universe", "prettier", "plugin:@typescript-eslint/recommended"],
    plugins: ["prettier", "@typescript-eslint", "unused-imports"],
    rules: {
        "prettier/prettier": ["warn", prettierOptions],
        "@typescript-eslint/no-explicit-any": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": [
            "warn",
            { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
        ],
        "import/order": [
            "warn",
            {
                groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"], "object", "type"],
                "newlines-between": "always",
                alphabetize: {
                    order: "asc",
                },
                pathGroups: [
                    {
                        pattern: "./**/*.less",
                        group: "object",
                    },
                    {
                        pattern: "**/*.less",
                        group: "object",
                    },
                    {
                        pattern: "./**/*.{jpg,jpeg,png,gif,svg,ico}",
                        group: "type",
                    },
                    {
                        pattern: "**/*.{jpg,jpeg,png,gif,svg,ico}",
                        group: "type",
                    },
                ],
            },
        ],
    },
    overrides: [
        {
            files: ["**/*.ts?(x)"],
            rules: { "prettier/prettier": ["warn", prettierOptions] },
        },
    ],
    settings: {
        react: {
            version: "17.0.1",
        },
    },
};
