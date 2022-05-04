module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": 0,
    semi: 0,
    camelcase: 0,
    "no-param-reassign": 0,
    "no-use-before-define": 0,
    "consistent-return": 0,
    "no-await-in-loop": 0,
    "no-plusplus": 0,
    "prefer-destructuring": 0,
    "array-callback-return": 0,
    "no-else-return": 0,
    "default-case": 0,
    "prettier/prettier": "error",
    "import/newline-after-import": 0,
    "no-console": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
