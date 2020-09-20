在mongodb/data/bin目录下运行mongod.exe -dbpath C:\data\db -journal -storageEngine=mmapv1


mongo 连接数据库
exit 退出连接

基本命令：
show dbs： 查看显示所有数据库
db: 查看当前操作的数据库
use 数据库名称：切换到指定的数据(如果没有会新建) 


使用mongooes来进行数据CRDU操作 yarn add mongooes -D 
然后：
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));/kitty.save(function(err){
    if(err){
        console.log(err)
    }else{
        console.log('meow')
    }
})