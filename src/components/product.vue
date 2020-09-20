<template>
    <div class="product">
        <div class="product-img">
            <img :src="Img" alt="这是一张商品图片">
        </div>
        <div class="product-content">
        <h2>{{name}}</h2>
        <p><span>单价：</span><span>${{dollar}}</span></p>
        <div><span>购买数量：</span><InputNumber :max="10" :min="1" v-model="buyNum"></InputNumber></div>
        <a @click="getJoin" href="javascript:;" class="join ivu-btn ivu-btn-primary">加入购物车</a>
        <p>总共：<span>{{total}}元</span></p>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
const qs=require('qs')
    export default {
        name: 'product',
        data() {
            return {
                name:JSON.parse(window.localStorage.getItem('product')).name,
                Img:JSON.parse(window.localStorage.getItem('product')).Img,
                dollar:JSON.parse(window.localStorage.getItem('product')).dollar,
                buyNum:1
            }
        },
        methods:{
            getJoin(){
                let self=this
                Axios.post('http://127.0.0.1:3000'+'/join',qs.stringify({
                    'name':self.name,
                    'Img':self.Img,
                    'dollar':self.dollar,
                    'buyNum':self.buyNum
                })).then(function(res){
                    let err_code=res.data.err_code
                    if(err_code==500){
                        window.alert('服务器繁忙，请稍后再试')
                    }else if(err_code==1){
                        window.alert('该商品已经在您的购物车中了哦！')
                    }else if(err_code==0){
                        window.sessionStorage.removeItem('user')
                        window.sessionStorage.setItem('user',JSON.stringify(res.data.user))
                        location.reload()
                    }
                }).catch(function(error){
                    console.log(error)
                })
            }
        },
        computed:{
            total:function(){
                return this.dollar*this.buyNum
            }
        },
    }
</script>

<style lang="less" scoped>
.product{
    display: flex;
    justify-content: center;
    width: 70%;
    height: 400px;
    margin: 0 auto;
    margin-top: 30px;
    color: #797572;
}
h2{
    height: 50px;
    font-weight: 400;
    padding: 0 35px;
}
.product-img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    margin-top: 50px;
    margin-right: 20px;
}
.product-img>img{
    width: 250px;
    height: 250px;
}
.product-content{
    width: 300px;
    height: 300px;
    margin-top: 50px;
    font-size: 14px;
}
.product-content>p{
    display: flex;
    align-items: center;
    padding: 0 35px;
    font-size: 14px;
}
.product-content>p>span:last-child{
    color: #e66761;
    line-height: 1; 
    font-size: 20px;
    font-weight: bold;
}
.product-content>div{
    padding-left:35px;
    margin-top: 30px;
}
.join{
  background-color:#e66761;
  color: #fff;
}
.join:hover{
    background-color: #eb8581;
}
.join:focus{
    border-color: #eb8581;
}
.ivu-btn{
    margin-left: 35px;
    margin-top: 30px;
    line-height: 1.5;
    padding: 5px 14px 6px;
    font-weight: 400;
    border-radius: 5px;
    transition: all 0.3s ease;
}
.product-content>p:last-child{
    padding: 0 35px;
    margin-top: 30px;
}
.product-content>p:last-child span{
    color: #e66761;
    font-size: 20px;
    font-weight: 300;
}
</style>