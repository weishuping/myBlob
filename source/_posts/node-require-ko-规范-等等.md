---
title: node require ko 规范 等等
date: 2017-03-21 10:38:06
tags:
---
#### node require ko 规范 等等
 <!--more-->

#####  node.js
是一个基于Chrome V8引擎的JavaScript**运行环境**。Node.js使用了一个事件驱动、非阻塞式I/O的模型，使其轻量又高效。Node.js的包管理器npm，是全球最大的开源库生态系统。
将JavaScript用于服务器端编程
##### Require.js
是一个非常小巧的JavaScript**模块载入框架**，是AMD规范最好的实现者之一。

##### knockout.js
是一个很优秀的JavaScript库，使用底层数据模型来创建一个富文本且具有良好的显示和编辑功能的用户界面。
##### 模块的规范
模块的好处：可以很方便的使用别人的代码； 需要什么功能就加载什么模块； 
前提：大家需要用同样的方式来编写模块。
模块规范分为两种：`CommonJS`和`AMD`
###### CommonJS
node.js的模块系统就是参照CommonJS规范来实现的。-》服务器端模块
但是CommonJS规范并不适合浏览器环境。
因为在服务器端所有的模块存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是对于浏览器来说，存放在服务器端的模块读取等待时间取决于网速。
所以在浏览器端的模块不能采用“同步加载”，只能采用“异步加载”。这就是AMD规范诞生的背景
###### AMD
AMD也采用require()语句加载模块，但是需要两个参数：

    require([module],callback)
  第一个参数是一个数组，里面就是要加载的模块。第二个参数是callback.则是成功之后的回调函数。
#####  require优势：
原本的加载多个js文件的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；其次文件之间存在依赖关系，又要保证加载顺序。
 1、管理js文件的异步加载，避免网页失去响应
 2、管理模块之间的依赖性，便于代码的编写和维护
 ##### require.js 的加载
 其实加载这个文件也会造成页面失去响应，所以要么放在页面底部加载，要么就是
 

    <script src="js/require.js" defer async="true"></script>
    //IE 只支持defer
##### 主模块的写法
指整个网页的入口代码

    // main.js
	require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
	　　　　// some code here
	　　});
define和require在依赖处理和回调执行上都是一样的，不一样的地方是define的回调函数需要有return语句返回模块对象，这样define定义的模块才能被其他模块引用；require的回调函数不需要return语句。
还有依赖前置(AMD推崇)和依赖就近(CMD推崇)
依赖前置

    define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
	a.doSomething()
	// 此处略去 100 行
	b.doSomething()
	...
	}) 
 依赖后置

    define(function(require, exports, module) {
	var a = require('./a')
	a.doSomething()
	// 此处略去 100 行
	var b = require('./b') // 依赖可以就近书写
	b.doSomething()
	// ... 
	})
	//目前fe项目中所使用的
	//也是用来解决循环引用问题

虽然AMD也支持CMD的写法，同时还支持将require作为依赖项传递。但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。

##### 关于requirejs.config和shim
require.config和shim作用：为那些没有使用define()来声明依赖关系、设置模块的“浏览器全局变量注入”型脚本做依赖和导出配置。
就是对requirejs要引用的第三方非AMD规范的插件、类库的特殊处理，通常有两种方法：
1、AMD化：通过define封装一下
2、config shim

    require.config({
    paths: {
        moment:"/hrcloud/vendor/fullcalendar/moment.min",
        fullcalendar:"/hrcloud/vendor/fullcalendar/fullcalendar",
        zh:"/hrcloud/vendor/fullcalendar/zh-cn"
    },
    shim: {
        'zh':{
            deps:["fullcalendar"]
        }

    },
    waitSeconds: 0
	});
	define(function(require, module, exports) {
		// 引入相关的功能插件或模块
		var html = require('text!./index.html');
		var styles = require('css!./index.css');
	    require('css!/hrcloud/vendor/fullcalendar/fullcalendar.css');
		var tool = require('/hrcloud/util/hrTool.js');
	    //require('/hrcloud/util/require-conf.js');
	    require('fullcalendar');
	    require('zh');
	    return {}
	    })

