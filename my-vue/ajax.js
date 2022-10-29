// 使用promise和async await封装ajax
function formatParams() {            //原来要格式化参数
    let arr = [];
    for (let name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
        arr.push(('v=' + Math.random()).replace('.', ''))
        return arr.join('&')
    }
}

function ajax(options) {
    return new Promise((resolve,reject) => {
    options = options || {};
    options.method = options.method || 'get';    //默认为get
    options.async = options.async || true;       //默认为异步
    options.dataType = options.dataType || JSON;  //默认返回json
    options.timeout = options.timeout || 30*1000;
    let params = formatParams(options.data);      //请求的数据
    const xhr = new XMLHttpRequest;              
    if(options.method == 'get') {
        xhr.open('get',options.url + '?' + params,true);
        xhr.send(null);
    }else if(options.method == 'post') {
        xhr.open('post',options.url,true);
        xhr.setRequestHeader('www.baidu');                //请求头
        xhr.send(params);
    }
    xhr.onreadystatechange  = () => {
        if(xhr.readyState == 4){
            if(xhr.status>200 && xhr.status<300){
                resolve(xhr.responseText);               
            }else {
                reject(xhr.status);
            }
        }
    }
})
}

//使用案例
// ajax ({
//         url: 'http://localhost:3000/test_get',
//         method: 'get',
//         data: {
//           name: 'name',
//           age: 24,
//         },
//         async function (data) {
//           console.log(data, 'asdasdsa')
//         },
//       })
