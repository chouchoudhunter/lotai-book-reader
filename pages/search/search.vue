<template>
	<view class="search">
		<u-navbar height="60px">
			<view class="navbar">
				<u-search :show-action="false"></u-search>
			</view>
		</u-navbar>
		<view class="main">
			<view class="search-info"></view>
			<view class="search-detail"></view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.search{
	.navbar{
		padding: 15px 20px;
		width: 100%;
	}
	.main{
		position: relative;
	}
}
</style>
