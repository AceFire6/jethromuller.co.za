/**
 * Note: These settings also take into account the .editorconfig file
 *
 * @type {import('prettier').Config}
 */
module.exports = {
    tabWidth: 4,
    useTabs: false,
    printWidth: 100,
    singleQuote: true,
    endOfLine: 'lf',
    semi: true,
    plugins: [
        require.resolve('prettier-plugin-sh'),
        require.resolve('prettier-plugin-astro'),
        require.resolve('prettier-plugin-packagejson'),
        require.resolve('@ianvs/prettier-plugin-sort-imports'),
    ],
    // Empty strings denote separators
    importOrder: ['', '^src/(.*)$', '^[./]'],
    importOrderGroupNamespaceSpecifiers: true,
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: true,
    importOrderBuiltinModulesToTop: true,
    overrides: [
        {
            files: '*.ts',
            options: {
                importOrderParserPlugins: ['typescript'],
            },
        },
        {
            files: '*.json',
            options: {
                tabWidth: 2,
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
