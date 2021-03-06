module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
  },
};
