<template>
	<view class="bottom-toolbar" :style="{ transform: !isShow ? 'translateY(50px)' : 'none' }">
		<view class="tool" :style="{ transform: showTool ? 'none' : 'translateY(90px)' }">
			<view class="light" v-if="currentOpenTool == 1">
				<view class="row">
					<view class="color" :style="{backgroundColor: bgColor[0]}"></view>
					<view class="color" :style="{backgroundColor: bgColor[1]}"></view>
					<view class="color" :style="{backgroundColor: bgColor[2]}"></view>
				</view>
			</view>
			<view class="font" v-if="currentOpenTool == 2">
				<view class="row">
					<view class="step">
						<view class="left" @click="changeFontSize(0)">A-</view>
						<view class="mid">{{ textFontSize }}</view>
						<view class="right" @click="changeFontSize(1)">A+</view>
					</view>
					<view style="width: 20px;"></view>
					<view class="step">
						<view class="left"><image src="../../../static/read/lint-height-sub.png" mode="widthFix" class="image"></image></view>
						<view class="mid">16</view>
						<view class="right"><image src="../../../static/read/lint-height-add.png" mode="widthFix" class="image"></image></view>
					</view>
				</view>
				<!-- 				<view class="row">
					<view>翻页</view>
					<view>左右</view>
					<view>上下</view>
				</view> -->
			</view>
		</view>
		<view class="bar">
			<image src="../../../static/read/list.png" mode="widthFix" class="image"></image>
			<image src="../../../static/read/sun.png" mode="widthFix" class="image sun" @click="openTool(1)"></image>
			<image src="../../../static/read/font-size.png" mode="widthFix" class="image" @click="openTool(2)"></image>
		</view>
	</view>
</template>

<script>
export default {
	name: 'bottom-toolbar',
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		fontSize: {
			type: Number,
			default: 14
		},
		bgColor:{
			type: Array,
			default: ()=>{return []}
		}
	},
	data() {
		return {
			showTool: false,
			currentOpenTool: -1,
			textFontSize: this.fontSize,
		};
	},
	watch: {
		isShow(newVal, oldVal) {
			if (!newVal) {
				this.showTool = false;
			}
		}
	},
	methods: {
		//打开工具栏详情
		openTool(currentOpenTool = -1) {
			if (this.showTool) {
				if (currentOpenTool == this.currentOpenTool) {
					this.showTool = false;
				} else {
					this.showTool = false;
					setTimeout(() => {
						this.currentOpenTool = currentOpenTool;
						this.showTool = true;
					}, 500);
				}
			} else {
				this.showTool = true;
				this.currentOpenTool = currentOpenTool;
			}
		},
		changeFontSize(offset) {
			if (offset) {
				this.textFontSize++;
			} else {
				this.textFontSize--;
			}
			this.$emit('changeFontSzie', this.textFontSize);
		}
	}
};
</script>

<style lang="scss">
.bottom-toolbar {
	background-color: white;
	height: 50px;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	transition: all 0.5s;
	z-index: 10;
	.tool {
		position: absolute;
		left: 0;
		bottom: 50px;
		height: 90px;
		background-color: white;
		width: 100%;
		z-index: 1;
		transition: transform 0.5s;
		border-bottom: 1px solid #dde2ea;
		padding: 15px;
		.light{
			.row {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			.color{
				width: 20%;
				height: 20px;
				border-radius: 20px;
			}
		}
		.font {
			.row {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			.step {
				height: 30px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				color: #959595;
				width: 50%;
				.image {
					width: 30rpx;
					position: relative;
					top: 2px;
				}
				.left,
				.right {
					background-color: #f4f4f4;
					padding: 3px 20px;
					border-radius: 25px;
				}
			}
		}
	}
	.bar {
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		z-index: 10;
		position: relative;
		background-color: white;
		.image {
			width: 40rpx;
		}
		.image .sun {
			width: 50rpx;
		}
	}
}
</style>
