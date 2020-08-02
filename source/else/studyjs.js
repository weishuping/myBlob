// 写一个 mySetInterVal(fn, a, b),
// 每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

let timerId = mySetInterval(() => {console.log('test')}, 2000, 2000)
function mySetInterval(fn, a, b) {
    let index = 0;
    let times = [a, a + b, a + 2*b];

    let timerFun = t => {
        console.log(t)
        let id = setInterval(() => {
            if (index > times.length - 1) {
                return false
            } else {
                fn();
                clearInterval(id)
                timerFun(times[++index])
                console.log(index, 'index')
            }
        
        }, t);
        return id;
    }
    // return timerFun(times[index])
}


// 初版
function logText(a, b, i = 0) {
    if (i > 2) {
        return false
    }
    let times = [a, a + b, a + 2*b];
        let id = setInterval(() => {
            console.log(i)
            clearInterval(id)
            logText(a, b, ++i)
        }, times[i]);
}
logText(2000, 2000)

// async
function await1() {
    console.log('await1')
}
function await2() {
    console.log('await2')
}
// function timeout(ms) {
//     return new Promise(resolve => {
//         resolve('done');
//     })
// }

async function async1() {
    await await1();
    await await1();
    return '1'
}

async1().then(str => {
    console.log(str)
})
// 求斐波那切数列第n项
getFibo = (n) => {
    if (n ===1 || n===2) {
        console.log(n)
        return n;
    }
    return getFibo(n - 1) + getFibo(n - 2)
}
// 字符串中最长无重复长度


