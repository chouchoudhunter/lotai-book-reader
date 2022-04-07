<template>
	<view class="user">
		<status-placeholder></status-placeholder>
		<view class="navbar">
			<view class="left">我的</view>
			<view class="right"><u-icon name="setting" size="38"></u-icon></view>
		</view>
		<view class="avatar">
			<u-image width="200rpx" height="200rpx" shape="circle" mode="aspectFit" src="https://img0.baidu.com/it/u=1967997459,1022958762&fm=26&fmt=auto"></u-image>
		</view>
		<u-gap height="16" bg-color="rgb(245, 245, 245)"></u-gap>
		<view class="main">
			<view class="history">
				<u-cell-group>
					<u-cell-item title="浏览历史" :border-bottom="false" value="更多"></u-cell-item>
					<scroll-view :scroll-x="true">
						<view class="books">
							<view class="book">
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
								<view class="title">夜的命名术</view>
								<view class="author">会说话的肘子</view>
							</view>
							<view class="book">
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
								<view class="title">夜的命名术</view>
								<view class="author">会说话的肘子</view>
							</view>
							<view class="book">
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
								<view class="title">夜的命名术</view>
								<view class="author">会说话的肘子</view>
							</view>
							<view class="book">
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
								<view class="title">夜的命名术</view>
								<view class="author">会说话的肘子</view>
							</view>
							<view class="book">
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
								<view class="title">夜的命名术</view>
								<view class="author">会说话的肘子</view>
							</view>
							<view class="book">
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
								<view class="title">夜的命名术</view>
								<view class="author">会说话的肘子</view>
							</view>
						</view>
					</scroll-view>
					<u-cell-item title="关于我们" :border-bottom="false"></u-cell-item>
					<u-cell-item title="意见反馈" :border-bottom="false"></u-cell-item>
					<u-cell-item title="软件设置" value="新版本" :border-bottom="false"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
export default {
	components: { statusPlaceholder },
	data() {
		return {
			title: 'Hello',
			isLight: true
		};
	},
	onLoad() {},
	methods: {
		change() {
			this.isLight = !this.isLight;
		}
	}
};
</script>

<style lang="scss">
.user {
	.navbar {
		padding: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.left{
			font-size: 18px;
			font-weight: blod;
		}
		.right {
			float: right;
		}
	}
	.avatar {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 20px 0;
		justify-content: center;
	}
	.main {
		.history {
			.books {
				padding: 0 16px;
				display: flex;
				flex-direction: row;
				.book {
					padding-right: 20px;
					.img {
						width: 90px;
						height: 120px;
						border-radius: 4px;
						overflow: hidden;
						margin-bottom: 6px;
					}
					.author{
						font-size: 12px;
						color: #b0b0b0;
					}
				}
			}
		}
	}
}
</style>
