// @ts-check

const extendedConfigs = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:you-dont-need-lodash-underscore/compatible',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    // The prettier config should always be last because
    // it needs to override other rules
    'prettier',
];

// You can run in diff mode locally by running `LINT_DIFF=true pnpm eslint <path>`
// It also automatically runs in CI
if (!!process.env['CI'] || !!process.env['LINT_DIFF']) {
    extendedConfigs.unshift('plugin:diff/diff');
}

const namingConventionDefaults = [
    'error',
    // The base of this is the default configuration
    // The default naming convention can be found here:
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md#options
    {
        selector: 'default',
        format: ['strictCamelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
    },

    {
        selector: 'variable',
        format: ['strictCamelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
    },

    {
        selector: 'typeParameter',
        format: ['PascalCase'],
    },

    {
        // Types should be PascalCase
        selector: ['typeAlias', 'typeLike'],
        format: ['StrictPascalCase'],
    },
    // Ignore properties that require quotes
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md#ignore-properties-that-require-quotes
    {
        selector: [
            'classProperty',
            'objectLiteralProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
        ],
        modifiers: ['requiresQuotes'],
        format: null,
    },
    {
        selector: 'variable',
        modifiers: ['destructured'],
        format: ['PascalCase', 'camelCase'],
    },
];
/**
 * ts eslint config is included in this
 * @type {import('@typescript-eslint/utils/dist/ts-eslint').Linter.Config}
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'import'],
    extends: extendedConfigs,
    settings: {
        'import/core-modules': ['astro:content', 'astro:assets', 'astro:transitions'],
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: 'tsconfig.eslint.json',
            },
            node: true,
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
        extraFileExtensions: ['.astro'],
        project: './tsconfig.eslint.json',
    },
    reportUnusedDisableDirectives: true,
    root: true,
    rules: {
        // See here for why these are off: https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#the-indent--typescript-eslintindent-rules
        // They're managed by prettier
        indent: 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/semi': 'off',
        // See here: https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-import
        'import/named': ['off'],
        'import/namespace': ['off'],
        'import/default': ['off'],
        'import/no-named-as-default-member': ['off'],
        // See here: https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#importextensions
        'import/extensions': [
            'off',
            'never',
            {
                protocol: 'always',
                json: 'always',
            },
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowedNames: ['getStaticPaths'],
            },
        ],
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        // This is enabled because we want to use this tsconfig rule: https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/dot-notation.md#allowindexsignaturepropertyaccess
        '@typescript-eslint/dot-notation': ['error', { allowIndexSignaturePropertyAccess: true }],
        '@typescript-eslint/naming-convention': namingConventionDefaults,
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'allow-as-parameter',
            },
        ],
        '@typescript-eslint/no-non-null-assertion': ['error'],
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/no-invalid-void-type': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        // See here: https://typescript-eslint.io/rules/no-empty-function#how-to-use
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/no-explicit-any': ['error'],
        '@typescript-eslint/ban-ts-comment': [
            'error',
            {
                'ts-expect-error': { descriptionFormat: '^: TS\\d+ because .+$' },
                'ts-nocheck': 'allow-with-description',
            },
        ],
        'no-case-declarations': ['off'],
        'no-void': [
            'error',
            {
                allowAsStatement: true,
            },
        ],
        '@typescript-eslint/no-meaningless-void-operator': ['error', { checkNever: true }],
        // Article on why we should do this is here:
        // https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
        '@typescript-eslint/consistent-type-exports': ['error'],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { fixStyle: 'separate-type-imports' },
        ],
        '@typescript-eslint/no-import-type-side-effects': ['error'],
        '@typescript-eslint/non-nullable-type-assertion-style': 'off',
        // Ignore external to make this faster
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md#ignoreexternal
        'import/no-cycle': ['error', { ignoreExternal: true }],
        'import/no-self-import': ['error'],
        'import/no-named-as-default': ['error'],
        'import/no-useless-path-segments': ['error'],
        // We want to move towards only using async/await
        'promise/prefer-await-to-then': ['error'],
        // This is important for errors to be correct
        // See: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/custom-error-definition.md
        'unicorn/custom-error-definition': ['error'],
        // Complicated ternaries can be hard to visually parse
        'unicorn/prefer-ternary': ['error', 'only-single-line'],
        // Additional project rules for the abbreviations rule
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    props: false,
                    params: false,
                },
            },
        ],
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    kebabCase: true,
                    pascalCase: true,
                },
            },
        ],
        'unicorn/prefer-module': 'off',
        // Unicorn rules that go too hard
        'unicorn/no-null': 'off',
        'unicorn/prefer-top-level-await': 'off',
        // This rule is good in theory, but it contradicts eslint's consistent-returns
        // and typescripts own value return checks
        'unicorn/no-useless-undefined': 'off',
        // Seems to cause false positives
        'astro/jsx-a11y/label-has-associated-control': 'off',
    },
    overrides: [
        {
            // Define the configuration for `.astro` file.
            files: ['*.astro'],
            // Allows Astro components to be parsed.
            parser: 'astro-eslint-parser',
            // Parse the script in `.astro` as TypeScript by adding the following configuration.
            // It's the setting you need when using TypeScript.
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
            rules: {
                '@typescript-eslint/naming-convention': [
                    ...namingConventionDefaults,
                    {
                        selector: 'import',
                        format: ['strictCamelCase', 'StrictPascalCase'],
                    },
                ],
                '@typescript-eslint/consistent-type-definitions': 'off',
            },
        },
        {
            files: ['*.d.ts'],
            rules: {
                '@typescript-eslint/triple-slash-reference': 'off',
                'unicorn/prevent-abbreviations': 'off',
            },
        },
        {
            files: ['./src/pages/**'],
            rules: {
                '@typescript-eslint/naming-convention': [
                    ...namingConventionDefaults,
                    {
                        selector: 'function',
                        format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
                    },
                    {
                        selector: 'import',
                        format: ['strictCamelCase', 'StrictPascalCase'],
                    },
                ],
            },
        },
    ],
};
