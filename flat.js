// 数组扁平化

function flat(arr) {
    let result = [];
    for(let i = 0;i<arr.length;i++) {
        if(arr[i] instanceof Array) {
            result = result.concat(flat(arr[i]));
        }else {
            result.push(arr[i]);
        }
    }
    return result;
}
let arr = [2,3,[3,4],5,6]
console.log(flat(arr)) 






// function flat(arr) {
//     if(arr instanceof Array) {
//         let result = [];
//         for(let i = 0;i<arr.length;i++) {
//             if(arr[i] instanceof Array) {
//                 result = result.concat(flat(arr[i]));
//             } else {
//                 result.push(arr[i]);
//             }
//         }
//     }else {
//         console.log("不是数组");
//     }
// }