const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建UserSchema，包含姓名、邮箱、密码、头像、创建日期
// 其中，姓名、邮箱、密码是必需的
const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profilePicture:{
        type:String
    },
    Date:{
        type:Date,
        default:Date.now()
    }
})

// 将UserSchema开放出去，别名users
module.exports = User = mongoose.model("users",UserSchema)
