/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs')
const { join } = require('node:path')
const basic = require('@teleskop-labs/eslint-config-js')

const tsconfig = process.env.ESLINT_TSCONFIG || 'tsconfig.eslint.json'

module.exports = {
  extends: [
    '@teleskop-labs/eslint-config-js',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },
  // eslint-disable-next-line unicorn/prefer-spread
  overrides: basic.overrides.concat(
    !fs.existsSync(join(process.cwd(), tsconfig))
      ? []
      : [
          {
            parserOptions: {
              tsconfigRootDir: process.cwd(),
              project: [tsconfig],
            },
            parser: '@typescript-eslint/parser',
            excludedFiles: ['**/*.md/*.*'],
            files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
            // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
            rules: {
              'no-throw-literal': 'off',
              '@typescript-eslint/no-throw-literal': 'error',
              'no-implied-eval': 'off',
              '@typescript-eslint/no-implied-eval': 'error',
              // 'dot-notation': 'off',
              // '@typescript-eslint/dot-notation': ['off', { allowKeywords: true, allowIndexSignaturePropertyAccess: true }],
              '@typescript-eslint/no-floating-promises': 'error',
              '@typescript-eslint/no-misused-promises': 'error',
              '@typescript-eslint/await-thenable': 'error',
              '@typescript-eslint/no-for-in-array': 'error',
              '@typescript-eslint/no-unnecessary-type-assertion': 'error',
              '@typescript-eslint/no-unsafe-argument': 'error',
              '@typescript-eslint/no-unsafe-assignment': 'error',
              '@typescript-eslint/no-unsafe-call': 'error',
              '@typescript-eslint/no-unsafe-member-access': 'error',
              '@typescript-eslint/no-unsafe-return': 'error',
              'require-await': 'off',
              '@typescript-eslint/require-await': 'error',
              '@typescript-eslint/restrict-plus-operands': 'error',
              '@typescript-eslint/restrict-template-expressions': 'error',
              '@typescript-eslint/unbound-method': 'error',
            },
          },
          {
            files: ['*.test.ts', '*.test.tsx', '*.test.js', '*.test.jsx', '*.spec.ts', '*.spec.js'],
            rules: {
              '@typescript-eslint/no-unsafe-call': 'off',
              '@typescript-eslint/no-unsafe-member-access': 'off',
            },
          },
          // {
          //   // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
          //   files: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
          //   plugins: ['jest'],
          //   rules: {
          //     // you should turn the original rule off *only* for test files
          //     '@typescript-eslint/unbound-method': 'off',
          //     'jest/unbound-method': 'error',
          //   },
          // },
        ],
  ),
  rules: {
    'import/named': 'off',

    // TS
    // Требовать, чтобы сигнатуры перегрузки функций были последовательными.
    '@typescript-eslint/adjacent-overload-signatures': 'error',

    // Требовать последовательного использования либо T[] или Array<T> для массивов.
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],

    // Запретить ожидание значения, которое не является Thenable
    // '@typescript-eslint/await-thenable': 'error',

    // Запретить @ts-<directive> комментарии или требовать описания после директив.
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],

    // Запретить // tslint:<rule-flag> комментарии.
    '@typescript-eslint/ban-tslint-comment': 'error',

    // Принудительное указание аргументов универсального типа в аннотации типа или имени конструктора вызова конструктора.
    '@typescript-eslint/consistent-generic-constructors': 'error',

    // Требовать или запрещать Record тип.
    '@typescript-eslint/consistent-indexed-object-style': 'error',

    // Принудительно использовать в определениях типов либо , interface либо type.
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // // Обеспечьте согласованное использование экспорта типов.
    // '@typescript-eslint/consistent-type-exports': 'error',

    // Обеспечьте согласованное использование импорта типов.
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],

    // Требовать явных возвращаемых типов для функций и методов класса.
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Требовать явных модификаторов доступа к свойствам и методам класса.
    '@typescript-eslint/explicit-member-accessibility': 'error',

    // Требовать явного возвращаемого значения и типов аргументов в методах открытых классов экспортируемых функций и классов.
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Принудительно использовать определенный синтаксис подписи метода.
    '@typescript-eslint/method-signature-style': 'error',

    // Обеспечьте соблюдение соглашений об именах для всего в кодовой базе.
    // "@typescript-eslint/naming-convention": "error",

    // Требовать .toString()вызова только для объектов, которые предоставляют полезную информацию при преобразовании в строку.
    // "@typescript-eslint/no-base-to-string": "error",

    // Запретить ненулевое утверждение в местах, которые могут сбивать с толку.
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',

    // Требовать, чтобы выражения типа void отображались в позиции инструкции.
    // "@typescript-eslint/no-confusing-void-expression": "error",

    // Запретить повторяющиеся значения членов перечисления.
    '@typescript-eslint/no-duplicate-enum-values': 'error',

    // Запретить повторяющиеся составляющие типов объединения или пересечения.
    // "@typescript-eslint/no-duplicate-type-constituents": "error",

    // Запретить использование deleteоператора в выражениях с вычисляемым ключом.
    // "@typescript-eslint/no-dynamic-delete": "error",

    // Запретить объявление пустых интерфейсов.
    '@typescript-eslint/no-empty-interface': 'off',

    // Запретить any тип.
    '@typescript-eslint/no-explicit-any': 'warn',

    // Запретить дополнительные ненулевые утверждения.
    '@typescript-eslint/no-extra-non-null-assertion': 'error',

    // Запретить использование классов в качестве пространств имен.
    // "@typescript-eslint/no-extraneous-class": "error",

    // Запретить перебор массива с помощью цикла for-in.
    // '@typescript-eslint/no-for-in-array': 'error',

    // Принудительно использовать квалификатор типа импорта верхнего уровня, если в импорте есть только спецификаторы со встроенными квалификаторами типа.
    '@typescript-eslint/no-import-type-side-effects': 'error',

    // Запретить явные объявления типов для переменных или параметров, инициализированных числом, строкой или логическим значением.
    // "@typescript-eslint/no-inferrable-types": "error",

    // Запретить void тип вне универсального или возвращаемого типа.
    '@typescript-eslint/no-invalid-void-type': 'off',

    // Обеспечьте правильное определение new и constructor.
    '@typescript-eslint/no-misused-new': 'error',

    // Запретить обещания в местах, не предназначенных для их обработки.
    // "@typescript-eslint/no-misused-promises": "error",

    // Запретить перечислениям иметь как числовые, так и строковые элементы.
    // "@typescript-eslint/no-mixed-enums": "error",

    // Запретить пространства имен TypeScript.
    // '@typescript-eslint/no-namespace': 'error',

    // Запретить ненулевые утверждения в левом операнде нулевого оператора объединения.
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',

    // Запретить ненулевые утверждения после необязательного выражения цепочки.
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // Запретить ненулевые утверждения с помощью !постфиксного оператора.
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Запретить члены объединений и пересечений, которые ничего не делают или переопределяют информацию о типе.
    '@typescript-eslint/no-redundant-type-constituents': 'off',

    // Запретить вызов require().
    // '@typescript-eslint/no-require-imports': 'error',

    // Запретить псевдоним this.
    '@typescript-eslint/no-this-alias': 'error',

    // Запретить псевдонимы типов.
    // "@typescript-eslint/no-type-alias": "error",

    // Запретить ненужные сравнения на равенство с булевыми литералами.
    // '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',

    // Запретить условные выражения, тип которых всегда правдив или всегда ложен.
    // '@typescript-eslint/no-unnecessary-condition': 'off',

    // Запретить ненужные квалификаторы пространства имен.
    // "@typescript-eslint/no-unnecessary-qualifier": "error",

    // Запретить аргументы типа, которые равны значениям по умолчанию.
    // '@typescript-eslint/no-unnecessary-type-arguments': 'off',

    // Запретить утверждения типа, которые не изменяют тип выражения.
    // '@typescript-eslint/no-unnecessary-type-assertion': 'off',

    // Запретите ненужные ограничения на универсальные типы.
    // '@typescript-eslint/no-unnecessary-type-constraint': 'off',

    // Запретить вызов функции со значением типа any.
    // '@typescript-eslint/no-unsafe-argument': 'off',

    // Запретить присвоение значения с типом any переменным и свойствам.
    // '@typescript-eslint/no-unsafe-assignment': 'off',

    // ...

    // Принудительное использование типов функций вместо интерфейсов с сигнатурами вызовов.
    '@typescript-eslint/prefer-function-type': 'error',
    //////////

    // '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
    '@typescript-eslint/type-annotation-spacing': ['error', {}],
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    // Override JS
    // "func-call-spacing": "off",
    // "@typescript-eslint/func-call-spacing": "error",

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    // no-extra-semi

    'no-undef': 'off',
    // '@typescript-eslint/no-undef': 'off',

    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'off',

    'no-useless-constructor': 'off',

    indent: 'off',
    '@typescript-eslint/indent': [
      'off',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: [
          'TemplateLiteral *',
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
          'TSTypeParameterInstantiation',
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
        ],
        offsetTernaryExpressions: true,
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // нет-повторное объявление
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    // не используется до определения
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],

    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],

    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],

    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],

    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': ['error', 'always'],

    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': 'error',

    // Обеспечить постоянный интервал до и после ключевых слов
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],

    // висячие запятые
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],

    // Запретить ненужные скобки
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': ['error', 'functions'],

    // Запретить повторяющиеся члены класса
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',

    // Запретить литеральные числа, которые теряют точность
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',

    // Требовать или запрещать пустую строку между членами
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

    // off
    // '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/parameter-properties': 'off',
    // '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
  },
}
