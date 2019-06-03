---
title: webpack日积月累
date: 2019-05-29 19:33:28
tags:
---

#### process.env.NODE_ENV

在node中，全局变量process表示当前node进程。process.env包含着关于系统环境的信息。但是process.env中并不存在NODE_ENV这个东西。NODE_ENV是用户一个自定义的变量，在webpack中是用于判断生产环境或者开发环境依据的。
