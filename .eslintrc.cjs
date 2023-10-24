/* module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
} */

module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended', 'plugin:storybook/recommended', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
  rules: { 'no-console': ['warn', { allow: ['warn', 'error'] }] },
}

/* module.exports = {
  extends: '@it-incubator/eslint-config',
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'], // Define your module alias(es) and their corresponding paths
          // Add more aliases if needed
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}; */