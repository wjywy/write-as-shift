// promise.all的用法：
// 1.合成的期约只会在每个包含的期约都解决之后才解决
// 2.如果至少有一个包含的期约待定，则合成的期约也会待定。如果有一个包含的期约拒绝，则合成的期约也会拒绝
// 3.如果所有期约都成功解决，则合成期约的解决值就是所有包含期约解决值的数组
// 4.如果有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由

function isPromise(x) {                                   // 校验是否是 promise 
    if ((typeof x == 'object' && x !== null) || typeof x == 'function') {
        if (typeof x.then == 'function') {
            return true
        }
    }
    return false
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let arr = []
        let idx = 0                           // 执行个数
        let dealProcess = (val, index) => {          
            arr[index] = val
            if (++idx == promises.length) {
                resolve(arr)
            }
        }
        promises.forEach((item, i) => {
            if (isPromise(item)) {
                item.then(y => {
                    dealProcess(y, i)
                }, reject)
            } else {
                dealProcess(item, i)
            }
        });
    })
}

