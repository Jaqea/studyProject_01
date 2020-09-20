<template>
    <div>
    <div class="layout-content">
    <Row type='flex' justify='center'>
    <Col span="4" style="margin-right:10px;border-radius:20px;">
    <Card :padding='0'  dis-hover>
    <p slot="title">User Settings</p>
    <div>
    <p style="text-align:left"><router-link :class="active"  to="/store/settings/basic">Basic information</router-link> </p>
    <Divider/>
    <p style="text-align:left"><router-link  to="/store/settings/accountset">Account settings</router-link> </p>
    </div>
    </Card>       
    </Col>
    <router-view></router-view>
    </Row>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'settings',
        data(){
            return {
                active:'myactive'
            }
        },
        watch:{
            $route(to,from){
                if(this.$route.path=='/store/settings'||this.$route.path=='/store/settings/basic'){
                    return this.active='myactive'
                }
                this.active=''
            }
        },
        created(){
            if(this.$route.path=='/store/settings'||this.$route.path=='/store/settings/basic'){
                    return this.active='myactive'
                }
                this.active=''
        }
    }
</script>

<style lang="less" scoped>
.layout-content{
    margin-top: 1px;
    padding: 30px 0;
    width: 100%;
    height: 680px;
    background: #f5f3ef;
}
h1{
    margin-bottom: 20px;
    color: #797572;
    font-weight: 400;
}
p{
    font-weight: 300;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 25px;
}
.ivu-card{
    margin: 0 auto;
}
.ivu-card-head p{
    color: #797572;   
}
.ivu-divider-horizontal{
    margin:0;
}
.ivu-card-body p a{
  display: inline-block;
  width: 100%;
  padding: 5px 14px;
  color: #797572;
  transition: all 0.3s ease
}
.ivu-card-body p a:hover{
    background: #f5f3ef;
}
.myactive{
    border-left: 3px solid #e66761;
}

.ivu-card-bordered{
    border-color: #e1dbd0;
}

.ivu-card.ivu-card-dis-hover.ivu-card-bordered:hover {
  border-color: #e1dbd0;
}

  
</style>