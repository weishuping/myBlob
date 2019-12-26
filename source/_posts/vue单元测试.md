---
title: vue单元测试
date: 2019-06-23 15:23:30
tags: jest
---

## Vue.js 单元测试之旅
<!--more-->
#### 卢俊杰 - 汇丰科技中国 环球银行及资本市场部 技术顾问
#### 演讲PPT与视屏 【https://www.yuque.com/vueconf/2019/ulg27a】
#### 代码地址： https://github.com/jaylu/vueconf2019-unit-test
### 测试阶梯
1: E2E Tests 端对端的测试，属于黑盒测试。通过编写测试用例、自动化模拟用户操作、确保组件通信正常，程序流数据传递如预期。
2: Snapshot Tests 快照测试。快照的格式其实是HTML字符串，并非截图。
3: Unit Tests 单元测试，对程序的最小单元就那些正确性检查的测试工作。**Unit Tests是基石**

#### Getting Started
[https://jestjs.io/docs/zh-Hans/getting-started]运行一个例子。
如果想要得到覆盖率，使用 ```npm run test --coverage```

#### 单元测试相关的库
syntax, runner, matcher, mock...
对于Vue而言，推荐Jest。
#### expect-验证
参数是测试代码产生的值
#### 匹配器-用各种方式测试你的代码

##### 普通匹配器 
```toBe``` 去匹配某个值，如果你想检查某个对象的值，可以使用 ```toEqual```
``` .not``` 测试相反的用例
##### Truthiness 
```toBeNull``` 只匹配 null
```toBeUndefined``` 只匹配 undefined
```toBeDefined``` 与 toBeUndefined 相反
```toBeTruthy``` 匹配任何 if 语句为真
```toBeFalsy``` 匹配任何 if 语句为假
##### 数字
```toBeGreaterThan``` - 大于
```toBeGreaterThanOrEqual``` 大于等于
```toBeLessThan``` - 小于
```toBeLessThanOrEqual``` - 小于等于
```toBeCloseTo```- 浮点数比
##### 字符串
```toMatch``` 正则表达式的字符
```toHaveLength(number)``` 判断一个有长度的对象的长度
##### 数组匹配器
```toContain(item)``` 判断数组是否包含特定子项
```toContainEqual``` 判断数组中是否包含一个特别对象
##### 对象匹配器
``` toMatchObject(object)``` 判断一个对象嵌套的key的value类型
```toHaveProperty(keypath, value)``` 判断在指定的path下是否有这个属性
##### 自定义匹配器
使用```expect.extend```将自己的匹配器添加到Jest。需要返回一个包含两个key的对象。
```
{
    pass：false //‘布尔值’， 
    message： () => 'message string' //‘函数，该函数返回一个提示信息’
}
```
##### 其他
```toThrow``` 要测试的特定函数会在调用时抛出一个错误
```.resolves```和```.rejects``` 用来测试```Promise```
e.g
```
    test('resolves to lemon', () => {
        return expect(Promise.resolve('lemon').resolves.toBe('lemon));
    })
```
```toHaveBeenCalled``` 用来判断某个函数是否被调用过
```toHaveBeenCalledTiems``` 判断函数被调用过多少次
等等等等

#### 测试异步代码
##### 回调函数 使用```done```
##### .resolves / .rejects 
##### Async/Await 

#### 测试前需要做准备工作，测试后做整理工作。Jest提供辅助函数来处理该问题：

##### 为多次测试重复设置
如果你有一些要为多次测试重复设置的工作，你可以使用 beforeEach 和 afterEach。这两个方法能够通过与异步代码测试相同的方式处理异步代码。[在每个测试前调用方法A，在测试后调用方法B]
##### 一次性设置
在某些情况下，你只需要在文件的开头做一次设置。 当这种设置是异步行为时，可能非常恼人，你不太可能一行就解决它。 Jest 提供 beforeAll 和 afterAll 处理这种情况。[数据可以被重用，在开头做一次即可]
##### 作用域
默认 before 和after 的块可以应用到文件中的每个测试。此外还可以通过 describe来将测试分组。describe下的before和after在当前块内可用。
##### describe 和 test的执行顺序
当describe块运行完成之后，默认情况下，Jest会按照test出现的顺序依次进行所有测试；
##### Mock Functions
Mock 函数可以轻松地测试代码之间的连接-一个模块的方法内常常会去调用 另外一个模块的方法。
> jest.fn()
创建Mock函数最简单的方式。可以设置返回值「mockReturnValue」、定义内部实现或者返回Promise对象。
> jest.mock()
```fetch.js```文件夹中封装的请求方法可能在其他模块被调用的时候并不需要实际的请求。所以使用```jest.mock()```去mock整个模块。
> jest.spyOn()

同样可以创建一个Mock函数，但是该mock函数不仅可以捕获函数的调用情况，还可以正常的执行被spy的函数。

参考资料：http://www.imooc.com/article/254755

#### 建议
##### 使用factory方法标准化Component的创建。
##### 创建自定义的Matcher以简化verify。
##### 留意每个单元测试的副作用并及时作出清理。
```
    afterEach(() => {
        jest.clearAllMocks()
    })
```

##### 以文档的形式来组织单元测试用例
参数、定义、书写一致性
##### 每个测试只负责一个特性
比如测试应该显示格式化的日期，就不应该带上左边有一个时钟图标。或者不应是当日期大于某个值，图标消失，显示为“过期”。

#### 测试的原则
##### 速度要快
##### 是可以被重复测试的
##### 自测是合法的
##### 及时地

#### 怎么样去改善生产代码

##### 纯函数
减少中间状态的存储
把业务逻辑和Vue组件分离
把工具函数和Vue组件分离

#### 怎么设计组件
##### 基础组件-简单一致的输入和输出
接受：props并渲染html;获取用户输入并提供@events。
##### 粘合组件-Controller组件
需要引入service或api依赖；协调基础性组件之间的交互。




