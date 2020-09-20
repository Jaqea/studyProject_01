<template>
    <div>
    <log-reg-header></log-reg-header>
    <div class="layout-content">
    <Row type='flex' justify='center'>
    <Col span="6" style="margin-right:10px;border-radius:20px;">
    <Card  dis-hover>
    <div>
    <div class="info-logo">
    <img src="../assets/images/img/logo.png" alt="这是logo图片">
    <span>tore</span>
    </div>   
    <p style="text-align:center">It's a great opportunity to learn Store</p>
    </div>
    </Card>       
    </Col>
    <Col span="12" style="margin-left:10px;border-radius:20px;">
    <Card  dis-hover>
    <div style="text-align:left">
    <h1 style="margin-top:20px;">Attention</h1>
    <p>You should pay attention to something...</p>
    </div>
    </Card>    
    </Col>
    </Row>
    </div>
    </div>
</template>

<script>
import logRegHeader from './log_Reg-Header.vue'
    export default {
        name: 'information',
        components:{
            logRegHeader,
        }
    }
</script>

<style lang="less" scoped>
.layout-content{
    position: fixed;
    margin-top: 1px;
    padding: 30px 0;
    width: 100%;
    height: 100%;
    background: #f5f3ef;
}
img{
    width: 100px;
    height: 100px;
}
h1{
    margin-bottom: 20px;
    color: #797572;
    font-weight: 400;
}
span{
    display: inline-block;
    width: auto;
    height: 100px;
    line-height: 100px;
    text-align: left;
    font-size: 30px;
    color: #e66761;
    position: relative;
    right: 30px;
}
p{
    font-weight: 300;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 25px;
}
.info-logo{
    width: 200px;
    margin: 0 auto;
    height:auto;
    display: flex;
    justify-content: center;
}
.ivu-card{
    margin: 0 auto;
}
// .ivu-card-body>div{
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// }
.ivu-card-bordered{
    border-color: #e1dbd0;
}

.ivu-card.ivu-card-dis-hover.ivu-card-bordered:hover {
  border-color: #e1dbd0;
}


</style>