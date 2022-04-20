<template>
	<view class="book-info" :style="{ backgroundColor:color.bgPage }">
		<view class="navbar"><u-navbar :background="{backgroundColor:color.bgPage}" :autoBack="true" :border-bottom="false" :fixed="false"></u-navbar></view>
		<view class="main">
			<view class="info">
				<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="book.img"></u-image></view>
				<view class="detail" :style="{color:color.secText}">
					<view class="title" :style="{color:color.normalText}">{{ book.title }}</view>
					<view class="author">{{ book.author }}</view>
					<view class="star"><u-rate :count="5" current="4" active-color="#f5e100" :disabled="true"></u-rate></view>
					<view class="tags">
						<view class="tag" v-for="(item,index) in book.tags" :key="index">{{item}}</view>
					</view>
					<view class="func">
						<u-button :ripple="true" class="btn-left" @click="switchToMyBooks" :loading="isAddMyBook">{{isInMyBooks?'移出书架':'加入书架'}}</u-button>
						<u-button type="primary" :ripple="true" :custom-style="btnStyle" @click="goRead()">开始阅读</u-button>
					</view>
					
				</view>
			</view>
			<u-gap height="1" :bg-color="color.cardBg"></u-gap>
			<view class="desc" :style="{color:color.secText}" v-html="book.desc"></view>
			<u-cell-group>
				<u-cell-item icon="list-dot" title="查看目录"  :hover-class="isNightMode?'cell-hover-class-night':'cell-hover-class'" :title-style="{color:color.normalText}" :bg-color="color.bgPage"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			book: {},
			btnStyle:{
				backgroundColor:'#2970ff'
			},
			isAddMyBook:false
		};
	},
	computed:{
		isInMyBooks(){
			return this.$store.getters.getBookIsInMyBooks(this.book)
		},
		color() {
			return this.$store.getters.getColor;
		},
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},		
		systemSetting() {
			return this.$store.getters.getSystemSetting;
		},
	},
	watch:{
		isInMyBooks(){
			this.isAddMyBook=false
		}
	},
	onLoad: function(option) {
		this.book = option;
		if(this.book.tags){
			this.book.tags=this.book.tags.split(',')
		}
	},
	methods:{
		initBookInfo(){
			let data={...this.book}
			data.readIndex=0//新书初始化阅读章节
			data.readPage=1//初始化阅读页数
			data.readPos=0//初始化阅读位置
			data.source=this.systemSetting.defaultSource//初始化阅读源
			return data
		},
		switchToMyBooks(){
			this.isAddMyBook=true
			if(this.isInMyBooks){
				this.$store.commit('books/DELETE_MY_BOOKS',this.book)
			}else{
				this.$store.commit('books/ADD_MY_BOOKS',this.initBookInfo())
			}
		},
		goRead(){
			let data={}
			if(this.isInMyBooks){
				data=this.isInMyBooks
			}else{
				data=this.initBookInfo()
			}
			uni.navigateTo({
				url: '../read/read',
				success: (e) => {
					e.eventChannel.emit('read-info',data)
				}
			})
		}
	}
};
</script>

<style lang="scss">
.book-info {
	height: 100%;
	.main {
		.info {
			padding: 10px 0 20px 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			.img{
				width: 135px;
				height: 180px;
				border-radius: 5px;
				overflow: hidden;
			}
			.detail{
				.title{
					font-size: 18px;
					text-align: center;
					margin-top: 15px;
				}
				.author{
					font-size: 12px;
					color: #a6a6a6;
					text-align: center;
				}
				.star{
					display: flex;
					flex-direction: row;
					justify-content: center;
					margin: 6px 0;
				}
				.tags {
					display: flex;
					flex-direction: row;
					justify-content: center;
					margin: 10px 0;
					.tag {
						margin-right: 10px;
						border: 1px solid #c6c6c6;
						padding: 2px 8px;
						border-radius: 10px;
						font-size: 10px;
					}
				}
				.func{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.btn-left{
						margin-right: 20px;
					}
				}
			}
		}
		.desc{
			padding: 20px;
		}
	}
}
</style>
