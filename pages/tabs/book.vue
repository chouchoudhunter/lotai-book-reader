<template>
	<view class="book">
		<status-placeholder></status-placeholder>
		<view class="top">
			<view class="left">
				<h1>{{ date.headline }}</h1>
				<h2 :style="{ opacity: dateContentOpacity }">{{ date.content }}</h2>
			</view>
			<view class="right">
				<view id="month">{{ date.month }}</view>
				<view id="year">{{ date.year }}</view>
				<view id="day">{{ date.day }}</view>
				<view id="str"></view>
			</view>
		</view>
		<view class="preBook">
			<image src="../../static/tabs/gou.png" mode="widthFix" class="smallIcon" @click="openTool(0)"></image>
			<view class="left">
				<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
			</view>
			<view class="right">
				<view class="title">夜的命名术</view>
				<view class="info">已读至 第五十六章</view>
				<u-line-progress height="22" :striped-active="true" active-color="#2979ff" :striped="true" :percent="70"></u-line-progress>
				<view class="func">
					<u-button size="mini"shape="circle" :ripple="true" type="primary" :custom-style="btnStyle">继续阅读</u-button>
				</view>
			</view>
		</view>
		<view class="books">
			<view class="book-item" @click="goReadPage()">
				<view>
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
			},
			dateContentOpacity: 1,
			btnStyle:{
				backgroundImage: 'linear-gradient(to right, #296dff, #55aaff)',
				// width:'60px',
				fontSize:'13px'
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
				url: 'https://v1.hitokoto.cn/?c=c&c=a&c=b&c=i&c=h&max_length=18'
			}).then(res => {
				this.date.content = res[1].data.hitokoto;
			});
			this.dateContentOpacity = 0;
			setTimeout(() => {
				this.dateContentOpacity = 1;
			}, 200);
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
		margin: 10px 0 10px 0;
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
	.preBook {
		background-color: #f3f3f3;
		height: 110px;
		margin: 40px 10px 0 10px;
		padding: 10px;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		position: relative;
		.smallIcon{
			width: 20px;
			position: absolute;
			right: 7px;
			top:7px
		}
		.left{
			position: relative;
			.img{
				width: 90px;
				height: 120px;
				border-radius: 4px;
				overflow: hidden;
				position: relative;
				top: -30px;
				left: 0;
			}
		}
		.right{
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: calc(100% - 90px);
			.title{
				font-size: 16px;
			}
			.info{
				font-size: 12px;
				color: #919191;
			}
		}
	}
	.books {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.book-item {
			width: 33%;
			padding: 10px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			.name {
				font-size: 14px;
				margin: 5px 0;
			}

			.img {
				width: 90px;
				height: 120px;
				border-radius: 4px;
				overflow: hidden;
				box-shadow: 0 4rpx 14rpx 0 $shadow-gray;
			}
		}
	}
}
</style>
