<template>
    <Col span="12" style="margin-left:10px;border-radius:20px;">
    <Card  dis-hover>
    <p slot="title">Update Password</p>
    <div class="basic-account">
    <div class="basic">
    <Form :model='formItem' :label-width="160">
    <FormItem label="Current Password">
    <Input type="password"  @on-keyup="test" v-model="formItem.currentPassword" placeholder="Enter your current password"></Input>
    </FormItem>
    <FormItem label="Password">
    <Input type="password" @on-keyup="test" v-model="formItem.newPassword" placeholder="Enter your password"></Input><span>{{formItem.passwordTest}}</span>
    </FormItem>
    <FormItem label="Confirm Password">
    <Input type="password" @keyup.enter.native="getUpdate" @on-keyup="test" v-model="formItem.confirmPassword" placeholder="Enter your confirm password"></Input><span>{{formItem.passwordTestAgain}}</span>
    </FormItem>
    <FormItem>
    <a @click="getUpdate" class="save ivu-btn ivu-btn-primary">UPDATE</a>
    </FormItem>
    </Form>
    </div>
    </div>   
    </Card>    
    </Col>
</template>

<script>
import Axios from 'axios';
const qs=require('qs')
    export default {
        name: 'accountSet',
        data() {
            return {
                formItem:{
                    currentPassword:'',
                    newPassword:'',
                    confirmPassword:'',
                    passwordTest:'',
                    passwordTestAgain:''
                }
            }
        },
        methods:{
            getUpdate:function(){
                let self=this
                Axios.post('http://127.0.0.1:3000'+'/updatePassword',qs.stringify({
                userPassword:self.formItem.currentPassword,
                newPassword:self.formItem.newPassword, 
                })).then(function(res){
                    let err_code=res.data.err_code
                    if(err_code==500){
                        window.alert('服务器繁忙，请稍后再试')
                    }else if(err_code==1){
                        window.alert('初始密码错误!')
                    }else{
                        window.sessionStorage.removeItem('user')
                        window.sessionStorage.setItem('user',JSON.stringify(res.data.user))
                        window.alert('修改成功!')
                        location.reload()
                    }
                })
            },
            test:function(){
            const password=/^[0-9a-z]{6,20}$/i
            if(!password.test(this.formItem.newPassword)){
                this.formItem.passwordTest='6-20 Num or Alp !'
            }else{
                this.formItem.passwordTest=''
            }
            if(this.formItem.newPassword!=this.formItem.confirmPassword){
                this.formItem.passwordTestAgain='Password same !'
            }else{
                this.formItem.passwordTestAgain=''
            }
            }
        }
    }
</script>

<style lang="less" scoped>
.ivu-card-bordered{
    border-color: #e1dbd0;
}
.basic-account{
    display: flex;
    justify-content: center;
}
.basic{
    width: 60%;
    height: 100%;
}
.basic>label{
    display: inline-block;
    margin-bottom: 10px;
}
.basic>p{
    margin-bottom: 20px;
}
.save{
  background-color:#e66761;
  color: #fff;
}
.save:hover{
    background-color: #eb8581;
}
.save:focus{
    border-color: #eb8581;
}
.ivu-btn{
    line-height: 1.5;
    padding: 5px 14px 6px;
    font-weight: 400;
    border-radius: 5px;
    transition: all 0.3s ease;
}
.ivu-card-head p{
  color: #797572;
  font-weight: 300;
}
.ivu-form-item-content>span{
    display: inline-block;
    width: 100px;
    position: absolute;
    right: -110px;
    color: #eb8581;
}
</style>