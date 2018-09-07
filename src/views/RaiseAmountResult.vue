<template>
    <div class="page-container">
        <top-title :postTitle="titleMessage" :showCityPosition="showCity"></top-title>
        <div class="edu">
            <img src="../images/img-raiseAmount.png" alt="" width="100%">
            <b class="count">{{count}}</b>
        </div>
        <div class="apply">
            <button class="btn-apply">申请</button>
        </div>
    </div>
</template>
<script>
    import '../assets/raiseAmountResult.scss'
    export default {
        name:'RaiseAmountResult',
        data(){
            return{
                titleMessage: '额度测算',
                showCity:false,
                count:"10000000"
            }
        },
        created:function(){
                var v=this;
                var submitdata= JSON.parse(localStorage.getItem("submitevaluatedata"));
                console.log(submitdata)
                var creditline=submitdata.body.creditline; //缓存中获取追踪流水号  20180828162956ZPPyUy
                var reg=/\d{1,3}(?=(\d{3})+$)/g;
                v.count=creditline.replace(reg,'$&,')
        },
    }
</script>
<style scoped lang="scss">

</style>