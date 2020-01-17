module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: [
    'babel'
  ],
  rules: {
    'no-console': 'off',
    "no-unused-expressions": "off",
    "babel/no-unused-expressions": "error",
    'no-param-reassign': 'off',
    "import/prefer-default-export": 'off',
    'import/first': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
