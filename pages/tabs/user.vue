<template>
	<view class="user" :style="{backgroundColor:color.bgPage}">
		<status-placeholder></status-placeholder>
		<view class="navbar">
			<view class="left" :style="{color:color.normalText}">我的</view>
			<view class="right"><image class="icon" :src="'../../static/read/'+(isNightMode?'night':'light')+'.png'" @click="changeNight"></image></view>
		</view>
		<view class="avatar">
			<u-image width="200rpx" height="200rpx" shape="circle" mode="aspectFit" src="https://img0.baidu.com/it/u=1967997459,1022958762&fm=26&fmt=auto"></u-image>
		</view>
		<u-gap height="16" :bg-color="color.cardBg"></u-gap>
		<view class="main">
			<view class="history">
				<u-cell-group :border="false">
					<u-cell-item title="浏览历史" :title-style="{color:color.normalText}" :bg-color="color.bgPage" :border-bottom="false" value="更多" @click="goHistory()"></u-cell-item>
					<scroll-view :scroll-x="true">
						<view class="books" :style="{backgroundColor:color.bgPage}">
							<view class="book" v-for="(item,index) in historyBooks" :key="index" @click="goRead(item)">
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="item.img" /></view>
								<view class="title" :style="{color:color.normalText}">{{item.title}}</view>
								<view class="author" :style="{color:color.secText}">{{item.author}}</view>
							</view>
						</view>
					</scroll-view>
					<u-cell-item title="免责声明" :title-style="{color:color.normalText}" :bg-color="color.bgPage" :border-bottom="false" @click="goDeclaration()"></u-cell-item>
<!-- 					<u-cell-item title="意见反馈" :title-style="{color:color.normalText}" :bg-color="color.bgPage" :border-bottom="false" @click="goFeedback()"></u-cell-item> -->
					<u-cell-item title="软件设置" :title-style="{color:color.normalText}" :bg-color="color.bgPage" value="新版本" :border-bottom="false" @click="goSetting()"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
	<common-tabbar></common-tabbar>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import commonTabbar from '@/components/common-tabbar.vue';
export default {
	components: { statusPlaceholder,commonTabbar },
	data() {
		return {
		};
	},
	// onLoad() {
	// 	uni.switchTab({
	// 		url:'./book'
	// 	})
	// },
	computed:{
		historyBooks(){
			return this.$store.getters.getHistoryBooks(6)
		},
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color(){
			return this.$store.getters.getColor;
		}
	},
	methods: {
		changeNight() {
			this.$store.commit('setting/SET_NIGHT')
		},
		goRead(data){
			data=this.$u.queryParams(data)
			uni.navigateTo({
				url:'../read/read'+data
			})
		},
		goHistory(){
			uni.navigateTo({
				url:'../user/history/history'
			})
		},
		goFeedback(){
			uni.navigateTo({
				url:'../user/feedback/feedback'
			})
		},
		goSetting(){
			uni.navigateTo({
				url:'../user/setting/setting'
			})
		},
		goDeclaration(){
			uni.navigateTo({
				url:'../user/declaration/declaration'
			})
		},
	}
};
</script>

<style lang="scss">
.user {
	height: 100%;
	.navbar {
		padding: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.left{
			font-size: 18px;
			font-weight: blod;
		}
		.right {
			float: right;
			.icon{
				width: 20px;
				height: 20px;
			}
		}
	}
	.avatar {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 20px 0;
		justify-content: center;
	}
	.main {
		.history {
			.books {
				padding: 0 16px;
				display: flex;
				flex-direction: row;
				.book {
					padding-right: 20px;
					.img {
						width: 90px;
						height: 120px;
						border-radius: 4px;
						overflow: hidden;
						margin-bottom: 6px;
					}
					.author{
						font-size: 12px;
						color: #b0b0b0;
					}
				}
			}
		}
	}
}
</style>
