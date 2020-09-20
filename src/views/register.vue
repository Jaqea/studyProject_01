<template>
    <div>
    <log-Reg-Header></log-Reg-Header>
    <transition mode="out-in">
    <router-view></router-view>
    </transition>
    </div>
</template>

<script>
import logRegHeader from '../components/log_Reg-Header.vue'
    export default {
        name: 'register',
        components:{
            logRegHeader,
        }
    }
</script>

<style lang="less" scoped>
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