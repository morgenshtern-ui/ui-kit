// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  versionGroups: [
    {
      label: 'Внутренние пакеты конфигурации должны быть привязаны к "*" (это означает, что приемлема любая версия).',
      packages: ['**'],
      dependencies: [
        "@teleskop-labs/eslint-config-js",
        "@teleskop-labs/eslint-config-ts",
        "@teleskop-labs/eslint-config-prettier-ts",
        "@teleskop-labs/eslint-config-vue",
        "@teleskop-labs/prettier-config",
        "@teleskop-labs/stylelint-config-css",
        "@teleskop-labs/tsconfig",
      ],
      dependencyTypes: ['dev'],
      pinVersion: '*',
    },
  ],
}

module.exports = config
