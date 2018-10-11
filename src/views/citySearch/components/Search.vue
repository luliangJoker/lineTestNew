|||<template>
    <div class="search-box">
        <div class="search">
            <!--<div class="child"></div>-->
            <input class="search-input" v-model="keyword" type="text" placeholder="输入城市名或城市拼音首字母" />
        </div>
        <div class="search-content" ref="wrapper" v-show="keyword">
            <ul>
                <li class="search-item border-bottom" v-for="item of list" @click="handle(item.Urbn_Nm,item.Blng_Urbn_ECD)">{{item.Urbn_Nm}}</li>
                <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配数据</li>
            </ul>
        </div>

    </div>
</template>

<script>
    import Bscroll from 'better-scroll'
    export default {
        name: "SearchCity",
        data(){
            return {
                keyword:'',
                list:[],
                timer:null
            }
        },
        props:{
            cities:Object,
            orderUrl:String,
        },
        methods:{
            handle(city,cityID){

                // alert('搜索进来了')

                let v =this

                this.$store.commit('changeCity',{city:city,cityID:cityID})


                this.$router.push({path:v.orderUrl})
            }
        },
        computed: {
            hasNoData () {
                let v = this

                return !this.list.length
            }
        },
        watch: {
            keyword() {
                let v = this
                if (v.timer) {
                    clearTimeout(this.timer)
                }
                if (!v.keyword) {
                    v.list = []
                    return
                }

                v.timer = setTimeout(() => {
                    const result = []
                    for (let i in v.cities) {
                        v.cities[i].forEach((value) => {
                            if (value.Blng_Urbn_ECD.indexOf(v.keyword) > -1 || value.Urbn_Nm.indexOf(v.keyword) > -1) {
                                result.push(value)
                            }
                        })
                    }



                    v.list = result


                }, 100)


            }

        },
        mounted (){
            var v = this
            v.scroll=new Bscroll(v.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
        }

    }
</script>

<style scoped>
    .search-box{
        margin-top: 1.52rem;
    }
    .search{
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