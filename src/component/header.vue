<template>
    <div class="nav-header">
        <header v-bind:style="{paddingTop: statusBarHeight +'rem'}" class="header">
				<span @click="close" class="goback">
                    <i class="el-icon-arrow-left goback"></i> 
                </span>
				<div class="showCityPosition">
                     {{postTitle}}
                     <div @click="getMap">
                           <i></i>
                           <input type="text" disabled="disabled" v-model="cityname">
                     </div> 
                </div>
		</header>
    </div>
</template>
<script>
    export default{
        name: 'top-title',
        data () {
            return {
                statusBarHeight: 24/100,
                cityname:""
                //showCity:""
            }
        },
        props: ['postTitle',"showCityPosition"],
        created(){
        var v=this;
        var submitdata= JSON.parse(localStorage.getItem("submitdata"));
        var traceno=submitdata.body.traceno; //缓存中获取追踪流水号  20180828162956ZPPyUy
        v.traceno=traceno;
        if (window.bridge == undefined) {
            setTimeout(function() {  
                window.bridge.callHandler('getCity', {}, function (response) {
                if (typeof response == "string") {
                       response = JSON.parse(response)
                   }
                 v.city=response.citycode;
                 v.cityname=response.cityname;
                 this.$emit("getCity",city)
           })
                  }, 500)
        }else{
                window.bridge.callHandler('getCity', {}, function (response) {
                 if (typeof response == "string") {
                        response = JSON.parse(response)
                    }
                  v.city=response.citycode;
                  v.cityname=response.cityname;
                  this.$emit("getCity",city)
        })
            
        }
    },
        methods: {
            close() {
                this.$router.go(-1);
            },
            getMap(){
            var v=this;
            window.bridge.callHandler('selectCity', {}, function(response) {
                 console.log(response);
                 if (typeof response == "string"){
                    response = JSON.parse(response)
                }
                window.bridge.callHandler('getCity', {}, function(response) {
                 console.log(response);
                 if (typeof response == "string"){
                    response = JSON.parse(response)
                }
                    v.city=response.citycode;
                    v.cityname=response.cityname;
                    this.$emit("getCity",city)
                })
            })
        },
        }
    }
</script>
<style lang="scss">
    .header{
        position: fixed;
        top:0;
        left: 0;
        z-index: 3;
        width: 100%;
        background: #5789CC;
        color: #fff;
        height: 1.28rem;
        display: flex;
        align-items: center;
        box-shadow: none;
        background: -webkit-linear-gradient(right, #6990D5 , #5789CC); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #6990D5 , #5789CC); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right,#6990D5 , #5789CC); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right,#6990D5 , #5789CC); /* 标准的语法 */
    }
    .header div{
        color: #fff;
        font-size: .36rem;
        padding-top: .1rem;
        font-family: PingFang-SC-Medium;
        width:100%;
        text-align:center;
        }
    .header>span{
        z-index: 9;
        position: absolute;
        left: 0;
        top: .56rem;
    }
    .goback{
            display: inline-block;
            width:.8rem;
            height: 1rem;
            z-index: 9000;
            line-height: .44rem;
            height: .44rem;
            text-align: center;
        }
        .el-icon-arrow-left:before{
            font-size: .50rem;
        }
        .mui-poppicker-header .mui-btn {
            padding: 5px 10px;
            border: 0;
            background:none;
            color: #333;
            font-size: .3rem;
        }
        .showCityPosition{
             position: relative;
        }
          .showCityPosition>div{
             position: absolute;
             top: 0;
             right:-2.88rem;
        }
        .showCityPosition div i{
            display:inline-block;
            width:.5rem;
            height: .35rem;
            background: url(../images/cityposition.png) no-repeat;
            background-position: .1rem .1rem;
        }
        .showCityPosition div input{
            width:.6rem;
            border: 0;
            background: none;
            color: #fff;
            font-family:PingFang-SC-Regular;
            font-size:.24rem;
        }
</style>
