/**
 * Example nested.eslintrc override, with an example for using eslint-plugin-deprecate
 */

module.exports = {
  rules: {
    'bestpractices/no-eslint-disable': 'error',
    'deprecate/function': ['error', { name: 'deprecatedFunction', use: 'function x from package y' }],
    'deprecate/import': ['error', { name: 'path/to/legacyModule', use: 'module x' }],
    'deprecate/member-expression': ['error', { name: '$.each', use: 'native forEach' }],
  },
}
