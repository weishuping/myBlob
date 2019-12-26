
---
title: webpack日积月累
date: 2019-05-29 19:33:28
tags:
---

#### process.env.NODE_ENV

在node中，全局变量process表示当前node进程。process.env包含着关于系统环境的信息。但是process.env中并不存在NODE_ENV这个东西。NODE_ENV是用户一个自定义的变量，在webpack中是用于判断生产环境或者开发环境依据的。

#### chunkFilename
非入口文件的命名规则
未列在entry中，却又需要被打包出来的文件命名配置。

#### 关于打包时资源路径的配置

assetsSubDiretory：资源子目录，指的是js css img存放的目录，它的路径是相对于index.html。通常配置的是static，所以打包文件是 static index.html这种。

assetsPublicPath：资源目录，默认'/'。指的是js css img等资源相对于服务器host地址，也就是绝对地址。通常我们访问的地址是http://ip:prot/projectName/index.html，一般不会是http://ip:prot/index.html。所以我们需要改为'/projectName'