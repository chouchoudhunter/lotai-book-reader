<template>
	<view class="read">
		<left-tool ref="leftTool" :chapterList="chapterList" :currentChapterIndex="currentChapterIndex" :book="this.book" @changeChapter="changeChapter"></left-tool>
		<view class="navbar" :style="{ transform: !isShowToolbar ? 'translateY(-' + (44 + statusBarHeight) + 'px)' : 'none' }">
			<u-navbar :autoBack="true" class="main" :fixed="false">
				<view slot="right"><image class="icon" src="../../static/read/light.png"></image></view>
			</u-navbar>
		</view>
		<view class="content" :style="{ backgroundColor: currentBgColor }">
			<view class="content-main">
				<status-placeholder></status-placeholder>
				<view class="top">{{ content.title }}</view>
				<view
					class="text"
					:style="{
						height: 'calc(100% - ' + (60 + statusBarHeight) + 'px)',
						transition: needAnimation ? ' all .5s' : 'none',
						transform: 'translateX(' + currentX + 'px)',
						fontSize: textFontSize + 'px'
					}"
				>
					<view id="textElement" v-html="content.text"></view>
				</view>
				<view class="bottom">
					<view class="battery">{{ currentTime }}</view>
					<view class="pages">{{ totalPage ? currentPage + '/' + totalPage + '页' : '' }}</view>
				</view>
			</view>
			<view class="tap">
				<view class="tap-left" @click="pageChange(0)"></view>
				<view class="tap-center" @click="isShowToolbar = !isShowToolbar"></view>
				<view class="tap-right" @click="pageChange(1)"></view>
			</view>
		</view>
		<bottom-toolbar
			:isShow="isShowToolbar"
			@changeFontSzie="changeFontSzie"
			:fontSize="textFontSize"
			@changeBgColor="changeBgColor"
			:bgColor="readBgColor"
			@openLeftTool="openLeftTool"
		></bottom-toolbar>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import bottomToolbar from './components/bottom-toolbar.vue';
import leftTool from './components/left-tool.vue';
import { request } from '@/untils/http.js';
const tempContent = {
	title: '',
	text: '',
	status: 1
};
export default {
	components: { statusPlaceholder, bottomToolbar, leftTool },
	data() {
		return {
			isShowToolbar: false, //是否显示工具栏
			screenWidth: 0, //屏幕宽度
			currentX: 0, //左右翻页位移
			currentPage: 1, //当前页码
			totalPage: '', //总页数
			currentTime: '', //当前时间
			timer: undefined, //时间循环
			needAnimation: true, //是否显示翻页动画
			statusBarHeight: 0, //状态栏高度
			textFontSize: 24, //小说字体大小
			readBgColor: ['rgb(248, 248, 248)', 'rgb(255, 241, 210)', 'rgb(34, 32, 28)'],
			currentBgColor: 'rgb(248, 248, 248)',
			content: { ...tempContent },
			preContent: { ...tempContent },
			nextContent: { ...tempContent },
			chapterList: [],
			currentChapterIndex: 0, //当前章节序号
			book: {},
			isChangeChapter: true
		};
	},
	computed: {
		isInMyBooks() {
			return this.$store.getters.getBookIsInMyBooks(this.book);
		}
	},
	onLoad: function(option) {
		this.book = option;
		this.currentChapterIndex = Number(this.book.readIndex);
		this.currentPage = Number(this.book.readPage);
	},
	onUnload() {
		clearInterval(this.timer);
		if (this.isInMyBooks) {
			this.setBookInfo();
		}
	},
	mounted() {
		const systemInfo = getApp().globalData.systemInfo;
		this.screenWidth = systemInfo.windowWidth;
		this.statusBarHeight = systemInfo.statusBarHeight;
		this.refreshTime();
		this.getChapterList();
	},
	methods: {
		//跳转章节
		changeChapter(chapterIndex) {
			//
		},
		setBookInfo() {
			let data = { ...this.book };
			data.readIndex = this.currentChapterIndex;
			data.readPage = this.currentPage;
			this.$store.commit('books/CHANGE_MY_BOOKS', data);
		},
		//获得章节目录
		getChapterList() {
			request('getChapterList', { bookUrl: this.book.bookUrl }).then(res => {
				this.chapterList = res.data;
				if (!this.content.text) {
					this.loadChapter(-1);
				}
			});
		},
		//打开左边工具栏（目录）
		openLeftTool() {
			this.$refs.leftTool.switchTool();
			this.$refs.leftTool.changeReadPos();
			this.isShowToolbar = false;
		},
		//检测是一个或者下一个相邻的章节 -1表示已经是最后一个章节了，-2表示已经是第一个章节了
		getNextOrPreCgaperIndex(dir = 1) {
			if (dir == 1) {
				for (var i = this.currentChapterIndex + 1; i < this.chapterList.length; i++) {
					if (this.chapterList[i].type == 'chapter') {
						return i;
					}
				}
				this.nextContent.status = -1;
				return -1;
			} else if (dir == 0) {
				for (var i = this.currentChapterIndex - 1; i >= 0; i--) {
					if (this.chapterList[i].type == 'chapter') {
						return i;
					}
				}
				this.preContent.status = -2;
				this.content.status = -2;
				return -2;
			} else {
				for (var i = this.currentChapterIndex; i < this.chapterList.length; i++) {
					if (this.chapterList[i].type == 'chapter') {
						this.currentChapterIndex = i;
						return i;
					}
				}
				return -1;
			}
		},
		//加载章节 -1表示初始化当前章节，1表示保存至下一章节，0表示保存至上一章节
		loadChapter(dir = -1) {
			const index = this.getNextOrPreCgaperIndex(dir);
			if (index == -1 || index == -2) {
				return;
			}
			request('getBookChapter', { bookUrl: this.chapterList[index].url }).then(res => {
				if (dir == 1) {
					this.nextContent = res.data;
					this.nextContent.index = index;
				} else if (dir == 0) {
					this.preContent = res.data;
					this.preContent.index = index;
				} else {
					this.content = res.data;
					this.needAnimation = false;
					this.currentX = -this.screenWidth * (this.currentPage - 1);
					setTimeout(() => {
						this.needAnimation = true;
						this.isChangeChapter = false;
					}, 500);
					this.computePageNum();
					this.loadChapter(1);
					this.loadChapter(0);
				}
			});
		},
		//左右翻页
		async pageChange(dir = 1) {
			//如果底部工具栏打开就关闭工具栏
			if (this.isShowToolbar) {
				this.isShowToolbar = false;
				return;
			}
			if (this.isChangeChapter) {
				return;
			}
			if (dir == 1) {
				if (this.currentPage + 1 > this.totalPage) {
					this.isChangeChapter = true;
					this.currentX -= this.screenWidth; //改变页面位置
					this.currentPage = 1; //修改页面下标
					setTimeout(() => {
						this.needAnimation = false;
						this.currentX = 0;
						this.preContent = this.content;
						this.content = this.nextContent;
						console.log(this.content, this.preContent);
						this.currentChapterIndex = this.content.index;
						this.computePageNum();
						this.loadChapter(1);
						setTimeout(() => {
							this.needAnimation = true;
							this.isChangeChapter = false;
						}, 100);
					}, 500);
				} else {
					this.currentX -= this.screenWidth;
					this.currentPage++;
				}
			} else if (dir == 0) {
				if (this.currentPage == 1) {
					if (this.content.status == -2) {
						return;
					}
					this.isChangeChapter = true;
					this.currentX += this.screenWidth;
					setTimeout(async () => {
						this.needAnimation = false;
						this.nextContent = this.content;
						this.content = this.preContent;
						this.currentChapterIndex = this.content.index;
						this.loadChapter(0);
						await this.computePageNum();
						this.currentX = -this.screenWidth * (this.totalPage - 1);
						this.currentPage = this.totalPage;
						setTimeout(() => {
							this.needAnimation = true;
							this.isChangeChapter = false;
						}, 100);
					}, 500);
				} else {
					this.currentX += this.screenWidth;
					this.currentPage--;
				}
			}
		},
		//时间
		refreshTime() {
			const time = new Date();
			const [hour, minute] = [time.getHours(), time.getMinutes()];
			this.currentTime = hour + ':' + minute;
			this.timer = setInterval(() => {
				const time = new Date();
				const [hour, minute] = [time.getHours(), time.getMinutes()];
				this.currentTime = hour + ':' + minute;
			}, 6000);
		},
		//计算当前章节总页数
		computePageNum() {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query
						.select('#textElement')
						.boundingClientRect(data => {
							this.totalPage = Math.ceil(data.width / this.screenWidth);
							resolve();
						})
						.exec();
				}, 100);
			});
		},
		//改变阅读字体大小
		changeFontSzie(size = 14) {
			this.textFontSize = size;
			this.computePageNum();
		},
		//改变背景颜色
		changeBgColor(colorIndex) {
			this.currentBgColor = this.readBgColor[colorIndex];
		}
	}
};
</script>

<style lang="scss">
.read {
	height: 100%;

	.navbar {
		position: absolute;
		top: 0;
		left: 0;
		transition: transform 0.5s;
		height: auto;
		z-index: 2;
		width: 100%;
		.icon {
			width: 20px;
			height: 20px;
			margin-right: 15px;
		}
	}

	.content {
		height: 100%;
		width: 100%;
		position: relative;
		overflow: hidden;
		.tap {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 750rpx;
			display: flex;
			flex-direction: row;
			opacity: 0;

			.tap-center {
				background-color: salmon;
				height: 100%;
				width: 50%;
			}

			.tap-left,
			.tap-right {
				width: 25%;
				background-color: sandybrown;
			}
		}

		.content-main {
			height: 100%;
			position: relative;
			margin: 0 10px;

			.top {
				height: 30px;
				line-height: 30px;
			}
			.bottom {
				height: 30px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				line-height: 30px;
				width: 100%;
			}

			.text {
				// height: calc(100% - 60px);
				columns: calc(750rpx - 20px) 1;
				column-gap: 20px;
				transform: translateX(0);
			}
		}
	}
}
</style>
