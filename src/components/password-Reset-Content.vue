<template>
    <div class="layout-content">
        <Card style="width:750px;" dis-hover>
        <p slot="title">Reset Password</p>
        <Form :label-width="130" label-position="right">
        <FormItem label="E-Mail Address">
        <Input  placeholder="Enter email..."></Input>
        </FormItem>
        <FormItem>
        <Button icon="md-mail" class="btn-login" type="primary" size='large'>SEND PASSWORD RESET LINK
        </Button>
        </FormItem>
        </Form>
         </Card>
        </div>
</template>

<script>
    export default {
        name: 'logRegContent',
    }
</script>

<style lang="less" scoped>
.layout-content{
    position: fixed;
    margin-top: 1px;
    width: 100%;
    height:100%;
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
    width: 450px;
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
.btn-login{
    float: left;
    background-color: #eb8581;
    color: #fff;
}
.btn-login:hover{
    background-color:#e66761;
}
.btn-login-link{
    display: inline-block;
    height: 36px;
    margin-left: 20px;
    line-height:36px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: #e66761;
    transition: color .2s;
}
.btn-login-link:hover{
    color: #d82a22;
    text-decoration: underline;
}
</style>