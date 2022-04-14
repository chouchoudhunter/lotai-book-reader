<template>
	<view class="left-tool">
		<u-popup v-model="show" width="75%">
			<view class="main" :style="{ backgroundColor: color.bgPage }">
				<status-placeholder></status-placeholder>
				<view class="top" :style="{'box-shadow':isNightMode?'none':'0px 7px 10px -3px rgba(158, 158, 158, 0.1)'}">
					<view class="top-top">
						<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="book.img" /></view>
						<view class="info" :style="{ color: color.secText }">
							<view class="title" :style="{ color: color.normalText }">
								{{ book.title }}
								<u-icon size="30" name="arrow-right"></u-icon>
							</view>
							<view class="author">{{ book.author }}</view>
							<view class="status">{{'更新至-'+(chapterList[chapterList.length-1]?chapterList[chapterList.length-1].title:'')}}</view>
							<view class="status2">当前阅读进度{{ book.readPos }}%</view>
						</view>
					</view>
					<u-tabs class="func" :inactive-color="color.normalText" :bg-color="color.bgPage" :list="funcList" :is-scroll="false" :current="currentFunc" @change="changeFunc"></u-tabs>
				</view>
				<scroll-view class="bottom" :scroll-y="true" :style="{ height: toolHeight + 'px',backgroundColor: color.cardBg,color: color.normalText}">
					<view
						v-for="(item, index) in chapterList"
						:key="index"
						@tap="changeChapter(index,item)"
						:class="{
							group: item.type == 'group',
							chapter: item.type == 'chapter',
							selected: index == book.readIndex
						}"
					>
						{{ item.title }}
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import { request } from '@/untils/http.js';
export default {
	components: { statusPlaceholder },
	props: {
		chapterList: {
			type: Array,
			default: () => {
				return [];
			}
		},
		book: {
			type: Object,
			default: () => {
				return {
					author: '',
					bookUrl: '',
					desc: '',
					readIndex: 1,
					readPage: 3,
					title: ''
				};
			}
		}
	},
	data() {
		return {
			show: false,
			funcList: [{ name: '目录' }, { name: '书签' }],
			currentFunc: 0,
			toolHeight: 0
		};
	},
	computed:{
		color() {
			return this.$store.getters.getColor;
		},
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
	},
	mounted() {
		const systemInfo = getApp().globalData.systemInfo;
		this.toolHeight = systemInfo.windowHeight - systemInfo.statusBarHeight - 170;
	},
	methods: {
		changeFunc(index) {
			this.currentFunc = index;
		},
		switchTool() {
			this.show = !this.show;
		},
		changeChapter(index,item){
			if(item.type=="chapter"){
				this.$emit('changeChapter',index)
			}
		},
	}
};
</script>

<style lang="scss">
.left-tool {
	.main {
		width: 100%;
		height: 100%;
		.top {
			height: 170px;
			width: 100%;
			padding: 15px 15px 0 15px;
			position: relative;
			z-index: 3;
			.top-top {
				display: flex;
				flex-direction: row;
				.img {
					width: 75px;
					height: 100px;
					border-radius: 7px;
					overflow: hidden;
				}
				.info {
					height: 100px;
					margin-left: 10px;
					color: #959595;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 12px;
					.title {
						font-size: 18px;
						color: #000000;
					}
				}
			}
			.func {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
			}
		}
		.bottom {
			background-color: #f9f9f9;
			width: 100%;
			position: relative;
			z-index: 2;
			.group,
			.chapter {
				width: 100%;
				height: 30px;
				line-height: 30px;
				padding: 0 5px;
				font-size: 14px;
				overflow: hidden;
			}
			.group {
				font-size: 16px;
				// border-bottom: 1px solid #67bdff;
			}
			.selected {
				color: #007aff;
			}
		}
	}
}
</style>
