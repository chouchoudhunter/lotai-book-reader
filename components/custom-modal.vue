<template>
	<view class="custom-modal">
		<u-modal :title-style="{color:color.secText}" :bgColor="color.cardBg" :cancel-style="{color:color.secText}" :content-style="{color:color.normalText}" v-model="valueT" :title="title" :content="content" :show-cancel-button="true" @confirm="confirm" :async-close="asyncClose">
			<slot></slot>
		</u-modal>
	</view>
</template>

<script>
	export default {
		name:"custom-modal",
		props:{
			value:{
				type:Boolean,
				default:false
			},
			asyncClose:{
				type:Boolean,
				default:false
			},
			content:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:'提示'
			}
		},
		data() {
			return {
			};
		},
		computed:{
			color() {
				return this.$store.getters.getColor;
			},
			valueT:{
				get(){
					return this.value
				},
				set(newVal){
					this.$emit('input',newVal)
				}
			}
		},
		methods:{
			confirm(){
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss">
.custom-modal{
	
}
</style>
