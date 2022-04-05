<template>
	<view class="discord">
		<status-placeholder></status-placeholder>
		<view class="top"  @click="goSearch()"><u-search :disabled="true" :show-action="false"></u-search></view>
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
	onShow() {
		console.log('bbb');
	},
	onLoad() {},
	methods: {
		goSearch(){
			console.log(111)
			uni.navigateTo({
				url:'../search/search'
			})
		}
	}
};
</script>

<style lang="scss">
.discord {
	.top {
		padding: 15px 20px;
	}
}
</style>
