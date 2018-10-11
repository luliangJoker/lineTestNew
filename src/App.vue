<template>
  	<div id="app">
		<!--<keep-alive>-->
			<router-view></router-view>
		<!--</keep-alive>-->
  	</div>
</template>
<script>
	import Vue from 'vue';
	import ElementUI from 'element-ui';
	Vue.use(ElementUI);
	
	export default {
		created() {

           // this.$router.push('/citySearch')
           // this.$router.push('/InputInfo')
           // this.$router.push('/testAmountResult')
           // this.$router.push('/selectCom')
           this.$router.push('/swiperHome')
        }
	}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}
html {
  	font-family: "Avenir", Helvetica, Arial, sans-serif,PingFang-SC;
	background: #f5f5f5;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
}
html,body,#app{
	min-height: 100%;
}
</style>