---
title: Jest
date: 2020-07-28 16:34:56
tags:
---
### 安装依赖

`npm i @vue/test-utils babel-jest jest jest-serializer-vue jest-transform-stub vue-jest -D`   

### 配置vue test utils
[配置](https://vue-test-utils.vuejs.org/zh/installation/)
[教程](https://vue-test-utils.vuejs.org/zh/guides/)
### 文件配置
```
const path = require('path');
module.exports = {
    verbose: true,
    testURL: 'http://localhost/',
    rootDir: path.resolve(__dirname, ''),
    // 告诉jest需要解析的文件
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],
    // 告诉jest去哪里找模块资源，同webpack中的modules
    moduleDirectories: [
        'src',
        'node_modules'
    ],
    // 告诉jest针对不同类型的文件如何转义; 如果引入其他模块需要loader，可在这加入
    transform: {
        '^.+\\.(vue)$': '<rootDir>/node_modules/vue-jest',
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },
    // 告诉jest在编辑的过程中可以忽略哪些文件，默认为node_modules下的所有文件；也可以写不忽略的规则
    transformIgnorePatterns: [
        '<rootDir>/node_modules/'
        + '(?!(resize-detector|froala-editor|echarts|html2canvas|jspdf))'
    ],
    // 别名，同webpack中的alias
    moduleNameMapper: {
        '^src(.*)$': '<rootDir>/src/$1',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    // 告诉jest去哪里找我们编写的测试文件
    testMatch: [
        // '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
        '**/test/unit/**/*.spec.(js|jsx|ts|tsx)|**/__test__/*.(js|jsx|ts|tsx)'
    ],
    // 在执行测试用例之前需要先执行的文件;比如引入依赖
    setupFiles: ['<rootDir>/test/unit/setup.js'],
    // // 开启测试报告
    collectCoverage: true,
    // 统计哪里的文件
    // collectCoverageFrom: ["**/src/components/**", "!**/node_modules/**"]
};

```
#### 脚本配置
```
scripts: {
    "test": "jest --config jest.config.js --coverage"
}
```
#### 遇到的问题
1. 启动服务报错
   _gracefulFs(...).realpathSync.native is not a function
   解决：node8.x不支持jest26.x版本，所以降级到25.x
2. babel报错
    ```
    ReferenceError: [BABEL] unknown: Unknown option: xx/node_modules/@vue/cli-plugin-babel/preset.js.overrides
    Invalid:
        { presets: [{option: value}] }
        Valid:
        { presets: [['presetName', {option: value}]] }
    ```
    解决：babel.config.js取消 ```babel-preset-env``` 面向的 Node 版本和预设
3. 测试实例报错
   isVueInstance is deprecated and will be removed in the next major version
   解决：https://vue-test-utils.vuejs.org/api/wrapper/isVueInstance.html
4. [解决jest处理es模块](https://www.cnblogs.com/xueyoucd/p/10495922.html)

[参考](https://www.jianshu.com/p/5cc853af1c7b)