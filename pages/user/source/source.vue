<template>
	<view class="source" :style="{ backgroundColor: color.bgPage }">
		<view class="navbar">
			<u-navbar :background="{ backgroundColor: color.bgPage }" :autoBack="true" class="main" :fixed="false" :border-bottom="false">
				<view slot="right" class="right">
					<u-icon name="plus" class="icon" size="40" @click="openFeedSource()" :color="color.normalText"></u-icon>
					<u-icon name="file-text" class="icon" size="40" @click="goAddSourcePage()" :color="color.normalText"></u-icon>
				</view>
			</u-navbar>
		</view>
		<view class="swiperItem" :style="{ height: swiperItemHeight + 'px', backgroundColor: color.swiperBg }">
			<view class="leftBar" :style="{ backgroundColor: color.bgPage }">
				<view class="btn-active" :style="{ backgroundColor: color.swiperBg, transform: 'translateY(' + swiperFeed * 40 + 'px)' }">
					<view class="btn-active-blue"></view>
				</view>
				<view class="btn" v-for="(item, index) in feeds" :key="index" @click="changeSwiperFeed(index)">
					<text :style="{ color: color.normalText }" class="btn-text">{{ item.title }}</text>
				</view>
			</view>
			<view class="right">
				<scroll-view :scroll-y="true" class="main" v-for="(item, index) in feeds" :key="index" v-show="swiperFeed == index">
					<view>
						<view v-for="(source,index) in sources" :key="index">{{source.content.info.title}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<custom-modal v-model="feedToast" :showCancelButton="false" title="添加书源订阅">
			<view class="feed-toast-group">
				<u-radio-group v-model="currentFeedType">
					<u-radio v-for="(item, index) in feedTypeList" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
			</view>
			<view class="feed-toast-main">
				<view v-show="currentFeedType === '网络导入'">
					<u-field
						:border-bottom="false"
						:label-color="color.normalText"
						:field-style="{ color: color.normalText }"
						v-model="feedUrl"
						label="网络地址"
						placeholder="填写网络地址(json格式)"
						:clearable="true"
					></u-field>
				</view>
				<view v-show="currentFeedType === '本地导入'"><view @click="selectFromLocal">施工中</view></view>
			</view>
		</custom-modal>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import customModal from '@/components/custom-modal.vue';
import sourceParser from '@/untils/sourceParser.js';
import { request } from '@/untils/http.js';
export default {
	components: { statusPlaceholder, customModal },
	data() {
		return {
			feedTypeList: [{ name: '网络导入' }, { name: '本地导入' }],
			currentFeedType: '网络导入',
			feedToast: false,
			feedUrl: '',
			swiperItemHeight: 800,
			swiperFeed: 0,
			feeds: [{ title: 'LoTai源' }, { title: '自定义源' }],
			sourceTest: {
				info: {
					title: '奇书网',
					desc: '网文',
					host: 'https://www.kankezw.com/'
				},
				operation: [
					{
						type: 'search',
						method: 'GET',
						url: 'search.html?searchkey={{key}}',
						xpaths: [
							{
								type: 'bookUrl',
								xpath: "//table[@class='grid']//td[@class='even']/a/@href"
							}
						]
					},
					{
						type: 'info',
						method: 'GET',
						url: '{{bookUrl}}',
						xpaths: [
							{
								type: 'img',
								xpath: "//div[@class='detail_pic']/img/@src"
							},
							{
								type: 'title',
								xpath: '/html/body/div[4]/div[2]/div[1]/div/div[2]/div/h1/text()'
							},
							{
								type: 'author',
								xpath: '/html/body/div[4]/div[2]/div[1]/div/div[2]/div/ul/li[6]/text()',
								reg: '(?<=书籍作者：).*'
							},
							{
								type: 'desc',
								xpath: '/html/body/div[4]/div[2]/div[2]/div[2]/p/text()'
							},
							{
								type: 'bookUrl',
								xpath: '/html/body/div[4]/div[2]/div[3]/div[2]/ul/li[1]/a/@href'
							},
							{
								type: 'tags',
								xpath: '/html/body/div[3]/span/a[2]/text()'
							}
						]
					},
					{
						type: 'list',
						method: 'GET',
						url: '{{bookUrl}}',
						xpaths: [
							{
								type: 'chapter',
								xpath: "(//div[@class='pc_list'])[2]/ul/li"
							}
						]
					},
					{
						type: 'chapter',
						method: 'GET',
						url: '{{bookUrl}}{{chapterUrl}}',
						xpaths: [
							{
								type: 'title',
								xpath: "//div[@id='info']/div[1]/h1/text()"
							},
							{
								type: 'text',
								xpath: "//div[@id='content1']"
							}
						]
					},
					{
						type: 'discord',
						method: 'get',
						prefix: 'search.html?searchkey=',
						xpath: ''
					}
				]
			}
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		},
		sources() {
			return this.$store.getters.getSources;
		}
	},
	onLoad() {
		this.test();
		const systemInfo = getApp().globalData.systemInfo;
		this.swiperItemHeight = systemInfo.windowHeight - 44-systemInfo.statusBarHeight;
		this.requestSourceList()
	},
	onReady() {
		uni.preloadPage({
			url: '/pages/user/source/subPage/addSource'
		});
	},
	methods: {
		requestSourceList(){
			request('getSourceList').then((res)=>{
				this.$store.commit('setting/SET_SOURCE',res.data.data)
			})
		},
		changeSwiperFeed(index) {
			this.swiperFeed = index;
		},
		selectFromLocal() {
			//
		},
		openFeedSource() {
			this.feedToast = true;
		},
		goAddSourcePage() {
			uni.navigateTo({
				url: '/pages/user/source/subPage/addSource'
			});
		},
		async test() {
			// const books=await sourceParser(this.sourceTest,'search',{keyword:'斗罗大陆'})
			// const books=await sourceParser(this.sourceTest,'info',{bookUrl:'/Shtml38775.html'})
			// const books=await sourceParser(this.sourceTest,'chapter',{chapterUrl:'du/19/19410/',bookUrl:'1120197.html'})
			// const books = await sourceParser(this.sourceTest, 'chapter', { bookUrl: 'du/19/19410/', chapterUrl: '1120197.html' });
			// console.log(books);
		}
	}
};
</script>

<style lang="scss">
.source {
	height: 100%;
	.navbar {
		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-right: 15px;
			.icon {
				margin-left: 10px;
			}
		}
	}
	.swiperItem {
		display: flex;
		flex-direction: row;
		.leftBar {
			background-color: #ffffff;
			width: 100px;
			position: relative;
			.btn {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				height: 40px;
				text-align: center;
				position: relative;
				z-index: 10;
				.btn-text {
					font-size: 14px;
				}
			}
			.btn-active {
				height: 40px;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;
				width: 100px;
				transition: transform 0.2s;
				&::after {
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
	.feed-toast-group {
		margin: 10px 15px;
	}
	.feed-toast-main {
		margin: 10px 0;
	}
}
</style>
