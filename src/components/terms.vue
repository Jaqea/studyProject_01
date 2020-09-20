<template>
    <div class="layout-content">
        <Card style="width:750px;" dis-hover>
        <h3 slot="title" style="font-size: 15px;">Terms Of Service</h3>
        <p>
        This license is a legal agreement between you and Laravel LLC for the use of Laravel Spark Software (the “Software”). By downloading any Laravel Spark files, add-ons, or resources, you agree to be bound by the terms and conditions of this license. Laravel LLC reserves the right to alter this agreement at any time, for any reason, without notice.
        </p>
        <h3>Permitted Use</h3>
        <p>One license grants the right to use the Software on one domain and unlimited development sites. Each additional domain using the Software requires an additional purchased license.</p>
        <h3>Restrictions</h3>
        <p>Unless you have been granted prior, written consent from Laravel LLC, you may not:</p>
        <ul>
        <li>Reproduce, distribute, or transfer the Software, or portions thereof, to any third party.</li>
        <li>Sell, rent, lease, assign, or sublet the Software or portions thereof.</li>
        <li>Grant rights to any other person.</li>
        <li>Use the Software in violation of any U.S. or international law or regulation.</li>
        </ul>
        <p>All copyright and proprietary notices and logos in the Control Panel and within the Software files must remain intact.</p>
        </Card>
        </div>
</template>

<script>
    export default {
        name: 'terms',
    }
</script>

<style lang="less" scoped>
h3{
    font-size: 18px;
    font-weight: 400;
    color: #797572;
}
p{
   margin-top: 10px;
   margin-bottom: 20px;
}
li{
    list-style: initial;
    margin-left: 50px;
}
.layout-content{
    position: fixed;
    margin-top: 1px;
    width: 100%;
    height: 100%;
    background: #f5f3ef;
}

.layout-content p,li{
    font-weight: 300;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 25px;
}

.ivu-card{
    top: 30px;
    margin: 0 auto;
}
.ivu-card-bordered{
    border-color: #e1dbd0;
}
.ivu-card-head p{
    font-weight: 300;
    font-size: 15px;
    text-align: left;
}
</style>