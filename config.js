// We use `data-testid` instead of `data-test-id`, in order to match React Native and Testing Library https://testing-library.com/docs/dom-testing-library/api-queries#bytestid
const testSelectorsConfiguration = [
  'warn',
  'always',
  //  htmlOnly: true will exempt components containing the text "Button" from this rule
  { ignoreDisabled: false, ignoreReadonly: false, testAttribute: 'data-testid' },
]

module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
    jest: true,
  },
  plugins: [
    'eslint-plugin-bestpractices', // DON'T disable linting rules without cause.
    'eslint-plugin-deprecate', // Just in case you need to pull the plug on something.
    'eslint-plugin-html', // Lint embedded JavaScript.
    'eslint-plugin-jest', // I dislike Jest, but the linting plugin is a good option, for now.
    'eslint-plugin-jsdoc', // Little things add up.
    'eslint-plugin-promise', // Promise consistency is important, especially in APIs.
    'eslint-plugin-sonarjs', // The sonarjs checks are pure gold.
    'eslint-plugin-test-selectors', // This is incredibly nice for QA on complicated apps.
  ],
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:json/recommended-with-comments',
    'plugin:prettier/recommended',
  ],
  rules: {
    'bestpractices/no-eslint-disable': 'warn',

    /**
     * Custom overrides: airbnb-base
     */
    'no-console': ['warn', { allow: ['warn', 'error', 'trace', 'time'] }], // Console allowed, but will warn. Be responsible.
    'no-restricted-exports': 'off', // We generally export and use default
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'no-warning-comments': ['warn', { terms: ['FIXME', 'TODO', 'HACK'], location: 'anywhere' }],
    'prefer-destructuring': 'warn',

    /**
     * Custom overrides: eslint-plugin-import
     * Done this way coupled with plugin:import/typescript to avoid getting TypeScript import errors in JavaScript files.
     */
    'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
    'import/named': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/setupTests.[tj]s?(x)',
          '**/*.stories.[tj]s?(x)',
          '**/*.test.[tj]s?(x)',
          '**/*.spec.[tj]s?(x)',
          '**/demo/**',
          '**/docs/**',
          '**/fixtures/**',
        ],
      },
    ],

    /**
     * Custom overrides: eslint-plugin-prettier
     */
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        printWidth: 120,
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],

    /**
     * Custom overrides: eslint-plugin-promise
     */
    'promise/always-return': 'warn',
    'promise/no-return-wrap': 'warn',
    'promise/param-names': 'warn',
    'promise/catch-or-return': ['warn', { allowFinally: true }],
    // promise/no-native
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/no-new-statics': 'warn',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',

    /**
     * Custom overrides: eslint-plugin-test-selectors
     */
    'test-selectors/anchor': testSelectorsConfiguration,
    'test-selectors/button': testSelectorsConfiguration,
    'test-selectors/input': testSelectorsConfiguration,
    'test-selectors/onChange': testSelectorsConfiguration,
    'test-selectors/onClick': testSelectorsConfiguration,
    'test-selectors/onKeyDown': testSelectorsConfiguration,
    'test-selectors/onKeyUp': testSelectorsConfiguration,
    'test-selectors/onSubmit': testSelectorsConfiguration,

    /**
     * Custom overrides: eslint-plugin-sonarjs
     */
    'sonarjs/cognitive-complexity': ['warn', 50],
    'sonarjs/elseif-without-else': 'warn',
    'sonarjs/max-switch-cases': ['warn', 10],
    'sonarjs/no-all-duplicated-branches': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-element-overwrite': 'warn',
    'sonarjs/no-empty-collection': 'warn',
    'sonarjs/no-extra-arguments': 'warn',
    'sonarjs/no-gratuitous-expressions': 'warn',
    'sonarjs/no-identical-conditions': 'warn',
    'sonarjs/no-identical-expressions': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-nested-switch': 'warn',
    'sonarjs/no-nested-template-literals': 'warn',
    'sonarjs/no-one-iteration-loop': 'warn',
    'sonarjs/no-redundant-boolean': 'warn',
    'sonarjs/no-redundant-jump': 'warn',
    'sonarjs/no-same-line-conditional': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sonarjs/no-unused-collection': 'warn',
    'sonarjs/no-use-of-empty-return-value': 'warn',
    'sonarjs/no-useless-catch': 'warn',
    'sonarjs/non-existent-operator': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    'sonarjs/prefer-object-literal': 'warn',
    'sonarjs/prefer-single-boolean-return': 'warn',
    'sonarjs/prefer-while': 'warn',

    // Example deprecation rules:
    // 'deprecate/function': ['error',
    //   {'name': 'deprecatedFunction', 'use': 'function x from package y'}
    // ],
    // 'deprecate/import': ['error',
    //   {'name': 'path/to/legacyModule', 'use': 'module x'}
    // ],
    // 'deprecate/member-expression': ['error',
    //   {'name': '$.each', 'use': 'native forEach'}
    // ]
  },

  /**
   * File-specific overrides:
   */

  overrides: [
    {
      // Don't redundantly apply JSDoc rules to TypeScript files
      files: ['*.js?(x)', '*.html'],
      rules: {
        'valid-jsdoc': ['warn'],
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-syntax': 'warn',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/match-description': 'warn',
        'jsdoc/require-description': 'warn',
        'jsdoc/require-hyphen-before-param-description': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-param': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn',
        'jsdoc/require-returns': 'warn',
        'jsdoc/valid-types': 'warn',
      },
    },
    {
      // Loosen linting restrictions against test files
      files: ['*.stories.*', '*test*', '**/test/**', '**/*mock*/**', '*mock*', '**/setupTests.*'],
      rules: {
        'import/prefer-default-export': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off',
        'test-selectors/anchor': 'off',
        'test-selectors/button': 'off',
        'test-selectors/input': 'off',
        'test-selectors/onChange': 'off',
        'test-selectors/onClick': 'off',
        'test-selectors/onKeyDown': 'off',
        'test-selectors/onKeyUp': 'off',
        'test-selectors/onSubmit': 'off',
      },
    },
  ],
}
