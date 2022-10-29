var db = require('mongoose');  //对mongodb的一个封装模块
var express = require('express');   //对http模块的封装模块，提供了大量快速的语法
const cors = require('cors');
var app = express(); 
app.use(cors())
var link = db.createConnection('mongodb://localhost:27017/test5')
// 检验数据库是否连接成功
link.on("open", function (err) {
    if (!err) {
        console.log("数据库连接成功");
    } else {
        console.log(err);
    }
})
//创建集合Schema
var modelSchema = new db.Schema({
    cont: { type: String }
}, { collection: "msg" });
// 创建模型（model），第一个参数student代表模型的名称
var model = link.model("msg", modelSchema);


app.get("/update", function (req, res) {
    var count = req.query.cont;
    model.updateOne(
        { 'cont':'jjjjjj' },
        { 'cont': count },
        (err, docs) => {
            if (!err) {
                res.send(docs);
            }
        })
});
// 写接口
// app是初始化express得到的对象，.get()可以监听用户的get请求,第一个参数为路由，第二个参数为回调函数
app.get("/index", function (req, res) {
    var count = req.query.cont;  //query可以直接获取get请求传递的参数
    // model.creat方法用于对数据进行保存，也就是增，第一个参数是文档数据，第二个参数为回调函数
    model.create({ cont: count }, function (err, doc) {
        if (!err) {
            res.send(doc);
        }
    })
});
app.get("/delete", function (req, res) {
    var count = req.query.cont;
    model.deleteOne(
         {cont: count} ,
        (err, docs) => {
            if (!err) {
                res.send(docs);
            }
        })
});
app.get("/inquire", function (req, res) {
    var count = req.query.cont;
    model.find(
        { cont: count },
        (err, docs) => {
            if (!err) {
                res.send(docs);
            }
        })
});

app.listen(7676);//端口号

app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();
});



