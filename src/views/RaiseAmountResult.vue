<template>
    <div class="page-container">
        <router-link to="/raiseAmount">
            <div class="gobackIcon">
                  <span class="goback">
                    <i class="el-icon-arrow-left goback"></i>
            </span>
            </div>
        </router-link>
        <top-title :postTitle="titleMessage" :showCityPosition="showCity"></top-title>
       <div class="edu">
            <img src="../images/img-raiseAmount-last.jpg" alt="" width="100%">
            <b class="count">{{parseFloat(housePrice).toLocaleString()}}</b>
            <div class="edu-font">
                <p>
                     <span> {{applyFont1}}</span>
                     <span>{{applyFont2}}</span>
                     <span>{{applyFont3}}</span>
                </p>
            </div>
        </div>
        <div class="apply">
            <button class="btn-apply" @click="orderApply">{{apply}}</button>
        </div>
        <div class="picker-term" v-if="pickerShow">
            <mt-picker :itemHeight="itemHeight" :slots="slots" :showToolbar="showToolbar" valueKey="orgname" :visible-item-count="3" @change="onValuesChange" >
                    <p @click="cancel">取消</p>
                    <p>请选择</p>
                    <p @click="confirm">确定</p>
            </mt-picker>
        </div>
    </div>
</template>
<script>
    import '../assets/raiseAmountResult.scss'
    import bus from "../utils/bus"
    export default {
        name:'RaiseAmountResult',
        data(){
            return{
                // parseFloat(num_s).toLocaleString()
                housePrice:'',
                option:"",
                pickerShow:false,
                showToolbar: true,
                orgValue:'',
                titleMessage: '试试能否提额',
                showCity:false,
                applyFont1:"",
                applyFont2:"",
                applyFont3:"",
                apply:"我要贷款",
                count:"10,000,000",
                company:"",
                gps:"",
                orgs:"",
                address:"",
                itemHeight:55,
                sendBusinessCode:{
                                    userid:"",   //
                                    userphone:"", //
                                    company:"",     //企业名称 v
                                    orgcode:"",//机构代码 v
                                    orgname:"",//机构名称 v
                                    managername:"",//客户经理名字 v
                                    managerphone:"",//客户经理手机 v
                                    creditline:"",  //授信额度 v
                                                    orgphone:"",    //机构电话  非必输
                                                    orgaddress:"",//机构地址 非必输 
                },
                slots:[
                      {values:[
                      ]},
                ],
                orderApplyData:{}
            }
        },
        mounted(){
            this.housePrice = this.$route.query.housePrice
        },
       created:function(){
                var v=this;
                var submitdata= JSON.parse(localStorage.getItem("submitevaluatedata"));
                console.log(submitdata)
                var creditline=submitdata.body.creditline; //授信额度
                var option=submitdata.body.option; //可选项标记
                console.log(option)
                v.option=option;
                v.sendBusinessCode.creditline=creditline;
                v.count=(creditline/10000).toFixed(1)<1?creditline:Math.ceil(creditline/10000)+"万元"
                /*
                var reg=/\d{1,3}(?=(\d{3})+$)/g;
                v.count=creditline.replace(reg,'$&,')
                */
                // bus.$on("companyData",function(val){
                //       v.company=val;
                // })
                //缓存获取公司名称
                var company=localStorage.getItem("company");
                console.log("获取缓存company"+company)
                v.company=company
                v.sendBusinessCode.company=company //发送商机短信要用
                console.log(option);
                if(option=="1"){
                    v.applyFont1="以上额度为信用贷款试算额度";
                    v.applyFont2="实际额度以审批结果为准。";
                    v.apply="申请"
                }else{
                    v.applyFont1="以上额度为试算额度";
                    v.applyFont2="若已在他行抵押，可结算他行贷款，";
                    v.applyFont3="具体贷款事宜请到建行网点咨询办理。";
                    v.apply="预约办理"
                }
                if (window.bridge == undefined) {
                // setTimeout(function() {
                //     window.bridge.callHandler('getUserInfo', {}, function (response) {
                //         if (typeof response == "string") {
                //             response = JSON.parse(response)
                //         }
                //         console.log("获取用户手机号码+userid")
                //         console.log(response)
                //         v.sendBusinessCode.userphone= response.userphone;
                //         v.sendBusinessCode.userid= response.userid;
                //     })
                // }, 500)
            }else{
                // window.bridge.callHandler('getUserInfo', {}, function (response) {
                //     if (typeof response == "string") {
                //         response = JSON.parse(response)
                //     }
                //     console.log("获取用户手机号码+userid")
                //     console.log(response)
                //     v.sendBusinessCode.userphone= response.userphone
                //     v.sendBusinessCode.userid= response.userid
                // })

            }
        },
        methods:{
                cancel() {
                    var v=this;
                    v.pickerShow=false;
                   // v.value = values[0];
                   console.log(v.orgValue)
                },
                confirm() {
                   //  var v=this;
                   //  v.pickerShow=false;
                   // // v.value = values[0];
                   //  console.log(v.orgValue.orgcode)
                   //  window.bridge.callHandler('serverRequest', {'transcode': 'ucspss400026', 'body':{orgcode:v.orgValue.orgcode}}, function(responseOrgcode) {
                   //          if (typeof responseOrgcode == "string"){
                   //          responseOrgcode = JSON.parse(responseOrgcode)
                   //          }
                   //          console.log(responseOrgcode)
                   //          if(responseOrgcode.header['resultcode'] == '000000'){
                   //              v.sendBusinessCode.orgcode =v.orgValue.orgcode;
                   //              v.sendBusinessCode.orgname = v.orgValue.orgname;
                   //              v.sendBusinessCode.managername= responseOrgcode.body.managername;
                   //              v.sendBusinessCode.managerphone= responseOrgcode.body.managerphone;
                   //              v.sendBusinessCode.orgaddress= responseOrgcode.body.orgaddress;
                   //              // 发送商机短信
                   //              console.log("发送商机码")
                   //              console.log(v.sendBusinessCode)
                   //              window.bridge.callHandler('serverRequest', {'transcode': 'ucspss101214', 'body':v.sendBusinessCode}, function(responsephonecode) {
                   //                          if (typeof responsephonecode == "string"){
                   //                              responsephonecode = JSON.parse(responsephonecode)
                   //                          }
                   //                          if(responsephonecode.header['resultcode'] == '000000'){
                   //                             // window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':responsephonecode.header['resultdesc']}, function(response){})
                   //                              v.$router.push('/sendPhonecode')
                   //                         }else{
                   //                              //window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':responsephonecode.header['resultdesc']}, function(response){})
                   //                              v.$router.push('/sendPhonecodefail')
                   //                          }
                   //              })
                   //          }else{
                   //          window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':responseOrgcode.header['resultdesc']}, function(response){})
                   //          console.log("机构员工信息查询失败")
                   //      }
                   //  })
                },
                onValuesChange(picker, values) {
                    var v=this;
                    v.orgValue = values[0];
                    console.log(v.orgValue)
                    console.log(values)
                },
                applyLoan(){
                    var v=this;
                    // if(option=="2"){
                    //     window.bridge.callHandler('applyLoan', {}, function(response){})
                    // }else{
                    //     v.orderApply()
                    // }
                },
                orderApply(){
                    // console.log("发送数据")
                    var v=this;
                    window.location.href="http://leye.qiye.lht1.ccb.com/static/leyeapp/home/reward/index.html";

                //     console.log( "发送公司1"+v.company)
                //     window.bridge.callHandler('serverRequest', {'transcode': 'ucspss400023', 'body':{"company":v.company}}, function(response) {
                //     console.log(response);
                //     if (typeof response == "string"){
                //         response = JSON.parse(response)
                //     }
                //     console.log(response);
                //     var address=response.body.entpaddress;
                //     v.address=address;
                //     console.log(address)
                //     console.log(response)
                //     if(response.header['resultcode'] == '000000'){
                //             console.log("进入000000")
                //             if(response.body.iscustmgrexists=="1"){
                //                 //1管户权客户经理存在 发送商机短信
                //                 //判断企业有的时候再去调百度
                //                 console.log("管户权客户经理存在")
                //                v.sendBusinessCode.orgcode = response.body.custmgrinfo.orgcode;
                //                v.sendBusinessCode.orgname = response.body.custmgrinfo.orgname;
                //                v.sendBusinessCode.managername= response.body.custmgrinfo.name;
                //                v.sendBusinessCode.managerphone= response.body.custmgrinfo.cellphone;
                //                 window.bridge.callHandler('serverRequest', {'transcode': 'ucspss101214', 'body':v.sendBusinessCode}, function(responsephonecode) {
                //                         if (typeof responsephonecode == "string"){
                //                             responsephonecode = JSON.parse(responsephonecode)
                //                         }
                //                         console.log(responsephonecode)
                //                         if(responsephonecode.header['resultcode'] == '000000'){
                //                             window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':response.header['resultdesc']}, function(response){})
                //                         }else{
                //                             window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':response.header['resultdesc']}, function(response){})
                //                         }
                //                 })
                //             }else{
                //                 //判断有无企业
                //                 if(response.body.isentpexists=="1"){
                //                           v.isisentpexist()
                //                 }else{
                //                            window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':response.header['resultdesc']}, function(response){})
                //                 }
                //
                //             }
                //     }else{
                //         window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':response.header['resultdesc']}, function(response){})
                //     }
                //
                // })
                    
                },
            //如果无客户经理，有企业走方法
            isisentpexist(){
                // var v=this;
                //  //0管户权客户经理不存在 调app原生方法经纬度
                //                 console.log("管户权客户经理不存在")
                //                 window.bridge.callHandler('getAddressLocation', {address:v.address}, function(responseLatitudeLongitude) {
                //                         if (typeof responseLatitudeLongitude == "string"){
                //                             responseLatitudeLongitude = JSON.parse(responseLatitudeLongitude)
                //                         }
                //                         if(responseLatitudeLongitude.result=="1"){
                //                             //拿到经纬度
                //                           var latitudeAndLongitude=responseLatitudeLongitude.longitude+","+responseLatitudeLongitude.latitude
                //                           //var latitudeAndLongitude=responseLatitudeLongitude.latitude+","+responseLatitudeLongitude.longitude;
                //
                //                               console.log("拿到经纬度")
                //                               console.log(responseLatitudeLongitude.latitude);
                //                               console.log(responseLatitudeLongitude.longitude);
                //                               console.log(latitudeAndLongitude);
                //                             v.gps=latitudeAndLongitude
                //                             //调机构查询接口400025
                //                             console.log("gps"+v.gps)
                //                              window.bridge.callHandler('serverRequest', {'transcode': 'ucspss400025', 'body':{gps:v.gps,radius:"10000"}}, function(responseGps) {
                //                                         if (typeof responseGps == "string"){
                //                                             responseGps = JSON.parse(responseGps)
                //                                         }
                //                                         console.log(responseGps)
                //                                         if(responseGps.header['resultcode'] == '000000'){
                //                                             //获得机构信息，返显到页面，给用户选择附近机构
                //                                             v.slots[0].values=responseGps.body.orgs;
                //                                             v.pickerShow=true;
                //                                             console.log(v.orgValue.orgcode)
                //                                            //调接口  机构员工信息查询 400026
                //                                            console.log("orgs");
                //                                            console.log(v.orgValue);
                //                                         }else{
                //                                            //window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':response.header['resultdesc']}, function(response){})
                //                                            console.log("获取机构信息失败")
                //                                         }
                //                             })
                //                         }else{
                //                             console.log("未拿到经纬度")
                //                         }
                //                 })
            },
        }
    }
</script>
<style scoped lang="scss">
     .edu-font{
         position: absolute;
         bottom:1.5rem;
         left:0rem;
         line-height: 1.3;
         margin: 0 auto;
         text-align:center;
         width: 100%;
     }
     .edu-font p{
        margin: 0;
        padding: 0;
     }
     .edu-font p span{
         display: block;
         font-size:.22rem;
         font-family:PingFang-SC-Regular;
         color:#fff;
         margin-top:.1rem;
     }
     .edu-img{
         width:100%;
         height:7.32rem;
         background: url("../images/img-raiseAmount-last.jpg") no-repeat;
         background-size: 100%;
     }

     //picker
     .picker-term{
        height: 100%;
        position: fixed;
        width: 100%;
        background: rgba(0,0,0,.7);
        bottom: 0;
        left: 0;
        z-index: 99999;
    }
    .picker{
        position: absolute;
        width: 100%;
        bottom: 0;
    }
    .picker-items{
        background: #fff;
        margin-top: -1px;
    }
    .picker-center-highlight:before, .picker-center-highlight:after{
        background: transparent;
        height: 1px;
        border-top: 1px solid #ccc;
    }
    .picker-toolbar{
        font-size: 0.3rem;
        color: #333;
        display: flex;
        justify-content: space-between;
        background: #f5f5f5;
        padding: 0 0.2rem;
        height: 0.8rem;
    p{
        line-height: 0.8rem;
    }
  }

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