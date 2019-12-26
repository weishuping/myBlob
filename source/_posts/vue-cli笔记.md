---
title: vue-cli笔记
date: 2019-12-20 15:21:52
tags: vue-cli4.x
---

### Vue Cli介绍
#### 介绍
基于Vue.js进行快速开发的完整体系，基于webpack构建，并带有合理的默认配置，可通过项目内的配置文件配置，也可以通过插件进行扩展。[源代码](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue)
#### 该系统组件
CLI是一个全局安装的npm包;
CLI服务是一个开发环境依赖，是一个npm包。包含加载其他CLI插件的核心服务，提供```vue-cli-service```找那个的serve build inspect命令; CLI插件。

#### HTML和静态资源
1. index.html放到了public/index.html，会被html-webpack-plugin处理。
2. 使用```<%= Value %>```用来做不转义插值，```<%- Value %>```用来做HTML转义插值
3. 也可以不生成index
4. 多页应用
5. 处理静态资源，放置在```public```目录下或通过绝对路径被引用，这类资源直接会被拷贝，不会经过webpack的处理。
6. public文件夹
#### CSS相关
引用静态资源，所有编译后的css都会通过css-loader来解析其中的url引用，并将这些引用作为模块请求来处理。
在vue.config.js中配置css对象

#### Webpack相关
1. 简单的配置 configureWebpack
2. 链式操作 chainWebpack: config => {}

#### 环境变量与模式
[参考](https://cli.vuejs.org/zh/guide/build-targets.html#%E6%B3%A8%E5%86%8C%E5%A4%9A%E4%B8%AA-web-components-%E7%BB%84%E4%BB%B6%E7%9A%84%E5%8C%85)




