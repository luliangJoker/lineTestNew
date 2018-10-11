<template>
    <div class="page-container">
        <top-title :postTitle="titleMessage" :closeScreen="true"></top-title>
        <div class="edu">
            <!-- <img src="../images/complete_small.png" alt="" width="100%"> -->
            <p class="font-style font-tip">
                <span>{{fontTip}}</span>
            </p>
        </div>
        <div class="apply">
            <button class="btn-apply" @click="closed">完成</button>
        </div>
    </div>
</template>
<script>
    import '../assets/raiseAmountResult.scss'
    export default {
        name:'SendPhonecode',
        data(){
            return{
                titleMessage: '额度测算',
                count:"10000000",
                fontTip:"我们会尽快联系您"
            }
        },
        methods:{
            closed(){
                console.log("关闭")
                window.bridge.callHandler('didClose', {}, function(response){})
            }
        },
        created:function(){
            
        },
    }
</script>
<style scoped lang="scss">
    .edu{
        width: 100%;
        height:5.22rem;
        background: url("../images/complete_big.png") no-repeat;
        background-size: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    .edu img{
        width:2rem;
        height: 2rem;
        margin-top: .3rem;
    }
    .font-style{
        font-size: .22rem;
        color: #fff;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .font-tip{
       text-align: center;
       margin-top: 3rem;
    }
    .font-tip span{
       display: inline-block;
       text-align: left;
       width: 2.3rem;
    }
</style>