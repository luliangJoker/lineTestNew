<template>
    <div>
        <div class="search">
            <!--<div class="child"></div>-->
            <input class="search-input" v-model="keyword" type="text" placeholder="输入小区名称" />
            <div class="search-content" ref="wrapper" v-show="keyword">
                <ul>
                    <li class="search-item border-bottom"
                        v-for="item of list"
                        @click="handle(item.Urbn_Nm,item.Blng_Urbn_ECD)"
                    >{{item.Urbn_Nm}}</li>
                    <li class="search-item border-bottom"
                        v-for="item of list"
                        @click="handleCommClick(item.Comm_Nm,item.Comm_ID)">{{item.Comm_Nm,item.Comm_ID}}</li>
                    <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配数据</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Bscroll from 'better-scroll'
    export default {
        name: "Search",
        data(){
            return {
                keyword:'',
                list:[],
                timer:null
            }
        },
        methods:{
            handleCommClick (ComNm,ComID){

                // alert('999999')

                this.$store.commit('changeCom',{comNm:ComNm,comID:ComID})

                this.$router.push('/raiseAmount')
            }
        },
        computed: {
            hasNoData () {
                let v = this
                // alert(!v.list.length)
                return !this.list.length
            }
        },
        watch: {
            keyword() {
                let v = this
                if (v.timer) {
                    clearTimeout(this.timer)
                }
                if (!v.keyword){
                    v.list = []
                    return
                }
                v.timer = setTimeout(() => {

                    let data = {'Blng_Urbn_ECD':v.$store.state.cityID,
                        'Comm_Nm': v.keyword,
                        'Txn_Cd':'IFSPEnqrCommLst',
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
                    allParams.Url ="IFSPEnqrUrbnDstcInf";
                    allParams.Head =head;
                    allParams.Data =data;

                    window.bridge.callHandler('send',allParams,function(response) {

                        if (response.Data.resultdesc == '成功'){
                            // alert('成功')
                            v.list = response.Data.CommLstArr;
                            // v.$store.state.Comm_ID
                        }else{
                            // alert('无数据')
                            v.list = [];
                        }

                    })


                }, 100)
            }
        },
        mounted (){
            var v = this;
            v.scroll=new Bscroll(v.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
        }
    }
</script>

<style scoped>
    .search{
        margin-top: 1.52rem;
        height: .72rem;
        padding: .1rem .1rem 0 .1rem;
        /*!*background: #eee;*!*/
        background: skyblue;
    }
    input{
        display: block;
        box-sizing: border-box;
        border: 0;
        outline: none;
        width: 100%;
        height: .62rem;
        padding: 0 .1rem;
        line-height: .62rem;
        border-radius: .06rem;
        color: #666;
    }
    .search-content{
        z-index :1;
        overflow:hidden;
        position :absolute;
        top:2.34rem;
        left:0;
        right:0;
        bottom:0;
        background :#eee;
    }
    .search-item{
        line-height :.62rem;
        padding-left :.2rem;
        background :#fff;
        color:#666;
    }




</style>