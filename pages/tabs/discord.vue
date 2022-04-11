<template>
	<view class="discord" :style="{backgroundColor:color.bgPage}">
		<status-placeholder></status-placeholder>
		<view class="top" @click="goSearch()"><u-search :disabled="true" :show-action="false" :bg-color="color.cardBg"></u-search></view>
		<view class="tab"><u-tabs ref="tabs" :inactive-color="color.normalText" :bg-color="color.bgPage" :list="tagList" :is-scroll="false" :current="currentTag" @change="changeTag"></u-tabs></view>
		<swiper
			class="swiper"
			:current="currentTag"
			:indicator-dots="false"
			:duration="500"
			:style="{ height: swiperHeight+'px',backgroundColor:color.swiperBg}"
			@change="changeSwiper"
		>
			<swiper-item class="swiperItem">
				<view class="leftBar" :style="{backgroundColor:color.bgPage}">
					<view class="btn" :class="{'btn-active':swiper1Tag==0}" @click="changeSwiper1Tag(0)">全部分类</view>
					<view class="btn" :class="{'btn-active':swiper1Tag==1}" @click="changeSwiper1Tag(1)">最热榜</view>
					<view class="btn" :class="{'btn-active':swiper1Tag==2}" @click="changeSwiper1Tag(2)">完结榜</view>
					<view class="btn" :class="{'btn-active':swiper1Tag==3}" @click="changeSwiper1Tag(3)">新书榜</view>
				</view>
				<view class="right">
					<view class="cates" :style="{color:color.normalText}">
						<view class="cate">
							<view>
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>	
							<view class="name">玄幻</view>
							</view>
						</view>
						<view class="cate">
							<view>
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>	
							<view class="name">武侠</view>
							</view>
						</view>
						<view class="cate">
							<view>
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>	
							<view class="name">悬疑</view>
							</view>
						</view>
						<view class="cate">
							<view>
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>	
							<view class="name">科幻</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiperItem">
				<view class="leftBar">
					<view class="btn btn-active">全部分类</view>
					<view class="btn">最热榜</view>
					<view class="btn">完结榜</view>
					<view class="btn">新书榜</view>
				</view>
				<view class="right"></view>
			</swiper-item>
		</swiper>
		<u-tabbar :list="tabList" :bg-color="color.bgPage" :border-top="false" active-color="#296dff" :inactive-color="color.normalText"></u-tabbar>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
export default {
	components: { statusPlaceholder },
	data() {
		return {
			tabList: [
				{
					iconPath: '../../static/tabs/home.png',
					selectedIconPath: '../../static/tabs/home.png',
					text: '首页',
					customIcon: false,
					pagePath:'/pages/tabs/book'
				},
				{
					iconPath: '../../static/tabs/discord.png',
					selectedIconPath: '../../static/tabs/discord.png',
					text: '发现',
					customIcon: false,
					pagePath:'/pages/tabs/discord'
				},
				{
					iconPath: '../../static/tabs/user.png',
					selectedIconPath: '../../static/tabs/user.png',
					text: '我的',
					customIcon: false,
					pagePath:'/pages/tabs/user'
				}
			],
			title: 'Hello',
			isLight: true,
			tagList: [
				{
					name: '排行'
				},
				{
					name: '精选'
				}
			],
			currentTag: 0,
			statusBarHeight: 0,
			swiperHeight:0,
			swiper1Tag:0
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color(){
			return this.$store.getters.getColor;
		}
	},
	mounted() {
		const systemInfo = getApp().globalData.systemInfo;
		this.statusBarHeight = systemInfo.statusBarHeight;
		this.swiperHeight=systemInfo.windowHeight-systemInfo.statusBarHeight-151
	},
	methods: {
		changeSwiper1Tag(index){
			this.swiper1Tag=index
		},
		changeTag(index) {
			this.currentTag = index;
		},
		changeSwiper(e) {
			this.currentTag = e.detail.current;
		},
		goSearch() {
			console.log(111);
			uni.navigateTo({
				url: '../search/search'
			});
		}
	}
};
</script>

<style lang="scss">
.discord {
	height: 100%;
	.top {
		padding: 15px 20px;
	}
	.swiper {
		.swiperItem {
			display: flex;
			flex-direction: row;
			.leftBar {
				background-color: #ffffff;
				width: 70px;
				.btn {
					line-height: 40px;
					height: 40px;
					text-align: center;
					position: relative;
				}
				.btn-active {
					background-color: #efefef;
				}
				.btn-active:after {
					content: '';
					display: block;
					width: 4px;
					height: 100%;
					background-color: #2970ff;
					position: absolute;
					left: 0;
					top: 0;
				}
			}
			.right {
				width: calc(100% - 70px);
				height: 100%;
				padding: 10px;
				.cates {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					flex-wrap: wrap;
					.cate {
						width: 33%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						margin-bottom: 10px;
						.img {
							width: 75px;
							height: 100px;
							border-radius: 5px;
							overflow: hidden;
						}
						.name{
							text-align: center;
							margin-top: 5px;
						}
					}
				}
			}
		}
	}
}
</style>
