<template>
	<view class="user">
		<view class="navbar">
			<status-placeholder></status-placeholder>
			<view class="right"><u-icon name="setting" size="38"></u-icon></view>
		</view>
		<view class="avatar">
			<u-image width="200rpx" height="200rpx" shape="circle" mode="aspectFit" src="https://img0.baidu.com/it/u=1967997459,1022958762&fm=26&fmt=auto"></u-image>
		</view>
		<u-gap height="16" bg-color="rgb(245, 245, 245)"></u-gap>
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
		.right {
			float: right;
		}
	}
	.avatar{
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 20px 0;
		justify-content: center;
	}
}
</style>
