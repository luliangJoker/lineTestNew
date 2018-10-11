<template>
    <div class="page-container">
        <router-link to="/InputInfo">
            <div class="gobackIcon">
                  <span class="goback">
                    <i class="el-icon-arrow-left goback"></i>
            </span>
            </div>
        </router-link>
        <top-title :postTitle="titleMessage" :showCityPosition="showCity"></top-title>
        <div class="edu">
            <img src="../../images/img-raiseAmount.png" alt="" width="100%">
            <b class="count">{{parseFloat(limit).toLocaleString()}}</b>

        </div>
        <div class="apply">
            <button class="btn-apply" @click="applyLoan">申请</button>
        </div>
        <p></p>
        <p></p>
        <p></p>
        <p class="tryRaise"><a class="tryRaiseUrl" @click="toRaiseAmount">试试能否提额</a></p>
    </div>
</template>
<script>
    import '../../assets/raiseAmountResult.scss'

    export default {
        name:'testAmountResult',
        data(){
            return{
                limit:"",
                showCity:false,
                titleMessage:"额度测算"
            }
        },
        mounted (){
            var v=this;
            v.limit = v.$route.query.price;

        },
        methods:{
            toRaiseAmount(){
                this.$router.push('/raiseAmount')
            },
            applyLoan(){

                window.location.href="http://leye.qiye.lht1.ccb.com/static/leyeapp/home/reward/index.html";

                // window.bridge.callHandler('applyLoan', {}, function(response){})
            }
        },
        created:function(){
            var v=this;
            //var reg=/\d{1,3}(?=(\d{3})+$)/g;
            console.log("拿到缓存")
            var submitdata=localStorage.getItem("submitdata");
            var creditline=JSON.parse(submitdata).body.creditline
            v.limit=(creditline/10000).toFixed(1)<1?creditline:Math.ceil(creditline/10000)+"万元"
            console.log("获取到额度"+creditline);
           // v.limit=creditline.replace(reg, '$&,')
        }
    }
</script>
<style>

    .gobackIcon{
        position: fixed;
        /*width: 30px;*/
        /*height: 30px;*/
        /*background: red;*/
        left: 0;
        top: .7rem;
        color:#fff;
        z-index:99
    }

    .el-icon-arrow-left:before{
        font-size: .50rem;
    }

</style>