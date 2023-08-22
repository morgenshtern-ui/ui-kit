module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2022,
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        // 'no-unused-vars': 'off',
        // 'no-undef': 'off',
        // '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*'],
      rules: {
        'vue/no-ref-object-destructure': 'off',
        'vue/no-unused-refs': 'off',
        'vue/component-api-style': 'off',
        'vue/define-props-declaration': 'off',
      },
    },
  ],
  extends: ['plugin:vue/vue3-recommended', '@teleskop-labs/eslint-config-ts', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    curly: ['error', 'all'],
    'vue/multi-word-component-names': 'off',
    'vue/no-arrow-functions-in-watch': 'error',
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-child-content': 'error',
    'vue/no-computed-properties-in-data': 'error',
    'vue/no-dupe-keys': 'error',
    'vue/no-dupe-v-else-if': 'error',
    'vue/no-duplicate-attributes': 'error',
    'vue/no-export-in-script-setup': 'error',
    'vue/no-mutating-props': 'error',
    'vue/no-parsing-error': 'error',
    'vue/no-ref-as-operand': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/no-reserved-keys': 'error',
    'vue/no-reserved-props': 'error',
    'vue/no-setup-props-destructure': 'error',
    'vue/no-shared-component-data': 'error',
    'vue/no-side-effects-in-computed-properties': 'error',
    'vue/no-textarea-mustache': 'error',
    'vue/no-unused-components': 'error',
    'vue/no-unused-vars': 'error',
    'vue/no-use-computed-property-like-method': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-useless-template-attributes': 'error',
    'vue/no-v-text-v-html-on-component': 'error',
    'vue/require-component-is': 'error',
    'vue/require-prop-type-constructor': 'error',
    'vue/require-render-return': 'error',
    'vue/require-v-for-key': 'error',
    'vue/require-valid-default-prop': 'error',
    'vue/return-in-computed-property': 'error',
    'vue/return-in-emits-validator': 'error',
    'vue/use-v-on-exact': 'error',
    'vue/valid-attribute-name': 'error',
    'vue/valid-define-emits': 'error',
    'vue/valid-define-props': 'error',
    'vue/valid-next-tick': 'error',
    'vue/valid-template-root': 'error',
    'vue/valid-v-bind': 'error',
    'vue/valid-v-cloak': 'error',
    'vue/valid-v-else-if': 'error',
    'vue/valid-v-else': 'error',
    'vue/valid-v-for': 'error',
    'vue/valid-v-html': 'error',
    'vue/valid-v-if': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-once': 'error',
    'vue/valid-v-pre': 'error',
    'vue/valid-v-show': 'error',
    'vue/valid-v-slot': 'error',
    'vue/valid-v-text': 'error',

    // v3
    'vue/no-deprecated-data-object-declaration': 'error',
    'vue/no-deprecated-destroyed-lifecycle': 'error',
    'vue/no-deprecated-dollar-listeners-api': 'error',
    'vue/no-deprecated-dollar-scopedslots-api': 'error',
    'vue/no-deprecated-events-api': 'error',
    'vue/no-deprecated-filter': 'error',
    'vue/no-deprecated-functional-template': 'error',
    'vue/no-deprecated-html-element-is': 'error',
    'vue/no-deprecated-inline-template': 'error',
    'vue/no-deprecated-props-default-this': 'error',
    'vue/no-deprecated-router-link-tag-prop': 'error',
    'vue/no-deprecated-scope-attribute': 'error',
    'vue/no-deprecated-slot-attribute': 'error',
    'vue/no-deprecated-slot-scope-attribute': 'error',
    'vue/no-deprecated-v-bind-sync': 'error',
    'vue/no-deprecated-v-is': 'error',
    'vue/no-deprecated-v-on-native-modifier': 'error',
    'vue/no-deprecated-v-on-number-modifiers': 'error',
    'vue/no-deprecated-vue-config-keycodes': 'error',
    'vue/no-expose-after-await': 'error',
    'vue/no-lifecycle-after-await': 'error',
    'vue/no-v-for-template-key-on-child': 'error',
    'vue/no-watch-after-await': 'error',
    'vue/prefer-import-from-vue': 'off',
    'vue/require-slots-as-functions': 'error',
    'vue/require-toggle-inside-transition': 'error',
    'vue/valid-v-is': 'error',
    'vue/valid-v-memo': 'error',

    // Recommended
    'vue/attribute-hyphenation': 'error',
    'vue/component-definition-name-casing': 'error',
    'vue/first-attribute-linebreak': 'off',
    'vue/html-closing-bracket-newline': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/html-end-tags': 'error',
    'vue/html-indent': 'error',
    'vue/html-quotes': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/mustache-interpolation-spacing': 'error',
    'vue/no-multi-spaces': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/no-template-shadow': 'error',
    'vue/one-component-per-file': 'off',
    'vue/prop-name-casing': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',
    'vue/v-slot-style': 'error',

    // V3 b
    'vue/require-explicit-emits': 'error',
    'vue/v-on-event-hyphenation': 'error',

    // C Recommended
    'vue/attributes-order': 'error',
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    'vue/no-lone-template': 'error',
    'vue/no-multiple-slot-args': 'error',
    'vue/no-v-html': 'off',
    'vue/order-in-components': 'error',
    'vue/this-in-template': 'error',

    // Uncategorized
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: ['ts', 'tsx'],
        },
      },
    ],
    'vue/block-tag-newline': 'error',
    // 'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/component-api-style': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      },
    ],
    'vue/define-emits-declaration': ['off', 'runtime'],
    'vue/define-props-declaration': ['off', 'runtime'],
    'vue/html-button-has-type': 'error',
    'vue/html-comment-content-newline': 'off',
    // 'vue/html-comment-content-spacing': 'error',
    'vue/match-component-file-name': 'error',
    'vue/match-component-import-name': 'error',
    'vue/next-tick-style': 'off',
    'vue/no-boolean-default': 'off',
    'vue/no-duplicate-attr-inheritance': 'off',
    'vue/no-empty-component-block': 'error',
    'vue/no-multiple-objects-in-class': 'off',
    'vue/no-ref-object-destructure': 'off',
    'vue/no-required-prop-with-default': 'error',
    'vue/no-template-target-blank': 'error',
    // 'vue/no-undef-компоненты': 'error',
    'vue/no-undef-properties': 'off',
    'vue/no-unused-properties': 'error',
    'vue/no-unused-refs': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/no-v-text': 'error',
    'vue/padding-line-between-tags': 'off',
    // 'vue/prefer-define-options': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/require-emit-validator': 'error',
    'vue/v-for-delimiter-style': 'error',
    'vue/v-on-handler-style': 'off',
    // 'vue/valid-define-options': 'error',

    ///
    'vue/html-comment-content-spacing': [
      'error',
      'always',
      {
        exceptions: ['-'],
      },
    ],
    'vue/no-restricted-v-bind': ['error', '/^v-/'],
    'vue/padding-line-between-blocks': ['error', 'always'],

    // extensions
    // 'vue/array-bracket-spacing': ['error', 'never'],
    // 'vue/arrow-spacing': ['error', { before: true, after: true }],
    // 'vue/block-spacing': ['error', 'always'],
    // 'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    // 'vue/comma-dangle': ['error', 'always-multiline'],
    // 'vue/comma-spacing': ['error', { before: false, after: true }],
    // 'vue/comma-style': ['error', 'last'],
    // 'vue/dot-location': ['error', 'property'],
    // 'vue/dot-notation': ['off', { allowKeywords: true }],
    'vue/eqeqeq': ['error', 'smart'],
    // 'vue/func-call-spacing': ['off', 'never'],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // Обеспечить постоянный интервал до и после ключевых слов
    'vue/keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          return: {
            after: true,
          },
          throw: {
            after: true,
          },
          case: {
            after: true,
          },
        },
      },
    ],
    // Запретить константные выражения в условиях
    'vue/no-constant-condition': 'warn',
    // Запретить пустые шаблоны деструктурирования
    'vue/no-empty-pattern': 'error',
    // Запретить ненужные скобки
    'vue/no-extra-parens': ['error', 'functions'],
    // Запретить неправильные пробелы
    'vue/no-irregular-whitespace': 'error',
    // Запретить литеральные числа, которые теряют точность
    'vue/no-loss-of-precision': 'error',
    // Запретить указанный синтаксис
    'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    // Запретить разреженные массивы
    'vue/no-sparse-arrays': 'error',
    // Применять согласованные разрывы строк после открытия и перед закрытием фигурных скобок
    'vue/object-curly-newline': ['error', { multiline: true, consistent: true }],
    // Обеспечьте постоянный интервал внутри фигурных скобок
    'vue/object-curly-spacing': ['error', 'always'],
    // Принудительное размещение свойств объекта на отдельных строках
    'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    // Требовать или запрещать сокращенный синтаксис методов и свойств для литералов объектов
    'vue/object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    // Обеспечьте согласованный стиль разрыва строки для операторов
    // 'vue/operator-linebreak': ['error', 'before'],
    // Требовать литералы шаблонов вместо конкатенации строк
    'vue/prefer-template': 'error',
    // Требовать заключения в кавычки имен свойств литерала объекта
    // 'vue/quote-props': ['error', 'consistent-as-needed'],
    // Обеспечьте постоянный интервал внутри круглых скобок
    'vue/space-in-parens': ['error', 'never'],
    // Требовать пробелы вокруг инфиксных операторов
    'vue/space-infix-ops': 'error',
    // Обеспечьте постоянный интервал до или после унарных операторов
    'vue/space-unary-ops': ['error', { words: true, nonwords: false }],
    // Требовать или запрещать пробелы вокруг встроенных выражений строк шаблона
    'vue/template-curly-spacing': 'error',

    // Pretter
    'prettier/prettier': 'error',
  },
}
