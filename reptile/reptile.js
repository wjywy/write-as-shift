// var http = require('https') // Node.js提供了http模块，用于搭建HTTP服务端和客户端
// var url = 'https://juejin.cn/post/7108719346947457054' //输入任何网址都可以
 
// http.get(url,function(res){  //发送get请求
//   var html=''
//   res.on('data',function(data){
//     html += data  //字符串的拼接
//   })
//   res.on('end',function(){
//     console.log(html)
//     })
// }).on('error',function(){
//   console.log('获取资源出错！')
// })



// var http = require('https') // Node.js提供了http模块，用于搭建HTTP服务端和客户端
// var url = 'https://juejin.cn/post/7108719346947457054' //输入任何网址都可以
// var cheerio = require('cheerio') // 抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现
// const { title } = require('process')
// var html=''
// http.get(url,function(res){  //发送get请求
  
//   res.on('data',function(data){
//     html += data  //字符串的拼接
//   })
//   res.on('end',function(){
//     var courseData = filterChapters(html)
//     console.log('courseData', courseData)
//   })
// }).on('error',function(){
//   console.log('获取资源出错！')
// })

// function filterChapters() {
//   var $ = cheerio.load(html)  // 加载需要的html
//   var chapters = $('.entry-list list')  //在html里寻找需要的资源的class
//   var courseData = [] // 创建一个数组，用来保存资源
//   chapters.each(function(item, index) {  //遍历html文档
//       var chapter = $(this)
//       var author = chapter.children('a').attr('.popover-box user-popover') 
//       var date = chapter.children('.date').text();
//       var tag = chapter.children('.tag').text();
//       var title = chapter.children('.title').text();
//       var abstract = chapter.children('.abstract').text();
//       courseData.push({
//         author: author,
//         date:date,
//         tag:tag,
//         title:title,
//         abstract:abstract
//       })
//   })
//   console.log(courseData);
//   return courseData //返回需要的资源
// }






















// const axios = require("axios");
// const cheerio = require("cheerio");
// const acorn = require("acorn");
// const MarkdownIt = require('markdown-it'), md = new MarkdownIt();

// let url = "https://juejin.cn/post/7111718092161417229";

// axios.get(url).then((res) => {
//   const $ = cheerio.load(res.data);
//   let str = $("body script")[0].children[0].data;
//   let ast = acorn.parse(str, { ecmaVersion: 2020 });
//   if (ast) {
//     let ps =
//       ast.body[0].expression.right.callee.body.body[0].argument.properties;
//     let state = ps.find((item) => item.key.name == "state");
//     let view = state.value.properties.find((item) => item.key.name == "view");
//     let column = view.value.properties.find(
//       (item) => item.key.name == "column"
//     );
//     let entry = column.value.properties.find(
//       (item) => item.key.name == "entry"
//     );
//     let article_info = entry.value.properties.find(
//       (item) => item.key.name == "article_info"
//     );
//     let mark_content = article_info.value.properties.find(
//       (item) => item.key.name == "mark_content"
//     );
//     let result = md.render(mark_content.value.value);
//     console.log('文章内容html', result)
//   }
// });






// var eventproxy = require('eventproxy');
// var superagent = require('superagent');
// var cheerio = require('cheerio');
// // url 模块是 Node.js 标准库里面的
// // http://nodejs.org/api/url.html
// var url = require('url');

// var cnodeUrl = 'https://juejin.cn/recommended'

// superagent.post(cnodeUrl)
//   .end(function (err, res) {
//     if (err) {
//       return console.error(err);
//     }
//    var array1 = JSON.parse(res.text).data.articleFeed.items.edges
//    var num = JSON.parse(res.text).data.articleFeed.items.pageInfo.endCursor
//     var topicUrls = [];
//     var $ = cheerio.load(res.text);
//     // 获取首页所有的链接
//     $('#article_id').each(function (idx, element) {
//       var $element = $(element);
//       // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
//       // 我们用 url.resolve 来自动推断出完整 url，变成
//       // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
//       // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
//       var href = url.resolve(cnodeUrl, $element.attr('href'));
//       topicUrls.push(href);
//     });
//     console.log(array1);
//     console.log(num);
//     console.log(topicUrls);
//   });





// const { json } = require('body-parser');
// const requests = require('request');
// let headers ={'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36'}
// let url = 'https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=7086321698597045775';
// let res_article = requests.post(url,headers=headers);
// let json_article = res_article.json();
// let list_article = json_article['data']['item_info']['article_info'][0]['brief_content']['title'];
// console.log(list_article);


// const axios = require("axios");
// const cheerio = require("cheerio");
// // csdn文章地址（地址栏）
// let url =
//   "https://blog.csdn.net/m0_49159526/article/details/125400468?spm=1001.2014.3001.5501";

// // 获取文章内容
// const getContent = ($) => $("#content_views").html();
// // 获取博客
// const getBlog = async (url) => {
//   let { data } = await axios.get(url);
//   let $ = cheerio.load(data);
//   let articleHtml = getContent($);
//   console.log("文章内容html", articleHtml);
// };
// getBlog(url);






// const fs = require('fs')
// const axios = require("axios");
// const url = 'https://web-api.juejin.im/query'
// const param = {
//   extensions: {
//     query: {
//       id: '21207e9ddb1de777adeaca7a2fb38030'
//     }
//   },
//   operationName: "",
//   query: "",
//   variables: {
//     first: 20,
//     after: "",
//     order: "POPULAR"
//   }
// }
// async function testPost() {
//   let response = await axios({
//     method: "POST",
//     headers: {
//       'X-Agent': 'Juejin/Web',
//       'Accept': '*/*',
//       'Content-Type': 'application/json',
//       'Host': 'web-api.juejin.im',
//       'Origin': 'https://juejin.im',
//       'Referer': 'https://juejin.im/',
//       'Sec-Fetch-Dest': 'empty',
//       'Sec-Fetch-Mode': 'cors',
//       'Sec-Fetch-Site': 'same-site',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
//     },
//     url: url,
//     data: JSON.stringify(param)
//   })
//   console.log(response.data)
//   writefile(response.data, 'index')
// }
// testPost()

// writefile = function (result, fileName) {
//   fs.writeFile(`./${fileName}.json`, JSON.stringify(result), { 'flag': 'a' }, function(err) {
//       if(err) throw err
//       console.log('写入成功')
//   })
// }




// const axios = require("axios");
// const cheerio = require("cheerio");
// const acorn = require("acorn");
// const MarkdownIt = require('markdown-it'), md = new MarkdownIt();

// let url = "https://juejin.cn/post/7111718092161417229";

// axios.get(url).then((res) => {
//   const $ = cheerio.load(res.data);
//   let str = $("body script")[0].children[0].data;
//   let ast = acorn.parse(str, { ecmaVersion: 2020 });
//   if (ast) {
//     let ps =
//       ast.body[0].expression.right.callee.body.body[0].argument.properties;
//     let state = ps.find((item) => item.key.name == "state");
//     let view = state.value.properties.find((item) => item.key.name == "view");
//     let column = view.value.properties.find(
//       (item) => item.key.name == "column"
//     );
//     let entry = column.value.properties.find(
//       (item) => item.key.name == "entry"
//     );
//     let article_info = entry.value.properties.find(
//       (item) => item.key.name == "article_info"
//     );
//     let mark_content = article_info.value.properties.find(
//       (item) => item.key.name == "mark_content"
//     );
//     let result = md.render(mark_content.value.value);
//     console.log('文章内容html', result)
//   }
// });


















// const https = require("https");
// const cheerio = require("cheerio")
// const fs = require("fs")
// const express = require('express');
// let app = new express();
// const wz = "https://juejin.cn/";
// app.get('/p', (req, res) => {								   		//定义路由
//     (async () => {
//         try {
//             const response = await got('https://news.baidu.com/');   //想抓取的网址
//             let $ = cheerio.load(response.body)                      //获取网址的DOM结构
//             let result = $('#pane-news li a')                        //想抓取的部位
//             let news = []                                            //定义新闻数组
//             result.each((index, item) => {                           //循环抓取的内容
//                 news.push($(item).text())                            //循环添加到数组中 
//                 fs.writeFileSync('./news.txt', $(item).text()+'\n', {flag: 'a'}) //写入文件中
//             }) 
//             res.send(news)                                           //显示在页面上
//         } catch (error) {
//             console.log(error);
//         }
//     })();
//  })
//  //打开服务器端口
//  app.listen(3001, () => {
//     console.log('http://localhost:3001')
//  })





// const https = require("https");
// const cheerio = require("cheerio")
// const fs = require("fs")

// const url = "https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=7086321698597045775";


// // 获取数据
// https.get(url, res => {
//     // 成功的回调函数

//     // 打印状态码
//     // console.log("res.statusCode:", res.statusCode);

//     // 初始化数据字符串
//     let data = "";
//     // 监听发送
//     res.on("data", chunk => {
//             // console.log("chunk:", chunk);
//             data += chunk;
//             console.log(data);
//         })
//         // 数据收集完毕
//     res.on("end", () => {
//         let $ = cheerio.load(data);
//         // 使用f12控制台找出标题，再用jQuery语法匹配
//         $("main ul.feedlist_mod li .list_con h2 a").each(function() {
//             // 打印对应的href
//             console.log($(this).attr("href"))
//         })
//     })
// }).on("error", err => {
//     // 失败的回调函数
// })

// // 封装方法
// function httpsGet(url, callback) {
//     https.get(url, res => {
//         let data = "";

//         res.on("data", (chunk) => {
//             data += chunk;
//         })
//         res.on("end", () => {
//             let $ = cheerio.load(data);
//             callback($)
//         })
//     }).on("error", (err) => {
//         console.log(err.message);
//     })
// }
// // 调用方法
// httpsGet(url, function($) {
//     $("main ul.feedlist_mod li .list_con h2 a").each(function() {
//         let blogUrl = $(this).attr("href");
//         httpsGet(blogUrl, function($) {
//             // 打印所有的文章内容
//             console.log($("#article_content").text());
//             // 文章标题
//             let title = $("main div.blog-content-box .article-header-box .article-header div.article-title-box .title-article").text();
//             // 文章内容
//             let content = $("#article_content").text();
//             // 写入本地
//             fs.writeFileSync(`./blog/${title}.txt`, content)
//         })
//     })
// })


// 定义一个函数，用来获取掘金首页前端文章信息





const superagent = require('superagent');
function getInfo () {
  // 利用superagent 模块发送请求，注意请求头的设置和POST请求体数据（请求参数）
  superagent.post('https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=7086321698597045775').send(params).set('X-Agent', 'Juejin/Web').end((err, res) => {
    if (err) {
      return console.log(err)
    }
    // 保存所有文章信息
    const array1 = JSON.parse(res.text).data.articleFeed.items.edges
    const num = JSON.parse(res.text).data.articleFeed.items.pageInfo.endCursor
    // 筛选出点赞数大于 50 的文章
    result = array1.filter(item => {
      return item.node.likeCount > 50
    })
    params.variables.after = num.toString()
    superagent.post('https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=7086321698597045775').send(params).set('X-Agent', 'Juejin/Web').end((err, res) => {
      if (err) {
        return console.log(err)
      }
      const array2 = JSON.parse(res.text).data.articleFeed.items.edges
      const result2 = array2.filter(item => {
        return item.node.likeCount > 50
      })
      result2.forEach(item => {
        result.push(item)
      })
    })
  })
}
// 调用一次获取数据
getInfo()

// 设置定时器，规定10分钟更新一此数据
setInterval(() => {
  getInfo()
}, 10*1000*60)
