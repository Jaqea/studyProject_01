<template>
     <Row>
        <Col  class="bgc" span="24"align='middle' style="height:900px;" type='flex'>
         <Layout>
           <home-header></home-header>
           <home-content></home-content>
        </Layout>
        </Col>
    </Row>
</template>

<script>
import homeContent from '../components/homeContent.vue' 
import homeHeader from '../components/homeHeader.vue'
    export default {
        name: 'home',
        components:{
            homeContent,
            homeHeader
        }
    }
</script>

<style lang="css" scoped>
.bgc{
    background: url('../assets/images/img/hero-illustration.svg')  no-repeat;
    background-color: #f5f3ef;
    background-size: 1200px 609px;
    margin-bottom: -4px;
    background-position: bottom;
    border-top: 4px solid #e66761;
    border-bottom: 4px solid #e66761;
}
.layout{
    border-radius: 4px;
    overflow: hidden;
}
</style>