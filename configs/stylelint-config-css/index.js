/* eslint-disable unicorn/no-null */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { propertyOrdering, selectorOrdering } = require('stylelint-semantic-groups')

module.exports = {
  plugins: [
    'stylelint-order',
    'stylelint-declaration-strict-value',
    'stylelint-color-format',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-prettier',
  ],
  extends: ['stylelint-config-standard', 'stylelint-config-html'],
  rules: {
    'prettier/prettier': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'color-hex-length': 'long',
    'declaration-no-important': true,
    'scale-unlimited/declaration-strict-value': [
      '/color$/',
      {
        ignoreValues: ['currentColor', 'inherit', 'transparent', 'unset'],
        disableFix: true
      },
    ],
    // 'scale-unlimited/declaration-strict-value': [['/color$/', 'z-index', 'font-size']],
    'selector-class-pattern': [
      '^(t-[a-zA-Z]([a-zA-Z0-9-]+)?(__([a-zA-Z0-9]+-?)+)?(--([a-zA-Z0-9]+-?)+){0,2}|assistive)$',
      {
        message: 'BEM',
      },
    ],
    'declaration-property-value-no-unknown': true,

    // 'color-format/format': {
    //   format: 'rgb',
    // },
    'color-function-notation': 'modern',

    'plugin/declaration-block-no-ignored-properties': true,

    'order/order': selectorOrdering,
    'order/properties-order': propertyOrdering,

    'declaration-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'after-declaration', 'first-nested', 'inside-single-line-block'],
      },
    ],

    'length-zero-no-unit': null,
  },
}
