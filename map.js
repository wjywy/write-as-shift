// map方法：循环遍历数组每一项
Array.prototype.myMap = function myMap(fn) {               //将此方法挂载到原型上
    let newArray = [];
    for (let i = 0; i < this.length; i++) {
        let f = fn.call(this[i], i, this);                 //依次为数组下标，数组值，所指数组
        newArray.push(f);
    }
    return newArray;
}



Array.prototype.getarray = function getarray(fn,arr) {
    if(arr instanceof Array) {
        let result = [];
        for(let i = 0;i<arr.length;i++) {
            result.push(fn.call(arr[i],i,arr))
        }
        return result;
    }else {
        console.log('arr不是数组')
    }
}



Array.prototype.getarray = function getarray(fn,arr) {
    if(arr instanceof Array) {
        let result = [];
        for(let i = 0;i<arr.length;i++) {
            result.push(fn.call(arr[i],i,arr));
        }
    } else {
        console.log("不是数组");
    }
}