<template>
	<view class="feedback">
		<view class="navbar">
			<u-navbar :autoBack="true" :fixed="false" :border-bottom="false"><view slot="right"></view></u-navbar>
		</view>
		<view class="main">
			<u-radio-group v-model="feedback.funcValue" @change="radioChange">
				<u-radio v-for="(item, index) in funcList" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
			</u-radio-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			feedback:{
				funcValue:'意见建议',
				content:''
			},
			funcList: [
				{
					name: '意见建议',
					disabled: false
				},
				{
					name: 'BUG提交',
					disabled: false
				}
			]
		};
	},
	methods: {
		radioChange() {}
	}
};
</script>

<style lang="scss">
.feedback {
	.main {
		padding: 10px 20px;
		.u-field{
			padding: 10px 0;
		}
	}
}
</style>
