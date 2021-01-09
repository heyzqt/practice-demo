module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: ["error", "double"], //引号类型 `` "" ''
    semi: ["error", "always"], // 语句强制分号结尾
    "space-before-function-paren": 0, //方法名和括号之间不需要空格
    "lines-around-comment": ["warn", { beforeBlockComment: true }], //强制注释周围有空行
    "spaced-comment": ["warn", "always"] //要求或禁止在注释前有空白
  }
};
