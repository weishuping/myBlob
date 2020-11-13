---
title: vue3.0 异步组件、自定义指令
date: 2020-10-13 19:55:19
tags: vue3.0
---
### 异步组件

#### Vue2.x中
将组件定义为返回Promise的函数来创建的。

```
    const asyncPage = () => import('./xx.vue');
    // 或者
    const asyncPage = {
        component: () => import('./xx.vue),
        delay: 200,
        timeout: 3000
    }
```

#### Vue3.x中
因为函数式组件被定义为纯函数，因此异步组件的定义需要通过包裹在新的`defineAsyncComponent`助手方法中显示的定义。

```
    import {defineAsyncComponent} from 'vue';
    const asyncPage = defineAsyncComponent() => import('./xx.vue');
    // 或者
    const asyncPage = {
        loader: () => import('./xx.vue), // 注意这里重命名了
        delay: 200,
        timeout: 3000
    }

```
且loader函数不接受resolve和reject参数，必须返回Promise
```
    const asyncComponent = defineAsyncComponent(() =>
    new Promise(res, rej) => {
        /*...*/
    })
```

### 自定义指令
首先调整了生命周期函数与vue组件生命周期函数一致。
可以用来设置某段文本变色啊

### 深入响应式原理
跟踪修改值，用触发函数更新值。

声明响应式状态，使用```reactive```
