module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier', 'eslint-plugin-import-helpers'],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                printWidth: 120,
                tabWidth: 4,
                useTabs: false,
                semi: true,
                singleQuote: true,
                trailingComma: 'all',
                bracketSpacing: true,
                bracketSameLine: true,
                arrowParens: 'always',
                parser: 'typescript',
                proseWrap: 'always',
            },
        ],
        'import-helpers/order-imports': [
            'warn',
            {
                newlinesBetween: 'always',
                groups: [['/^fastify/'], ['module'], ['/^@//'], [('parent', 'sibling', 'index')]],
                alphabetize: {
                    order: 'asc',
                    ignoreCase: true,
                },
            },
        ],
    },
};
