<template>
    <div class="list" ref="wrapper">
        <div>
            <div class="area" v-for="(item,key) of cities" :key="key" :ref="key">
                <div class="title border-topbottom">{{key}}</div>
                <div class="item-list">
                    <div class="item border-topbottom"
                         v-for="innerItem of item"
                         :key="innerItem.Lv1_Br_No"
                         @click="handleCityClick(innerItem.Urbn_Nm,innerItem.Blng_Urbn_ECD)"
                    >{{innerItem.Urbn_Nm}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Bscroll from 'better-scroll'
    export default {
        name: "List",
        props:{
            cities:Object,
            letter:String,
            orderUrl:String,
        },
        methods:{
            handleCityClick (city,cityID){

                    var  v = this;



                    this.$store.commit('changeCity',{city:city,cityID:cityID})

                    this.$router.push({path:v.orderUrl})
            }
        },
        watch:{
            letter () {
                if (this.letter) {
                    const element = this.$refs[this.letter][0]
                    this.scroll.scrollToElement(element)
                }
            },
        },
        mounted () {
            var v = this;
            this.scroll=new Bscroll(v.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
        },
    }
</script>

<style scoped>
    .list{
        overflow: hidden;
        position: absolute;
        top: 2.34rem;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .title{
        line-height: .54rem;
        background: #eee;
        padding-left: .2rem;
        color: #666;
        font-size: .26rem;
    }
    .item-list .item{
        line-height: .76rem;
        padding-left: .2rem;
    }


</style>