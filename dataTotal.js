//插入多条数据
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    dbo.collection("site").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});

// 增
// var mongoClient = require('mongodb').MongoClient;     
// var url = "mongodb://localhost:27017/";      mongodb://是必填内容
// mongoClient.collect(url,function(err,db) {
//     if(err)throw err;
//     var dbo = db.db('runoob');
//     var myobj = {name:邓紫棋,age:190};
//     dbo.collection("site").insertOne(myobj,function(err,res) {
//         if(err)throw err;
//         console.log("插入成功");
//         db.close();
//     })
// })

//删
// var mongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/";
// mongoClient.collect(url,function(err,db) {
//     if(err)throw err;
//     var dbo = db.db("runoob");
//     var myObj = {name:白梦妍,age:120};
//     dbo.collection("site").deleteOne(myObj,function(err,res) {
//         if(err)throw err;
//         console.log("删除成功");
//         db.close();
//     })
// })

// 查
// var mongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// mongoClient.collect(url,function(err,db) {
//     if(err) throw err;
//     var dbo = db.db("runoob");
//     dbo.collection("site").find().toArray(function(err,result) {
//         if(err) throw err;
//         console.log(result);
//         db.close();
//     })
// })

// 改
// var mongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/";
// mongoClient.collect(url,function(err,db) {
//     if(err) throw err;
//     var dbo = db.db("runoob");
//     myObj = {"name":白梦妍};
//     newObj = {"age":99};
//     dbo.collection("site").updateOne(myObj,newObj,function(err,res) {
//         if(err) throw err;
//         console.log("文档更新成功");
//         db.close();
//     })
// })