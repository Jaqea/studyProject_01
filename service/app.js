//引入核心模块
const express = require('express')
const template = require('art-template')
const bodyParser = require('body-parser')
const app = express()
const router = require('./routers')
const session = require('express-session') //引入第三方中间件express-session来记录登录状态

//配置模板引擎和表单提交
app.engine('vue', require('express-art-template'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/public/', express.static('./public/'))
app.get('/', function(req, res) {
    res.send('hello world')
})
app.use(bodyParser.json())

//允许指定域名跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:8080')
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    res.header('Access-Control-Allow-Credentials', 'true') //允许携带cookie
    next()
})

//配置express-session 一定要在挂载路由之前
app.use(session({
    secret: 'secret', //配置加密字符串 在原有的基础上拼起来
    resave: false,
    saveUninitialized: true, //无论是否使用session，默认分配一把钥匙
    cookie: { maxAge: 10000 * 60 * 3 }
}))

//挂载路由
app.use(router)









app.listen(3000, function() {
    console.log('http://127.0.0.1:3000')
})