---
title: vue基础知识巩固、CSRF漏洞
date: 2019-07-09 14:16:16
tags: vue
---
#### Vue.nextTick()的作用
在下次DOM更新循环结束之后 执行 延迟回调。在修改完数据之后调用获取更新后的DOM。
#### 使用Vue.nextTick()的情况：
1：在Vue生命周期的created钩子函数进行的DOM操作一定要放到Vue.nextTick()的回调中。相对应的在mounted中执行任何DOM操作都不会有问题。
2：在数据变化后等待Vue完成更新DOM，可以在数据变化之后立即调用。
3：mounted不会承诺所有的子组件也都一起被挂载。如果希望等到整个视图都渲染完毕，可以在mounted钩子里面调用nextTick()。

#### CSRF漏洞

#### Vue父组件通过props向子组件传递方法

#### 组件继承与扩展

##### slot
##### Mixins
##### extends 
接受的参数是简单的选项对象或构造函数，所以extends只能单次扩展一个组件。

相对于Mixins，extends触发的优先级更高。
##### extend
创建一个构造器，为了创建可复用的组件。主要是服务于Vue.component

#### vue组件间通信的六种方式

##### 一： props/$emit

##### 二： $emit/$on
通过空的vue实例作为事件中心，用它来触发事件和监听事件，巧妙而轻量的实现了任何组件之间的通信，包括父子、兄弟、跨级。
```
    var Event=new Vue();
    Event.$emit(事件名,数据);
    Event.$on(事件名,data => {});
```
##### 三：vuex

##### 四：$attrs/$listeners
多及组件嵌套需要传递数据的时候，而不做中间处理。Vue2.4提供了这个方法。

$attrs包含了父级作用域中不被props所识别所获取的特性绑定；
$listeners包含了父作用域中不含.native修饰器的v-on事件监听器。
##### 五：provide/inject
允许一个祖先组件向其所有子孙后代注入一个依赖：祖先通过provider提供变量，子孙组件通过inject注入变量。主要解决了跨级组件间的通信问题。
provide方法，返回一个对象。inject是一个对象，使用的时候injections.theme.color
*需要注意的是：绑定并不是响应的。*

###### 实现数据响应
（1）：祖先组件的实例在子孙组件中注入依赖。
（2）：2.6提供API：Vue.observable

##### 六：$parent/$children 访问父/子实例. ref指向DOM元素和组件实例。
