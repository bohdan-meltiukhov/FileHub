module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'plugins': [
    'jsdoc',
  ],
  'extends': [
    'plugin:jsdoc/recommended',
    'eslint:recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'max-len': ['error', {
      code: 120,
    }],
    'valid-jsdoc': 'off',
    'jsdoc/require-description-complete-sentence': 'error',
    indent: ['error', 2, {'MemberExpression': 1}],
  },
};
