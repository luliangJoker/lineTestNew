<template>
    <div class="container">
        <top-title :postTitle="titleMessage" @getCity="getCity"></top-title>
        <ul class="info">
            <li class="item-info">
                <label for="block-name">小区名字</label>
                <input type="text" id="block-name" placeholder="请选择" readonly v-model="block" @click="selectBlock">
                <i id="select-block" class="el-icon-arrow-right arr-right"></i>
            </li>
            <li class="item-info">
                <label for="house-type">房屋类型</label>
                <input type="text" id="house-type" placeholder="请选择" readonly  v-model="houseType" @click="selectHouseType">
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
            <li class="item-info">
                <label>房产是否抵押</label>
                <!--<div class="mui-switch" @click="toggleMortgage" >-->
                    <!--<div class="mui-switch-handle"></div>-->
                <!--</div>-->
                <mt-switch v-model="isMortgage"></mt-switch>
            </li>
            <li class="item-info mortgage-bank" :class="{ disabled : !isMortgage }" >
                <label for="mortgage">抵押银行</label>
                <input type="text" id="mortgage" placeholder="请选择" readonly v-model="bank" @click="selectBank">
                <i id="select-bank" class="el-icon-arrow-right arr-right"></i>
            </li>
        </ul>
        <button v-bind:disabled="(!block || !houseType || !houseArea || !floor || !totalFloor ||(isMortgage&&!bank) )" class="btn-calc" @click="evaluate">测算</button>
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
                               ]},
                             ],
                houseType:'',
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
                setTimeout(function() {
                    window.WebViewJavascriptBridge.callHandler("cityClick",{'name':'深圳','code':'001'}, function (response) {
                        if (typeof response == "string") {
                            response = JSON.parse(response)
                        }
                        console.log(response);
                        v.city=response.citycode;
                        console.log("获取城市")
                        console.log(response);
                    })
                }, 500)
            }else{
                window.WebViewJavascriptBridge.callHandler('cityClick',{'name':'深圳','code':'001'}, function (response) {
                    if (typeof response == "string") {
                        response = JSON.parse(response)
                    }
                    console.log(response);
                    v.city=response.citycode;
                    console.log("获取城市")
                    console.log(response);
                })
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
                let v = this;
                this.pickerType='block'
               // this.pickerShow=true;
                this.pickerData=this.blockData;

                /////////////获取小区
                var params = {'title':'测试分享的标题','content':'测试分享的内容','url':'http://www.baidu.com'};

                window.WebViewJavascriptBridge.callHandler('send', params, function(response) {

                    // console.log(response);
                    alert(response);

                    if (typeof response == "string"){
                        response = JSON.parse(response)
                    }
                    v.block=response.haname;
                    v.hacode=response.hacode;
                })
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
            evaluate(){
                //接口中的字段名称
                var userData={
                    city:"",//需要获取
                    bldgarea:"",//建筑面积 e.g., ”88.88”
                    proptype:"",//房屋类型
                    hacode:"",  //小区编号 需要获取
                    haname:"",  //小区名称
                    floor:"",   //所在楼层
                    height:"",  //总楼层
                    traceno:"", //信用额度测算追踪流水号 从上页面获取
                }
                var output= {
                    haname:this.block,//
                    proptype:this.proptype,//
                    bldgarea:this.houseArea,//
                    floor:this.floor,//
                    height:this.totalFloor,//
                    city:this.city,   //
                    traceno:this.traceno,//
                    hacode:this.hacode,//
                    //isMortgage:this.isMortgage, //是否抵押
                    //bank:this.bank
                };
                console.log(output)
                window.WebViewJavascriptBridge.callHandler('serverRequest', {'transcode': 'ucspss400016', 'body':output}, function(response) {
                    if (typeof response == "string"){
                        response = JSON.parse(response)
                    }
                     console.log(response)
                if (response.header['resultcode'] == '000000') {
                      localStorage.setItem("submitevaluatedata",JSON.stringify(response))
                     // window.location.href="raiseAmountResult.html"
                     this.$router.push("/raiseAmountResult")
                }else{
                    window.WebViewJavascriptBridge.callHandler('showOKDialog', {'title': '温馨提示', 'message':response.header['resultdesc']}, function(response){})
                }
                });
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

</style>