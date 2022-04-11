<template>
	<view class="book-status">
		<view class="status" :style="{bottom:pos+'px'}"><slot></slot></view>
		<view class="status-a" :style="{bottom:(pos+20)+'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"book-status",
		props:{
			pos:{
				type:Number,
				default:25
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.book-status{
	.status {
		width: 60px;
		height: 20px;
		line-height: 16px;
		background-image: linear-gradient(to right, #296dff, #55aaff);
		position: absolute;
		font-size: 12px;
		color: white;
		left: -5px;
		bottom: 25px;
		z-index: 10;
		padding: 2px 5px;
		text-align: center;
	}
	.status-a {
		width: 0;
		height: 0;
		position: absolute;
		left: -5px;
		bottom: 45px;
		border-width: 4px;
		border-style: dashed solid solid dashed; /*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
		border-color: transparent #225dd4 #225dd4 transparent;
		z-index: 7;
	}
}
</style>
