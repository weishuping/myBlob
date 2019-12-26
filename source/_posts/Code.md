---
layout: Structuring Frontend Code
title: Code
date: 2019-10-31 13:22:31
tags:
---

逻辑-函数一一对应（使用人脑拆分）
	函数大小受到限制
	分支条件使用函数，而不是一堆 且 或
	抽离的函数不依赖作用域
	代码逻辑符合自上而下的树状结构

编码是从自然逻辑到程序逻辑，非复杂度改善的性能并没有那么重要

#### 简单

1：工厂函数

2：优先使用组合: 函数组合提供更小的复用粒度和更灵活的按需调整

#### 从编程到编制

尽可能使用npm包有的
import leftPad from 'left-pad';
import {subDays} from 'date-fns';

明确标记副作用
比如for 里面修改了什么东西

函数变工厂，工厂传纯的