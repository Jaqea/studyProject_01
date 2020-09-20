<template>
    <Content :style="{width:'800px'}">
    <div class="card">
    <h1>Start Here.</h1>
    <p>Store provides the perfect starting point for your next big idea.</br> Forget all the boilerplate and focus on what matters: your</br>  application.</p>
    <router-link to='/register' class="getstore ivu-btn ivu-btn-primary">Get Store</router-link>
    <router-link to="/information" class="learnmore ivu-btn">Learn More</router-link>
    </div>
    </Content>
</template>

<script>
    export default {
        name: 'homeContent',
    }
</script>

<style lang="css" scoped>
.card>h1{
    font-size: 3rem;
    font-weight: 400;
    margin-top: 50px;
}
.card>p{
    padding-top: 2rem;
    padding-bottom: 2rem;
    font-size: 1.5rem;
    line-height: 1.5;
    color: #797572;
}
.getstore{
    background-color:#e66761;
    color: #fff;
}
.learnmore{
     background-color:#f5f3ef;
     color: #e66761;
     border:2px solid #e66761;
}
.getstore:hover{
    background-color: #eb8581;
}
.getstore:focus{
    border-color: #eb8581;
}
.learnmore:hover{
     color: #eb8581;
     border:2px solid #e66761;
}
.learnmore:focus{
    border-color: #eb8581;
}
.ivu-btn{
    padding: 12px 40px;
    margin: 0 8px;
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 9999px;
    transition: all 0.3s ease;
}

</style>