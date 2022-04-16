<template>
	<view class="bottom-toolbar" :style="{ transform: !isShow ? 'translateY(50px)' : 'none'}">
		<view class="tool" :style="{ transform: showTool ? 'none' : 'translateY(90px)',backgroundColor: color.bgPage,'border-bottom': '1px solid '+color.cardBg}">
			<view class="light" v-show="currentOpenTool == 1">
				<view class="row">
					<view class="color" :class="{'color-active':readSetting.currentBgColor==readSetting.bgColor[0]}" :style="{ backgroundColor: readSetting.bgColor[0] }" @click="changeBgColor(0)"></view>
					<view class="color" :class="{'color-active':readSetting.currentBgColor==readSetting.bgColor[1]}" :style="{ backgroundColor: readSetting.bgColor[1] }" @click="changeBgColor(1)"></view>
					<view class="color" :class="{'color-active':readSetting.currentBgColor==readSetting.bgColor[2]}" :style="{ backgroundColor: readSetting.bgColor[2] }" @click="changeBgColor(2)">
						<image class="moon" src="../../../static/read/night.png"></image>
					</view>
				</view>
				<view class="lightSet">
					<u-slider v-model="lightNum" @moving="changeLight" @end="changeLightEnd" height="30" min="0" max="100" step="1" active-color="#e3e3e3" inactive-color="#f3f3f3" block-width="30" block-color="#fff"></u-slider>
				</view>
			</view>
			<view class="font" v-show="currentOpenTool == 2">
				<view class="row">
					<view class="step">
						<view class="left" @click="changeFontSize(0)">A-</view>
						<view class="mid">{{ readSetting.fontSize }}</view>
						<view class="right" @click="changeFontSize(1)">A+</view>
					</view>
					<view style="width: 20px;"></view>
					<view class="step">
						<view class="left" @click="changeLineHeight(0)"><image src="../../../static/read/lint-height-sub.png" mode="widthFix" class="image"></image></view>
						<view class="mid">{{readSetting.lineHeight}}</view>
						<view class="right" @click="changeLineHeight(1)"><image src="../../../static/read/lint-height-add.png" mode="widthFix" class="image"></image></view>
					</view>
				</view>
				<!-- 				<view class="row">
					<view>翻页</view>
					<view>左右</view>
					<view>上下</view>
				</view> -->
			</view>
		</view>
		<view class="bar" :style="{ backgroundColor: color.bgPage }">
			<u-icon :name="'/static/read/list'+(isNightMode?'-night':'')+'.png'" size="40" @click="openTool(0)"></u-icon>
			<u-icon :name="'/static/read/color'+(isNightMode?'-night':'')+'.png'" size="45" @click="openTool(1)"></u-icon>
			<u-icon :name="'/static/read/font-size'+(isNightMode?'-night':'')+'.png'" size="40" @click="openTool(2)"></u-icon>
		</view>
	</view>
</template>

<script>
export default {
	name: 'bottom-toolbar',
	model: {
		prop: 'readSetting',
		event: 'input'
	},
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		readSetting: {
			type: Object,
			default: () => {}
		}
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		},
	},
	data() {
		return {
			showTool: false,
			currentOpenTool: 1,
			lightNum:20
		};
	},
	watch: {
		isShow(newVal, oldVal) {
			if (!newVal) {
				this.showTool = false;
			}
		}
	},
	mounted() {
		// uni.getScreenBrightness({
		// 	success: (res) => {
		// 		this.lightNum=res.value*100
		// 		console.log(res.value)
		// 	}
		// })
	},
	methods: {
		changeLight(){
			uni.setScreenBrightness({
				value:0,
				success: ()=>{
					console.log((this.lightNum/100).toFixed(1))
				}
			});
		},
		changeLightEnd(){
			this.saveReadSetting()
		},
		//保存阅读设置
		saveReadSetting(){
			this.$emit('changeReadSetting')
			this.$store.commit('setting/SET_READ_SETTING',this.readSetting)
		},
		//修改背景颜色
		changeBgColor(index){
			this.readSetting.currentBgColor=this.readSetting.bgColor[index]
			this.saveReadSetting()
		},
		//修改行高
		changeLineHeight(dir){
			if(dir){
				if(this.readSetting.lineHeight<48){
					this.readSetting.lineHeight+=2
					this.saveReadSetting()
				}
			}else{
				if(this.readSetting.lineHeight>16){
					this.readSetting.lineHeight-=2
					this.saveReadSetting()
				}
			}
		},
		//改变字体大小
		changeFontSize(dir){
			if(dir){
				this.readSetting.fontSize++
			}else{
				this.readSetting.fontSize--
			}
			this.saveReadSetting()
		},
		//打开工具栏详情
		openTool(currentOpenTool = -1) {
			if (currentOpenTool == 0) {
				this.showTool = false;
				this.$emit('openLeftTool');
			} else if (this.showTool) {
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
		transition: transform 0.3s;
		padding: 15px;
		.light {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%; 
			.row {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			.color {
				width: 26%;
				height: 25px;
				border-radius: 20px;
				transition: border-color 0.5s;
				overflow: hidden;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				.moon{
					width: 15px;
					height: 15px;
				}
			}
			.color-active{
				border: 3px solid #007AFF;
			}
			.lightSet{
				// width: 70%;
			}
		}
		.font {
			position: relative;
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
					height: 26px;
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
	}
}
</style>
