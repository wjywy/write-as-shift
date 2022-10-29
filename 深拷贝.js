// 手写深拷贝

function deepClone(source) {
    if (source instanceof Object) {
        let dist;
        if (source instanceof Array) {        //是否是数组
            dist = new Array();
        } else if (source instanceof Function) {   //是否是函数
            dist = function () {
                return source.apply(this, arguments);
            }
        } else if (source instanceof Date) {      //是否是日期对象
            dist = new Date();
        } else {
            dist = new Object();                 //普通对象
        }
        for (let key in source) {
            if (source.hasOwnProperty(key)) {      //返回一个布尔值，用于判断自身属性中是否含有指定的键，会忽略原型上的属性         
                dist[key] = deepClone(source[key]);
            }
        }
        return dist;
    }
    return source;               //基本类型
}






function deepClone(source) {
    if(source instanceof Object) {
        let result;
        if(source instanceof Array) {
            result = new Array();
        }else if(source instanceof Object) {
            result = new Object();
        }else if(source instanceof Function) {
            result = function() {
                return source.apply(this,arguments);
            }
        }else {
            result = new Date();
        }
        for(let key in source) {
            if(source.hasOwnProperty(key)) {
                result[key] = deepClone(source[key])
            }
        }
    }else {
        return source;
    }
}