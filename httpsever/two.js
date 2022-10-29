const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('server running on port ${port}');
}) 
app.get('/',(req,res)=>{
    res.end('hello world');
})


// 引入mongoose和body-parser，并连接MongoDB
const mongoose = require('mongoose');
//引入刚刚创建的数据库
const db = require('../config/key').mongoURI;
// 引入bodyparser，用于执行post操作
const bodyParser = require('body-parser');
// 连接MongoDB
mongoose
.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> {console.log("mongodb connected")})
.catch(err => console.log(err))


//测试post操作下与MongoDB的连接
const users = require('../routers/api/User');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// 使用中间件
app.use("/routers/api/users",users);


router.get('/getUserMsg',(req,res)=>{
    User.findOne({name:"ccy"})
    .then((user) => {res.json(user)})
})
