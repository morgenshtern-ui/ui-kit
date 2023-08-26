require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['@teleskop-labs/eslint-config-vue', 'plugin:storybook/recommended'],
  rules: {
    'vue/no-unused-vars': 'error',
  },
}
