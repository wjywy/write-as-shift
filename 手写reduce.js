Array.prototype.myReduce = function(fn,initData) {   //接受两个参数，一个是累加器方法，一个是初始化值
    if(!this.length) return;     //如果数组为空，直接返回
    let hasInit = initData !== undefined;
    let total = hasInit ? initData : this[0];
    for(let i = hasInit ? 0 : 1;i<this.length;i++) {
        total = fn(total,this[i],i,this)
    }
    return total;
}

let arr = [1,2,3,4,6].myReduce((preves,item) => preves + item)
console.log(arr);   //输出为16

// let arr = [[1,2],[3,4],[5,6]].myReduce((preves,item) => preves.concat(item),[]);
// console.log(arr);     //输出为[1,2,3,4,5,6]

