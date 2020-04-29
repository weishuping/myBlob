---
title: vue3.0 beta学习
date: 2020-04-24 15:13:42
tags:
---

### 六大亮点

#### performance
性能比2.0更快
+ 编译模板的优化
在编译模板的时候，会打上一个number类型的patchFlag，用来标记。仅有pathFlag标记的节点会被真正追踪，且无论嵌套层级多深，动态节点直接与根节点绑定，无需遍历静态节点。
![图示](vue3.0beta学习/patchflag.png)

+ 事件监听缓存```cacheHandlers```