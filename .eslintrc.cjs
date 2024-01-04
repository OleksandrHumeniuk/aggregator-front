/**
 * ESLint configuration:
 * http://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'no-useless-catch': 'off',
    'prettier/prettier': ['error'],
  },
};
