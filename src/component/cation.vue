<template>
	<div class="cation">
		<button v-if="cationCode" @click="cationFn">获取验证码</button>
		<button class="rest" v-if="!cationCode">重新发送 ({{class1}}s) </button>
	</div>
	
</template>
<script>
	export default {
		name: 'cation-code',
		data() {
			return{
				cationCode: true,
				class1: 60
			}
			
		},
		methods:{
			cationFn() {
				this.cationCode = !this.cationCode;
				this.$emit('add-parent-phone');
				let auth_timetimer = setInterval(()=>{
					this.class1--;
					if(this.class1 <= 0){
						this.cationCode = true;
						this.class1 = 60;
						clearInterval(auth_timetimer);
					}
				}, 1000);
				
			}


		}
	}
</script>
<style lang="scss">
	.cation{
		button {
			background: #fff;
		    border: none;
		    color: #4A7AE0;
		    line-height: 1rem;
    		font-size: 0.3rem;
		    &:focus {
		    	outline: none;
		    }
		    &.rest {
				color: #ccc;
		    }
		}
	}
</style>