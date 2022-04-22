<template>
	<view class="loading-anime" :class="loadingClass">LOTAI</view>
</template>

<script>
export default {
	name: 'loading-anime',
	props:{
		isRead:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		readSetting() {
			return this.$store.getters.getReadSetting;
		},
		loadingClass(){
			if(!this.isRead){
				return this.isNightMode?'loading-anime-night':''
			}else{
				if(this.readSetting.currentBgColor==this.readSetting.bgColor[0]){
					return 'loading-anime-0'
				}else if(this.readSetting.currentBgColor==this.readSetting.bgColor[1]){
					return 'loading-anime-1'
				}else{
					return 'loading-anime-2'
				}
			}
		}
	}
};
</script>

<style lang="scss">
@keyframes rotate {
	0% {
		transform: translate(-50%, -50%) rotate(0);
	}
	100% {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}
.loading-anime {
	position: relative;
	font-size: 120px;
	font-weight: bold;
	background: #ffffff;
	color: #1994ff;
	overflow: hidden;
	transform: scale(0.5);

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: -923px;
		left: 50%;
		width: 2000px;
		height: 2000px;
		border-radius: 45% 48% 43% 47%;
		transform: translate(-50%, -50%);
		background: rgba(241, 241, 241, 0.8);
		animation: rotate 10s infinite linear;
		z-index: 1;
		mix-blend-mode: lighten;
	}

	&::after {
		border-radius: 43% 47% 44% 48%;
		animation: rotate 10s infinite 0.5s linear;
	}
}
.loading-anime-night {
	background: #101010;
	color: #1994ff;

	&::before,
	&::after {
		mix-blend-mode: darken;
		background: rgba(26, 26, 26, 0.8);
	}
}
.loading-anime-0 {
	background: rgb(248, 248, 248);
	color: #1994ff;

	&::before,
	&::after {
		mix-blend-mode: lighten;
		background: rgba(231, 231, 231, 0.8);
	}
}
.loading-anime-1 {
	background: rgb(255, 241, 210);
	color: #1994ff;

	&::before,
	&::after {
		mix-blend-mode: lighten;
		background: rgba(241, 228, 199, 0.8);
	}
}
.loading-anime-2 {
	background: rgb(58, 58, 58);
	color: #1994ff;

	&::before,
	&::after {
		mix-blend-mode: darken;
		background: rgba(79, 79, 79, 0.8);
	}
}
</style>
