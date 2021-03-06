module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-console": "off"
  },
};
