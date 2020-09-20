<template>
<div>
    <log-reg-header></log-reg-header>
    <transition mode="out-in">
    <router-view></router-view>
    </transition>
</div>
</template>

<script>
import logRegHeader from '../components/log_Reg-Header.vue'
    export default {
        name:'login',
        components:{
            logRegHeader,
        }
    }
</script>

<style lang="css" scoped>
.v-enter,
.v-leave-to{
    transform: translateX(100px);
    opacity: 0;
}

.v-enter-active,
.v-leave-active{
    transition: all 0.4s ease;
}
</style>