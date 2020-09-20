<template>
    <div class="layout-content">
    <Row type='flex' justify='center'>
       <Col span="12">
        <div class="panel">
            <div class="panel-warning">
                <div class="panel-heading">
                    Payment Method
                </div>
                <div class="panel-body">
                    Before purchasing a Store license, you need to do something.
                </div>
            </div>
        </div>
       </Col> 
    </Row>
    </div>
</template>

<script>
    export default {
        name: 'licenses',
        data() {
            return {
                
            }
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
.panel{
    width: 100%;
    margin-top: 30px;
}
.panel-warning{
    border: 1px solid #faebcc; 
    font-size: 14px;
    line-height: 1.6;
}
.panel-heading{
    color: #8a6d3b;
    background-color: #fcf8e3;
    border-bottom:1px solid #faebcc;
    padding: 10px 15px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}
.panel-body{
    color: #797572;
    background-color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 15px;
}
</style>