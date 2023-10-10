module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-unused-vars': 'warn',
    'brace-style': 'warn',
    'vue/multi-word-component-names': 'off',
    'eol-last': 0,
    indent: 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
    'vue/keyword-spacing': 'warn',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'spaced-comment': ['error', 'always', {
      line: {
        markers: ['#region', '#endregion', 'region', 'endregion']
      }
    }]

  }
}
