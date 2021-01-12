---
title: Redux和React-Redux学习记录
date: 2021-01-12 18:55:58
tags: Redux
---
#### Redux
原则
1. 唯一数据源
2. 状态只读
3. 只能通过纯函数改变数据（ Reducer+Flux） reducer(state, action); 返回一个新的对象
**Action**
分为action类型和action构造函数定义；Action的构造函数会返回一个action对象，
```
export const INCREMENT = 'increment';
```

```
import * as Types from './ActionTypes.js';
export const increment = (counterCaption) => {
  return {
    type: Types.INCREMENT,
    counterCaption: counterCaption
  }
}
```
**Store**
createStore函数，第一个参数是更新状态的reducer，第二个是状态的初始值，第三个可选标识storeEnhancer
```
import { createStore } from "redux";
// import 或者定义 reducer
const store = createStore(reducer, initValues)
```
**Reducer**
更新状态。任何通过dispatch派发的action都会在这里改变store状态。
```
import * as Types from './ActionTypes.js';
export default (state, action) => {
  const {counterCaption} = action;
  // 判断Types.INCREMENT
  return {...state, [counterCaption]: state[counterCaption + 1]}
}

```
**View**
1: 引入store、action
2: 获取状态statestore.getState(); 同步状态，需要注册 store.subscribe(xx) - store变了就会触发xx； 改变store使用 store.dispatch
```
import store from '../Store.js'
import * as Actions from '../Actions'

store.dispath(Ations.increment(xx))
```
#### 改进 Redux - 容器组件与傻瓜组件
一个组件要做很多事情，读取store，创建状态，监听store，当变化更新props和state，渲染；所以要拆分多个组件，让每个组件专注做一件事情：
<br/>
负责和store打交道的组件，处于外层，叫容器组件; 负责渲染页面的，处于内层，叫展示组件

#### 改进 Redux - 组件context
在不同的组件中导入store，是非常不利于组件复用的。应该在调用最顶层React组件的问题之导入store。
provider 提供函数getChildContext，表示context对象。所有组件都可以访问。
```
import React from 'react'
class Provider extends React.Component{
    getChildContext(){
        return{
            store:this.props.store
        }
    }
    render(){
        return this.props.children
    }
}
```
```
import store from './Store'
import Provider from './Provider'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
```
#### 改进React-Redux
有两个主要功能：
Provider:提供包含store的context
connect：连接容器组件和显示组件。

#### React- redux
`connect([mapStateProps], [mapDispatchProps], [mergeProps], [options])`
举个栗子
```
  class Mycomp extends Component {
    // ...
  }
  const comp = connet(...args)(myComp)
```
`mapStateProps(store, ownProps): stateProps `允许将store中的数据作为props绑定到组件上。
`mapDispatchProps(dispatch, ownProps): dispatchProps`允许将action作为props绑定到组件上
第一个参数最重要；如果忽略mapDispatchToProps参数，dispatch默认会注入到组件的props中


[原文链接1](https://www.cnblogs.com/sanhuamao/p/13773556.html)
[原文链接2](https://segmentfault.com/a/1190000015042646)