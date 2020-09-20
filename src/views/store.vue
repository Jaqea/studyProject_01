<template>
    <div>
        <store-header></store-header>
        <router-view></router-view>
    </div>
</template>

<script>
import storeHeader from '../components/storeHeader.vue'
import storeContent from '../components/storeContent.vue'
    export default {
        name: 'store',
        components:{
            storeHeader,
            storeContent
        }
    }
</script>

<style lang="less" scoped>
    
</style>