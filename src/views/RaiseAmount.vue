<template>
    <div class="container">
        <router-link to="/testAmountResult">
            <div class="gobackIcon">
                  <span class="goback">
                    <i class="el-icon-arrow-left goback"></i>
            </span>
            </div>
        </router-link>
        <top-title :postTitle="titleMessage" :showCityPosition="showCity" @getCity="getCity"></top-title>
        <ul class="info">
            <li class="item-info">
                <label for="block-name">小区名字</label>
                <input type="text" id="block-name" placeholder="请选择" readonly v-model="this.$store.state.Comm_Nm" @click="selectBlock">
                <i id="select-block" class="el-icon-arrow-right arr-right"></i>
            </li>
            <li class="item-info">
                <label for="house-type">房屋类型</label>
                <input type="text" id="house-type" placeholder="住宅" readonly  v-model="houseType" @click="selectHouseType">
                <i id="select-type" class="el-icon-arrow-right arr-right"></i>
            </li>
            <li class="item-info area">
                <label for="house-area">面积（m²）</label>
                <input type="text" id="house-area" placeholder="请输入" v-model="houseArea" v-on:blur="returnFloat()">
                <span>m²</span>
            </li>
            <li class="item-info floor">
                <label>楼层</label>
                第<input type="text" id="nth-floor" placeholder="请输入" v-model="floor">层&nbsp;
                共<input type="text" id="total-floor" placeholder="请输入" v-model="totalFloor">层
            </li>
            <!--
            <li class="item-info">
                <label>房产是否抵押</label>
                <mt-switch v-model="isMortgage"></mt-switch>
            </li>
            -->
            <!--
            <li class="item-info mortgage-bank" :class="{ disabled : !isMortgage }" >
                <label for="mortgage">抵押银行</label>
                <input type="text" id="mortgage" placeholder="请选择" readonly v-model="bank" @click="selectBank">
                <i id="select-bank" class="el-icon-arrow-right arr-right"></i>
            </li>
            -->
        </ul>

        <button v-bind:disabled="(!this.$store.state.Comm_Nm || !houseType || !houseArea || !floor || !totalFloor )" class="btn-calc" @click="evaluateCheck">测算</button>

        <picker-time @valuesid="valuesid" v-if="pickerShow" @add-parent-cancel="addCancel" @add-parent-confirm="addConfirm" :slotsData="pickerData"></picker-time>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Switch } from 'mint-ui';
    Vue.component(Switch.name, Switch);
    import '../assets/raiseAmount.scss'
    export default {
        name:'RaiseAmount',
        data() {
            return {
                titleMessage: '试试能否提额',
                showCity:true,
                pickerShow: false,
                pickerData:[],
                pickerType:'',
                blockData:[
                                  {values:[
                                /*
                               {id:"01",name:"万科一期"},
                               {id:"02",name:"万科二期"},
                               {id:"03",name:"万科三期"},
                               */
                               ]},
                          ],
                block:'',
                hoseTypeData:[
                              //{values: ['住宅', '普通公寓', '写字楼', '别墅']}
                                   {values:[
                               {id:"11",name:"住宅"},
                               {id:"12",name:"普通公寓"},
                               {id:"21",name:"写字楼"},
                               {id:"99",name:"别墅"},
                               ],
                               defaultIndex:"0"
                               },
                             ],
                houseType:'住宅',
                houseArea:'',
                floor:'',
                city:'',
                hacode:'',
                traceno:'',
                totalFloor:'',
                proptype:'',
                isMortgage:false,// 是否抵押
//                mortageBankData:[{
//                    value: "1",
//                    text: "建行"
//                },{
//                    value: "2",
//                    text: "非建行"
//                }],
                bankData:[{values: ['建行', '非建行']}],
                bank:''
            }
        },
        created(){
            var v=this;
            var submitdata= JSON.parse(localStorage.getItem("submitdata"));
            var traceno=submitdata.body.traceno; //缓存中获取追踪流水号  20180828162956ZPPyUy
            v.traceno=traceno;
            if (window.bridge == undefined) {
                // setTimeout(function() {
                //     window.bridge.callHandler('getCity', {}, function (response) {
                //         if (typeof response == "string") {
                //             response = JSON.parse(response)
                //         }
                //         console.log(response);
                //         v.city=response.citycode;
                //         console.log("获取城市")
                //         console.log(response);
                //     })
                // }, 500)
            }else{
                // window.bridge.callHandler('getCity', {}, function (response) {
                //     if (typeof response == "string") {
                //         response = JSON.parse(response)
                //     }
                //     console.log(response);
                //     v.city=response.citycode;
                //     console.log("获取城市")
                //     console.log(response);
                // })
                //v.responsecompany()//获取企业列表
            }
        },
        methods:{
            getCity(val){
               //获取城市码
               v.city=val;
            },
            valuesid(val){
                var v=this;
                v.proptype=val;
            },
            addCancel(){
                this.pickerShow=false;
            },
            addConfirm(val){
                this.pickerShow=false;
                switch (this.pickerType){
                    case 'block':
                        this.block=val;
                        break;
                    case 'houseType':
                        this.houseType=val;
                        break;
                    case 'bank':
                        this.bank=val;
                        break;
                    default:
                        break;
                }
            },
            returnFloat(){
                var v=this;
                v.houseArea=Number(v.houseArea).toFixed(2);
            },
     
            selectBlock(){
                this.$router.push("/selectCom")
               //  let v = this;
               //  this.pickerType='block'
               // // this.pickerShow=true;
               //  this.pickerData=this.blockData;
               //
               //  /////////////获取小区
               //  window.bridge.callHandler('chooseHouseArea', {}, function(response) {
               //      console.log(response);
               //      if (typeof response == "string"){
               //          response = JSON.parse(response)
               //      }
               //      v.block=response.haname;
               //      v.hacode=response.hacode;
               //  })
            },
            selectHouseType(){
                let v = this;
//                roadPick.setData(this.hoseTypeData);
//                roadPick.show(function (SelectedItem) {
//                    v.houseType = SelectedItem[0].text;
//                    v.proptype=SelectedItem[0].value;
//                });
                this.pickerType='houseType';
                this.pickerShow=true;
                this.pickerData=this.hoseTypeData;
            },
            toggleMortgage(){
                this.isMortgage = !this.isMortgage;
            },
            selectBank(){
                let v = this;
                if(this.isMortgage){
//                    roadPick.setData(this.mortageBankData);
//                    roadPick.show(function (SelectedItem) {
//                        v.bank = SelectedItem[0].text;
//                    });
                    this.pickerType='bank';
                    this.pickerShow=true;
                    this.pickerData=this.bankData;
                }
            },
            changeSelectedValue(type){
                var v = this;
            },
            evaluateCheck(){
                var v=this;

                if((v.floor) > parseInt(v.totalFloor)){
                    console.log("所在楼层大于总楼层")
                    alert('所在楼层大于总楼层')
                    // window.bridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':"所在楼层大于总楼层"}, function(response){})
                }else{
                   v.evaluate()
                }
            },
            evaluate(){

                let v = this ;

                let housueTypeNum

                if (v.houseType == '住宅'){
                    housueTypeNum = '11'
                }else if(v.houseType == '公寓'){
                    housueTypeNum = '12'
                }
                else if(v.houseType == '写字楼'){
                    housueTypeNum = '21'
                }
                else{
                    housueTypeNum = '99'
                }

                let data = {'Txn_Cd':'IFSPEsttCltlLmtMsr',
                    'Bing_Urbn_ECD': v.$store.state.cityID, //所属城市编码
                    'Hs_CnstrctArea': v.houseArea,  //建筑面积
                    'Comm_Hs_Tp': housueTypeNum, //房屋类型
                    'Comm_ID': v.$store.state.Comm_ID,  // 小区id
                    'Comm_Nm': v.$store.state.Comm_Nm,  // 小区名字
                    'Wbt_Floor': v.floor,  //所在楼层
                    'Tot_Floor_Num':v.totalFloor, // 总楼层
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
                allParams.Url = "IFSPEnqrUrbnDstcInf";
                allParams.Head =head;
                allParams.Data =data;


                window.bridge.callHandler('send',allParams,function(response) {

                    if(response.Data.resultdesc == '成功'){

                        v.$router.push({path:'/raiseAmountResult',query:{housePrice:response.Data.CrLine}})

                    }
                    else{
                        
                        alert(response.Data.resultdesc);
                    }


                })
            }
        },
        watch:{
            //console.log(firmName)
            block(val, oldVal){//普通的watch监听
                console.log("block: "+val, oldVal);
                // console.log(userData)
            },
            houseType(val, oldVal){//普通的watch监听  industry
                console.log("houseType: "+val, oldVal);
                // console.log(userData)
            },
            houseArea(val, oldVal){//普通的watch监听
                var v=this;
                console.log("houseArea: "+val, oldVal);
                // this.houseArea=Number(val).toFixed(2);
            },
            floor(val, oldVal){//普通的watch监听
                console.log("floor: "+val, oldVal);
                // console.log(userData)
            },
            totalFloor(val, oldVal){//普通的watch监听
                console.log("totalFloor: "+val, oldVal);
                // console.log(userData)
            },
            isMortgage(val, oldVal){//普通的watch监听
                console.log("isMortgage: "+val, oldVal);
                // console.log(userData)
            },
            bank(val, oldVal){//普通的watch监听
                console.log("bank: "+val, oldVal);
                // console.log(userData)
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