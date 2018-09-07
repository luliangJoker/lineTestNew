<template>
  	<div id="app">
    	<router-view></router-view>
  	</div>
</template>
<script>
	import Vue from 'vue';
	import ElementUI from 'element-ui';
	Vue.use(ElementUI);
	
	export default {
		created() {
            this.$router.push('/testAmountResult')
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