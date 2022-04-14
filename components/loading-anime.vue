<template>
	<view :class="{'loading-anime':true, 'loading-anime-night':isNightMode}">LOTAI</view>
</template>

<script>
export default {
	name: 'loading-anime',
	data() {
		return {};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
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
.loading-anime-night{ 
	background: #101010;
	color: #1994ff;
	
	&::before,
	&::after {
		mix-blend-mode: darken;
		background: rgba(26, 26, 26, 0.8);
	}
}
</style>
