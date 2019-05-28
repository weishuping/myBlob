---
title: 初见Node.js
date: 2016-11-07 20:28:22
tags: [Node, NPm]
---
#### 2016-11-07  node

node是一个基于事件驱动I/O服务器端javaScript环境基于Googlede V8引擎。
 <!--more-->

##### 创建一个应用服务
1、引入required模块

    var http = require("http");

2、创建服务器

    http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
	}).listen(8888);
##### NPM使用
开始使用Node.js做开发，并推到远程仓库。
安装Node,js web框架模块 **express**，但是会有‘npm warn enoent no such file or directory’的问题。是因为没有package.json。使用`npm init`建一个。
最好全局安装 express

##### Node.js REPL(交互式解释器)

##### Node.js 回调函数
Node.js异步编程的直接体现就是回调。
非阻塞大大提高了Node.js的性能，可以处理大量的并发请求。
##### Node.js事件循环
Node.js是单进程单线程应用程序。
Node.js单线程类似进入一个while(true)
的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数。

Node.js有多个内置的事件，我们可以通过引入events模块，并通过实例化EventEmitter类来绑定和监听事件，如下：

    //引入events模块
    var events = require('events');
    //创建eventEmitter对象
    var eventEimitter = new events.EventEmitter();
    //以下程序绑定事件处理程序
    eventEmitter.on('eventName',eventHandler);
    //触发事件
    eventEmitter.emit('eventName');
在node程序中，执行异步操作的函数将回调函数做为最后一个参数，回调函数接受错误对象做为第一个参数。
##### Node.js EventEmitter
Node.js所有的异步I/O操作在完成时都会发送一个事件到事件队列。
Node.js里面有许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件，一个fs.readStream对象会在文件被打开时发出一个事件。所有的这些产生事件的对象都是events.EventEmitter的实例。
EventEmitter类
events模块只提供了一个对象：events.EventEmitter。EventEmitter的核心就是事件触发与事件监听器功能的封装。

    //event.js 文件
	var EventEmitter = require('events').EventEmitter; 
	var event = new EventEmitter(); 
	event.on('some_event', function() { 
		console.log('some_event 事件触发'); 
	}); 
	setTimeout(function() { 
		event.emit('some_event'); 
	}, 1000); 
触发‘some_event’事件，然后会调用这个事件的监听器。
EventEmitter的每个事件由一个事件名和若干个参数组成。 

    //event.js 文件
	var events = require('events'); 
	var emitter = new events.EventEmitter(); 
	emitter.on('someEvent', function(arg1, arg2) { 
		console.log('listener1', arg1, arg2); 
	}); 
	emitter.on('someEvent', function(arg1, arg2) { 
		console.log('listener2', arg1, arg2); 
	}); 
	emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
EventEmitter提供了多个属性，如on和emit，on函数用于绑定事件函数，emit属性用于触发一个事件。
EventEmitter的属性介绍：

    addListener(event,listener)
    为指定事件添加一个事件监听器到监听器数组的尾部。
    on（event,listener）
    为指定事件注册一个监听器，接受一个字符串event和一个回调函数。
    once(event,listener)
    为指定事件注册一个单次监听器。
    removeListener(event,listener)
    移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
    。。。
  类方法：
  listenerCount(emitter,event)返回指定事件的监听器数量。
  事件：
  newListener 
  removeListener
error事件
eventEmtter定义了一个特殊的时间error,它包含了错误的语义。我们在遇到异常的时候通常会触发 error事件，如果没有响应的监听器，node.js会把它当做异常，退出程序并输出错误信息。
继承EventEmitter
大多数时候我们不会直接使用EventEmitter，而是在对象中继承它。包括 fs net http在内的，只要是支持事件响应的核心模块都是EventEmitter的子类。
2017-1-23 缓冲区 消化一下。
##### Node.js 路由
我们要为路由提供请求的URL 和其他需要的GET以及POST参数，随后路由需要根据这些数据来执行相应的代码。
我们需要的所有数据都会包含在request对象中，改对象作为onRequest()回调函数的第一个参数传递，但是为了解析这些数据，我们需要额外的Node.js模块，它们分别是url和querystring模块。
现在给onRequest()函数加上一些逻辑，用来找出浏览器请求的URL路径：

    var http = require("http");
    var url = require("url");
	function start() {
	function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	response.writeHead(200, {"Content-Type": "text/plain"})
	response.write("Hello World");
	response.end();
	}
	http.createServer(onRequest).listen(8088);
	}
	exports.start = start;
编写路由：

    function route(pathname) {
    console.log('About to route a request for'+pathname);
    }
    exports.route = route;
 这段代码现在什么也没干。先来看看如何把路由和服务器整合起来。
 我们的服务器应当知道路由的存在并加以有效利用，首先，我们来扩展一下服务器的start()函数，以便将路由函数作为参数传递过去，server.js如下
 

    var http = require("http");
    var url = require("url");
	function start() {
	function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	//多
	route(pathname);
	response.writeHead(200, {"Content-Type": "text/plain"})
	response.write("Hello World");
	response.end();
	}
	http.createServer(onRequest).listen(8088);
	}
	exports.start = start; 
同时，我们会响应扩展index.js，使得路由函数可以被注入到服务器中：
var server = require("./server");
var router = require("./router");
server.start(router.route);

##### Node.js GET/POST请求
表单提交到服务器一般都使用GET/POST请求。
获取GET请求内容
GET请求直接被嵌入路径中，URL是完整的请求路径，包含了？后面的部分，所以可以手动解析：
url模块中的parse函数提供了这个功能：

    res.end(util.inspect(url.parse(req.url, true)));
   获取URL的参数
   可以使用url.parse方法来解析URL中的参数，代码：
   

    var params = url.parse(req.url, true).query;
    res.write("网站名："+params.name);
    res.write("网站URL："+ params.url);
   获取POST请求内容
   POST请求的内容全部都在请求体中，http.serverRequest并没有一个属性内容为请求体，原因是等待请求体传输耗时。
   

    http.createServer(function (req, res) {
	  var body = "";
	  req.on('data', function (chunk) {
	    body += chunk;
	  });
	  req.on('end', function () {
	    // 解析参数
	    body = querystring.parse(body);
	    // 设置响应头部信息及编码
	    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
 
    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
	  });
	}).listen(3000);
#### NPM
随nodejs安装的 
用来安装、管理和分享JavaScript包，同时会自动处理多个包之间的依赖。
**1、使用package.json**
-它以文档的形式规定了项目所依赖的包。
-可以确定每个包所使用的版本。
-项目的构建可重复

可以手动新建一个package.json，也可以使用`npm init`命令填入各种信息。
在文件中可以定义两种类型的包：
 dependencies: 在生产环境中需要依赖的包； --save
 devDependencies:在开发和测试环节中需要依赖的包。 --save-dev
 2、包和模块
 包是一个用package.json文件描述的文件夹或者文件、模块更为具体。
 所有的模块都是包，但不是所有的包都是模块。