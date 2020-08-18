
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

#### hash和chunkhash区别
**hash**对js和css进行签名，每次hash值不一样，所以不能利用缓存。
**chunkhash**是每一个js的模块对应的值是不同的，因为是根据js里的不同内容生成。
chunkhash重复的问题，因为webpack编译里面，将css作为js的一部分，所以会将所有的js和css混合在一起计算。
解决：css使用`ExtractTextPlugin`插件引入。这个插件会提供contenthash，使用后css就独立于js之外了。

#### webpack实现静态资源缓存
1. hash
   是工程级别的，所有打包后的文件携带的hash值相同。一个地方修改了，其他文件也会被重新加载，显然作为缓存是不合适的。
2. chunkhash
    根据入口文件解析、构建对应的chunk、生成对应的hash值。说到了webpack入口配置`分离 app(应用程序) 和 vendor(第三方库) 入口`。用chunkhash生成hash值，只要依赖公共库不变，那么对应的chunkhash就不会改变，从而达到缓存的目的。
3. contenthash
    这个是由文件内容生成的hash值。在项目中，通常是把项目中的css都抽离出来对应的css文件进行引用。通过`ExtractTextPlugin`实现。比如在appchunk中引入index.css，他俩的hash值原有的。app文件变更，那么index.css的hash也会变。导致缓存失效，这时候就可以使用`contenthash`值。只要css内容不变，则hash值不会变。
