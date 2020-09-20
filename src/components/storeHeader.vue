<template>
    <Row>
    <Col span="24" type='flex' justify='center' align='middle'>
    <div class="login-register">
    <div class="login-register-nav">
    <div class="layout-logo">
    <router-link to="/store">
    <img src="../assets/images/img/logo.png" alt="这是logo图片">
    <span>tore</span>
    </router-link>    
    </div>  
    <Breadcrumb><router-link to="/store/licenses">Licenses</router-link>
    <span class="ivu-breadcrumb-item-separator">/</span>
    <a class="dotA" @click="modal=true" href="javascript:;"><Icon type="ios-cart-outline" size='24'/>
    <Badge :count="count" overflow-count='10'></Badge></a>
    <Modal
        v-model="modal"
        @on-cancel="cancel"
        :footer-hide="true"
        :scrollable="true"
        :mask-closable="false"
        >
        <p slot="header">购物车</p>
        <div v-for="(product,index) in products" class="cart">
            <div class="things-switch">
               <i-switch v-model="product.switch"></i-switch>
             </div>
            <div class="things-content">
                <img :src="product.Img" alt="这是一张商品图片">
                <div>
                    <span>{{product.name}}</span>
                    <p>${{product.dollar}}</p>
                </div>
            </div>
            <div class="things-footer">
                 <InputNumber :min='1':max='10' v-model="product.buyNum" size="small"></InputNumber>
                 <a @click="getRemove(index,$event)" href="javascript:;">删除</a>
            </div>
        </div>
        <div class="total">
            <div class="total-price">
                <p>已勾选商品<span>{{totalNum}}</span>件，总价：<span>${{totalPrice}}</span></p>
            </div>
            <div>
            <a href="javascript:;" class="settle ivu-btn ivu-btn-primary">去结算</a>
            </div>
        </div>
        </Modal>
        </Breadcrumb>
        <div class="layout-nav">
        <Breadcrumb>
        <div>
        <router-link to="/store" ><img :src="userImg" alt="这是一个用户头像">
        </router-link>
        <Dropdown trigger="click" placement="bottom-start" style="margin-left: 10px">
        <a href="javascript:void(0)">
        <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
        <DropdownItem><router-link tag="span" to="/store/settings"><Icon type="ios-settings"/>Your Settings</router-link></DropdownItem>
        <DropdownItem><Icon type="ios-log-out"/><span @click="logout">Logout</span></DropdownItem>
        </DropdownMenu>
        </Dropdown>
        </div>
        </Breadcrumb>
        </div>
       </div>
       </div>
    </Col>
    </Row>
</template>

<script>
import Axios from 'axios';
const qs=require('qs')
    export default {
        name: 'storeHeader',
        data() {
            return {
                userImg:'',
                modal:false,
                products:'',
            }
        },
        methods:{
            logout:function(){
                Axios.get('http://127.0.0.1:3000'+'/logout').then(function(res){
                    var err_code=res.data.err_code
                    if(err_code==0){
                    window.sessionStorage.removeItem('status')
                    window.sessionStorage.removeItem('user')
                    window.localStorage.removeItem('product')
                    document.location.href='/'
                    }
                }).catch(function(error){
                    console.log(error)
                })
            },
            cancel () {
                this.$Message.info('您已回到客户端');
            },
            change(){

            },
            getRemove(index,e){
                let self=this
                Axios.post('http://127.0.0.1:3000'+'/removeProduct',qs.stringify({
                    'name':self.products[index].name,
                    'Img':self.products[index].Img,
                    'dollar':self.products[index].dollar,
                    'buyNum':self.products[index].buyNum
                })).then(function(res){
                    let err_code=res.data.err_code
                    if(err_code==500){
                        window.alert('服务器繁忙,请稍后再试')
                    }else if(err_code==0){
                        window.sessionStorage.removeItem('user')
                        window.sessionStorage.setItem('user',JSON.stringify(res.data.user))
                        self.products.splice(index,1)
                    }
                })
                
            }
        },
        created(){
            this.userImg=JSON.parse(window.sessionStorage.getItem('user')).avatar
            let cart=JSON.parse(window.sessionStorage.getItem('user')).cart
            for(let i=0;i<cart.length;i++){
                cart[i].buyNum=parseInt(cart[i].buyNum)
                cart[i].switch=true
            }
            this.products=cart
        },
        computed:{
            totalNum:function(){
                let sum=0
                for(let i=0;i<this.products.length;i++){
                    if(this.products[i].switch){
                    sum+=parseInt(this.products[i].buyNum)
                    }
                }
                return sum
            },
            totalPrice:function(){
                let sum=0
                for(let i=0;i<this.products.length;i++){
                    if(this.products[i].switch){
                    sum+=parseInt(this.products[i].dollar)*parseInt(this.products[i].buyNum)
                    }
                }
                return sum
            },
            count(){
                return this.products.length
            }
        }
    }
</script>

<style lang="less" scoped>
@import url('../assets/css/logo.css');
.login-register{
   width: 100%;
   height: 72px;
   border-bottom:1px solid #e1dbd0;   
   background-color: #fff;
}
.login-register-nav{
    position: relative;
    display: flex;
    align-items: center;
    width: 1200px;
    height: 100%; 
}
.ivu-breadcrumb{
    height: 72px;
    line-height: 72px;
    padding-left: 150px;
    font-weight: 300;
}
.ivu-breadcrumb>div{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ivu-breadcrumb > span:last-child{
    font-weight: 300;
}
.ivu-breadcrumb a{
    color: #797572;
}
.ivu-breadcrumb a:hover{
    color: #515a6e;
}
.layout-nav {
    padding-bottom: 0;
}
.layout-nav a{
    display: flex;
    align-items: center;
    height: 100%;
}
.layout-nav img{
    width: 50px;
    height: 50px;
    border: 2px solid #e1dbd0;
    border-radius: 50%;
    padding: 2px;
}
.ivu-dropdown-item{ 
    text-align: left;
}
.ivu-dropdown-item i{
    margin-right: 10px;
}
.ivu-breadcrumb-item-separator{
    margin: 0 15px;
    color: transparent;
}
.ivu-icon-ios-cart-outline{
    margin-right: 10px;
}
.ivu-modal-header-inner{
    color:#797572;
}
.ivu-modal-header p{
    color: #797572;
}
.cart{
    display: flex;
    justify-content: center;
    height: 80px;
    padding:0 20px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 300;
    color: #797572;
    background: #fff;
    box-shadow: 2px 2px 3px #ccc inset, 2px 2px 3px #ccc;
}
.things-switch{
    width: 70px;
    padding: 10px;
    display: flex;
    align-items: center;
}
.things-content{
    display: flex;
    width: 180px;
    align-items: center;
    margin: 0 20px;
}
.things-content>img{
    width: 60px;
    height: 60px;
}
.things-content>div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
}
.things-content>div span{
    font-weight: 300;
    margin-bottom: 15px;
}
.things-content>div p{
    color: #e66761;
}
.things-footer{
    padding-top:46px; 
    width: 134px;
}
.things-footer>a{
    display: inline-block;
    margin-left: 15px;
    height: 24px;
    line-height: 24px;
}
.total{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    padding:0 30px;
    margin-top: 30px;
    font-size: 14px;
    font-weight: 300;
    color: #797572;
    background: #fff;
    box-shadow: 2px 2px 3px #ccc inset, 2px 2px 3px #ccc;
}
.total-price{
    display: flex;
    align-items: center;
    padding: 10px;
    margin-right: 20px;
}
.total-price>p>span{
  color: #e66761;
}
.settle{
  background-color:#e66761;
  color: #fff;
}
.settle:hover{
    background-color: #eb8581;
}
.settle:focus{
    border-color: #eb8581;
}
.ivu-btn{
    margin-left: 35px;
    line-height: 1.5;
    padding: 5px 14px 6px;
    font-weight: 400;
    border-radius: 5px;
    transition: all 0.3s ease;
}
.dotA{
    position: relative;
}
</style>