// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config/defineConfig');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);
