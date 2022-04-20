<template>
	<view class="switch-source"><u-picker mode="selector" :title="title" :secTitle="sourceTitle" @confirm="changeSource" v-model="valueT" :default-selector="[selectedSource]" :range="systemSetting.sources" range-key="desc"></u-picker></view>
</template>

<script>
export default {
	name: 'switch-source',
	props:{
		value:{
			type:Boolean,
			default:false
		},
		bookSource:{
			type:Object,
			default:null
		}
	},
	data() {
		return {
			isShow:false,
			title:'当前源：',
			sourceTitle:'',
			selectedSource:0
		};
	},
	computed:{
		systemSetting() {
			return this.$store.getters.getSystemSetting;
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
	watch:{
		bookSource(newVal){
			this.initSource(newVal)
		}
	},
	mounted() {
		this.initSource(this.bookSource)
	},
	methods:{
		initSource(val){
			if(val){
				this.sourceTitle=val.source
				this.title='此书当前源：'
				this.selectedSource=this.systemSetting.sources.findIndex(item=>{
					return item.key==this.bookSource.source
				})
			}else{
				this.sourceTitle=this.systemSetting.defaultSource
				this.title='当前源：'
				this.selectedSource=this.systemSetting.sources.findIndex(item=>{
					return item.key==this.systemSetting.defaultSource
				})
			}
		},
		changeSource(e){
			let source=this.systemSetting.sources[e[0]].key
			if(this.bookSource){
				// console.log(source)
				// this.bookSource.source=source
				// this.$store.commit('books/CHANGE_MY_BOOKS', this.bookSource);
				this.$emit('confirm')
			}else{
				const temp={...this.systemSetting}
				temp.defaultSource=source
				this.$store.commit('setting/SET_SYSTEM_SETTING',temp)
				this.$emit('confirm')
			}
			
		}
	}
};
</script>

<style lang="scss">
.switch-source {
}
</style>
