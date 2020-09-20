<template>
    <div class="layout-content">
        <Row type='flex' justify='center'>
        <Col span="16">
        <div class="store-content">
        <Breadcrumb :style="{margin: '20px 20px'}">
        <BreadcrumbItem><router-link tag="span" :class="active" to="/store/EnergeticeJunior">无屏电视</router-link></BreadcrumbItem>
        <BreadcrumbItem><router-link tag="span" to="/store/LearningAssistant">学习助手</router-link></BreadcrumbItem>
        </Breadcrumb>
        <div class="store-contents">
        <router-view></router-view>
        </div>
        </div>
        </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'storeContent',
        data() {
            return {
            active:'myactive'
            }
        },
        watch:{
            $route(to,from){
            if(this.$route.path=='/store'||this.$route.path=='/store/EnergeticeJunior'){
                return this.active='myactive'
        }
            this.active=''
        }
        },
        created(){
            if(this.$route.path=='/store'||this.$route.path=='/store/EnergeticeJunior'){
                   return this.active='myactive'
            }
            this.active=''
        }
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
.store-content{
    height: 600px;
    margin-top: 30px;
    background: #fff;
    border: 1px solid #e1dbd0;
}
.store-contents{
  margin: 20px 20px;
}
.myactive{
    font-weight: bold;
}
.ivu-breadcrumb>span:last-child{
    font-weight: normal;
    color: #999;
}
.ivu-breadcrumb-item-link span{
    cursor: pointer;
}
</style>