<template>
     <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo">
        <router-link to="/">
        <img src="../assets/images/img/logo.png" alt="这是logo图片">
        <span>tore</span>
        </router-link>
        </div>
        <div class="layout-nav">
        <li>
        <router-link to="/information" class="ivu-menu-item" href="#">Documentation</router-link>  
        </li>
        <li>
        <router-link  class="ivu-menu-item" to="/register">Register</router-link>  
        </li>
        <li>
        <router-link  class="ivu-menu-item" to="/login">Login</router-link>  
        </li>
        </div>
        </Menu>
    </Header>
</template>

<script>
    export default {
        name: 'homeHeader',
    }
</script>

<style lang="css" scoped>
@import url('../assets/css/logo.css');
.ivu-menu-item{
    font-size: 18px;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover{
    color: #515a6e;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active{
     color: #515a6e;
}
.layout-footer-center{
    text-align: center;
}
.ivu-menu-dark,.ivu-layout-header{
   background-color: #f5f3ef;
}
.ivu-layout-header{
   margin-top: 20px;
   width: 1200px;
   height: 72px;
}
.ivu-menu-horizontal{
    height: 72px;
    display: flex;
    align-items: center;
}
</style>