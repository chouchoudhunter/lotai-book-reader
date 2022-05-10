<template>
	<view class="search" :style="{ backgroundColor: color.bgPage }">
		<u-navbar height="60px" :border-bottom="false" :background="{ backgroundColor: color.bgPage }">
			<view class="navbar"><u-search :bg-color="color.cardBg" :show-action="false" v-model="keyword" @search="search" @clear="clearKeyword"></u-search></view>
		</u-navbar>
		<status-placeholder></status-placeholder>
		<view style="height: 60px;"></view>
		<view class="main" :style="{ height: swiperHeight + 'px' }">
			<view class="search-info" v-show="!showSearchDetail">
				<view>
					<span :style="{ color: color.normalText }">搜索历史</span>
					<view :class="isNightMode ? 'tags-night' : 'tags'">
						<view class="tag" v-for="(item, index) in searchHistory" :key="index" @click="search(item, true)">{{ item }}</view>
					</view>
				</view>
			</view>	
			<scroll-view :scroll-y="true" @scrolltolower="loadMore" class="search-detail" v-show="showSearchDetail">			
			<u-tabs
					ref="tabs"
					class="tabs"
					:inactive-color="color.normalText"
					:bg-color="color.bgPage"
					:list="openSources"
					:is-scroll="false"
					:current="currentSource"
					@change="changeSource"
					 v-show="showSearchDetail"
				></u-tabs>
				<view style="height:40px"></view>
				<u-empty v-show="searchEmpty" text="没有找到书籍 建议输入完整书名" mode="search"></u-empty>
				<loading-anime v-show="isSearching"></loading-anime>
				<book-item v-for="(book, i) in books[currentSource]" :key="i" :book="book"></book-item>
				<u-loadmore :status="status" margin-bottom="20" />
			</scroll-view>
		</view>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import bookItem from '@/components/book-item.vue';
import loadingAnime from '@/components/loading-anime.vue';
import { request } from '@/untils/http.js';
import sourceParser from '@/untils/sourceParser.js';
export default {
	components: { statusPlaceholder, bookItem, loadingAnime },
	data() {
		return {
			keyword: '',
			showSearchDetail: false,
			books: [],
			isSearching: false,
			searchEmpty: false,
			searchBreak: false,
			searchPage: [],
			eachPageNum: 6,
			status: 'loadmore',
			swiperHeight: 0,
			searchRes: [],
			currentSource:0,
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		searchHistory() {
			return this.$store.getters.getHistorySearch;
		},
		color() {
			return this.$store.getters.getColor;
		},
		openSources() {
			return this.$store.getters.getOpenSources;
		}
	},
	onLoad() {
		this.initArray()
		const systemInfo = getApp().globalData.systemInfo;
		this.statusBarHeight = systemInfo.statusBarHeight;
		this.swiperHeight = systemInfo.windowHeight - systemInfo.statusBarHeight - 63;
	},
	methods: {
		changeSource(index){
			this.currentSource=index
			if(!this.books[this.currentSource].length){
				this.getBooks()
			}
		},
		showSwitchSource() {
			this.isShowSourceSwitch = !this.isShowSourceSwitch;
		},
		loadMore() {
			this.getBookInfo();
		},
		addHistory() {
			this.$store.commit('books/ADD_HISTORY_SEARCH', this.keyword);
		},
		goBookInfo(data) {
			data = this.$u.queryParams(data);
			uni.navigateTo({
				url: '../book-info/book-info' + data
			});
		},
		search(key, isHistory = false) {
			this.initArray()
			if (isHistory) {
				this.keyword = key;
				this.showSearchDetail = true;
				this.getBooks();
			} else if (key) {
				this.showSearchDetail = true;
				this.getBooks();
			}
			this.$nextTick(()=>{
				this.$refs.tabs.init()
			})
		},
		clearKeyword() {
			this.showSearchDetail = false;
			this.searchEmpty = false;
		},
		async getBookInfo() {
			if (!this.searchRes[this.currentSource].length) {
				//结果为空
				this.isSearching = false;
				this.searchEmpty = true;
				return;
			} else {
				this.addHistory();
			}
			if (this.searchPage[this.currentSource] < Math.ceil(this.searchRes[this.currentSource].length / this.eachPageNum)) {
				this.searchPage[this.currentSource]++;
			} else {
				this.status = 'nomore';
				return;
			}
			const startIndex = (this.searchPage[this.currentSource] - 1) * this.eachPageNum;
			const endIndex = this.searchPage[this.currentSource] * this.eachPageNum;
			let index = startIndex;
			this.status = 'loading';
			for (; index < endIndex && index < this.searchRes[this.currentSource].length; index++) {
				await sourceParser(this.openSources[this.currentSource].content, 'info', { bookUrl: this.searchRes[this.currentSource][index] }).then(res => {
					this.status = 'loadmore';
					this.isSearching = false;
					res.source=this.openSources[this.currentSource].source
					this.books[this.currentSource].push(res);
				});
			}
			if (index == this.searchRes[this.currentSource].length) {
				this.status = 'nomore';
			}
		},
		initArray(){
			this.books=[]
			this.searchPage=[]
			this.openSources.forEach(item=>{
				this.searchPage.push(0)
				this.books.push([])
			})
		},
		getBooks() {
			this.isSearching = true;
			this.searchEmpty = false;
			sourceParser(this.openSources[this.currentSource].content, 'search', { keyword: this.keyword }).then(res => {
				this.searchRes[this.currentSource] = res;
				this.getBookInfo();
			});
		}
	}
};
</script>

<style lang="scss">
.search {
	height: 100%;
	overflow-y: scroll;
	.navbar {
		padding: 15px 20px;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-left: 15px;
		}
	}
	.main {
		position: relative;
		padding: 0 10px;
		.search-info {
			span {
				font-size: 18px;
			}
			.tags {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.tag {
					background-color: #f4f4f4;
					padding: 5px 10px;
					margin: 10px;
					border-radius: 20px;
					text-wrap: none;
				}
			}
			.tags-night {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.tag {
					background-color: #272727;
					padding: 5px 10px;
					margin: 10px;
					border-radius: 20px;
					text-wrap: none;
					color: #9e9e9e;
				}
			}
		}
		.search-detail {
			height: 100%;
			width: 100%;
			.tabs{
				width: 100%;
				position: fixed;
				z-index: 50;
				left: 0;
			}
		}
	}
}
</style>
