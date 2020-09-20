const mongoose = require('mongoose')
    // mongoose.connect('mongodb://localhost:27017/Product', { useNewUrlParser: true })
var db = mongoose.createConnection('mongodb://localhost:27017/Product', { useNewUrlParser: true }) //连接多个数据库
mongoose.set('useFindAndModify', false)

const Schem = mongoose.Schema
var productSchema = new Schem({
    name: {
        type: String,
        default: ''
    },
    Img: {
        type: String,
        default: 'http://127.0.0.1:3000/public/avatar/default-avatar.png'
    },
    dollar: {
        type: Number,
        default: 0
    },
    type: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
})

module.exports = db.model('Product', productSchema)