<template>
    <div class="page-container">
        <router-link to="/swiperHome">
            <div class="gobackIcon">
                  <span class="goback">
                    <i class="el-icon-arrow-left goback"></i>
                  </span>
            </div>
        </router-link>
        <top-title :postTitle="titleMessage" :showCityPosition="showCity"></top-title>

        <div class="edcsbody">
            <div class="edcsbody1">
                <div class="firmNameBorder">
                    <p class="firmName">
                        <label class="input-label" for="firm1">企业名称</label>
                        <input type="text" valueKey="name" class="font-style firm on-outline" v-model="firmName" placeholder="请输入" name="firm" id="firm1"/>
                    </p>
                </div>
                <div class="firmNameBorder">
                    <p class="firmName">
                        <label class="input-label" for="select-block">行业</label>
                        <input type="text" readonly="readonly" class="font-style firm on-outline" placeholder="请输入" name="firm1" id="select-block" @click="industry()" v-model="firm"/>
                    </p>
                    <span class="wanyan el-icon-arrow-right"></span>
                </div>
                <div class="firmNameBorder">
                    <p class="firmName">
                        <label class="input-label" for="firm2">企业上年度经营收入</label>
                        <input type="number" class="font-style firm2 on-outline" v-model="income" placeholder="请输入" name="firm" id="firm2" v-on:blur="returnFloat('1')" />
                    </p>
                    <span class="font-style wanyan">万元</span>
                </div>
                <div class="firmNameBorder" :class="{'removeBorder':!loginPhone}">
                    <p class="firmName">
                        <label class="input-label" for="firm3">近1年企业纳税总额</label>
                        <input type="number" class="font-style on-outline" placeholder="请输入" v-model="ratepaying" name="firm" id="firm3" v-on:blur="returnFloat()" />
                    </p>
                    <span class="font-style wanyan">万元</span>
                </div>
                <!-- 登录时 下面的手机号码和输入验证码隐藏 -->
                <div v-if="loginPhone">
                    <div class="firmNameBorder">
                        <p class="firmName">
                            <input type="tel" maxlength="11" class="font-style phone on-outline" v-model="phoneNum"   placeholder="请输入手机号码" name="firm4" id="firm4"/>
                        </p>
                    </div>
                    <!--<div class="firmNameBorder removeBorder">-->
                        <!--<p class="firmName">-->
                            <!--<input type="tel" v-model="cellphone"  class="font-style phone on-outline" maxlength="4" placeholder="请输入验证码" name="firm5" id="firm5" />-->
                        <!--</p>-->
                        <!--<button v-show="sendAuthCode" v-bind:class="{sendcode:sendcodeColor,sendCodeColorBlue:sendCodeColorBlue ,fontStyle:fontStyle}"  v-on:click="sendcode()">发送验证码</button>-->
                        <!--<button v-show="!sendAuthCode" class="font-style sendcode" >{{auth_time}}S</button>-->
                    <!--</div>-->
                </div>
                <!-- end -->
            </div>
            <button class="btn" :disabled="(!firmName || !firm || !income || !ratepaying || !phoneNum)" @click="testLimit">测算</button>
        </div>
        <picker-time v-if="pickerShow" @valuesid="valuesid" @add-parent-cancel="addCancel" @add-parent-confirm="addConfirm" :slotsData="industryData"></picker-time>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Picker } from 'mint-ui';
    import "../../assets/inputInfo.scss"
    import bus from "../../utils/bus"
    export default {
        name: "InputInfo",
        mounted (){
            var v = this ;

        },
        data () {
            return {
                titleMessage: '额度测算',
                userData:{
                    company:"",
                    industry:"",
                    income:"",
                    tax:"",
                    cellphone:"",
                },
                firmName:"",//企业名称
                firm:"",//行业
                income:"",//企业上年度经营收入
                ratepaying:"",//近1年企业纳税总额
                loginPhone:true,
                sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
                auth_time: 0, /*倒计时 计数器*/
                phoneNum:"",
                sendCodeColorBlue:false,
                sendcodeColor:"sendcode",
                fontStyle:"fontStyle",
                cellphone:"",
                industryData:[
                      {values:[
                               {id:"01",name:"加工制造"},
                               {id:"02",name:"建筑装饰"},
                               {id:"03",name:"运输物流"},
                               {id:"04",name:"商务服务"},
                               {id:"05",name:"农林牧渔"},
                               {id:"06",name:"科技创新"},
                               {id:"07",name:"其他"},
                               ]},
                ],
                pickerShow:false,
                showCity:true
            }
        },
        created(){
            var v=this;
            if (window.bridge == undefined) {
                // setTimeout(function() {
                //     window.bridge.callHandler('isLogin', {}, function (response) {
                //         if (typeof response == "string") {
                //             response = JSON.parse(response)
                //         }
                //         //判断是否登录
                //         console.log("判断是否登录")
                //         console.log(response)
                //         if(response.result=="0"){
                //             v.loginPhone=true;
                //         }
                //     })
                //     window.bridge.callHandler('getUserInfo', {}, function (response) {
                //         if (typeof response == "string") {
                //             response = JSON.parse(response)
                //         }
                //         console.log("获取用户手机号码")
                //         console.log(response)
                //         v.userData.cellphone= response.userphone
                //     })
                // }, 500)
            }else{
                // window.bridge.callHandler('isLogin', {}, function (response) {
                //     if (typeof response == "string") {
                //         response = JSON.parse(response)
                //     }
                //     //判断是否登录
                //     console.log("判断是否登录")
                //     console.log(response)
                //     if(response.result=="0"){
                //         v.loginPhone=true;
                //     }
                // })
                // window.bridge.callHandler('getUserInfo', {}, function (response) {
                //     if (typeof response == "string") {
                //         response = JSON.parse(response)
                //     }
                //     console.log("获取用户手机号码")
                //     console.log(response)
                //     v.userData.cellphone= response.userphone
                // })

            }

        },
        watch:{
            //console.log(firmName)
            firmName(val, oldVal){//普通的watch监听
                var v=this;
                console.log("firmName: "+val, oldVal);
                v.userData.company=val;
                localStorage.setItem("company",val)
                console.log(localStorage.getItem("company"))
                bus.$emit('companyData',val)
                console.log(v.userData)
            },
            firm(val, oldVal){//普通的watch监听  industry
                var v=this;
                console.log("firm1: "+val, oldVal);
                //v.userData.industry=val;
                console.log(v.userData)
            },
            income(val, oldVal){//普通的watch监听
                var v=this;
                console.log("income: "+val, oldVal);
                v.userData.income=val;
                console.log(v.userData)
            },
            ratepaying(val, oldVal){//普通的watch监听
                var v=this;
                console.log("ratepaying: "+val, oldVal);
                v.userData.tax=val;
                console.log(v.userData)
            },
            phoneNum(val, oldVal){//普通的watch监听
                var v=this;
                console.log("phoneNum: "+val, oldVal);
                v.userData.cellphone=val;
                console.log(v.userData)
                var reg=11 &&/^(1[34578][0-9]{9})$/;
                if(!reg.test(v.phoneNum)){
                    console.log("手机格式不正确");
                    v.sendCodeColorBlue=false
                }else{
                    v.sendCodeColorBlue=true
                }

            },
            cellphone(val, oldVal){//普通的watch监听
                var v=this;
                console.log("cellphone: "+val, oldVal);
                // this.userData.cellphonecode=val;
                console.log(v.userData)
            },
        },
        methods:{
            valuesid(val){
                var v=this;
                v.userData.industry=val;
            },
            addCancel(){
                this.pickerShow=false
            },
            addConfirm(val){
//                console.log(val)
                this.firm=val;
                this.pickerShow=false;
            },
            returnFloat(flag){
                var v=this;
                flag=="1"?v.income=Number(v.income).toFixed(2):v.ratepaying=Number(v.ratepaying).toFixed(2)
            },
            //获取验证码点击
            sendcode:function () {
                var v=this;
                console.log(this.phoneNum)
                var reg=11 &&/^(1[34578][0-9]{9})$/;
                //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
                if(this.phoneNum==''){
                    alert("请输入手机号码");
                }else if(!reg.test(this.phoneNum)){
                    alert("手机格式不正确");
                }else{
                    // this.sendCodeColorBlue=true
                    v.sendtelphonecode()
                    this.sendAuthCode = false;
                    this.auth_time = 6;
                    var auth_timetimer =  setInterval(()=>{
                        this.auth_time--;
                        if(this.auth_time<=0){
                            this.sendAuthCode = true;
                            clearInterval(auth_timetimer);
                        }
                    }, 1000);
                }
            },
            industry:function(){
                this.pickerShow=true
            },
            sendtelphonecode:function(){ //发送验证码
                let v = this
                // window.bridge.callHandler('serverRequest', {'transcode': 'ucspss100001', 'body':{'mobile':this.userData.cellphone,'msgtype':'400015'}}, function(response) {
                //     if (typeof response == "string"){
                //         response = JSON.parse(response)
                //     }
                //     console.log("发送验证码");
                //     console.log(response);
                //     v.handleResponse(response,1);
                // })
            },
            testLimit:function(){
                //var userDataValue=[];
                var v=this;
                console.log(Number(v.userData.income))
                console.log(Number(v.userData.tax))
                if(Number(v.userData.income)<Number(v.userData.tax)){
                    alert("纳税总额应小于经营收入")
                    // window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':"纳税总额应小于经营收入"}, function(response){})
                }else{
                    console.log(v.userData);
                    // v.userData.cellphone //手机号
                    // v.userData.company  //公司
                    // v.userData.income //收入
                    // v.userData.industry //行业
                    // v.userData.tax //纳税


                    let data= {'EntNm':v.userData.company,
                        'Idy_Cd':v.userData.industry,
                        'Oprt_IncmAmt':v.userData.income,
                        'TaxPymt_Tamt':v.userData.tax,
                        'MblPh_No':v.userData.cellphone,
                        'Txn_Cd':'IFSPEntCrdLmtMsr',
                        'Tpl_Vno':'1.0',
                        'Txn_Chnl_ID':'400010',
                        'Chnl_TpCd':'4000',
                        'TermTp':'10'};

                    let head = {
                        "APP_Key":"",
                        "Rndm_Num":"",
                        "APP_Token":"",
                        "Eqmt_ID_No":"",
                        "MAC_Adr":"",
                        "IP_Adr":"",
                        "Apl_Nm":"",
                        "APP_VNo":"",
                        "APP_Sgn":"",
                        "Txn_ModDsc":"",
                        "SDK_VNo":"",
                        "SDK_Sgn":"",
                        "API_VNo":"",
                        "PD_VNo":"",
                        "Sgn":"",
                        " Rqs_Jrnl_No ":"",
                        "Rqs_Dt":"",
                        "Rqs_Tm":"",
                        "Chnl_TpCd":"",
                        "RcvPrt_AccNo":"",
                        "Pyr_AccNo":"",
                        "RcvPy_Amt":"",
                        "Mrch_ID":"",
                    };

                    let allParams={};
                    allParams.Head =head;
                    allParams.Data =data;
                    allParams.Url = 'IFSPEnqrUrbnDstcInf';


                    window.bridge.callHandler('send',allParams,function(response) {

                        if (response.Data.resultdesc == '成功') {

                            let CrLine = response.Data.CrLine

                            v.$router.push({path:'/testAmountResult',query:{price:CrLine}})

                        }
                        else {

                            alert(response.Data.resultdesc)

                        }1
                    })

                }

            },
            handleResponse:function(responsedata,flag){
                // if(flag==1){
                //     console.log("发送验证码成功");
                //     console.log(responsedata);
                // }
                // if(flag==2){
                //     //var creditline=responsedata.body.creditline
                //     console.log(responsedata);
                //     if (responsedata.header['resultcode'] == '000000') {
                //         localStorage.setItem("submitdata",JSON.stringify(responsedata))
                //         this.$router.push("/testAmountResult")
                //     }else{
                //         window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':responsedata.header['resultdesc']}, function(response){})
                //     }
                // }
            },
        }
    }
</script>

<style scoped lang="scss">

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