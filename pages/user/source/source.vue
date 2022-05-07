<template>
	<view class="source" :style="{ backgroundColor: color.bgPage }">
		<view class="navbar">
			<u-navbar :background="{ backgroundColor: color.bgPage }" :autoBack="true" class="main" :fixed="false" :border-bottom="false">
				<view slot="right" class="right">
					<u-icon name="plus" class="icon" size="40" @click="openFeedSource()" :color="color.normalText"></u-icon>
					<u-icon name="file-text" class="icon" size="40" @click="goAddSourcePage()" :color="color.normalText"></u-icon>
				</view>
			</u-navbar>
		</view>
		<view class="swiperItem" :style="{ height: swiperItemHeight + 'px', backgroundColor: color.swiperBg }">
			<view class="leftBar" :style="{ backgroundColor: color.bgPage }">
				<view class="btn-active" :style="{ backgroundColor: color.swiperBg, transform: 'translateY(' + swiperFeed * 40 + 'px)' }">
					<view class="btn-active-blue"></view>
				</view>
				<view class="btn" v-for="(item, index) in feeds" :key="index" @click="changeSwiperFeed(index)">
					<text :style="{ color: color.normalText }" class="btn-text">{{ item.name }}</text>
				</view>
			</view>
			<view class="right" :style="{ color: color.normalText }">
				<scroll-view :scroll-y="true" class="main" v-for="(item, index) in feeds" :key="index" v-show="swiperFeed == index">
					<view class="source-func">
						<u-search :bg-color="color.searchBg" :show-action="false" v-model="keyword"></u-search>
						<u-icon class="icon" :name="'/static/user/' + (isNightMode ? 'refresh-night' : 'refresh') + '.png'" size="35" @click="refreshSource"></u-icon>
					</view>
					<view class="source-func">
						<view class="source-func-left">
							<view v-show="isBatch" style="margin-right: 10px;">
								<u-checkbox v-show="isBatch" @change="allSelect(index)" v-model="isAllSelect" style="width: 26px;"></u-checkbox>
								全选
							</view>
							<view @click="openBatch()">{{ isBatch ? '取消批量' : '开启批量' }}</view>
						</view>
						<u-icon name="checkmark-circle" class="icon" :color="color.normalText" size="35"></u-icon>
						<u-icon class="icon" :name="'/static/home/' + (isNightMode ? 'trash-night' : 'trash') + '.png'" size="35"></u-icon>
					</view>
					<view v-for="(source, i) in feeds[index].list" :key="i" class="source">
						<u-checkbox class="source-check" v-show="isBatch" v-model="source.content.info.isOpen"></u-checkbox>
						<view class="source-title">{{ source.content.info.title }}</view>
						<view class="source-desc">{{ source.content.info.desc }}</view>
						<view class="source-icon">
							<u-icon
								name="checkmark-circle"
								class="source-icon-item"
								:color="source.content.info.isOpen ? '#2970ff' : color.normalText"
								size="35"
								@click="changeOpen([{ feedIndex: index, sourceIndex: i }])"
							></u-icon>
							<drop-down-menu class="source-icon-item" :bgColor="color.bgPage">
								<view class="drop-menu-item" @click="editSource(source.content, { feedIndex: index, sourceIndex: i })">
									<u-icon class="icon" name="edit-pen" size="35"></u-icon>
									<view>编辑</view>
								</view>
								<view class="drop-menu-item" @click="coppySourceJSON(source)">
									<u-icon class="icon" name="fingerprint" size="35"></u-icon>
									<view>复制</view>
								</view>
								<view class="drop-menu-item" @click="openDeleteSourceToast({ feedIndex: index, sourceIndex: i })">
									<u-icon class="icon" :name="'/static/home/' + (isNightMode ? 'trash-night' : 'trash') + '.png'" size="32"></u-icon>
									<view>删除</view>
								</view>
							</drop-down-menu>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<custom-modal v-model="feedToast" :showCancelButton="false" title="添加书源订阅">
			<view class="feed-toast-group">
				<u-radio-group v-model="currentFeedType">
					<u-radio v-for="(item, index) in feedTypeList" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
			</view>
			<view class="feed-toast-main">
				<view v-show="currentFeedType === '网络导入'">
					<u-field
						:border-bottom="false"
						:label-color="color.normalText"
						:field-style="{ color: color.normalText }"
						v-model="feedUrl"
						label="网络地址"
						placeholder="填写网络地址(json格式)"
						:clearable="true"
					></u-field>
				</view>
				<view v-show="currentFeedType === '本地导入'"><view @click="selectFromLocal">施工中</view></view>
			</view>
		</custom-modal>
		<custom-modal v-model="deleteSourceToast" @confirm="deleteSource()" title="删除源" content="确定删除吗?"></custom-modal>
	</view>
</template>

<script>
import statusPlaceholder from '@/components/status-placeholder.vue';
import customModal from '@/components/custom-modal.vue';
import dropDownMenu from '@/components/drop-down-menu.vue';
import sourceParser from '@/untils/sourceParser.js';
import { request } from '@/untils/http.js';
export default {
	components: { statusPlaceholder, customModal, dropDownMenu },
	data() {
		return {
			feedTypeList: [{ name: '网络导入' }, { name: '本地导入' }],
			currentFeedType: '网络导入',
			feedToast: false,
			feedUrl: '',
			swiperItemHeight: 800,
			swiperFeed: 0,
			keyword: '',
			isBatch: false,
			isAllSelect: false,
			deleteSourceToast: false,
			deleteSourceInfo: {}
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		},
		feeds() {
			return this.$store.getters.getFeeds;
		}
	},
	onLoad() {
		const systemInfo = getApp().globalData.systemInfo;
		this.swiperItemHeight = systemInfo.windowHeight - 44 - systemInfo.statusBarHeight;
	},
	onReady() {
		uni.preloadPage({
			url: '/pages/user/source/subPage/addSource'
		});
	},
	methods: {
		coppySourceJSON(source) {
			uni.setClipboardData({
				data: JSON.stringify(source.content),
				showToast:false,
				success: ()=>{
					this.$lotai.toast('复制完成', 'success');
				}
			});
		},
		changeOpen(list) {
			this.$store.commit('setting/CHANGE_SOURCE_OPEN', list);
			this.$lotai.toast('操作完成', 'success');
		},
		openBatch() {
			this.isBatch = !this.isBatch;
		},
		allSelect() {
			//
		},
		editSource(source, index) {
			let data = {
				source: source,
				index: index
			};
			data = this.$u.queryParams({ data: JSON.stringify(data) });
			uni.navigateTo({
				url: '/pages/user/source/subPage/addSource' + data
			});
		},
		openDeleteSourceToast(data) {
			this.deleteSourceToast = true;
			this.deleteSourceInfo = data;
		},
		deleteSource() {
			this.$store.commit('setting/DELETE_SOURCE', this.deleteSourceInfo);
			this.$lotai.toast('删除完成', 'success');
		},
		refreshSource() {
			this.$u.throttle(() => {
				switch (this.swiperFeed) {
					case 0:
						this.requestLotai();
						break;
				}
			}, 600);
		},
		requestLotai() {
			this.$store.dispatch('setting/getLotaiFeed', {
				force: true,
				success: () => {
					this.$lotai.toast('更新成功', 'success');
				}
			});
		},
		changeSwiperFeed(index) {
			this.swiperFeed = index;
		},
		selectFromLocal() {
			//
		},
		openFeedSource() {
			this.feedToast = true;
		},
		goAddSourcePage() {
			uni.navigateTo({
				url: '/pages/user/source/subPage/addSource'
			});
		}
	}
};
</script>

<style lang="scss">
.source {
	height: 100%;
	.navbar {
		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-right: 15px;
			.icon {
				margin-left: 10px;
			}
		}
	}
	.swiperItem {
		display: flex;
		flex-direction: row;
		.leftBar {
			background-color: #ffffff;
			width: 100px;
			position: relative;
			.btn {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				height: 40px;
				text-align: center;
				position: relative;
				z-index: 10;
				.btn-text {
					font-size: 14px;
				}
			}
			.btn-active {
				height: 40px;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;
				width: 100px;
				transition: transform 0.2s;
				&::after {
					content: '';
					display: block;
					width: 4px;
					height: 100%;
					background-color: #2970ff;
					position: absolute;
					left: 0;
					top: 0;
				}
			}
		}
		.right {
			width: calc(100% - 70px);
			height: 100%;
			padding: 0 10px 10px 10px;
			padding-bottom: 0;
			.main {
				height: 100%;
				display: flex;
				flex-direction: column;
				.source-func {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 10px 0;
					// justify-content: space-between;
					.source-func-left {
						flex-grow: 1;
						display: flex;
						flex-direction: row;
						align-items: center;
					}
					.icon {
						// margin-left: 10px;
						padding: 5px;
					}
				}
				.source {
					display: flex;
					flex-direction: row;
					align-items: center;
					height: 35px;
					.source-check {
						width: 26px;
					}
					.source-title {
						background-color: #2970ff;
						border-radius: 3px;
						padding: 2px 5px;
						margin-right: 10px;
						color: #fff;
					}
					.source-desc {
						flex-grow: 1;
					}
					.source-icon {
						display: flex;
						flex-direction: row;
						align-items: center;
						.source-icon-item {
							padding: 5px;
						}
						.drop-menu-item {
							padding: 12px 10px;
							display: flex;
							flex-direction: row;
							align-items: center;
							.icon {
								margin: 0 5px;
							}
						}
					}
				}
			}
		}
	}
	.feed-toast-group {
		margin: 10px 15px;
	}
	.feed-toast-main {
		margin: 10px 0;
	}
}
</style>
