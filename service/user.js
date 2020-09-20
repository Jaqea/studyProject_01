const mongoose = require('mongoose')
    //连接数据库
    // mongoose.connect('mongodb://localhost:27017/User', { useNewUrlParser: true })
var db = mongoose.createConnection('mongodb://localhost:27017/User', { useNewUrlParser: true }) //连接多个数据库
mongoose.set('useFindAndModify', false); //修复警告
const Schema = mongoose.Schema
    //设计集合架构
var userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: 'http://127.0.0.1:3000/public/avatar/default-avatar.png'
    },
    bio: { //介绍
        type: String,
        default: ''
    },
    sex: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: String,
        // status: {
        //     type: Number,
        //     // 0 没有权限限制
        //     // 1 不可以评论
        //     // 2 不可以登录使用
        //     enum: [0, 1, 2],
        //     default: 0
        // }
        default: ''
    },
    cart: {
        type: Array,
        default: []
    }
})

module.exports = db.model('User', userSchema)