<template>
	<view class="discord" :style="{ backgroundColor: color.bgPage }">
		<status-placeholder></status-placeholder>
		<view class="top">
			<u-search :disabled="true" :show-action="false" :bg-color="color.cardBg" @click="goSearch()"></u-search>
			<view class="right">
				<u-icon :name="'/static/tabs/source'+(isNightMode?'-night':'')+'.png'" size="40" @click="showSwitchSource"></u-icon>
			</view>
		</view>
		<view class="tab">
			<u-tabs ref="tabs" :inactive-color="color.normalText" :bg-color="color.bgPage" :list="tagList" :is-scroll="false" :current="currentTag" @change="changeTag"></u-tabs>
		</view>
		<swiper
			class="swiper"
			:current="currentTag"
			:indicator-dots="false"
			:duration="500"
			:style="{ height: swiperHeight + 'px', backgroundColor: color.swiperBg }"
			@change="changeSwiper"
		>
			<swiper-item class="swiperItem">
				<view class="leftBar" :style="{ backgroundColor: color.bgPage, color: color.normalText }">
					<view class="btn-active" :style="{ backgroundColor: color.swiperBg, transform: 'translateY(' + swiper1Tag * 40 + 'px)' }"></view>
					<view class="btn" v-for="(item, index) in features" :key="index" @click="changeSwiper1Tag(index)">{{ item.title }}</view>
				</view>
				<view class="right">
					<scroll-view @scrolltolower="featureMore" :scroll-y="true" class="main" v-for="(item, index) in features" :key="index" v-show="swiper1Tag == index">
						<book-item :showStatus="false" v-for="(book, i) in featureBooks[index]" :key="i" :book="book"></book-item>
						<u-loadmore :status="status" margin-bottom="20" />
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item class="swiperItem">
				<view class="leftBar" :style="{ backgroundColor: color.bgPage, color: color.normalText }">
					<view class="btn-active" :style="{ backgroundColor: color.swiperBg, transform: 'translateY(' + swiper2Tag * 40 + 'px)' }"></view>
					<view class="btn" @click="changeSwiper2Tag(0)">全部分类</view>
					<view class="btn" @click="changeSwiper2Tag(1)">最热榜</view>
					<view class="btn" @click="changeSwiper2Tag(2)">完结榜</view>
					<view class="btn" @click="changeSwiper2Tag(3)">新书榜</view>
				</view>
				<view class="right"><!-- <view>暂无</view> --></view>
			</swiper-item>
		</swiper>
		<switch-source v-model="isShowSourceSwitch"></switch-source>
		<common-tabbar></common-tabbar>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import commonTabbar from '@/components/common-tabbar.vue';
import bookItem from '@/components/book-item.vue';
import source from '@/source/index.js'; 
import switchSource from '@/components/switch-source.vue';
export default {
	components: { statusPlaceholder, commonTabbar, bookItem,switchSource },
	data() {
		return {
			title: 'Hello',
			isLight: true,
			tagList: [
				{
					name: '精选'
				},
				{
					name: '排行'
				}
			],
			currentTag: 0,
			statusBarHeight: 0,
			swiperHeight: 0,
			swiper1Tag: 0,
			swiper2Tag: 0,
			featureBooks: [],//精选分类下的书
			features: [],//精选的分类
			featurePages: [],//精选的每个分类的页数
			status:'loadmore',
			eachPageNum:5,
			isShowSourceSwitch:false
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		},
		systemSetting() {
			return this.$store.getters.getSystemSetting;
		}
	},
	watch:{
		systemSetting(newVal,oldVal){
			if(newVal.defaultSource!=oldVal.defaultSource){
				this.refreshSource()
			}
		}
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.subnvue_open();
		this.getFeature();
		// #endif
	},
	onReady() {
		// #ifdef APP-PLUS
		this.subnvue_close();
		// #endif
	},
	mounted() {
		const systemInfo = getApp().globalData.systemInfo;
		this.statusBarHeight = systemInfo.statusBarHeight;
		this.swiperHeight = systemInfo.windowHeight - systemInfo.statusBarHeight - 152;
	},
	methods: {
		refreshSource(){
			this.featureBooks=[]
			this.featurePages=[]
			this.swiper1Tag=0
			this.swiper2Tag=0
			this.getFeature()
		},
		showSwitchSource(){
			this.isShowSourceSwitch=!this.isShowSourceSwitch
		},
		//加载更多
		featureMore(){
			this.getFeatureTagBooks()
		},
		//获得精选内容
		getFeature() {
			this.status="loading"
			source[this.systemSetting.defaultSource].getFeature().then(data => {
				this.features = data;
				this.status="loadmore"
				this.getFeatureTagBooks()
			});
		},
		//获得精选下对应分类的内容
		async getFeatureTagBooks() {
			const needFeatures=this.features[this.swiper1Tag].books
			if(!this.featurePages[this.swiper1Tag]){//判断是否是第一页
				this.featurePages[this.swiper1Tag]=1
				this.featureBooks[this.swiper1Tag]=[]
			}else{
				if(this.featurePages[this.swiper1Tag]<Math.ceil(needFeatures.length/this.eachPageNum)){
					this.featurePages[this.swiper1Tag]++
				}else{
					this.status="nomore"
					return
				}
			}
			const startIndex=(this.featurePages[this.swiper1Tag]-1)*this.eachPageNum
			const endIndex=this.featurePages[this.swiper1Tag]*this.eachPageNum
			this.status="loading"
			var i = startIndex
			for (; i < endIndex && i<needFeatures.length; i++) {
				await source[this.systemSetting.defaultSource].getBookInfo(needFeatures[i]).then(res => {
					this.status="loadmore"
					this.featureBooks[this.swiper1Tag].push(res)
					this.featureBooks={...this.featureBooks}
				});
			}
			if(i==needFeatures.length){
				this.status="nomore"
			}
		},
		//打开配置的原生子窗体
		subnvue_open() {
			const subNVue = uni.getSubNVueById('mask'); //通过id获取nvue子窗体
			subNVue.show('none', 10);
		},
		//关闭配置的原生子窗体
		subnvue_close() {
			const subNVue = uni.getSubNVueById('mask'); //通过id获取nvue子窗体
			subNVue.hide('none', 10);
		},
		changeSwiper1Tag(index) {
			this.swiper1Tag = index;
			this.getFeatureTagBooks()
		},
		changeSwiper2Tag(index) {
			this.swiper2Tag = index;
		},
		changeTag(index) {
			this.currentTag = index;
		},
		changeSwiper(e) {
			this.currentTag = e.detail.current;
		},
		goSearch() {
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
		display: flex;
		flex-direction: row;
		.right{
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-left: 15px;
		}
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
					z-index: 10;
				}
				.btn-active {
					height: 40px;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 2;
					width: 70px;
					transition: transform 0.2s;
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
				padding-bottom: 0;
				.main {
					height: 100%;
				}
			}
		}
	}
}
</style>
