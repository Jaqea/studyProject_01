<template>
    <Col span="12" style="margin-left:10px;border-radius:20px;">
    <Card  dis-hover>
    <div class="basic-account">
    <div class="basic">
    <label for="email">Email</label>
    <p>{{formItem.userEmail}}</p>
    <Form :model='formItem' label-position="top">
    <FormItem style="margin-right:80px;" label="Name">
    <Input v-model="formItem.userName"></Input>
    </FormItem>
    <FormItem style="margin-right:80px;" label="Introduce">
    <Input v-model="formItem.userText" type="textarea":autosize="{minRows: 2,maxRows: 5}"></Input>
    </FormItem>
    <FormItem label="Sex">
    <RadioGroup v-model="formItem.usersex">
    <Radio label="boy">Boy</Radio>
    <Radio label="girl">Girl</Radio>
    <Radio label="secret">Secret</Radio>
    </RadioGroup>
    </FormItem>
    <FormItem style="margin-right:80px;" label="Birthday">
    <Input v-model="formItem.userBirthday"></Input>
    </FormItem>
    <FormItem>
    <a class="save ivu-btn ivu-btn-primary" @click="getSave">Save</a>
    </FormItem>
    </Form>
    </div>
    <div class="account">
    <label for="avatar">Avatar</label>
    <div>
    <img :src="formItem.userImg" alt="这是一张头像图片">
    </div>
    <Form>
    <FormItem>
    <input enctype='multipart/form-data' name="avatar" @change="getImg" type="file" class="file">
    <a style="margin-top:30px;" class="save ivu-btn ivu-btn-primary">SELECT NEW PHOTO</a>
    </FormItem>
    </Form>
    </div>
    </div>   
    </Card>    
    </Col>
</template>

<script>
import Axios from 'axios'
const qs=require('qs')
    export default {
        name: 'basicInformation',
        data() {
            return {
            formItem: {
                userName: '',
                userEmail: '',
                usersex:'',
                userText: '',
                userBirthday:'',
                userImg:''
            }}
        },
        methods:{
            getSave:function(){
                let self=this
                Axios.post("http://127.0.0.1:3000" + "/save",qs.stringify({
                  userName:self.formItem.userName,
                  bio:self.formItem.userText,
                  sex:self.formItem.usersex,
                  birthday:self.formItem.userBirthday,
                  userEmail:self.formItem.userEmail
                })).then(function(res){
                    let err_code=res.data.err_code
                    if(err_code==500){
                        window.alert('服务器繁忙，请稍后再试!')
                    }else{
                        window.sessionStorage.removeItem('user')
                        window.sessionStorage.setItem('user',JSON.stringify(res.data.user))
                        window.alert('保存成功!')
                        location.reload();
                    }
                }).catch(function(err){
                    console.log(err)
                })
            },
            getImg:function(e){
                let self=this
                let img=e.target.files[0]||e.data|ransfer.files[0]
                let imgSize=img.size
                if(imgSize>3145728){
                    window.alert('请选择3M以内的图片！')
                    return false
                }
                let formdata=new FormData()  //提交文件不能以键值的方法提交，应该直接提交文件对象data：FormData
                formdata.append('avatar',img,'imgName')
                Axios.post('http://127.0.0.1:3000'+'/uploadImg',formdata).then(function(res){
                    let err_code=res.data.err_code
                    if(err_code==1){
                        window.alert('只支持jpg和png形式哦！')
                    }else if(err_code==500){
                        window.alert('服务器繁忙，请稍后再试')
                    }else if(err_code==0){
                        window.alert('修改成功！')
                        window.sessionStorage.removeItem('user')
                        window.sessionStorage.setItem('user',JSON.stringify(res.data.user))
                        location.reload()
                    }
                }).catch(function(err){
                    console.log(err)
                })
                
            }
        },
        created(){
           this.formItem.userImg=JSON.parse(window.sessionStorage.getItem('user')).avatar
           this.formItem.userName=JSON.parse(window.sessionStorage.getItem('user')).userName
           this.formItem.userEmail=JSON.parse(window.sessionStorage.getItem('user')).userEmail
           this.formItem.userText=JSON.parse(window.sessionStorage.getItem('user')).bio
           this.formItem.userBirthday=JSON.parse(window.sessionStorage.getItem('user')).birthday
           let sex=JSON.parse(window.sessionStorage.getItem('user')).sex   
           if(sex==-1){
               this.formItem.usersex='secret'
           }else if(sex==0){
               this.formItem.usersex='boy'
           }else{
               this.formItem.usersex='girl'
           }
        }
    }
</script>

<style lang="less" scoped>
.ivu-card-bordered{
    border-color: #e1dbd0;
}
.basic-account{
    height: 500px;
    display: flex;
    justify-content: center;
}
.basic{
    width: 60%;
    height: 100%;
}
.account{
    width:30%;
    height: 100%;
}
.account>div{
    width: 150px;
    height: 150px;
    border-radius: 6px;
}
.account>div>img{
    width: 100%;
    height: 100%;
}
.basic>label,.account>label{
    display: inline-block;
    margin-bottom: 10px;
}
.basic>p{
    margin-bottom: 20px;
    color: #797572;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
.file{
    width:150px;
    height: 32px;
    position: absolute;
    top: 30px;
    opacity: 0;
    cursor: pointer;
}
</style>