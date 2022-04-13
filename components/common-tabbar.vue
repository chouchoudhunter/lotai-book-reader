<template>
	<view class="common-tabbar">
				<u-tabbar :list="tabList" :bg-color="color.bgPage" :border-top="false" active-color="#296dff" :inactive-color="color.normalText"></u-tabbar>
	</view>
</template>

<script>
	export default {
		name:"common-tabbar",
		data() {
			return {
				tabList: [
					{
						iconPath: '../../static/tabs/home.png',
						selectedIconPath: '../../static/tabs/home.png',
						text: '首页',
						customIcon: false,
						pagePath: '/pages/tabs/book'
					},
					{
						iconPath: '../../static/tabs/discord.png',
						selectedIconPath: '../../static/tabs/discord.png',
						text: '发现',
						customIcon: false,
						pagePath: '/pages/tabs/discord'
					},
					{
						iconPath: '../../static/tabs/user.png',
						selectedIconPath: '../../static/tabs/user.png',
						text: '我的',
						customIcon: false,
						pagePath: '/pages/tabs/user'
					}
				],
			};
		},
		computed: {
			isNightMode() {
				return this.$store.getters.getIsNightMode;
			},
			color() {
				return this.$store.getters.getColor;
			}
		},
		watch:{
			isNightMode(newVal,oldVal){
				this.changeTabIcon(newVal)
			}
		},
		mounted() {
			this.changeTabIcon(this.isNightMode)
		},
		methods:{
			changeTabIcon(mode){
				if(mode){
					this.tabList[0].selectedIconPath='../../static/tabs/home-night.png'
					this.tabList[0].iconPath='../../static/tabs/home-night.png'
					this.tabList[1].selectedIconPath='../../static/tabs/discord-night.png'
					this.tabList[1].iconPath='../../static/tabs/discord-night.png'
					this.tabList[2].selectedIconPath='../../static/tabs/user-night.png'
					this.tabList[2].iconPath='../../static/tabs/user-night.png'
				}else{
					this.tabList[0].selectedIconPath='../../static/tabs/home.png'
					this.tabList[0].iconPath='../../static/tabs/home.png'
					this.tabList[1].selectedIconPath='../../static/tabs/discord.png'
					this.tabList[1].iconPath='../../static/tabs/discord.png'
					this.tabList[2].selectedIconPath='../../static/tabs/user.png'
					this.tabList[2].iconPath='../../static/tabs/user.png'
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
