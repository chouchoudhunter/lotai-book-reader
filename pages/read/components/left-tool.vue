<template>
	<view class="left-tool">
		<u-popup v-model="show" width="75%">
			<view class="main">
				<status-placeholder></status-placeholder>
				<view class="top">
					<view class="top-top">
						<view class="img"><u-image width="100%" height="100%" mode="aspectFill" src="https://bookcover.yuewen.com/qdbimg/349573/1021617576/180" /></view>
						<view class="info">
							<view class="title">
								夜的命名术
								<u-icon size="30" name="arrow-right"></u-icon>
							</view>
							<view class="author">会说话的肘子</view>
							<view class="status">连载至557章 更新5小时前</view>
							<view class="status2">当前阅读进度50%</view>
						</view>
					</view>
					<u-tabs class="func" :list="funcList" :is-scroll="false" :current="currentFunc" @change="changeFunc"></u-tabs>
				</view>
				<scroll-view class="bottom" :scroll-y="true">
					<view
						v-for="(item, index) in chapterList"
						:key="index"
						:class="{
							group: item.type == 'group',
							chapter: item.type == 'chapter',
							selected:index==currentChapterIndex
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
		currentChapterIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			show: false,
			funcList: [{ name: '目录' }, { name: '书签' }],
			currentFunc: 0
		};
	},
	methods: {
		changeFunc(index) {
			this.currentFunc = index;
		},
		switchTool() {
			this.show = !this.show;
		}
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
			box-shadow: 0px 7px 10px -3px rgba(158, 158, 158, 0.1);
			position: relative;
			z-index: 3;
			.top-top {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.img {
					width: 75px;
					height: 100px;
					border-radius: 7px;
					overflow: hidden;
				}
				.info {
					height: 100px;
					margin-left: 5px;
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
			height: calc(100% - 170px);
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
			.selected{
				color: #007AFF;
			}
		}
	}
}
</style>
