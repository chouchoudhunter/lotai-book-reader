<template>
	<view id="drop-down-menu" @touchmove.stop.prevent="preventHandle">
		<view class="mask" v-show="isShow" @click="switchMenu()"></view>
		<u-icon :name="icon" size="35" id="func-btn" @click="switchMenu()"></u-icon>
		<view class="menu" :style="menuStyle" id="menu" @click.capture="switchMenu()"><slot></slot></view>
		<view class="menuT" :style="menuTStyle"></view>
	</view>
</template>

<script>
export default {
	props: {
		offestY: {
			type: Number,
			default: 15
		},
		icon:{
			type:String,
			default:'more-dot-fill'
		},
		bgColor:{
			type:String,
			default:'#fff'
		}
	},
	data() {
		return {
			menuPosition: {
				right: 0,
				top: 0
			},
			isShow: false
		};
	},
	computed: {
		preventHandle(){
			return false
		},
		menuStyle() {
			let style = {
				backgroundColor: this.bgColor,
				right: this.menuPosition.right + 'px',
				top: this.menuPosition.top + 'px',
				opacity: this.isShow?1:0,
				height:this.isShow?'auto':'0',
			};
			return style;
		},
		menuTStyle(){
			let style = {
				borderColor: `transparent transparent ${this.bgColor} transparent`,
				right: this.menuPosition.right+1 + 'px',
				top: this.menuPosition.top-15 + 'px',
				opacity: this.isShow?1:0,
				height:this.isShow?'auto':'0',
			};
			return style;
		},
		color() {
			return this.$store.getters.getColor;
		},
	},
	mounted() {
		this.initMenuPos();
	},
	methods: {
		switchMenu(){
			this.isShow=!this.isShow
		},
		async initMenuPos() {
			const systemInfo = getApp().globalData.systemInfo;
			const parentInfo = await this.$u.getRect('#drop-down-menu');
			const menuInfo = await this.$u.getRect('#menu');
			const paraentLeft = systemInfo.windowWidth - parentInfo.right;
			this.menuPosition.top = parentInfo.height+10;
			const toRight = menuInfo.width / 2 - parentInfo.width / 2 - paraentLeft;
			if (toRight > 0) {
				this.menuPosition.right = -paraentLeft + this.offestY;
			} else {
				this.menuPosition.right = -(menuInfo.width / 2 - parentInfo.width / 2) + this.offestY;
			}
		}
	}
};
</script>

<style lang="scss">
#drop-down-menu {
	position: relative;
	.mask{
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.menuT{
		position: absolute;
		border-width: 8px;
		border-style: dashed solid solid dashed;
		transition: opacity 0.2s;
	}
	.menu {
		position: absolute;
		transition: opacity 0.2s;
		border-radius: 4px;
		overflow: hidden;
		z-index: 1000;
		min-width: 80px;
	}
}
</style>
