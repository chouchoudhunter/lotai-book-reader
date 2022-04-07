<template>
	<view class="book">
		<status-placeholder></status-placeholder>
		<view class="top">
			<view class="left">
				<h1>{{ date.headline }}</h1>
				<h2>{{ date.content }}</h2>
			</view>
			<view class="right">
				<view id="month">{{ date.month }}</view>
				<view id="year">{{ date.year }}</view>
				<view id="day">{{ date.day }}</view>
				<view id="str"></view>
			</view>
		</view>
		<view class="books">
			<view class="row">
				<view class="book" @click="goReadPage()">
					<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
					<view class="name">夜的命名术</view>
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
			scrollTop: 0,
			date: {
				day: '07',
				month: '04',
				year: '2022',
				headline: '早上好，读者',
				content: '请享受美好的阅读时光'
			}
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onShow() {
		this.changeDate();
	},
	onLoad() {},
	methods: {
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
			} else if (nowHour >= 22) {
				this.date.headline = '夜深了，早点睡';
			}
			uni.request({
				url: 'https://v1.hitokoto.cn/?c=c&c=a&c=b&c=i&c=h&max_length=20'
			}).then(res => {
				this.date.content=res[1].data.hitokoto
			});
		},
		goReadPage() {
			let data = {
				bookUrl: 'dushi/yedemingmingshu-294013/'
			};
			data = this.$u.queryParams(data);
			uni.navigateTo({
				url: '../read/read' + data
			});
		}
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
			justify-content: space-between;

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
