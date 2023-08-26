module.exports = {
  extends: ['@teleskop-labs/stylelint-config-css'],
  rules: {
    'selector-class-pattern': [
      '^(t-[a-zA-Z]([a-zA-Z0-9-]+)?(__([a-zA-Z0-9]+-?)+)?(--([a-zA-Z0-9]+-?)+){0,2}|assistive)$',
      {
        message: 'BEM',
      },
    ],
  },
}
