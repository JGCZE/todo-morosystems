import js from '@eslint/js'
import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import {defineConfig, globalIgnores} from 'eslint/config'
import perfectionist from "eslint-plugin-perfectionist"
import react from "eslint-plugin-react"

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      perfectionist,
      react
    },
    rules: {
      // Perfectionist
      'perfectionist/sort-jsx-props': ['warn', {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      }],
      'perfectionist/sort-imports': ['warn', {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
        groups: [
          'side-effect',
          'builtin',
          ['external', 'type'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        newlinesBetween: 0,
      }],
      'perfectionist/sort-objects': ['warn', {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      }],
      'perfectionist/sort-interfaces': ['warn', {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      }],
      'perfectionist/sort-enums': ['warn', {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      }],
      'perfectionist/sort-named-imports': ['warn', {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      }],
      // eslint
      '@typescript-eslint/consistent-type-imports': ['warn', {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      }],
      'no-console': ['warn', {
        allow: ['warn', 'error'],
      }],
      'eqeqeq': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'react/no-danger': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-string-refs': 'error',
      'no-script-url': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-void': 'error',
      'no-constructor-return': 'error',
    },
  },
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
])
