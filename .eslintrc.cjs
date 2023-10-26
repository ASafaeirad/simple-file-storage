module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'space-unary-ops': 'off',
    'prefer-destructuring': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'no-throw-literal': 'off',
  },
};
