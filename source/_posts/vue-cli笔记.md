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
CLI服务是一个开发环境依赖，是一个npm包。包含加载其他CLI插件的核心服务。
<!-- 提供`vue-cli-service`找那个的`serve build inspect`命令; CLI插件。 -->

#### HTML和静态资源
1. index.html放到了public/index.html，会被html-webpack-plugin处理。
2. 使用`<%= Value %>`用来做不转义插值，`<%- Value %>`用来做HTML转义插值
3. 也可以不生成index
4. 多页应用
5. 处理静态资源，放置在`public`目录下或通过绝对路径被引用，这类资源直接会被拷贝，不会经过webpack的处理。
6. public文件夹
#### CSS相关
引用静态资源，所有编译后的css都会通过css-loader来解析其中的url引用，并将这些引用作为模块请求来处理。
在vue.config.js中配置css对象

#### Webpack相关
1. 简单的配置 configureWebpack
2. 链式操作 chainWebpack: config => {}

#### 环境变量与模式
[参考](https://cli.vuejs.org/zh/guide/build-targets.html#%E6%B3%A8%E5%86%8C%E5%A4%9A%E4%B8%AA-web-components-%E7%BB%84%E4%BB%B6%E7%9A%84%E5%8C%85)

#### css js打包
去掉console.log
vue-cli3 打包文件名称设置： https://www.jianshu.com/p/2f286a8e4cf5
不使用inject，因为inject: true，这样使用了template模板文件后会追加打包js到新生成的html中
禁用了html-webpack-plugin的自动注入:

```
chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].inject = false
                return args
            })
    }
```

#### 配置公共打包路径：__webpack_public_path__动态配置路径
__webpack_public_path__决定了output.publicPath的值，用于来指定应用程序中所有的资源的基本路径
1：新建文件，比如config/config.js
通过判断，设置生产环境下
```
__webpack_public_path__ = window.APPROVAL_PROXY_URL + 后端的域名和代理
```
2：在main.js引入上述js，务必在其他静态资源之前引入
3：vue.config.js中设置publicpath: ''
