<template>
	<view class="discord" :style="{ backgroundColor: color.bgPage }">
		<status-placeholder></status-placeholder>
		<view class="top" :style="{ color: color.normalText }">发现</view>
		<view class="discord-main" :style="{ height: mainHeight + 'px' }">
			<view class="search"><u-search :disabled="true" :show-action="false" :bg-color="color.cardBg" @click="goSearch()"></u-search></view>
			<view class="select-text">
				<view :style="{ color: color.normalText }">精选</view>
				<!-- <view>精选</view> -->
			</view>
			<scroll-view :scroll-x="true" class="select">
				<view class="select-books">
					<view class="book" v-for="(book, index) in selectBooks" :key="index" @click="tapBook(book)">
						<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="book.img" /></view>
						<view class="title" :style="{ color: color.normalText }">{{ book.title }}</view>
						<view class="author" :style="{ color: color.secText }">{{ book.author }}</view>
					</view>
				</view>
			</scroll-view>
			<u-tabs
				:inactive-color="color.normalText"
				:bg-color="color.bgPage"
				:list="features.tags"
				:current="currentTag"
				@change="changeTag"
				gutter="20"
				:needlrPadding="false"
				font-size="32"
			></u-tabs>
			<scroll-view v-for="(item, index) in features.tags" :key="index" v-show="currentTag == index" class="tag-main">
				<book-item :showStatus="false" v-for="(book, i) in featureBooks[index]" :key="i" :book="book"></book-item>
			</scroll-view>
		</view>
		<common-tabbar></common-tabbar>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import commonTabbar from '@/components/common-tabbar.vue';
import bookItem from '@/components/book-item.vue';
import sourceParser from '@/untils/sourceParser.js';
export default {
	components: { statusPlaceholder, commonTabbar, bookItem },
	data() {
		return {
			title: 'Hello',
			isLight: true,
			currentTag: 0,
			statusBarHeight: 0,
			mainHeight: 0,
			featureBooks: [], //分类下的书
			selectBooks: [] //精选下的书
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		},
		features() {
			return this.$store.getters.getFeatures; //分类
		},
		defaultSource() {
			return this.$store.getters.getDefaultSource;
		},
	},
	watch: {
		features(newVal) {
			if (newVal.tags.length) {
				this.getFeatureTagBooks();
				this.getSelectBooks();
			}
		}
	},
	onLoad() {
		this.initDiscord();
		const systemInfo = getApp().globalData.systemInfo;
		this.statusBarHeight = systemInfo.statusBarHeight;
		this.mainHeight = systemInfo.windowHeight - systemInfo.statusBarHeight - 152;
	},
	onReady() {
		// #ifdef APP-PLUS
		this.subnvue_close();
		// #endif
	},
	methods: {
		tapBook(book) {
			const data = this.$u.queryParams({data:JSON.stringify(book)});
			uni.navigateTo({
				url: '/pages/book-info/book-info' + data
			});
		},
		initDiscord() {
			if (this.features.tags.length) {
				this.getFeatureTagBooks();
				this.getSelectBooks();
			}
		},
		changeTag(index) {
			this.currentTag = index;
			this.getFeatureTagBooks();
		},
		refreshSource() {
			this.featureBooks = [];
			this.featurePages = [];
			this.getFeature();
		},
		async getSelectBooks() {
			if(this.selectBooks.length){
				return
			}
			let tempBook = this.features.select;
			for (var i = 0; i < tempBook.length; i++) {
				await sourceParser(this.defaultSource.content, 'info', { bookUrl: tempBook[i] }).then(res => {
					res.source=this.defaultSource.source
					this.selectBooks.push(res);
				});
			}
		},
		//获得对应分类的内容
		async getFeatureTagBooks() {
			if (!this.featureBooks[this.currentTag]) {
				this.featureBooks[this.currentTag] = [];
			}
			if(this.featureBooks[this.currentTag].length){
				return
			}
			let tempBook = this.features.tags[this.currentTag].books;
			for (var i = 0; i < tempBook.length; i++) {
				await sourceParser(this.defaultSource.content, 'info', { bookUrl: tempBook[i] }).then(res => {
					res.source=this.defaultSource.source
					this.featureBooks[this.currentTag].push(res);
					this.featureBooks = { ...this.featureBooks };
				});
			}
		},
		//关闭配置的原生子窗体
		subnvue_close() {
			const subNVue = uni.getSubNVueById('mask'); //通过id获取nvue子窗体
			subNVue.hide('none', 10);
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
	height: calc(100% - 50px);
	overflow-y: scroll;
	.top {
		padding: 15px 32rpx;
		display: flex;
		flex-direction: row;
		font-size: 18px;
	}
	.discord-main {
		padding: 0 20px;
		.tag-main {
			min-height: 600px;
		}
		.select-text {
			margin-top: 20px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			font-size: 16px;
		}
		.select {
			margin-bottom: 20px;
			.select-books {
				display: flex;
				flex-direction: row;
				margin-top: 15px;
				min-height: 200px;
				.book {
					padding-right: 20px;
					.img {
						width: 90px;
						height: 120px;
						border-radius: 4px;
						overflow: hidden;
						margin-bottom: 6px;
					}
					.author {
						font-size: 12px;
						color: #b0b0b0;
					}
				}
			}
		}
	}
}
</style>
