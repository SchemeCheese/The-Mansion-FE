import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '@gilbarbara/eslint-config';
import jest from '@gilbarbara/eslint-config/jest';
import testingLibrary from '@gilbarbara/eslint-config/testing-library';
import cypress from 'eslint-plugin-cypress';
import globals from 'globals';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default [
  ...config,
  ...jest,
  ...testingLibrary,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        fetch: 'readonly',
        ga: 'readonly',
        APP__BRANCH: 'readonly',
        APP__BUILD_DATE: 'readonly',
        APP__GITHASH: 'readonly',
        APP__VERSION: 'readonly',
      },
    },
    settings: {
      'import-x/resolver': {
        node: {},
        typescript: true,
      },
    },
    rules: {
      camelcase: 'warn',
      'import-x/no-cycle': 'off',
      'import-x/no-duplicates': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-relative-packages': 'off',
      'import-x/no-self-import': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/no-useless-path-segments': 'off',
      'import-x/export': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'perfectionist/sort-imports': 'off',
      'prettier/prettier': 'off',
      'react/jsx-closing-tag-location': 'off',
      'react/no-object-type-as-default-prop': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unstable-nested-components': 'warn',
      'react/state-in-constructor': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  {
    files: ['test/**/*.ts?(x)'],
    languageOptions: {
      globals: {
        jsdom: 'readonly',
        navigate: 'readonly',
        renderWithRedux: 'readonly',
      },
      parserOptions: {
        project: './test/tsconfig.json',
        tsconfigRootDir: rootDir,
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'react/function-component-definition': 'off',
    },
  },
  {
    files: ['config/**/*', 'tools/**/*'],
    rules: {
      'no-console': 'off',
      'import/no-dynamic-require': 'off',
      'import-x/no-dynamic-require': 'off',
    },
  },
  {
    files: ['cypress/**/*.{js,jsx,ts,tsx}', '**/*.cy.{js,jsx,ts,tsx}'],
    ...cypress.configs.recommended,
  },
];
