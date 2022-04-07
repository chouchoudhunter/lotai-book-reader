<template>
	<view class="discord">
		<status-placeholder></status-placeholder>
		<view class="top" @click="goSearch()"><u-search :disabled="true" :show-action="false"></u-search></view>
		<view class="tab"><u-tabs ref="tabs" :list="tagList" :is-scroll="false" :current="currentTag" @change="changeTag"></u-tabs></view>
		<swiper class="swiper" :current="currentTag" :indicator-dots="false" :duration="500" :style="{height:'calc(100% -'+62+statusBarHeight+'px)'}" @change="changeSwiper">
			<swiper-item class="swiperItem">
				<view class="leftBar">
					<view class="btn btn-active">全部分类</view>
					<view class="btn">最热榜</view>
					<view class="btn">完结榜</view>
					<view class="btn">新书榜</view>
				</view>
				<view class="right">
					<view class="cates">
						<view class="cate">
							<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
							<view class="name">玄幻</view>
						</view>
						<view class="cate">
							<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
							<view class="name">武侠</view>
						</view>
						<view class="cate">
							<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
							<view class="name">悬疑</view>
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
				<view class="right">
					
				</view>
			</swiper-item>
			<swiper-item  class="swiperItem">
				<view class="swiper-item uni-bg-blue">C</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
export default {
	components: { statusPlaceholder },
	data() {
		return {
			title: 'Hello',
			isLight: true,
			tagList: [
				{
					name: '男生'
				},
				{
					name: '女生'
				},
				{
					name: '排行'
				}
			],
			currentTag: 0,
			statusBarHeight:0,
		};
	},
	mounted() {
		const systemInfo = getApp().globalData.systemInfo;
		this.statusBarHeight = systemInfo.statusBarHeight;
	},
	onShow() {
		console.log('bbb');
	},
	onLoad() {},
	methods: {
		changeTag(index) {
			this.currentTag = index;
		},
		changeSwiper(e){
			this.currentTag=e.detail.current
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
	.top {
		padding: 15px 20px;
	}
	.swiper{
		height: 500px;
		background-color: #efefef;
		.swiperItem{
			display: flex;
			flex-direction: row;
			.leftBar{
				background-color: #ffffff;
				width:70px;
				.btn{
					line-height: 40px;
					height: 40px;
					text-align: center;
					position: relative;
				}
				.btn-active{
					background-color: #efefef;
				}
				.btn-active:after{
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
			.right{
				.cates{
					display: flex;
					flex-direction: row;
					.cate{
						.img{
							width: 75px;
							height: 100px;
						}
					}
				}
			}
		}

	}
}
</style>
