<template>
	<view class="book-info">
		<view class="navbar"><u-navbar :autoBack="true" :border-bottom="false" :fixed="false"></u-navbar></view>
		<view class="main">
			<view class="info">
				<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="book.img"></u-image></view>
				<view class="detail">
					<view class="title">{{ book.title }}</view>
					<view class="author">{{ book.author }}</view>
					<view class="star"><u-rate :count="5" current="4" active-color="#f5e100" :disabled="true"></u-rate></view>
					<view class="tags">
						<view class="tag">科幻</view>
						<view class="tag">末世</view>
					</view>
					<view class="func">
						<u-button :ripple="true" class="btn-left" @click="switchToMyBooks">{{isInMyBooks?'移出书架':'加入书架'}}</u-button>
						<u-button type="primary" :ripple="true" :custom-style="btnStyle" @click="goRead()">开始阅读</u-button>
					</view>
					
				</view>
			</view>
			<u-gap height="1" bg-color="#e5e5e5"></u-gap>
			<view class="desc">{{ book.desc }}</view>
			<u-cell-group>
				<u-cell-item icon="list-dot" title="查看目录"></u-cell-item>
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
			}
		};
	},
	computed:{
		isInMyBooks(){
			return this.$store.getters.getBookIsInMyBooks(this.book)
		}
	},
	onLoad: function(option) {
		this.book = option;
		console.log(this.isInMyBooks)
	},
	methods:{
		switchToMyBooks(){
			if(this.isInMyBooks){
				this.$store.commit('books/DELETE_MY_BOOKS',this.book)
			}else{
				let data={...this.book}
				data.readIndex=0
				data.readPage=1
				this.$store.commit('books/ADD_MY_BOOKS',data)
			}
		},
		goRead(){
			let data={...this.book}
			data.readIndex=0
			data.readPage=1
			data=this.$u.queryParams(data)
			uni.navigateTo({
				url:'../read/read'+data
			})
		}
	}
};
</script>

<style lang="scss">
.book-info {
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
