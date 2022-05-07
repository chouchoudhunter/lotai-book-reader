<template>
	<view class="add-source" :style="{ backgroundColor: color.bgPage }">
		<view class="navbar">
			<u-navbar :background="{ backgroundColor: color.bgPage }" :autoBack="true" class="main" :fixed="false" :border-bottom="false" :custom-back="openBackToast">
				<view slot="right" class="right"><u-icon :name="saveIcon" class="icon" size="30" @click="saveSource()" :color="color.normalText"></u-icon></view>
			</u-navbar>
		</view>
		<view class="main">
			<u-tabs ref="tabs" :inactive-color="color.normalText" :bg-color="color.bgPage" :list="tagList" :is-scroll="false" :current="currentTag" @change="changeTag"></u-tabs>
			<swiper
				class="swiper"
				:current="currentTag"
				:indicator-dots="false"
				:duration="500"
				:style="{ height: swiperHeight + 'px', backgroundColor: color.swiperBg }"
				@change="changeSwiper"
			>
				<swiper-item class="swiperItem">
					<scroll-view :scroll-y="true" class="swiperItem-main">
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.info.title"
							label="标题"
							placeholder="源显示的标题"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.info.host"
							label="域名"
							placeholder="源的域名(http://www.example.com/)"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.info.desc"
							label="描述"
							placeholder="源的描述"
						></u-field>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiperItem">
					<scroll-view :scroll-y="true" class="swiperItem-main">
						<view class="radio-label">
							<view class="label" :style="{ color: color.normalText }">请求类型</view>
							<u-radio-group v-model="source.operation[0].method">
								<u-radio name="GET">GET</u-radio>
								<u-radio name="POST">POST</u-radio>
							</u-radio-group>
						</view>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[0].url"
							label="搜索地址"
							placeholder="输入搜索地址"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[0].xpaths[0].xpath"
							label="结果规则"
							placeholder="输入xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[0].xpaths[0].reg"
							label="结果正则"
							placeholder="对获取到的结果进行正则"
						></u-field>
						<view style="height: 35px;"></view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiperItem">
					<scroll-view :scroll-y="true" class="swiperItem-main">
						<view class="radio-label">
							<view class="label" :style="{ color: color.normalText }">请求类型</view>
							<u-radio-group v-model="source.operation[1].method">
								<u-radio name="GET">GET</u-radio>
								<u-radio name="POST">POST</u-radio>
							</u-radio-group>
						</view>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].url"
							label="信息地址"
							placeholder="输入书本详情地址"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[0].xpath"
							label="封面规则"
							placeholder="输入封面图xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[1].xpath"
							label="标题规则"
							placeholder="输入标题xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[1].reg"
							label="标题正则"
							placeholder="xpath获取到的文本进行正则匹配"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[2].xpath"
							label="作者规则"
							placeholder="输入作者图xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[2].reg"
							label="作者正则"
							placeholder="xpath获取到的文本进行正则匹配"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[3].xpath"
							label="描述规则"
							placeholder="输入描述图xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[3].reg"
							label="描述正则"
							placeholder="xpath获取到的文本进行正则匹配"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[4].xpath"
							label="书本地址"
							placeholder="输入书本地址xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[4].reg"
							label="地址正则"
							placeholder="对书本地址进行正则处理"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[5].xpath"
							label="标签规则"
							placeholder="输入书籍的分类或者是标签的xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[5].reg"
							label="标签正则"
							placeholder="xpath获取到的文本进行正则匹配"
						></u-field>
						<view style="height: 35px;"></view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiperItem">
					<scroll-view :scroll-y="true" class="swiperItem-main">
						<view class="radio-label">
							<view class="label" :style="{ color: color.normalText }">请求类型</view>
							<u-radio-group v-model="source.operation[2].method">
								<u-radio name="GET">GET</u-radio>
								<u-radio name="POST">POST</u-radio>
							</u-radio-group>
						</view>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[2].url"
							label="目录地址"
							placeholder="输入目录地址"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[2].xpaths[0].xpath"
							label="目录规则"
							placeholder="输入目录xpath规则"
						></u-field>
						<view style="height: 35px;"></view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiperItem">
					<scroll-view :scroll-y="true" class="swiperItem-main">
						<view class="radio-label">
							<view class="label" :style="{ color: color.normalText }">请求类型</view>
							<u-radio-group v-model="source.operation[3].method">
								<u-radio name="GET">GET</u-radio>
								<u-radio name="POST">POST</u-radio>
							</u-radio-group>
						</view>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].url"
							label="正文地址"
							placeholder="输入正文地址"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].xpaths[0].xpath"
							label="标题规则"
							placeholder="输入标题xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].xpaths[0].reg"
							label="标题正则"
							placeholder="xpath获取到的文本进行正则匹配"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].xpaths[1].xpath"
							label="正文规则"
							placeholder="输入标题xpath规则"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].xpaths[1].reg"
							label="正文正则"
							placeholder="xpath获取到的文本进行正则匹配"
						></u-field>
						<view style="height: 35px;"></view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiperItem">
					<scroll-view :scroll-y="true" class="swiperItem-main">
						<view class="radio-label">
							<view class="label" :style="{ color: color.normalText }">请求类型</view>
							<u-radio-group v-model="source.operation[4].method">
								<u-radio name="GET">GET</u-radio>
								<u-radio name="POST">POST</u-radio>
							</u-radio-group>
						</view>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[4].url"
							label="发现地址"
							placeholder="输入发现地址"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[4].xpaths[0].xpath"
							label="精选规则"
							placeholder="xpath获得精选的书本地址"
						></u-field>
						<u-field
							type="textarea"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[4].xpaths[0].reg"
							label="精选正则"
							placeholder="对书本地址进行正则"
						></u-field>
						<view v-for="(item, index) in source.operation[4].xpaths" :key="index">
							<view v-if="index != 0">
								<u-field
									type="text"
									:border-bottom="false"
									:label-color="color.normalText"
									:field-style="{ color: color.normalText }"
									v-model="item.name"
									:label="`分类[${index}]名`"
									placeholder="xpath获得分类1的书本地址"
								></u-field>
								<u-field
									type="textarea"
									:border-bottom="false"
									:label-color="color.normalText"
									:field-style="{ color: color.normalText }"
									v-model="item.xpath"
									:label="`分类[${index}]`"
									placeholder="xpath获得分类的书本地址"
								></u-field>
								<u-field
									type="textarea"
									:border-bottom="false"
									:label-color="color.normalText"
									:field-style="{ color: color.normalText }"
									v-model="item.reg"
									:label="`正则[${index}]`"
									placeholder="对分类的书本地址正则"
								></u-field>
							</view>
						</view>
						<view class="cate-func-btn">
							<u-button type="primary" @click="addCate()">增加分类</u-button>
							<u-button type="primary" @click="addCate(false)">减少分类</u-button>
						</view>
						<view style="height: 50px;"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<custom-modal v-model="backToast" @confirm="backPage" title="确定退出吗？" content="如果点击确定会丢失未保存数据"></custom-modal>
		<custom-modal
			ref="debug"
			v-model="debugToast"
			@confirm="startDebug"
			:asyncClose="isAsyncClose"
			:title="tagList[currentTag].name + '测试'"
			cancel-text="返回"
			confirm-text="请求"
		>
			<view v-if="currentTag === 1">
				<u-field
					type="text"
					:border-bottom="false"
					:label-color="color.normalText"
					:field-style="{ color: color.normalText }"
					v-model="debugData.search.keyword"
					label="关键词"
					placeholder="输入搜索关键词"
					:clearable="true"
				></u-field>
			</view>
			<view v-else-if="currentTag === 2">
				<u-field
					type="text"
					:border-bottom="false"
					:label-color="color.normalText"
					:field-style="{ color: color.normalText }"
					v-model="debugData.info.bookUrl"
					label="书本url"
					placeholder="输入书本的url"
					:clearable="true"
				></u-field>
			</view>
			<view v-else-if="currentTag === 3">
				<u-field
					type="text"
					:border-bottom="false"
					:label-color="color.normalText"
					:field-style="{ color: color.normalText }"
					v-model="debugData.list.bookUrl"
					label="书本url"
					placeholder="输入书本的url"
					:clearable="true"
				></u-field>
			</view>
			<view v-else-if="currentTag === 4">
				<u-field
					type="text"
					:border-bottom="false"
					:label-color="color.normalText"
					:field-style="{ color: color.normalText }"
					v-model="debugData.chapter.bookUrl"
					label="书本url"
					placeholder="输入书本的url"
					:clearable="true"
				></u-field>
				<u-field
					type="text"
					:border-bottom="false"
					:label-color="color.normalText"
					:field-style="{ color: color.normalText }"
					v-model="debugData.chapter.chapterUrl"
					label="章节url"
					placeholder="输入章节的url"
					:clearable="true"
				></u-field>
			</view>
			<view class="debug-content">返回结果：{{ JSON.stringify(debugResult) }}</view>
		</custom-modal>
		<view class="debug-btn" v-show="currentTag != 0"><u-button type="primary" @click="openDebugToast('search')" class="debugBtn">测试</u-button></view>
	</view>
</template>

<script>
import customModal from '@/components/custom-modal.vue';
import sourceParser from '@/untils/sourceParser.js';
export default {
	components: { customModal },
	data() {
		return {
			tagList: [{ name: '基本' }, { name: '搜索' }, { name: '信息' }, { name: '目录' }, { name: '正文' }, { name: '发现' }],
			currentTag: 0,
			swiperHeight: 0,
			backToast: false,
			debugToast: false,
			debugResult: '',
			isAsyncClose: true,
			isEdit: false,
			editSourceIndex: {},
			debugData: {
				search: { keyword: '' },
				info: { bookUrl: '' },
				list: { bookUrl: '' },
				chapter: { bookUrl: '', chapterUrl: '' }
			},
			source: {
				info: { title: '', desc: '', host: '', isOpen: true },
				operation: [
					{
						type: 'search',
						method: 'GET',
						url: '',
						xpaths: [{ type: 'bookUrl', xpath: '', reg: '' }]
					},
					{
						type: 'info',
						method: 'GET',
						url: '',
						xpaths: [
							{ type: 'img', xpath: '' },
							{ type: 'title', xpath: '', reg: '' },
							{ type: 'author', xpath: '', reg: '' },
							{ type: 'desc', xpath: '', reg: '' },
							{ type: 'bookUrl', xpath: '', reg: '' },
							{ type: 'tags', xpath: '', reg: '' }
						]
					},
					{
						type: 'list',
						method: 'GET',
						url: '',
						xpaths: [{ type: 'chapter', xpath: '' }]
					},
					{
						type: 'chapter',
						method: 'GET',
						url: '',
						xpaths: [{ type: 'title', xpath: '', reg: '' }, { type: 'text', xpath: '', reg: '' }]
					},
					{
						type: 'discord',
						method: 'GET',
						url: '',
						xpaths: [{ type: 'select', xpath: '', reg: '' }, { type: 'tag', name: '', xpath: '', reg: '' }]
					}
				]
			}
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		},
		saveIcon() {
			if (this.isNightMode) {
				return '/static/user/save-night.png';
			} else {
				return '/static/user/save.png';
			}
		}
	},
	onLoad: function(option) {
		const systemInfo = getApp().globalData.systemInfo;
		this.swiperHeight = systemInfo.windowHeight - systemInfo.statusBarHeight - 88;
		if (option.data) {
			const data = JSON.parse(option.data);
			this.source = data.source;
			this.editSourceIndex = data.index;
			this.isEdit = true;
		}
	},
	onReady() {
		//#ifdef APP-PLUS
		this.subnvue_close();
		//#endif
	},
	onBackPress(event) {
		if (event.from == 'backbutton') {
			this.openBackToast();
			return true;
		}
	},
	methods: {
		saveSource() {
			if (this.isEdit) {
				this.$store.commit('setting/CHANGE_SOURCE', { index: this.editSourceIndex, source: this.source });
				setTimeout(() => {
					this.$lotai.toast('修改完成！', 'success');
					this.backPage();
				}, 1);
			} else {
				this.$store.commit('setting/ADD_SOURCE', { content: this.source });
				setTimeout(() => {
					this.$lotai.toast('保存完成！', 'success');
					 this.backPage();
				}, 1);
			}
		},
		addCate(isAdd = true) {
			if (isAdd) {
				const temp = { type: 'tag', name: '', xpath: '', reg: '' };
				this.source.operation[4].xpaths.push(temp);
			} else {
				if (this.source.operation[4].xpaths.length > 2) {
					this.source.operation[4].xpaths.pop();
				}
			}
		},
		startDebug() {
			let toastText = [];
			//错误信息
			if (!this.source.info.host) {
				toastText.push('请填写[基本-域名]');
			}
			let type = '',
				data = null;
			if (this.currentTag === 1) {
				if (!this.source.operation[0].url) toastText.push('请填写[搜索地址]');
				type = 'search';
				data = { keyword: this.debugData.search.keyword };
			} else if (this.currentTag === 2) {
				if (!this.source.operation[1].url) toastText.push('请填写[信息地址]');
				type = 'info';
				data = { bookUrl: this.debugData.info.bookUrl };
			} else if (this.currentTag === 3) {
				if (!this.source.operation[2].url) toastText.push('请填写[目录地址]');
				type = 'list';
				data = { bookUrl: this.debugData.list.bookUrl };
			} else if (this.currentTag === 4) {
				if (!this.source.operation[3].url) toastText.push('请填写[正文地址]');
				type = 'chapter';
				data = { bookUrl: this.debugData.chapter.bookUrl, chapterUrl: this.debugData.chapter.chapterUrl };
			} else if (this.currentTag === 5) {
				type = 'discord';
				data = {};
			}
			//如果有错误信息
			if (toastText.length) {
				this.$refs.debug.clearLoading();
				this.$lotai.toast(toastText.toString(), 'error');
				return;
			}
			sourceParser(this.source, type, data).then(res => {
				this.debugResult = res;
				if (this.currentTag === 1) {//搜索
					this.debugData.info.bookUrl=res[0]
				} else if (this.currentTag === 2) {//书本信息
					this.debugData.list.bookUrl=res.bookUrl
				} else if (this.currentTag === 3) {//目录
					this.debugData.chapter.bookUrl=this.debugData.list.bookUrl
					const tempItem=res.find(item=>{
						return item.type!='group'
					})
					this.debugData.chapter.chapterUrl=tempItem.url
				}
				this.$refs.debug.clearLoading();
			});
		},
		openDebugToast(type) {
			this.debugToast = true;
			this.debugResult = '';
		},
		//关闭配置的原生子窗体
		subnvue_close() {
			const subNVue = uni.getSubNVueById('mask3'); //通过id获取nvue子窗体
			subNVue.hide('none', 300);
		},
		openBackToast() {
			this.backToast = true;
		},
		backPage() {
			uni.navigateBack();
		},
		changeTag(index) {
			this.currentTag = index;
		},
		changeSwiper(e) {
			this.currentTag = e.detail.current;
		}
	}
};
</script>

<style lang="scss">
.add-source {
	height: 100%;
	.navbar {
		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-right: 15px;
		}
	}
	.main {
		.swiper {
			.swiperItem {
				.swiperItem-main {
					height: 100%;
					padding-bottom: 100px;
				}
				.radio-label {
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 20rpx 28rpx;
					height: 88rpx;
					overflow: hidden;
					.label {
						margin-right: 26rpx;
					}
				}
			}
		}
		.cate-func-btn {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}
	}
	.debug-content {
		padding: 10px 32rpx;
		max-height: 700rpx;
		overflow-y: scroll;
		word-wrap: break-word;
		touch-action: none;
	}
	.debug-btn {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		.debugBtn {
			width: 100%;
			border-radius: 0;
			&::after {
				border: none !important;
			}
		}
	}
}
</style>
