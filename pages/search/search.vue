<template>
	<view class="search">
		<u-navbar height="60px" :border-bottom="false">
			<view class="navbar"><u-search :show-action="false" v-model="keyword" @search="search" @clear="clearKeyword"></u-search></view>
		</u-navbar>
		<status-placeholder></status-placeholder>
		<view style="height: 60px;"></view>
		<view class="main">
			<view class="search-info" v-show="!showSearchDetail">
				<view>
					<span>搜索历史</span>
					<view class="tags">
						<view class="tag">斗罗大陆</view>
						<view class="tag">遮天</view>
					</view>
				</view>
			</view>
			<view class="search-detail" v-show="showSearchDetail">
				<view class="book" v-for="(book, i) in books" :key="i" @click="goBookInfo(book)">
					<view class="status">连载中</view>
					<view class="status-a"></view>
					<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="book.img"></u-image></view>
					<view class="info">
						<view class="title">{{book.title}}</view>
						<view class="author">{{book.author}}</view>
						<view class="desc">{{book.desc}}</view>
						<view class="tags">
							<view class="tag">科幻</view>
							<view class="tag">末世</view>
						</view>
						<view class="star"><u-rate :count="5" current="4" active-color="#f5e100" :disabled="true"></u-rate></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import { request } from '@/untils/http.js';
export default {
	components: { statusPlaceholder },
	data() {
		return {
			keyword: '',
			showSearchDetail: false,
			books: []
		};
	},
	methods: {
		goBookInfo(data){
			data=this.$u.queryParams(data)
			uni.navigateTo({
				url:'../book-info/book-info'+data,
			})
		},
		search(key) {
			if (key) {
				this.showSearchDetail = true;
				this.getBooks();
			}
		},
		clearKeyword() {
			this.showSearchDetail = false;
		},
		getBooks() {
			this.books=[]
			request('getSearchResult', { keyword: this.keyword }).then(async res => {
				for (let index in res.data) {
					await request('getBookInfo', { bookUrl: res.data[index] }).then(res => {
						console.log(res);
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
				.tag {
					background-color: #f4f4f4;
					padding: 5px 10px;
					margin: 10px;
					border-radius: 20px;
				}
			}
		}
		.search-detail {
			.book {
				display: flex;
				flex-direction: row;
				position: relative;
				margin-bottom: 15px;
				margin-top: 5px;
				.status {
					width: 60px;
					height: 20px;
					line-height: 16px;
					background-image: linear-gradient(to right, #296dff, #55aaff);
					position: absolute;
					font-size: 12px;
					color: white;
					left: -5px;
					bottom: 25px;
					z-index: 10;
					padding: 2px 5px;
					text-align: center;
				}
				.status-a {
					width: 0;
					height: 0;
					position: absolute;
					left: -5px;
					bottom: 45px;
					border-width: 4px;
					border-style: dashed solid solid dashed; /*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
					border-color: transparent #225dd4 #225dd4 transparent;
					z-index: 7;
				}
				.img {
					width: 30%;
					height: 150px;
					border-radius: 5px;
					overflow: hidden;
					z-index: 8;
				}
				.info {
					width: 70%;
					padding-left: 15px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {
						font-size: 18px;
					}
					.desc {
						font-size: 12px;
						color: #c6c6c6;
						height: 32px;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					.tags {
						display: flex;
						flex-direction: row;
						.tag {
							margin-right: 10px;
							border: 1px solid #c6c6c6;
							padding: 2px 8px;
							border-radius: 10px;
							font-size: 10px;
						}
					}
					.star {
					}
				}
			}
		}
	}
}
</style>
