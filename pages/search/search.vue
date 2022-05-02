<template>
	<view class="search" :style="{ backgroundColor: color.bgPage }">
		<u-navbar height="60px" :border-bottom="false" :background="{ backgroundColor: color.bgPage }">
			<view class="navbar">
				<u-search :bg-color="color.cardBg" :show-action="false" v-model="keyword" @search="search" @clear="clearKeyword"></u-search>
				</view>
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
				<u-empty v-show="searchEmpty" text="没有找到书籍 建议输入完整书名" mode="search"></u-empty>
				<loading-anime v-show="isSearching"></loading-anime>
				<book-item v-for="(book, i) in books" :key="i" @click="goBookInfo(book)" :book="book"></book-item>
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
import source from '@/source/index.js';
export default {
	components: { statusPlaceholder, bookItem, loadingAnime},
	data() {
		return {
			keyword: '',
			showSearchDetail: false,
			books: [],
			isSearching: false,
			searchEmpty: false,
			searchBreak: false,
			searchPage: 0,
			eachPageNum: 6,
			status: 'loadmore',
			swiperHeight: 0,
			searchRes: [],
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
		defaultSource(){
			return this.$store.getters.getDefaultSource;
		},
		sources() {
			return this.$store.getters.getSources;
		}
	},
	onLoad() {
		const systemInfo = getApp().globalData.systemInfo;
		this.statusBarHeight = systemInfo.statusBarHeight;
		this.swiperHeight = systemInfo.windowHeight - systemInfo.statusBarHeight - 63;
	},
	methods: {
		showSwitchSource(){
			this.isShowSourceSwitch=!this.isShowSourceSwitch
		},
		loadMore(){
			this.getBookInfo()
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
			this.searchPage=0
			if (isHistory) {
				this.keyword = key;
				this.showSearchDetail = true;
				this.getBooks();
			} else if (key) {
				this.showSearchDetail = true;
				this.getBooks();
			}
		},
		clearKeyword() {
			this.showSearchDetail = false;
			this.searchEmpty = false;
		},
		async getBookInfo() {
			if (!this.searchRes.length) {
				//结果为空
				this.isSearching = false;
				this.searchEmpty = true;
				return;
			} else {
				this.addHistory();
			}
			if(this.searchPage<Math.ceil(this.searchRes.length/this.eachPageNum)){
				this.searchPage++
			}else{
				this.status="nomore"
				return
			}
			const startIndex = (this.searchPage - 1) * this.eachPageNum;
			const endIndex = this.searchPage * this.eachPageNum;
			let index = startIndex;
			this.status="loading"
			for (; index < endIndex && index < this.searchRes.length; index++) {
				await sourceParser(this.sources[this.defaultSource].content,'info',{bookUrl:this.searchRes[index]}).then(res => {
					this.status="loadmore"
					this.isSearching = false;
					this.books.push(res);
				});
			}
			if(index==this.searchRes.length){
				this.status="nomore"
			}
		},
		getBooks() {
			this.books = [];
			this.isSearching = true;
			this.searchEmpty = false;
			sourceParser(this.sources[this.defaultSource].content,'search',{keyword:this.keyword}).then(res=>{
				this.searchRes = res;
				this.getBookInfo();
			})
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
		.right{
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
		.search-detail{
			height: 100%;
		}
	}
}
</style>
