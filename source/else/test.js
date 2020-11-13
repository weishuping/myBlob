
function getChildren(children,tag){
    // var children = oDivs.childNodes;//先把ele所有子节点获取到；

    for(var i=0;i<children.length;i++){//做循环
        var node = children[i];
        if(node.nodeType==1){
            //如果当前子元素的‘节点类型’是1，并且节点名称是tag值；
            tag.push(children[i]);//把子节点放到数组中；
            if (i === 71) {
                debugger;
            }
            if (node.childNodes) {
                getChildren(node.childNodes, tag);
            }
        }
    }
    return tag;
}	
var len = getChildren(document.getElementById('test').childNodes,[]);

// 排序
function getSort(a,b) {
    return a - b
} 
let testArr = [3,1,2,4, 6, 8]
testArr.sort((a, b) => {
    return a - b;
});
// 二分查找
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length -1;
    while(left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] > target){
                right = mid - 1; 
        } else if(arr[mid] < target) {
            left = mid + 1;
        }
    }
    return -1;
}
// 寻找左侧边界的

function left_binarySearch(arr, target) {
    let left = 0;
    let right = arr.length;
    while(left < right) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) {
            right = mid
        } else if (arr[mid] > target){
                right = mid - 1; 
        } else if(arr[mid] < target) {
            left = mid + 1;
        }
    }
    return left;
}
// 构造函数
function Person(name) {
    this.name = name;
}
// 创建对象 5种方式
class Student {
    constructor(name) {
        this.name = name;
    }
}
// async await
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hhhh')  
        }, time);
    })
}
function foo() {
    return '我是foo'
}
async function test() {
    // await sleep(3000);
    await console.log(foo());
    console.log('done')
}
test();
console.log('last')

// Object.defineProperty() 在对象上定义一个新属性，或者修改一个对象的现有属性，并返回对象。
let a ={};
Object.defineProperty(a, 'b', {
    value: {c:1},
    writable: false
})

// 防抖
// 当一定时间内不再操作时，才会去真正触发。
// 注意函数返回的是一个函数。需要执行传入的函数，则需要有上下文和参数。
const debounce = (fun, time, ...args) => {
    let timeout = null;
    return () => {
        if (timeout) {
            clearInterval(timeout); // 每次都清掉重来
        }
        let context = this;
        timeout = setInterval(()=> {
            fun.apply(context, args);
        }, time);
    }
}
// 节流
// 频繁操作，每间隔一段时间触发一次； 合并一定时间段的事件。
// 时间戳方法。记录一个时间标示。函数执行时的时间与标示去对比，同时更新指针
const throttle = (fun, time, ...arg) => {
    let pre = 0;
    return () => {
        const context = this;
        let now = Date.now();
        if (pre - now >= time) {
            fun.apply(context, arg);
            pre = Date.now();
        }
    }
};
// 定时器方法
const throttle = (fun, time, ...arg) => {
    let timeout = null;
    return () => {
        let context = this;
        if (!timeout) {
            timeout = setTimeout(() => {
                fun.apply(context, arg);
                timeout = null; // 到了一定时间才会去清除定时器。
            }, time)
        }
    }
};

// 深拷贝

// 语法： let proxy = new Proxy(obj, handler)
// proxy
let proxy = new Proxy({}, {
    get: (obj, prop) => {
        return obj[prop]
    },
    set: (obj, prop, value) => {
        obj[prop] = value;
    }
})
// 多达13种拦截操作。 has call apply

// watch 就是说，在set方法中，赋值完之后，再去调用函数。

// 单例模式
class Teacher {
    init = ()  => {
    }
}

Teacher.singleM = (() => {
    let instance = null;
    return () => {
        if (!instance) {
            instance = new Teacher();
        }
        return instance;
    }
})()

let t = Teacher.singleM();

// ajax
let xhr = new XMLHttpRequest();
xhr.open('get', url+'?'+params.data, true); // 第三个参数表示同步异步
xhr.send();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
  // resolve(xhr.response)
    }
}
xhr.onerror = () => {
    
}
// 如果是post
xhr.setRequestHeader('content-type', 'xxx-formdata')
xhr.send(data)
// jsonp
// 写一个脚本，script.src指向 url和参数。

// 原型继承
function Super0() {
    this.name = '1'
};
Super0.prototype.sayName = function() {
    return this.name;
}

function Sub0() {
    this.subName = '2'
}
Sub0.prototype = new Super0();// 指向

// 缺点：实例属性会共享；不能给构造函数传参数。
// 借用构造函数继承

function Super() {
    this.colors = ['red'];
}

function sub() {
    console.log(this)
    Super.call(this);
}

let s = new sub();
// 有点：可以给构造函数传参
// 缺点： 无法复用函数

// 组合继承 原型链-方法+构造函数继承-属性

function Super1() {
    this.colors = ['red'];
}
Super1.prototype.consoleColor = function() {

}
function Sub1() {
    Super1.call(this);
    this.age = age;
}

Sub1.prototype = new Super1();
Sub1.prototype.constructor = Sub1;
// 缺点： 两次调用了父类构造函数方法

// 寄生组合继承 Object.create
function Super2(value) {
    this.colors = value;
};
Super2.prototype.consoleColor = function() {};

function Sub2(value) {
    Super2.call(this, value);
}
Sub2.prototype = Object.create(Super2.prototype, {
    constructor: {
        value: Sub2,
        writable: true,
        configurable: true,
        enumberable: false
    }
});

// class继承
class Person {
    constructor(name) {
        this.name = name;
    };
    sayName() {
        console.log(this.value)
    }
};
class Child extends Person {
    constructor(name, age) {
        Super(name);
        this.age = age;
    }
    sayAge() {
        return this.age;
    }
}

// new的过程--结果就是产生一个对象
// 1. 创建一个对象
// 2. 因为要使用构造函数的属性和方法，所以要改造原型链
// 3. 会将构造函数的作用域赋给对象，所以对象会绑定函数调用的this
// 4. 执行构造函数中的代码，为对象添加属性和方法
// 5. 如果构造函数有对象，则返回对象，如果没有则返回该对象
function NewFun(Con, ...args) {
    let obj = {}; // 创建对象
    Reflect.setPrototypeOf(obj, Con.prototype); // 绑定原型
    let result = Con.apply(obj, args); // 绑定this// 因为参数被转为数组
    return result instanceof Object ? result : obj; // 返回结构
}

// 对象的比较

//  拷贝。JSON.parse(JSON.stringify()) 不能拷贝函数。
// 对象和数组的浅拷贝
function shallowCopy(obj) {
    if (!typeof obj === 'object') return false;
    let newObj = obj instanceof Array ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            newObj[key] = element;
        }
    }
    return newObj;
}
// 对象的深拷贝
function deepCopy(obj) {
    //
    newObj[key]  = typeof element === 'object' ? deepCopy(element) : element;
}
// 解决循环引用 - 利用key唯一
function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneObj = target instanceof Array ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneObj);
        for (const key in target) {
            if (target.hasOwnProperty(key)) {
               cloneObj[key] = clone(target[key], map)
            }
        }
        return cloneObj;
    } else {
        return target;
    }
}
// 考虑function 和 null

// 类型判断 
Object.prototype.toString.call(xx) // 12中 [object, Number]

function flatArrayOrObj(target) {
    let tempArr = [];
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            const element = target[key];
            if (typeof element === 'number') {
                tempArr.push(element)
            } else if (typeof element === 'object') {
                // 递归
                if (element.constructor === Number) {
                    tempArr.push(Number(element))
                } else {
                    tempArr = tempArr.concat(flatArrayOrObj(element));
                }
            }
        }
    }
    let newArr = [];
    for (let index = 0; index < tempArr.length; index++) {
        const element = tempArr[index];
        if (!newArr.includes(element)) {
            newArr.push(element)
        }
    }
    return newArr.sort((a, b) => a - b);
}

// 手写bind -- 改变this指向；函数执行时，this是bind的第一个参数，其余作为函数参数；也有可能在调用的时候传承那
Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new Error('bind must be function')
    }
    let fn = this;
    let args = Array.prototype.slice.call(arguments, 1);
    return function() {
        let bindArgs = Array.prototype.slice.call(arguments);
        return fn.apply(context, args.concat(bindArgs));
    }
}
// 完美版本 -- 解决构造函数调用问题

// bind会永久改变this指向；返回一个函数，提供给后来继续调用。
// apply和call临时改变this指向，会立即调用。

// 手写call -- 借助eval。挂载函数
Function.prototype.myCall = function(context) {
    context.fn = this;
    let args = []
    for (let index = 1; index < arguments.length; index++) {// 参数必须从1开始
        const element = arguments[index];
        args.push(`arguments[${index}]`)
    }
    eval('context.fn('+args+')');
    delete context.fn;
}

// 手写promise
// 三种状态 
// 两种函数 成功的函数-返回有一个值。失败的函数-返回有一个原因

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class myPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = '';
        this.reason = '';

        let resolved = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
            }
        }

        let rejected = (reason) => {
            this.status = REJECTED;
            this.reason = reason;
        }

        try {
            executor(resolved, rejected);
        } catch (error) {
            rejected(error)
        }
    }
    // 回调
    then(onFulFilled = () => {}, onRejected = () => {}) {
        if (this.status === FULFILLED) {
            onFulFilled(this.value);
        }
        if (this.status === REJECTED) {
            onRejected(this.reason);
        }
    }
}

new myPromise((resolve, reject) => {
    resolve('1')
}).then(v => {
    console.log(v);
})



// 数组去重
// for +  indexOf 或者includes 
// filter + indexOf（利用了index下标）
// Object 利用key唯一
// new Set()
// Map
let arr = [1,2,3,2,1,4];
function unique(arr) {
    let map = new Map();
    return arr.filter(item =>
        !map.has(item) && map.set(item, 1)
    )
}

//
Function.prototype.myApply = function(context) {
    context.fn = this;
    context.fn();
    delete context.fn;
}

let obj = {
    name: 'obj',
    getName: function() {
        console.log(this)
        return this.name
    }
}

let me = {name: 'me', age: 26}

obj.getName.myApply(me)