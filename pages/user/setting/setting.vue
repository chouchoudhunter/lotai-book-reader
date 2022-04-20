<template>
	<view class="setting" :style="{ backgroundColor: color.bgPage }">
		<view class="navbar">
			<u-navbar :background="{ backgroundColor: color.bgPage }" :autoBack="true" class="main" :fixed="false" :border-bottom="false"><view slot="right"></view></u-navbar>
		</view>
		<view class="main">
			<u-cell-group :border="false">
				<u-cell-item
					:border-bottom="false"
					:title-style="{ color: color.normalText }"
					title="夜间模式"
					hover-class="cell-hover-class"
					:arrow="false"
					:bg-color="color.bgPage"
				>
					<view slot="right-icon"><u-switch v-model="isNight" @change="changeNight" size="40"></u-switch></view>
				</u-cell-item>
				<u-cell-item
					:border-bottom="false"
					:title-style="{ color: color.normalText }"
					title="切换源"
					hover-class="cell-hover-class"
					:arrow="false"
					:bg-color="color.bgPage"
					@click="showSwitchSource"
				>
				</u-cell-item>
				<!-- #ifdef APP-PLUS -->
				<u-cell-item
					:border-bottom="false"
					:title-style="{ color: color.normalText }"
					title="检测更新"
					hover-class="cell-hover-class"
					:bg-color="color.bgPage"
					@click="checkAppUpdate"
					:value="version"
				></u-cell-item>
				<!-- #endif -->
			</u-cell-group>
		</view>
		<switch-source v-model="isShowSourceSwitch"></switch-source>
	</view>
</template>

<script>
import request from '@/untils/ajax.js';
import switchSource from '@/components/switch-source.vue';
export default {
	components:{switchSource},
	data() {
		return {
			isNight: false,
			version: '',
			isShowSourceSwitch:false
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		}
	},
	onLoad() {
		this.isNight = this.isNightMode;
		//#ifdef APP-PLUS
		this.version = plus.runtime.version;
		//#endif
	},
	methods: {
		showSwitchSource(){
			this.isShowSourceSwitch=!this.isShowSourceSwitch
		},
		checkAppUpdate() {
			//#ifdef APP-PLUS
			request('checkAppUpdate', { version: plus.runtime.version }).then(res => {
				if (res.data.type == 2) {
					const data = this.$u.queryParams(res.data);
					uni.navigateTo({
						url: '../updateApp/updateApp' + data
					});
				}
			});
			//#endif
		},
		changeNight() {
			this.$store.commit('setting/SET_NIGHT');
		}
	}
};
</script>

<style>
.setting {
	height: 100%;
}
</style>
