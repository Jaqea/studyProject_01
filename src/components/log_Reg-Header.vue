<template>
    <Row>
    <Col span="24" type='flex' justify='center' align='middle'>
       <div class="login-register">
       <div class="login-register-nav">
       <div class="layout-logo">
        <router-link to="/">
        <img src="../assets/images/img/logo.png" alt="这是logo图片">
        <span>tore</span>
        </router-link>    
       </div>
        <div class="layout-nav">
        <Breadcrumb>
        <router-link to="/login">Login</router-link>
        <span class="ivu-breadcrumb-item-separator">/</span>
        <router-link to="/register">Register</router-link>
        </Breadcrumb>
        </div>
       </div>
       </div>
    </Col>
    </Row>
</template>

<script>
    export default {
        name: 'logRegHeader',
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
</style>