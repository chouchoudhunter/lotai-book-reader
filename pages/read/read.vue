<template>
	<view class="read">
		<left-tool v-model="showLeftTool" :chapterList="chapterList" :book="this.book" @changeChapter="changeChapter"></left-tool>
		<view class="navbar" :style="{ transform: !isShowToolbar ? 'translateY(-' + (44 + statusBarHeight) + 'px)' : 'none' }">
			<u-navbar :background="{ backgroundColor: color.bgPage }" :border-bottom="false" :autoBack="true" class="main" :fixed="false">
				<view slot="right" class="right">
					<u-icon class="item" :name="'/static/tabs/source'+(isNightMode?'-night':'')+'.png'" size="40" @click="showSwitchSource"></u-icon>
					<u-icon class="item" :name="'../../static/read/' + (isNightMode ? 'night' : 'light') + '.png'" size="38" @click="changeNight"></u-icon>
					</view>
			</u-navbar>
		</view>
		<view class="content" :style="{ backgroundColor: readSetting.currentBgColor }">
			<view class="content-main">
				<status-placeholder></status-placeholder>
				<view class="top" :style="{ color: color.secText }">{{ content.title }}</view>
				<view class="text-loading" v-show="isLoading"><loading-anime></loading-anime></view>
				<view class="load-err" v-show="content.success == -1">
					<view class="err-text">加载失败</view>
					<view class="err-func">
						<u-button type="primary" size="mini" :plain="true">换源</u-button>
						<u-button type="primary" size="mini" :plain="true" @click="loadChapter(-1)">重试</u-button>
					</view>
				</view>
				<view
					class="text"
					:style="{
						height: 'calc(100% - ' + (60 + statusBarHeight) + 'px)',
						transition: needAnimation ? ' all .5s' : 'none',
						transform: 'translateX(' + currentX + 'px)',
						fontSize: readSetting.fontSize + 'px',
						lineHeight: readSetting.lineHeight + 'px',
						color: readSetting.currentBgColor == readSetting.bgColor[2] ? '#b3b3b3' : '#000000'
					}"
				>
					<view id="textElement" v-html="content.text"></view>
				</view>
				<view class="bottom" :style="{ color: color.secText }">
					<view class="battery">{{ currentTime }}</view>
					<view class="pages">{{ totalPage ? book.readPage + '/' + totalPage + '页' : '' }}</view>
				</view>
			</view>
			<view class="tap" :style="{ display: content.success == 1 ? 'flex' : 'flex' }">
				<view class="tap-left" @click="pageChange(0)"></view>
				<view class="tap-center" @click="isShowToolbar = !isShowToolbar"></view>
				<view class="tap-right" @click="pageChange(1)"></view>
			</view>
		</view>
		<bottom-toolbar :isShow="isShowToolbar" v-model="readSetting" @openLeftTool="openLeftTool" @changeReadSetting="changeReadSetting"></bottom-toolbar>
		<switch-source v-model="isShowSourceSwitch" :bookSource="book" @confirm="refreshSource"></switch-source>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import bottomToolbar from './components/bottom-toolbar.vue';
import leftTool from './components/left-tool.vue';
import loadingAnime from '@/components/loading-anime.vue';
import switchSource from '@/components/switch-source.vue';
import { request } from '@/untils/http.js';
import source from '@/source/index.js';
const tempContent = {
	title: '',
	text: '',
	status: 1,
	success: 1
};
export default {
	components: { statusPlaceholder, bottomToolbar, leftTool, loadingAnime,switchSource },
	data() {
		return {
			isShowToolbar: false, //是否显示工具栏
			screenWidth: 0, //屏幕宽度
			currentX: 0, //左右翻页位移
			totalPage: '', //总页数
			currentTime: '', //当前时间
			timer: undefined, //时间循环
			needAnimation: true, //是否显示翻页动画
			statusBarHeight: 0, //状态栏高度
			content: { ...tempContent },
			preContent: { ...tempContent },
			nextContent: { ...tempContent },
			chapterList: [],
			book: {},
			isChangeChapter: true,
			isLoading: false,
			isShowSourceSwitch:false,
			showLeftTool:false
		};
	},
	computed: {
		isInMyBooks() {
			return this.$store.getters.getBookIsInMyBooks(this.book);
		},
		readSetting() {
			return this.$store.getters.getReadSetting;
		},
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		}
	},
	onLoad() {
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.once('read-info', data => {
			this.book = { ...data };
			this.book.readIndex = Number(this.book.readIndex);
			this.book.readPage = Number(this.book.readPage);
			//
			const systemInfo = getApp().globalData.systemInfo;
			this.screenWidth = systemInfo.windowWidth;
			this.statusBarHeight = systemInfo.statusBarHeight;
			this.refreshTime();
			this.getChapterList();
		});
	},
	onBackPress(event){
		if(event.from=="backbutton"){
			if(this.showLeftTool){
				this.showLeftTool=false
				return true
			}
			if(this.isShowToolbar){
				this.isShowToolbar=false
				return true
			}
		}
	},
	onUnload() {
		clearInterval(this.timer);
		if (this.isInMyBooks) {
			this.setBookInfo();
		} else {
			this.setHistoryBook();
		}
	},
	methods: {
		refreshSource(){
			this.$u.toast('书本换源装修中...', 3000);
			// this.content={...tempContent}
			// this.getChapterList();
		},
		showSwitchSource(){
			this.isShowSourceSwitch=!this.isShowSourceSwitch
		},
		changeReadSetting() {
			this.computePageNum();
		},
		//计算阅读进度
		changeReadPos() {
			this.book.readPos = ((this.book.readIndex / this.chapterList.length) * 100).toFixed(1);
		},
		//切换夜晚模式
		changeNight() {
			this.$store.commit('setting/SET_NIGHT');
			if (this.isNightMode) {
				this.readSetting.currentBgColor = this.readSetting.bgColor[2];
				this.$store.commit('setting/SET_READ_SETTING', this.readSetting);
			} else {
				this.readSetting.currentBgColor = this.readSetting.bgColor[0];
				this.$store.commit('setting/SET_READ_SETTING', this.readSetting);
			}
		},
		//跳转章节
		changeChapter(chapterIndex) {
			this.book.readIndex = chapterIndex;
			this.book.readPage = 1;
			this.content = tempContent;
			this.loadChapter(-1);
		},
		//更新到历史记录
		setHistoryBook() {
			let data = { ...this.book };
			this.$store.commit('books/ADD_HISTORY_BOOKS', data);
		},
		//更新我的书架
		setBookInfo() {
			let data = { ...this.book };
			data.readChapter = this.content.title;
			this.$store.commit('books/CHANGE_MY_BOOKS', data);
		},
		//获得章节目录
		getChapterList() {
			//#ifdef APP-PLUS
			source[this.book.source].getChapterList(this.book.bookUrl).then(res => {
				this.chapterList = res;
				if (!this.content.text) {
					this.loadChapter(-1);
				}
			});
			//#endif
			//#ifdef H5
			request('getChapterList', { bookUrl: this.book.bookUrl }).then(res => {
				this.chapterList = res.data;
				if (!this.content.text) {
					this.loadChapter(-1);
				}
			});
			//#endif
		},
		//打开左边工具栏（目录）
		openLeftTool() {
			this.showLeftTool=!this.showLeftTool
			this.isShowToolbar = false;
		},
		//检测是一个或者下一个相邻的章节 -1表示已经是最后一个章节了，-2表示已经是第一个章节了
		getNextOrPreCgaperIndex(dir = 1) {
			if (dir == 1) {
				for (var i = this.book.readIndex + 1; i < this.chapterList.length; i++) {
					if (this.chapterList[i].type == 'chapter') {
						return i;
					}
				}
				this.content.status = -1;
				return -1;
			} else if (dir == 0) {
				for (var i = this.book.readIndex - 1; i >= 0; i--) {
					if (this.chapterList[i].type == 'chapter') {
						return i;
					}
				}
				this.content.status = -2;
				return -2;
			} else {
				this.isLoading = true;
				for (var i = this.book.readIndex; i < this.chapterList.length; i++) {
					if (this.chapterList[i].type == 'chapter') {
						this.book.readIndex = i;
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
			//#ifdef APP-PLUS
			source[this.book.source].getChapter(this.book.bookUrl, this.chapterList[index]).then(res => {
				if (dir == 1) {
					this.nextContent = res;
					this.nextContent.index = index;
				} else if (dir == 0) {
					this.preContent = res;
					this.preContent.index = index;
				} else {
					this.isLoading = false;
					this.content = { ...res };
					this.needAnimation = false;
					this.currentX = -(this.screenWidth + 1) * (this.book.readPage - 1);
					setTimeout(() => {
						this.needAnimation = true;
						this.isChangeChapter = false;
					}, 500);
					this.changeReadPos();
					this.computePageNum();
					this.loadChapter(1);
					this.loadChapter(0);
				}
			});
			//#endif
			//#ifdef H5
			request('getBookChapter', { bookUrl: this.chapterList[index].url }).then(res => {
				if (dir == 1) {
					this.nextContent = res.data;
					this.nextContent.index = index;
				} else if (dir == 0) {
					this.preContent = res.data;
					this.preContent.index = index;
				} else {
					this.isLoading = false;
					this.content = { ...res.data };
					this.needAnimation = false;
					this.currentX = -this.screenWidth * (this.book.readPage - 1);
					setTimeout(() => {
						this.needAnimation = true;
						this.isChangeChapter = false;
					}, 500);
					this.changeReadPos();
					this.computePageNum();
					this.loadChapter(1);
					this.loadChapter(0);
				}
			});
			//#endif
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
				if (this.book.readPage + 1 > this.totalPage) {
					this.isChangeChapter = true;
					// #ifdef APP-PLUS
					this.currentX -= this.screenWidth + 1;
					// #endif
					// #ifdef H5
					this.currentX -= this.screenWidth;
					// #endif
					this.book.readPage = 1; //修改页面下标
					setTimeout(() => {
						this.needAnimation = false;
						this.currentX = 0;
						this.preContent = this.content;
						this.content = this.nextContent;
						this.book.readIndex = this.content.index;
						this.computePageNum();
						this.loadChapter(1);
						setTimeout(() => {
							this.needAnimation = true;
							this.isChangeChapter = false;
						}, 100);
					}, 500);
				} else {
					// #ifdef APP-PLUS
					this.currentX -= this.screenWidth + 1;
					// #endif
					// #ifdef H5
					this.currentX -= this.screenWidth;
					// #endif
					this.book.readPage++;
				}
			} else if (dir == 0) {
				if (this.book.readPage == 1) {
					if (this.content.status == -2) {
						return;
					}
					this.isChangeChapter = true;
					// #ifdef APP-PLUS
					this.currentX += this.screenWidth + 1;
					// #endif
					// #ifdef H5
					this.currentX += this.screenWidth;
					// #endif
					setTimeout(async () => {
						this.needAnimation = false;
						this.nextContent = this.content;
						this.content = this.preContent;
						this.book.readIndex = this.content.index;
						this.loadChapter(0);
						await this.computePageNum();
						// #ifdef APP-PLUS
						this.currentX = -(this.screenWidth + 1) * (this.totalPage - 1);
						// #endif
						// #ifdef H5
						this.currentX = -this.screenWidth * (this.totalPage - 1);
						// #endif
						this.book.readPage = this.totalPage;
						setTimeout(() => {
							this.needAnimation = true;
							this.isChangeChapter = false;
						}, 100);
					}, 500);
				} else {
					// #ifdef APP-PLUS
					this.currentX += this.screenWidth + 1;
					// #endif
					// #ifdef H5
					this.currentX += this.screenWidth;
					// #endif
					this.book.readPage--;
				}
			}
			this.changeReadPos();
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
							this.totalPage = Math.round(data.width / this.screenWidth);
							resolve();
						})
						.exec();
				}, 200);
			});
		},
		//改变阅读字体大小
		changeFontSzie(size = 14) {
			this.computePageNum();
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
		transition: transform 0.3s;
		height: auto;
		z-index: 2;
		width: 100%;
		.right{
			margin-right: 15px;
			display: flex;
			flex-direction: row;
			align-items: center;
			.item{
				margin-left: 15px;
			}
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
			margin: 0 12px;

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
				columns: calc(750rpx - 24px) 1;
				column-gap: 24px;
				.text-loading {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 100%;
				}
				.load-err {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 100%;
					font-size: 16px;
					.err-func {
						display: flex;
						flex-direction: row;
						.u-btn {
							margin: 0 10px;
						}
					}
				}
			}
		}
	}
}
</style>
