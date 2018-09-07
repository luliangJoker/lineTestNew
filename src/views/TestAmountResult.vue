<template>
    <div class="page-container">
        <top-title :postTitle="titleMessage" :showCityPosition="showCity"></top-title>
        <div class="edu">
            <img src="../images/img-raiseAmount.png" alt="" width="100%">
            <b class="count">{{limit}}</b>
        </div>
        <div class="apply">
            <button class="btn-apply">申请</button>
        </div>
        <p class="tryRaise"><a class="tryRaiseUrl" @click="toRaiseAmount">房屋抵押额度测算</a></p>
		<p class="tryRaise"><a class="tryRaiseUrl" @click="toRaiseAmount2">企业信用额度测算</a></p>
    </div>
</template>
<script>
    import '../assets/raiseAmountResult.scss'
    export default {
        name:'testAmountResult',
        data(){
            return{
                limit:"",
                showCity:false,
                titleMessage:"额度测试"
            }
        },
        methods:{
            toRaiseAmount(){
                // this.$router.push('/raiseAmount')
                var params = {'title':'测试分享的标题2','content':'测试分享的内容2','url':'getcity'};
                window.bridge.callHandler('send',params,function(response) {
                    // alert(response);
                    var v = JSON.parse(response);
                    alert(v);
                    // document.getElementById("returnValue").value = response;
                });
            },
			toRaiseAmount2(){
                this.$router.push('/InputInfo')
            }
        },
        created:function(){
            var v=this;
            var reg=/\d{1,3}(?=(\d{3})+$)/g;
            console.log("拿到缓存")
            var submitdata=localStorage.getItem("submitdata");
             var creditline=JSON.parse(submitdata).body.creditline
            console.log("获取到额度"+creditline);
            v.limit=creditline.replace(reg, '$&,')
        }
    }
</script>
<style>

</style>