module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  },
  rules: { 'no-console': ['warn', { allow: ['warn', 'error'] }], 'import/no-unresolved': 'off', },
}