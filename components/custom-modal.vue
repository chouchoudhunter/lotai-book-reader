<template>
	<view class="custom-modal">
		<u-modal ref="modal" :title-style="{color:color.secText}" :bgColor="color.cardBg" :cancel-style="{color:color.secText}" :content-style="{color:color.normalText}" v-model="valueT" :title="title" :content="content" :showConfirmButton="showConfirmButton" :showCancelButton="showCancelButton" @confirm="confirm" :async-close="asyncClose" :cancel-text="$attrs['cancel-text']" :confirm-text="$attrs['confirm-text']">
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
			showConfirmButton:{
				type:Boolean,
				default:true
			},
			showCancelButton:{
				type:Boolean,
				default:true
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
			clearLoading(){
				this.$refs.modal.clearLoading()
			},
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
