<template>
	<view class="user" :style="{ backgroundColor: color.bgPage }">
		<status-placeholder></status-placeholder>
		<view class="navbar">
			<view class="left" :style="{ color: color.normalText }">我的</view>
			<view class="right"><image class="icon" :src="'../../static/read/' + (isNightMode ? 'night' : 'light') + '.png'" @click="changeNight"></image></view>
		</view>
		<view class="lotai">
			<image width="200px" :style="{ opacity: isNightMode ? '1' : '0' }" style="transition: opacity 0.5s;" mode="widthFix" src="/static/user/boy2.png"></image>
			<image width="200px" :style="{ opacity: isNightMode ? '0' : '1' }" style="transition: opacity 0.5s;" mode="widthFix" src="/static/user/boy1.png"></image>
			<!-- 			<view class="dialogue">
				求求了，点个广告吧！
			</view> -->
		</view>
		<u-gap height="16" :bg-color="color.cardBg"></u-gap>
		<view class="main">
			<view class="history">
				<u-cell-group :border="false" :bg-color="color.bgPage">
					<u-cell-item
						title="浏览历史"
						:hover-class="isNightMode ? 'cell-hover-class-night' : 'cell-hover-class'"
						:title-style="{ color: color.normalText }"
						:border-bottom="false"
						value="更多"
						@click="goHistory()"
					></u-cell-item>
					<scroll-view :scroll-x="true">
						<view class="books" :style="{ backgroundColor: color.bgPage }">
							<view class="book" v-for="(item, index) in historyBooks" :key="index" @click="goRead(item)">
								<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="item.img" /></view>
								<view class="title" :style="{ color: color.normalText }">{{ item.title }}</view>
								<view class="author" :style="{ color: color.secText }">{{ item.author }}</view>
							</view>
						</view>
					</scroll-view>
					<u-cell-item
						title="源管理"
						:hover-class="isNightMode ? 'cell-hover-class-night' : 'cell-hover-class'"
						:title-style="{ color: color.normalText }"
						:border-bottom="false"
						@click="goSource()"
					></u-cell-item>
					<u-cell-item
						title="关于软件"
						:hover-class="isNightMode ? 'cell-hover-class-night' : 'cell-hover-class'"
						:title-style="{ color: color.normalText }"
						:border-bottom="false"
						@click="goDeclaration()"
					></u-cell-item>
					<u-cell-item
						title="分享软件"
						:hover-class="isNightMode ? 'cell-hover-class-night' : 'cell-hover-class'"
						:title-style="{ color: color.normalText }"
						:border-bottom="false"
						@click="shareLotai()"
					></u-cell-item>
					<u-cell-item
						title="软件设置"
						:hover-class="isNightMode ? 'cell-hover-class-night' : 'cell-hover-class'"
						:title-style="{ color: color.normalText }"
						:border-bottom="false"
						@click="goSetting()"
					></u-cell-item>
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
	components: { statusPlaceholder, commonTabbar },
	data() {
		return {};
	},
	onReady() {
		// #ifdef APP-PLUS
		this.subnvue_close();
		// #endif
	},
	computed: {
		historyBooks() {
			return this.$store.getters.getHistoryBooks(6);
		},
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		}
	},
	methods: {
		shareLotai(){
			plus.share.sendWithSystem({
				type:"image",
				pictures:['/static/user/lotai-book.png']
			}, ()=>{
				//
			}, (e)=>{
				console.log(e)
			});
		},
		goSource(){
			uni.navigateTo({
				url: '../user/source/source'
			});
		},
		//关闭配置的原生子窗体
		subnvue_close() {
			const subNVue = uni.getSubNVueById('mask2'); //通过id获取nvue子窗体
			subNVue.hide('none', 10);
		},
		changeNight() {
			this.$store.commit('setting/SET_NIGHT');
		},
		goRead(data) {
			data = this.$u.queryParams(data);
			uni.navigateTo({
				url: '/pages/book-info/book-info' + data
			});
		},
		goHistory() {
			uni.navigateTo({
				url: '../user/history/history'
			});
		},
		goFeedback() {
			uni.navigateTo({
				url: '../user/feedback/feedback'
			});
		},
		goSetting() {
			uni.navigateTo({
				url: '../user/setting/setting'
			});
		},
		goDeclaration() {
			uni.navigateTo({
				url: '../user/declaration/declaration'
			});
		}
	}
};
</script>

<style lang="scss">
.user {
	height: 100%;
	.lotai {
		display: flex;
		flex-direction: row;
		height: 130px;
		overflow: hidden;
		position: relative;
		.dialogue {
			position: absolute;
			left: 0;
			top: 0;
		}
	}
	.navbar {
		padding: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.left {
			font-size: 18px;
			font-weight: blod;
		}
		.right {
			float: right;
			.icon {
				width: 20px;
				height: 20px;
			}
		}
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
					.author {
						font-size: 12px;
						color: #b0b0b0;
					}
				}
			}
		}
	}
}
</style>
