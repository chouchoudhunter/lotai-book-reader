<template>
	<view class="book">
		<status-placeholder></status-placeholder>
		<view class="top">
			<view class="left">
				<h1>早上好，读者</h1>
				<h2>请享受美好的阅读时光</h2>
			</view>
			<view class="right">
				<view id="month">12</view>
				<view id="year">2018</view>
				<view id="day">30</view>
				<view id="str"></view>
			</view>
		</view>
		<view class="books">
			<view class="row">
				<view class="book" @click="goReadPage()">
					<view class="img">
						<u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" />
					</view>
					<view class="name">夜的命名术</view>
				</view>
				<view class="book">
					<view class="img">
						<u-image width="100%" height="100%" mode="aspectFill" src="https://www.xbiquge.la/files/article/image/56/56523/56523s.jpg" />
					</view>
					<view class="name">谭雅战记</view>
				</view>
				<view class="book">
					<view class="img">
						<u-image width="100%" height="100%" mode="aspectFill" src="https://www.xbiquge.la/files/article/image/56/56523/56523s.jpg" />
					</view> 
					<view class="name">谭雅战记</view>
				</view>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop" top="300"></u-back-top>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
export default {
	components: { statusPlaceholder },
	data() {
		return {
			scrollTop: 0
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onShow() {
		console.log('aaa');
	},
	onLoad() {},
	methods: {
		goReadPage() {
			uni.navigateTo({
				url: '../read/read'
			});
		}
		// change () {
		//   this.isLight = !this.isLight
		//   if (this.isLight) {
		//     window.document.documentElement.setAttribute('data-theme', 'light')
		//   } else {
		//     window.document.documentElement.setAttribute('data-theme', 'dark')
		//   }
		// }
	}
};
</script>

<style lang="scss">
.book {
	background-color: var(--bgColor);
	padding: 0 40rpx;

	.top {
		margin: 40rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.left {
			h1 {
				font-size: 36rpx;
				margin-bottom: 10rpx;
			}

			h2 {
				color: $text-gray;
				font-size: 28rpx;
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
				color: $text-gray;
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

	.books {
		.row {
			display: flex;
			flex-direction: row;
			justify-content: space-around;

			.book {
				width: 33%;
				// height: 120px;
				padding: 20rpx;

				.name {
					font-size: 14px;
				}

				.img {
					width: 100%;
					height: 120px;
					border-radius: 4rpx;
					overflow: hidden;
					box-shadow: 0 4rpx 14rpx 0 $shadow-gray;
				}
			}
		}
	}
}
</style>
