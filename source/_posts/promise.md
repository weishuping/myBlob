---
title: promise执行问题
date: 2019-07-20 10：00
tags: promise
---

#### 问题：

给data中的变量rowList赋值filters一次，但是watch rowList的时候，发现走了rowList.length;
<!--more-->
因为filter在三个顺序发生的promise内部中又调用了new promise.但是内部的promise是异步的 而且更改了指向同一个引用的这个变量，rowList变化了多少次，watch走几次。

测试：
```
    async function fun() {
             child1();
             child2();
            console.log('3')
        }
        function child1() {
            // console.log('1')
            new Promise(function(resolve) {
                resolve('1111')
            }).then(function(res){
                console.log(res)
            })
        }
        function child2() {
            // console.log('2')
new Promise(function(resolve) {
                resolve('2222')
            }).then(function(res){
                console.log(res)
            })
        }
```

```
3
1111
2222
```

使用await, 顺序发生
```
async function fun() {
            await child1();
            await child2();
            console.log('3')
        }
        function child1() {
            // console.log('1')
            new Promise(function(resolve) {
                resolve('1111')
            }).then(function(res){
                console.log(res)
            })
        }
        function child2() {
            // console.log('2')
new Promise(function(resolve) {
                resolve('2222')
            }).then(function(res){
                console.log(res)
            })
        }
```


复杂一点
```
 function allFun() {
    let result = Promise.all([fun1(), fun2()]);
    result.then(function(data) {
        console.log('all', data)
    })

}
function fun1() {
    return new Promise( (resolve, reject) => {
        // this.getOlapRowList();
        this.inner1();
        console.log('fun1');
        resolve(1);
    });
}
function fun2() {
    return new Promise((resolve, reject) => {
        // this.getOlapColumnList();
        this.inner2();
        console.log('fun2');
        resolve(2);
    });
}
var arr= ['a', 'b']
function testPromise() {
    return new Promise(function(resolve, reject) {
        resolve()
        })
}
function inner1() {
    arr.forEach((element, index) => {
        //
        testPromise().then(function(res){
            if(index ===0) {
                element = '000'
            console.log('1 change'+element)

            }
        })
    });
    console.log('111', arr[0])
}

function inner2() {
    arr.forEach(element => {
        //
        testPromise().then(function(res){
            console.log('2'+element)
        })
    });
    console.log('222')

}
```

```
    allFun()
VM231002:41 111 a
VM231002:12 fun1
VM231002:51 222
VM231002:20 fun2
VM231002:36 1 change000 // 后改了arr的值
VM231002:48 2a
VM231002:48 2b
VM231002:4 all (2) [1, 2]
```
// forEach之后才输出
```
function allFun() {
            let result = Promise.all([fun1(), fun2()]);
            result.then(function(data) {
                console.log('all', data)
            })
    
        }
        function fun1() {
            return new Promise( (resolve, reject) => {
                // this.getOlapRowList();
                this.inner1();
                console.log('fun1');
                resolve(1);
            });
        }
        function fun2() {
            return new Promise((resolve, reject) => {
                // this.getOlapColumnList();
                this.inner2();
                console.log('fun2');
                resolve(2);
            });
        }
        var arr= [{a:1}, {a:2}]
        function testPromise() {
            return new Promise(function(resolve, reject) {
                resolve()
                })
        }
        function inner1() {
            new Promise(function(r){
                 arr.forEach( async (element, index) => {
                    //
                     await testPromise().then(function(res){
                        if(index ===0) {
                            element.a = '000'
                            console.log('1 change',arr)
                        }
                        if(index ===1 ) {
                        }
                    })
                });
r(arr)
            
            
            }).then(function(res){
                console.log('111', arr[0])

            })
            // arr.forEach((element, index) => {
            //     //
            //     testPromise().then(function(res){
            //         if(index ===0) {
            //             element = '000'
            //             console.log('1 change'+element)

            //         }
            //     })
            // });
            // console.log('111', arr[0])
        }

        function inner2() {
            arr.forEach(element => {
                //
                testPromise().then(function(res){
                    console.log('2',element)
                })
            });
            console.log('222')

        }
```

```
fun1
VM232493:70 222
VM232493:20 fun2
VM232493:37 1 change (2) [{…}, {…}]0: {a: "000"}1: {a: 2}length: 2__proto__: Array(0)
VM232493:47 111 {a: "000"}
VM232493:67 2 {a: "000"}
VM232493:67 2 {a: 2}
VM232493:4 all (2) [1, 2]
```