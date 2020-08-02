---
title: Jest
date: 2020-07-28 16:34:56
tags:
---
### 安装依赖
```npm i @vue/test-utils babel-jest jest jest-serializer-vue jest-transform-stub vue-jest -D```


#### 遇到的问题，

npm i @vue/test-utils babel-jest jest jest-serializer-vue jest-transform-stub vue-jest -D
✗ npm install --save-dev jest jest-cli; npx jest --init


1. node8.x不支持jest26.x版本，所以降级到25.x
2. babel报错，
```
 ReferenceError: [BABEL] unknown: Unknown option: xx/node_modules/@vue/cli-plugin-babel/preset.js.overrides
 Invalid:
      `{ presets: [{option: value}] }`
    Valid:
      `{ presets: [['presetName', {option: value}]] }


      https://www.cnblogs.com/xueyoucd/p/10495922.html
```
3. 问题
   [vue-test-utils]: isVueInstance is deprecated and will be removed in the next major version

#### 