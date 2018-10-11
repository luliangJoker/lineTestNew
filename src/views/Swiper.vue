<template>
    <div>
        <div class="headerClass">
            <div class="headerStartImg" @click="toRegister">
                <img :src="headerImg" v-bind:style="headerImgObj"/>
                <span> 深圳</span>
            </div>
            
            <div class="xiesiClass">
                <span>建行惠懂你</span>
                 
            </div>
           <div class="headerEndImg" @click="toRegister">
                <img :src="headerEndImg" v-bind:style="headerEndImgObj">
           </div>

        </div>
        <img :src="gifImg" class="imgClass"/>
        <div>
             <span class="spanNum">{{startNum}},{{endNum}}</span>
        </div>
        <div class="btnDivClass">
         <button class="btnClass" @click="toRaiseAmount">测测贷款额度</button>
        </div>
        <img :src="zuigaoImg" v-bind:style="zuigaoImgObj" @click="toRegister"/>
        <div class="homeIcon">
            <div v-bind:style="home_open_icon_obj" @click="toRegister">
                <img :src="home_open_icon" v-bind:style="home_icon"/>
                <p>预约开户</p>
            </div>
            <div v-bind:style="home_loan_icon_obj" @click="toRegister">
                <img :src="home_loan_icon" v-bind:style="home_icon"/>
                <p>我要贷款</p>
            </div>
            <div v-bind:style="home_progress_icon_obj" @click="toRegister">    
                <img :src="home_progress_icon" v-bind:style="home_icon"/>
                <p>进度查询</p>
            </div>
        </div>
        <p class="one"></p>
    <div class="swiperClass">    
     <swiper :options="swiperOption" ref="mySwiper">
         <!-- slides -->
        <swiper-slide class="swiperImg">
            <img class="swiperImg" :src="home_xinyongkauidai" @click="toRegister"/>
            <img class="swiperImg" :src="home_diyakuaidai"  @click="toRegister"/>
            <img class="swiperImg" :src="home_zhiyakuaidai"  @click="toRegister"/>
        </swiper-slide>
        <swiper-slide class="swiperImg">
            <img class="swiperImg" :src="home_pingtaikauidai" @click="toRegister"/>
        </swiper-slide>
         <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
     </swiper>
    </div>
   <div class="span_class">
    <p>~建行普惠，懂你所需~</p>
   </div>
    <p class="two"></p>
        <div class="tabBar">
            <div v-bind:style="home_bottom">
                <div v-bind:style="home_nor_obj" @click="toRegister">
                    <img :src="home_nor" v-bind:style="home_nor_img"/>
                    <p class="p1_calss">首页</p>
                </div>
                <div v-bind:style="loan_nor_obj" @click="toRegister">
                    <img :src="loan_nor" v-bind:style="home_nor_img"/>
                    <p class="p2_calss">贷款</p>
                </div>
                <div v-bind:style="mine_nor_obj" @click="toRegister">
                    <img :src="mine_nor" v-bind:style="home_nor_img"/>
                    <p class="p3_calss">我的</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name:'HomeSwiper',
    components: {
        swiper,
        swiperSlide
    },
    data() {
      return {
        swiperOption: {},
        gifImg: require("../images/1537856681216.gif"),
        startNum:123,
        endNum:456,
        headerImg:require("../images/home_address_icon.png"),
        zuigaoImg:require("../images/1537865034031.gif"),
        headerImgObj:{
                width: '.2rem',
                height: '.2rem',
                marginLeft:'.3rem'
        },
        home_open_icon_obj:{
            marginLeft:'.8rem'
        },
        home_loan_icon_obj:{
           marginLeft: '3.1rem',
           marginTop: '-1.3rem'
        },
        home_progress_icon_obj:{
               marginLeft: '5.4rem',
               marginTop: '-1.3rem'
        },
         headerEndImgObj:{
                width: '.3rem',
                height: '.3rem',
                marginLeft:'.3rem'
        },
        zuigaoImgObj:{
            width: '1.2rem',
            marginTop: '-2.00rem',
            position: 'absolute',
            marginLeft: '6.2rem'
        },
         home_nor_obj:{
                marginLeft:'1.2rem'
        },
         loan_nor_obj:{
                marginLeft: '3.3rem',
                marginTop: '-0.8rem'
        },
        mine_nor_obj:{
                marginLeft: '5.5rem',
                marginTop: '-0.76rem'
        },
        home_open_icon: require("../images/home_open_icon.png"),
        home_loan_icon: require("../images/home_loan_icon.png"),
        home_progress_icon: require("../images/home_progress_icon.png"),
        home_nor:require("../images/home_nor.png"),
        loan_nor:require("../images/loan_nor.png"),
        mine_nor:require("../images/mine_nor.png"),
        home_xinyongkauidai:require("../images/home_xinyongkauidai.png"),
        home_diyakuaidai:require("../images/home_diyakuaidai.png"),
        home_zhiyakuaidai:require("../images/home_zhiyakuaidai.png"),
        home_pingtaikauidai:require("../images/home_pingtaikauidai.png"),
        home_icon:{
            width: '0.8rem',
            height:'0.8rem',
            marginLeft: '.2rem',
            marginBottom: '.2rem'
        },
        home_nor_img:{
            width: '0.4rem',
            height:'0.4rem',
            marginLeft: '.2rem',
            marginBottom: '.2rem'
        },

        home_span:{
            tetxAlign:'center'
        },
        headerEndImg:require("../images/home_earth.png"),
        home_bottom:{
            marginTop: '.1rem',
            // position: 'absolute',
            paddingBottom: '0.2rem',
            overflow: 'auto'
        }
      }
    },
    mounted() {

        let v=this;
        let currentCity='';

        function getCurrentCity(result) {

            currentCity = result.name;
            console.log("当前定位城市:" + currentCity);
            let  curr= currentCity.replace("市", "");;

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

                let UrbnInfArr = res.Data.UrbnInfArr;
                let firstArr = new Array();
                let keyInitatle =  UrbnInfArr[0]['Blng_Urbn_ECD'].substr(0,1);

                for(let i=0; i< UrbnInfArr.length;i++) {

                    let cityObj = UrbnInfArr[i];

                    if (cityObj['Urbn_Nm'] == curr) {
                        v.$store.commit('changeCity',{city:cityObj['Urbn_Nm'],cityID:cityObj['Blng_Urbn_ECD']})
                        // v.$store.state.city = cityObj['Urbn_Nm'];
                        // v.$store.state.cityID = cityObj['Blng_Urbn_ECD'];
                    }
                }
            })


        }

        var myCity = new BMap.LocalCity();
        myCity.get(getCurrentCity);

    },
    created(){
        var v=this; 
        setInterval(v.initNum,100);
    },
    methods:{
        toRaiseAmount(){
             this.$router.push('/InputInfo');
        },
        toRegister(){
            window.location.href="http://leye.qiye.lht1.ccb.com/static/leyeapp/home/reward/index.html";
        },
        initNum(){
             
            var v=this;
            v.startNum=v.RandomNumBoth(100,999);
            v.endNum=v.RandomNumBoth(100,999);
        },
        RandomNumBoth(Min,Max){
            var Range = Max - Min;
            var Rand = Math.random();
            var num = Min + Math.round(Rand * Range); //四舍五入
            return num;
        }
    }
}
</script>
<style>

.imgClass{
    width: 100%;
    height: 5.4rem;
}
.swiperImg{
    width: 1.8rem;
    height: 1.8rem;
    margin-right: .5rem;
}
.spanNum{
    position:  absolute;
    margin-top: -0.46rem;
    margin-left: 3.21rem;
    font-size: .2rem;
    color:white;
}
.headerClass{
    position: absolute;
    color:white;
    margin-top: .2rem;
}
.xiesiClass{
    font-size: .4rem;
    margin-left: 2.8rem;
    margin-top: -.3rem;
}
.headerEndImg{
    margin-top: -0.4rem;
    margin-left: 6.6rem;
}

.btnDivClass{    
    text-align: center;
    height: 1.2rem;
    margin-top: .2rem;
    margin-bottom: .2rem;
}
.btnClass{
    width: 4rem;
    height: .8rem;
    border-radius: 25px;
    background: #FBD65B;
    color:#974E00;
    font-size:.3rem;
}
.one{
    border-style: solid;
    border-color: #ebeef5;
    height: .1rem;
    background: #ebeef5;
}
.two{
    border-style: solid;
    border-color: #EDEDED;
    /*margin-top: -0.4rem;*/
}
.homeIcon{
    margin-bottom: .6rem;
}
.swiperClass{
    margin-left: .4rem;
    margin-top: .2rem;
}
.home_nor_class{
    margin-top: .6rem;
}
.p1_calss{
    margin-left: .1rem;
    margin-top: -.1rem;
}
.p2_calss{
    margin-left: .1rem;
    margin-top: -.1rem;
}
.p3_calss{
    margin-left: .1rem;
    margin-top: -.1rem;
}
.span_class{
    text-align: center;
    margin-top: .4rem;
    margin-bottom: 0.6rem
}
.tabBar{
    position: fixed;
    left: 0;
    right:0;
    bottom: 0;
    background: white;
}
</style>
