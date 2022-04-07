<template>
	<view class="read">
		<left-tool ref="leftTool" :chapterList="chapterList" :currentChapterIndex="currentChapterIndex"></left-tool>
		<view class="navbar" :style="{ transform: !isShowToolbar ? 'translateY(-' + (44 + statusBarHeight) + 'px)' : 'none' }">
			<u-navbar :autoBack="true" class="main" :fixed="false"></u-navbar>
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
		<bottom-toolbar :isShow="isShowToolbar" @changeFontSzie="changeFontSzie" :fontSize="textFontSize" @changeBgColor="changeBgColor" :bgColor="readBgColor" @openLeftTool="openLeftTool"></bottom-toolbar>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import bottomToolbar from './components/bottom-toolbar.vue';
import leftTool from './components/left-tool.vue';
import { request } from '@/untils/http.js';
const tempContent={
	title:'',
	text:'',
	status:1
}
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
			content: {...tempContent},
			preContent:{...tempContent},
			nextContent:{...tempContent},
			chapterList:[],
			currentChapterIndex:0,//当前章节序号
			book:{}
		};
	},
	onLoad: function(option) {
		this.book = option;
	},
	onUnload() {
		clearInterval(this.timer);
	},
	mounted() {
		const systemInfo = getApp().globalData.systemInfo;
		this.screenWidth = systemInfo.windowWidth;
		this.statusBarHeight = systemInfo.statusBarHeight;
		this.refreshTime();
		this.getChapterList()
	},
	methods: {
		//获得章节目录
		getChapterList(){
			request('getChapterList',{bookUrl:this.book.bookUrl}).then(res=>{
				this.chapterList=res.data
				if(!this.content.text){
					this.loadChapter(this.currentChapterIndex)
				}
			})
		},
		//打开左边工具栏（目录）
		openLeftTool(){
			this.$refs.leftTool.switchTool()
			this.isShowToolbar=false
		},
		//加载章节
		loadChapter(index,nextOrPre='') {
			let url=''
			if(nextOrPre=='pre'){
				url=this.chapterList[index].url
				while(!url && index>0){
					index--;
					url=this.chapterList[index].url
				}
				if(index<=0){
					this.preContent.status=0//第一页了
					return
				}
			}else if(nextOrPre=='next'){
				url=this.chapterList[index].url
				while(!url && index< this.chapterList.length){
					index++;
					url=this.chapterList[index].url
				}
				if(index>=this.chapterList.length){
					this.nextContent.status=0//最后一页了
					return
				}
			}else{
				url=this.chapterList[index].url
				while(!url && index< this.chapterList.length){
					index++;
					url=this.chapterList[index].url
					this.currentChapterIndex=index
				}
			}
			request('getBookChapter', { bookUrl: url}).then(res => {
				if(nextOrPre=='next'){
					this.nextContent=res.data
				}else if(nextOrPre=='pre'){
					this.preContent=res.data
				}else{
					this.content = res.data
					this.computePageNum();
					this.loadChapter(this.currentChapterIndex+1,'next')
					this.loadChapter(this.currentChapterIndex-1,'pre')
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
			if (dir == 1) {
				if (this.currentPage + 1 > this.totalPage) {
					this.currentX -= this.screenWidth;//改变页面位置
					this.currentPage = 1;//修改页面下标
					setTimeout(()=>{
						this.needAnimation=false
						this.currentX=0
						this.preContent=this.content
						this.content=this.nextContent
						this.currentChapterIndex++
						this.computePageNum();
						this.loadChapter(this.currentChapterIndex+1,'next')
						setTimeout(()=>{
							this.needAnimation=true
						},100)
					},500)
				} else {
					this.currentX -= this.screenWidth;
					this.currentPage++;
				}
			} else if (dir == 0) {
				if(this.currentPage==1){
					if(this.preContent.status==0){
						return
					}
					this.currentX += this.screenWidth;
					this.currentPage=this.totalPage
					setTimeout(async ()=>{
						this.needAnimation=false
						this.nextContent=this.content
						this.content=this.preContent
						this.currentChapterIndex--
						this.loadChapter(this.currentChapterIndex-1,'pre')
						await this.computePageNum();
						this.currentX=this.screenWidth*(this.totalPage-1)*(-1)
						setTimeout(()=>{
							this.needAnimation=true
						},100)
					},500)
				}else{
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
		//计算页数
		computePageNum() {
			setTimeout(() => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('#textElement')
					.boundingClientRect(data => {
						this.totalPage = Math.ceil(data.width / this.screenWidth);
					})
					.exec();
			}, 100);
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
