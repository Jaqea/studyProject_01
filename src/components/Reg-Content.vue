<template>
    <div class="layout-content">
        <Card style="width:750px;" dis-hover>
        <p slot="title">Register</p>
        <Form :label-width="150" label-position="right">
        <FormItem label="Name">
        <Input @on-keyup="test" v-model="userName" placeholder="Enter name..."></Input><span>{{nameTest}}</span>
        </FormItem>
        <FormItem label="E-Mail Address">
        <Input @on-keyup="test" v-model="userEmail" placeholder="Enter email..."></Input><span>{{emailTest}}</span>
        </FormItem>
        <FormItem  label="Password">
        <Input @on-keyup="test" type="password" v-model="userPassword" placeholder="Enter password..."></Input><span>{{passwordTest}}</span>
        </FormItem>
        <FormItem label="Confirm Password">
        <Input @keyup.enter.native="register" @on-keyup="test" type="password" v-model="userPasswordAgain" placeholder="Enter password again..."></Input><span>{{passwordTest2}}</span>
        </FormItem> 
        <FormItem>
        <CheckboxGroup>
        <Checkbox v-model='single' label="">
        <span>I Accept The <router-link class="btn-register-link" to="/register/terms"> Terms Of Service</router-link> and <router-link class="btn-register-link" to="/register/privacy">Privacy Policy</router-link></span>
        </Checkbox>
        </CheckboxGroup>
        </FormItem>
        <FormItem>
        <Button icon="md-checkmark-circle"  @click.prevent="register" :disabled='flag' class="btn-register" type="primary" size='large'>REGISTER</Button>
        </FormItem>
        </Form>
         </Card>
        </div>
</template>

<script>
import axios from 'axios'
const qs=require('qs')
    export default {
        name: 'logRegContent',
        data() {
        return {
            userName:'',
            userEmail:'',
            userPassword:'',
            userPasswordAgain:'',
            nameTest:'',
            emailTest:'',
            passwordTest:'',
            passwordTest2:'',   
            single:false,
            flag:true
        }
        },
        methods:{
            register:function(){
                let self=this
                axios.post('http://127.0.0.1:3000'+'/register',qs.stringify({
                'userName':self.userName,
                'userEmail':self.userEmail,
                'userPassword':self.userPassword,
                'userPasswordAgain':self.userPasswordAgain
                })).then(function(res){
                    var err_code=res.data.err_code
                    if(err_code===0){
                        window.alert('注册成功!')
                        window.location.href='#/login'
                    }else if(err_code===1){
                        window.alert('邮箱或昵称已存在')
                    }else if(err_code===500){
                        window.alert('服务器忙，稍后再试')
                    }
                }).catch(function(err){
                    console.log(err)
                })
            },
            test:function(){
                let self=this
                const name=/^[0-9a-z]+$/i
                const email=/^\w+@[0-9a-z]+\.[a-z]+$/i
                const password=/^[0-9a-z]{6,20}$/i
                if(name.test(self.userName)==false){
                  self.nameTest='Num or Alp !'
                }else{
                  self.nameTest=''
                }
                if(email.test(self.userEmail)==false){
                  self.emailTest='Format is error !'
                }else{
                  self.emailTest=''
                }
                if(password.test(self.userPassword)==false){
                  self.passwordTest='6-20 Num or Alp !'
                }else{
                  self.passwordTest=''
                }
                if(self.userPassword!=self.userPasswordAgain){
                    self.passwordTest2='Password same !'
                }else{
                    self.passwordTest2=''
                }
                if((self.nameTest==self.emailTest)&&(self.passwordTest==self.passwordTest2)&&(self.single==true)){
                    self.flag=false
                }
            },
        },
        watch:{
            single:function(newval,oldval){
            let self=this
            if((self.nameTest==self.emailTest)&&(self.passwordTest==self.passwordTest2)&&(self.single==true)){
                self.flag=false
            }else{
                self.flag=true
            }
           }
        },
    }
</script>

<style lang="less" scoped>
.layout-content{
    position: fixed;
    margin-top: 1px;
    width: 100%;
    height: 100%;
    background: #f5f3ef;
}
.ivu-card{
    top: 30px;
    margin: 0 auto;
}
.ivu-card-bordered{
    border-color: #e1dbd0;
}
.ivu-card-head p{
    font-weight: 300;
    font-size: 15px;
    text-align: left;
}
.ivu-form-item{
    width: 500px;
    height: 36px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.ivu-card.ivu-card-dis-hover.ivu-card-bordered:hover {
  border-color: #e1dbd0;
}
.ivu-checkbox-group .ivu-checkbox-default{
    width: auto;
    float: left;
}
.btn-register{
    float: left;
    background-color: #eb8581;
    color: #fff;
}
.btn-register:hover{
    background-color:#e66761;
}
.btn-register-link{
    display: inline-block;
    height: 36px;
    line-height:36px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: #e66761;
    transition: color .2s;
}
.btn-register-link:hover{
    color: #d82a22;
    text-decoration: underline;
}
.ivu-checkbox-group>label{
    display: inline-block;
    height: 36px;
    padding-right: 0;
}
.ivu-checkbox-group>span{
    display: inline-block;
}
.ivu-checkbox-wrapper{
    margin-right: 0;
}
.ivu-form-item-content>span{
    display: inline-block;
    width: 100px;
    position: absolute;
    right: -110px;
    color: #eb8581;
}
</style>