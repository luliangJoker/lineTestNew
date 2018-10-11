<template>
    <div class="box">
        <router-link to="/raiseAmount">
            <div class="gobackIcon">
                  <span class="goback">
                    <i class="el-icon-arrow-left goback"></i>
            </span>
            </div>
        </router-link>
        <top-title :postTitle="titleMessage" :showCityPosition="showCity"></top-title>
        <city-search></city-search>
    </div>
</template>

<script>
    import CitySearch from './components/Search.vue'
    export default {
        name: "selectCom",
        data (){
            return{
                titleMessage:'小区查找',
                showCity:false,
            }
        },
        components:{
            CitySearch,
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