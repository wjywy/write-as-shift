function flat(arr) {
    let result = [];
    for(let i = 0;i<arr.length;i++) {
        if(arr[i] instanceof Array) {
            result = result.concat( flat(arr[i]))
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

let arr = [3,[4,5,6],7];
console.log(flat(arr));  