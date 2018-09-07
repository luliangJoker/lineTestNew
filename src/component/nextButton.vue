<template>
	<div class="bt-button">
		<el-button type="primary" class="next-button" v-bind:disabled="nextDis" round @click="nextApply">{{buttonText}}
		</el-button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// nextDis: false
			}
		},
		props: ['nextDis','buttonText'], 
		methods: {
			nextApply() {
				this.$emit('add-parent-next')
			}
		}
	}	



</script>
<style lang="scss">

	.bt-button{
		margin-top: 0.6rem;
		padding: 0 0.3rem;
	}

	.next-button{
		background: linear-gradient(0deg,rgba(105,144,213,1),rgba(87,137,204,1));
	    border: none;
		font-size: 0.32rem;
		height: 0.8rem;
		color: #fff;
		width: 100%;
	}

	.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
		background-color: #d9d9d9;
		color: #fff;
	}
	.el-button:focus, .el-button:hover,.el-button:active{
		color: #fff;
	}
	.el-button--primary.is-active, .el-button--primary:active {
		background:linear-gradient(0deg,rgba(92,128,189,1),rgba(81,128,189,1));
	}
	.el-button--primary:hover {
		background:linear-gradient(0deg,rgba(92,128,189,1),rgba(81,128,189,1));
		border: none;
	}
</style>