import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { '@stylistic/js': stylisticJs },
    rules: {
      '@stylistic/js/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
      '@stylistic/js/lines-between-class-members': [
        'error',
        { enforce: [{ blankLine: 'always', prev: 'method', next: 'method' }] }
      ],
      '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/js/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
      '@stylistic/js/rest-spread-spacing': ['error', 'never'],
      '@stylistic/js/semi-style': ['error', 'last'],
      '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/dot-location': ['error', 'property'],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/comma-style': ['error', 'last'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/arrow-parens': ['error', 'always'],
      '@stylistic/js/block-spacing': ['error', 'always'],
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/max-len': [
        'error',
        {
          code: 120,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignorePattern: '^\\s*(export\\s+abstract\\s+class\\s+.*|import\\s.+\\sfrom\\s.+;)$',
          ignoreRegExpLiterals: true
        }
      ],
      '@stylistic/js/quotes': ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
      'no-this-before-super': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ],
      'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: true }],
      // '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      // '@typescript-eslint/no-unused-expressions': [
      //   'error',
      //   {
      //     allowShortCircuit: true,
      //     allowTernary: true,
      //   },
      // ],
      // // '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
      // '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      // "no-console": "warn",
    }
  },
  {
    ignores: [
      '**/node_modules/',
      '**/allure-report/',
      '**/allure-results/',
      '**/logStep.ts',
      '**/playwright-report/',
      'src/utils/eslint'
    ]
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  } 
];
