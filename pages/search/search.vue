<template>
	<view class="search" :style="{backgroundColor:color.bgPage}">
		<u-navbar height="60px" :border-bottom="false" :background="{backgroundColor:color.bgPage}">
			<view class="navbar"><u-search :bg-color="color.cardBg" :show-action="false" v-model="keyword" @search="search" @clear="clearKeyword"></u-search></view>
		</u-navbar>
		<status-placeholder></status-placeholder>
		<view style="height: 60px;"></view>
		<view class="main">
			<view class="search-info" v-show="!showSearchDetail">
				<view>
					<span  :style="{color:color.normalText}">搜索历史</span>
					<view :class="isNightMode?'tags-night':'tags'">
						<view class="tag" v-for="(item,index) in searchHistory" :key="index" @click="search(item,true)">{{item}}</view>
					</view>
				</view>
			</view>
			<view class="search-detail" v-show="showSearchDetail">
				<u-empty v-show="searchEmpty" text="没有找到书籍 建议输入完整书名" mode="search"></u-empty>
				<loading-anime v-show="isSearching"></loading-anime>
				<book-item v-for="(book, i) in books" :key="i" @click="goBookInfo(book)" :book="book"></book-item>
			</view>
		</view>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import bookItem from '@/components/book-item.vue';
import loadingAnime from '@/components/loading-anime.vue';
import { request } from '@/untils/http.js';
export default {
	components: { statusPlaceholder,bookItem,loadingAnime },
	data() {
		return {
			keyword: '',
			showSearchDetail: false,
			books: [],
			isSearching:false,
			searchEmpty:false
		};
	},
	computed:{
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		searchHistory(){
			return this.$store.getters.getHistorySearch
		},
		color() {
			return this.$store.getters.getColor;
		},
	},
	methods: {
		addHistory(){
			this.$store.commit('books/ADD_HISTORY_SEARCH',this.keyword)
		},
		goBookInfo(data){
			data=this.$u.queryParams(data)
			uni.navigateTo({
				url:'../book-info/book-info'+data,
			})
		},
		search(key,isHistory=false) {
			if(isHistory){
				this.keyword=key
				this.showSearchDetail = true;
				this.getBooks();
			}else if(key){
				this.showSearchDetail = true;
				this.getBooks();
			}
		},
		clearKeyword() {
			this.showSearchDetail = false;
			this.searchEmpty=false
		},
		getBooks() {
			this.books=[]
			this.isSearching=true
			this.searchEmpty=false
			request('getSearchResult', { keyword: this.keyword }).then(async res => {
				if(!res.data.length){
					this.isSearching=false
					this.searchEmpty=true
					return
				}else{
					this.addHistory()
				}
				for (let index in res.data) {
					await request('getBookInfo', { bookUrl: res.data[index] }).then(res => {
						this.isSearching=false
						this.books.push(res.data)
					});
				}
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
	}
}
</style>
