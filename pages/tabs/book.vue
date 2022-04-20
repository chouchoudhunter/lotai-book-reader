<template>
	<view class="book" :style="{ backgroundColor: color.bgPage }">
		<status-placeholder></status-placeholder>
		<view class="top">
			<view class="left">
				<h1 :style="{ color: color.normalText }">{{ date.headline }}</h1>
				<h2 :style="{ opacity: dateContentOpacity, color: color.secText }">{{ date.content }}</h2>
			</view>
			<view class="right">
				<view id="month" :style="{ color: color.normalText }">{{ date.month }}</view>
				<view id="year" :style="{ color: color.secText }">{{ date.year }}</view>
				<view id="day" :style="{ color: color.normalText }">{{ date.day }}</view>
				<view id="str"></view>
			</view>
		</view>
		<view class="preBook" :style="{ 'background-color': color.cardBg }" v-if="myBooks[0]">
			<u-icon name="../../static/tabs/gou.png" size="40" class="smallIcon" @click="openTool(0)"></u-icon>
			<view class="left">
				<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="myBooks[0].img" /></view>
			</view>
			<view class="right">
				<view class="title" :style="{ color: color.normalText }">{{ myBooks[0].title }}</view>
				<view class="info" :style="{ color: color.secText }">已读至 {{ myBooks[0].readChapter ? myBooks[0].readChapter : '' }}</view>
				<u-line-progress
					:showPercent="false"
					height="22"
					:striped-active="true"
					active-color="#2979ff"
					:striped="true"
					:percent="Number(myBooks[0].readPos)"
				></u-line-progress>
				<view class="func">
					<u-button @click="goReadPage(myBooks[0])" size="mini" shape="circle" :ripple="true" type="primary" :custom-style="btnStyle">继续阅读</u-button>
				</view>
			</view>
		</view>
		<view class="books">
			<view class="book-item" v-for="(book, index) in myBooks" :key="index" @click="goReadPage(book)" @longtap="openBookFunc(book)">
				<view class="book-item-main">
					<u-icon v-if="book.top" name="/static/home/top-book.png" class="topIcon" color="#000000" size="40"></u-icon>
					<view class="img" :style="{ 'box-shadow': isNightMode ? 'none' : '' }"><u-image width="100%" height="100%" mode="aspectFill" :src="book.img" /></view>
					<view class="name" :style="{ color: color.normalText }">{{ book.title }}</view>
				</view>
			</view>
			<view class="book-item" @click="goDiscordTab()" v-show="!myBooks.length">
				<view>
					<view class="book-item-block" :style="{ 'background-color': color.cardBg, 'box-shadow': isNightMode ? 'none' : '' }">
						<u-icon name="plus" size="80" :color="color.secText"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="bookFuncShow" mode="bottom">
			<view class="book-func" :style="{ backgroundColor: color.bgPage, color: color.normalText }">
				<view class="book-info">
					<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="bookFunc.img" /></view>
					<view class="info">
						<view class="title">{{ bookFunc.title }}</view>
						<view class="author" :style="{ color: color.secText }">{{ bookFunc.author }}</view>
						<view class="desc" :style="{ color: color.secText }">更新到第885章</view>
					</view>
				</view>
				<view class="book-btn">
					<view class="item" @click="setTop">
						<u-icon :name="topIcon" color="#000000" size="31"></u-icon>
						置顶本书
					</view>
					<view class="item">
						<u-icon name="../../static/home/swipe.png" color="#000000" size="40"></u-icon>
						清除缓存
					</view>
					<view class="item">
						<u-icon name="../../static/home/download.png" color="#000000" size="42"></u-icon>
						下载本书
					</view>
					<view class="item" @click="openDeleteToast">
						<u-icon name="../../static/home/trash.png" color="#000000" size="38"></u-icon>
						删除本书
					</view>
				</view>
			</view>
		</u-popup>
		<custom-modal v-model="toastDelete" @confirm="deleteBook" content="确定要删除本书吗？"></custom-modal>
		<u-back-top :scroll-top="scrollTop" top="300"></u-back-top>
		<common-tabbar></common-tabbar>
	</view>
</template>
<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import commonTabbar from '@/components/common-tabbar.vue';
import customModal from '@/components/custom-modal.vue';
import { request } from '@/untils/http.js';
export default {
	components: { statusPlaceholder, commonTabbar, customModal },
	data() {
		return {
			scrollTop: 0,
			bookFuncShow: false,
			bookFunc: {},
			toastDelete: false,
			date: {
				day: '07',
				month: '04',
				year: '2022',
				headline: '早上好，读者',
				content: '请享受美好的阅读时光'
			},
			dateContentOpacity: 1,
			btnStyle: {
				backgroundImage: 'linear-gradient(to right, #296dff, #55aaff)',
				fontSize: '13px'
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
		myBooks() {
			return this.$store.getters.getMyBooks;
		},
		topIcon() {
			if (this.bookFunc.top) {
				return '/static/home/top-on.png';
			} else {
				return '/static/home/top.png';
			}
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onLoad() {
		this.checkAppUpdate();
	},
	onShow() {
		this.changeDate();
	},
	methods: {
		//设置书本置顶
		setTop() {
			if (this.bookFunc.top) {
				this.bookFunc.top = false;
				this.$store.commit('books/SET_BOOK_NO_TOP', this.bookFunc);
			} else {
				this.bookFunc.top = true;
				this.$store.commit('books/SET_BOOK_TOP', this.bookFunc);
			}
			this.bookFunc = { ...this.bookFunc };
		},
		checkAppUpdate() {
			//#ifdef APP-PLUS
			let nowVersion = plus.runtime.version;
			request('checkAppUpdate', { version: nowVersion }).then(res => {
				if (res.data.type == 2) {
					res.data.nowVersion = nowVersion;
					const data = this.$u.queryParams(res.data);
					uni.navigateTo({
						url: '../updateApp/updateApp' + data
					});
				}
			});
			//#endif
		},
		goDiscordTab() {
			uni.switchTab({
				url: './discord'
			});
		},
		openDeleteToast() {
			this.toastDelete = true;
		},
		deleteBook() {
			this.$store.commit('books/DELETE_MY_BOOKS', this.bookFunc);
			this.bookFunc = {};
			this.bookFuncShow = false;
		},
		openBookFunc(book) {
			this.bookFuncShow = true;
			this.bookFunc = book;
		},
		changeDate() {
			let time = new Date();
			this.date.day = ('0' + time.getDate()).slice(-2);
			this.date.month = ('0' + (time.getMonth() + 1)).slice(-2);
			this.date.year = time.getFullYear();
			const nowHour = time.getHours();
			if (nowHour >= 6 && nowHour < 10) {
				this.date.headline = '早上好，读者';
			} else if (nowHour >= 10 && nowHour < 12) {
				this.date.headline = '上午好，读者';
			} else if (nowHour >= 12 && nowHour < 14) {
				this.date.headline = '中午好，读者';
			} else if (nowHour >= 14 && nowHour < 18) {
				this.date.headline = '下午好，读者';
			} else if (nowHour >= 18 && nowHour < 22) {
				this.date.headline = '晚上好，读者';
			} else if (nowHour >= 22 ||nowHour<6) {
				this.date.headline = '夜深了，早点睡';
			}
			uni.request({
				url: 'https://v1.hitokoto.cn/?c=c&c=a&c=b&c=i&c=h&max_length=18'
			}).then(res => {
				this.date.content = res[1].data.hitokoto;
			});
			this.dateContentOpacity = 0;
			setTimeout(() => {
				this.dateContentOpacity = 1;
			}, 200);
		},
		goReadPage(book) {
			// let data = this.$u.queryParams(book);
			// uni.navigateTo({
			// 	url: '../read/read' + data
			// });
			uni.navigateTo({
				url: '../read/read',
				success: (e) => {
					e.eventChannel.emit('read-info',book)
				}
			});
		}
	}
};
</script>

<style lang="scss">
.book {
	overflow: scroll;
	height: 100%;
	padding: 0 40rpx;
	.book-func {
		padding: 20px;
		.book-info {
			display: flex;
			flex-direction: row;
			.img {
				width: 75px;
				height: 100px;
				border-radius: 4px;
				overflow: hidden;
			}
			.info {
				margin-left: 15px;
				padding-top: 15px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					font-size: 16px;
				}
			}
		}
		.book-btn {
			margin-top: 20px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
	.top {
		padding: 10px 0 10px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.left {
			h1 {
				font-size: 36rpx;
				margin-bottom: 10rpx;
			}

			h2 {
				font-size: 28rpx;
				transition: opacity 0.2s;
				opacity: 1;
			}
		}

		.right {
			font-size: 36rpx;
			font-weight: bold;
			position: relative;
			padding-right: 50rpx;

			#year {
				font-size: 28rpx;
				font-weight: normal;
			}

			#month {
				margin-bottom: 10rpx;
			}

			#day {
				position: absolute;
				bottom: 0;
				right: 0;
			}

			#str {
				position: absolute;
				top: 0;
				right: 36rpx;
				font-weight: normal;
				height: 50rpx;
				border-right: 3rpx solid $text-gray;
				transform: rotate(30deg);
			}
		}
	}
	.preBook {
		height: 110px;
		margin: 40px 10px 0 10px;
		padding: 10px;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		position: relative;
		width: calc(100% - 20px);
		.smallIcon {
			width: 20px;
			position: absolute;
			right: 7px;
			top: 7px;
		}
		.left {
			position: relative;
			.img {
				width: 90px;
				height: 120px;
				border-radius: 4px;
				overflow: hidden;
				position: relative;
				top: -30px;
				left: 0;
			}
		}
		.right {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: calc(100% - 90px);
			.title {
				font-size: 16px;
			}
			.info {
				font-size: 12px;
			}
		}
	}
	.books {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.book-item {
			width: 33%;
			padding: 10px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			.book-item-main {
				position: relative;
				.topIcon {
					position: absolute;
					right: -2px;
					top: -2px;
					z-index: 10;
				}
			}
			.book-item-block {
				width: 90px;
				height: 120px;
				border-radius: 4px;
				box-shadow: 0 4rpx 14rpx 0 rgba(172, 172, 172, 0.5);
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}
			.name {
				font-size: 14px;
				margin: 5px 0;
			}

			.img {
				width: 90px;
				height: 120px;
				border-radius: 4px;
				overflow: hidden;
				box-shadow: 0 4rpx 14rpx 0 rgba(172, 172, 172, 0.5);
			}
		}
	}
}
</style>
