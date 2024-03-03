// @ts-check
/**
 * Note: These settings also take into account the .editorconfig file
 */

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
export default {
    printWidth: 100,
    singleQuote: true,
    endOfLine: 'lf',
    semi: true,
    plugins: [
        import.meta.resolve('prettier-plugin-packagejson'),
        import.meta.resolve('@ianvs/prettier-plugin-sort-imports'),
        import.meta.resolve('prettier-plugin-astro'),
    ],
    htmlWhitespaceSensitivity: 'strict',
    importOrder: [
        '<BUILTIN_MODULES>', // built-in modules
        '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
        '', // newline separator
        '^@(.*)/(.*)$',
        '',
        '^__tests__/(.*)$',
        '^src/(.*)$',
        '^[./]', // relative imports
    ],
    importOrderTypeScriptVersion: '5.3.3',
    overrides: [
        {
            files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
            options: {
                importOrderParserPlugins: ['typescript'],
            },
        },
        {
            files: ['*.js', '*.mjs', '*.cjs', '*.jsx'],
            options: {
                tabWidth: 4,
            },
        },
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
};
