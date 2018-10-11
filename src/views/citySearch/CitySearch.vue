<template>
    <div class="box">
        <router-link :to="{path:orderUrl}">
            <div class="gobackIcon">
                  <span class="goback">
                    <i class="el-icon-arrow-left goback"></i>
                  </span>
            </div>
        </router-link>
        <top-title :postTitle="titleMessage" :showCityPosition="showCity"></top-title>
        <city-search :cities="cities" :orderUrl="orderUrl"></city-search>
        <city-list :cities="cities" :letter="letter" :orderUrl ='orderUrl'></city-list>
        <city-alphabet :cities="cities" @change="handleLetterChange"></city-alphabet>
    </div>

</template>

<script>
    import axios from 'axios'
    import CitySearch from './components/Search.vue'
    import CityList from './components/List.vue'
    import CityAlphabet from './components/Alphabet.vue'


    export default {
        name: "City",
        components:{
            CitySearch,
            CityList,
            CityAlphabet
        },
        // route: {
        //     data() {
        //         this.$root.showLoading();
        //         return this.fetchCertificates().then((res) => {
        //             this.$root.dismissLoading();
        //             if (res.error) return this.$root.toastError(res.error);
        //             if(res.data.certificates.length >0){
        //                 return res.data;
        //             }else{
        //                 console.log(this.$route ,"----当前页面的url信息----");
        //             }
        //         });
        //     },
        //     canActivate (transition) {
        //         console.log(transition,"======上一个页面的url信息=======");
        //         transition.next();
        //     }
        // },
        data (){
            return{
                titleMessage:'城市选择',
                showCity:false,
                letter:'',
                cities:{},
                orderUrl:''
            }
        },
        methods:{
            // 获取所有城市数据
            getCityInfo(){
                var v = this;


                // let Url ={'url':"IFSPEnqrUrbnDstcInf"};

                let data={};

                data.Enqr_Tp='city';
                data.Txn_Cd='IFSPEnqrUrbnDstcInf';
                data.Tpl_Vno='1.0';
                data.Txn_Chnl_ID='400010';
                data.Chnl_TpCd='4000';
                data.TermTp='10';

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

                var allParams={};
                allParams.Head =head;
                allParams.Data =data;
                allParams.Url = "IFSPEnqrUrbnDstcInf";

                window.bridge.callHandler('send',allParams,function(res) {

                    // 1.接口数据进行处理，循环从Blng_Urbn_ECD字段提取第一个字母转大写，并去除重复的字段
                    let UrbnInfArr = res.Data.UrbnInfArr;
                    let firstArr = new Array();
                    let keyInitatle =  UrbnInfArr[0]['Blng_Urbn_ECD'].substr(0,1);

                    for(let i=0; i< UrbnInfArr.length;i++){
                        let cityObj = UrbnInfArr[i];
                        let firstLetter =   cityObj['Blng_Urbn_ECD'].substr(0,1).toUpperCase();

                        firstArr.push(firstLetter);
                        let key = firstLetter;
                        if ( key != keyInitatle){
                            keyInitatle = key ;
                        }
                    }
                    let newFirstArr = Array.from(new Set(firstArr));  //打印出 A B C D ...
                    // alert(newFirstArr);

                    // 2.接口数据二次处理 ,转化为此种格式
                    //  obj = {
                    //     "A"
                    // :
                    //     [{
                    //         "id": 56,
                    //         "spell": "aba",
                    //         "name": "阿坝"
                    //     }, {
                    //         "id": 57,
                    //         "spell": "akesu",
                    //         "name": "阿克苏"
                    //     }], "B"
                    // :
                    //     [{
                    //         "id": 1,
                    //         "spell": "beijing",
                    //         "name": "北京"
                    //     }, {
                    //         "id": 66,
                    //         "spell": "baicheng",
                    //         "name": "白城"
                    //     }],
                    // ...
                    // }
                    let obj = {};
                    for(let i= 0;i<newFirstArr.length;i++) {
                        let letterArr = [];
                        let firstLet = newFirstArr[i];
                        for (let j = 0; j < UrbnInfArr.length; j++) {
                            let cityObj = UrbnInfArr[j];
                            let firstLetter = cityObj['Blng_Urbn_ECD'].substr(0, 1).toUpperCase();
                            if (firstLetter == firstLet) {
                                letterArr.push(cityObj);
                                obj[firstLet] = letterArr;
                            }
                        }
                        if (i == newFirstArr.length -1){

                        }
                    }

                    v.cities = obj;

                })
            },
            // 首字母传递
            handleLetterChange(letter){
                this.letter=letter;
            },

        },
        // beforeRouteEnter (to, from, next){
        //     var v = this;
        //     next(vm => {
        //         // 通过 `vm` 访问组件实例,将值传入oldUrl
        //         // alert(from.path)
        //         vm.olderUrl = from.path
        //         //
        //         // alert('303030330')
        //         // alert(v.orderUrl)
        //     })
        // },
        // watch: {
        //     '$route'(to, from) {
        //         const toDepth = to.path;
        //         const fromDepth = from.path.split('/').length；
        //     }
        // },
        mounted() {
            var v = this
            v.orderUrl = v.$route.query.routePath

            v.getCityInfo();
            // v.$nextTick(() => {
            //
            //     alert('路由进来了')
            //     // 验证是否获取到了上页的url
            //     /* eslint-disable no-console */
            //     alert(vm.orderUrl)
            // })
        }

    }
</script>

<style scoped>

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