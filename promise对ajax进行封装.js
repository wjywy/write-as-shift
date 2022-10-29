let p = new Promise((resolve,reject)=> {
    let xhr = new XMLHttpRequest();
    xhr.open('GET','http://api.apiopen.top/getJoke');
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4) {
            if(xhr.status>=200&&xhr.status<300) {
                resolve(xhr.response)
            }else {
                reject(xhr.status)
            }
        }
    }
})
//对函数进行回调
p.then(function(yes) {
    console.log(yes);
},function(no) {
    console.error(no);
})























