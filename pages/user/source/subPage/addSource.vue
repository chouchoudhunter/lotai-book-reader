<template>
	<view class="add-source" :style="{ backgroundColor: color.bgPage }">
		<view class="navbar">
			<u-navbar :background="{ backgroundColor: color.bgPage }" :autoBack="true" class="main" :fixed="false" :border-bottom="false" :custom-back="openBackToast">
				<view slot="right" class="right"><u-icon :name="saveIcon" class="icon" size="30" @click="openFeedSource()" :color="color.normalText"></u-icon></view>
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
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.info.host"
							label="域名"
							placeholder="源的域名(http://www.example.com/)"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.info.desc"
							label="描述"
							placeholder="源的描述"
							:clearable="true"
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
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[0].url"
							label="搜索地址"
							placeholder="输入搜索地址"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[0].xpaths[0].xpath"
							label="结果规则"
							placeholder="输入xpath规则"
							:clearable="true"
						></u-field>
						<u-button @click="openDebugToast('search')">测试</u-button>
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
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[0].xpath"
							label="封面规则"
							placeholder="输入封面图xpath规则"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[1].xpath"
							label="标题规则"
							placeholder="输入标题xpath规则"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[1].reg"
							label="标题正则"
							placeholder="xpath获取到的文本进行正则匹配"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[2].xpath"
							label="作者规则"
							placeholder="输入作者图xpath规则"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[2].reg"
							label="作者正则"
							placeholder="xpath获取到的文本进行正则匹配"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[3].xpath"
							label="描述规则"
							placeholder="输入描述图xpath规则"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[3].reg"
							label="描述正则"
							placeholder="xpath获取到的文本进行正则匹配"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[4].xpath"
							label="目录链接"
							placeholder="输入目录链接xpath规则"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[5].xpath"
							label="标签规则"
							placeholder="输入书籍的分类或者是标签的xpath规则"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[1].xpaths[5].reg"
							label="标签正则"
							placeholder="xpath获取到的文本进行正则匹配"
							:clearable="true"
						></u-field>
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
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[2].xpaths[0].xpath"
							label="目录规则"
							placeholder="输入目录xpath规则"
							:clearable="true"
						></u-field>
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
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].xpaths[0].xpath"
							label="标题规则"
							placeholder="输入标题xpath规则"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].xpaths[0].reg"
							label="标题正则"
							placeholder="xpath获取到的文本进行正则匹配"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].xpaths[1].xpath"
							label="正文规则"
							placeholder="输入标题xpath规则"
							:clearable="true"
						></u-field>
						<u-field
							type="text"
							:border-bottom="false"
							:label-color="color.normalText"
							:field-style="{ color: color.normalText }"
							v-model="source.operation[3].xpaths[1].reg"
							label="正文正则"
							placeholder="xpath获取到的文本进行正则匹配"
							:clearable="true"
						></u-field>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiperItem">
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
						placeholder="输入发现/精选/首页/排行地址"
						:clearable="true"
					></u-field>
				</swiper-item>
			</swiper>
		</view>
		<custom-modal v-model="backToast" @confirm="backPage" title="确定退出吗？" content="未保存,如果点击确定会丢失所有数据"></custom-modal>
		<custom-modal v-model="debugToast" @confirm="backPage" :title="debugType+'测试'">
			<view v-if="debugType==='search'">
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
		</custom-modal>
	</view>
</template>

<script>
import customModal from '@/components/custom-modal.vue';
export default {
	components: { customModal },
	data() {
		return {
			tagList: [{ name: '基本' }, { name: '搜索' }, { name: '信息' }, { name: '目录' }, { name: '正文' }, { name: '发现' }],
			currentTag: 0,
			swiperHeight: 0,
			backToast: false,
			debugToast: false,
			debugType:"",
			debugResult:null,
			debugData:{
				search:{keyword:''}
			},
			source: {
				info: { title: '', desc: '', host: '', isOpen: true },
				operation: [
					{
						type: 'search',
						method: 'GET',
						url: '',
						xpaths: [{ type: 'bookUrl', xpath: '' }]
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
						xpaths: []
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
	onLoad() {
		const systemInfo = getApp().globalData.systemInfo;
		this.swiperHeight = systemInfo.windowHeight - systemInfo.statusBarHeight - 88;
	},
	onReady() {
		this.subnvue_close();
	},
	onBackPress(event) {
		if (event.from == 'backbutton') {
			this.openBackToast();
			return true;
		}
	},
	methods: {
		openDebugToast(type){
			this.debugToast=true
			this.debugType=type
			// switch(type){
			// 	case 'search':this.debugResult=await sourceParser(this.sources[this.defaultSource].content,'search',{keyword:this.keyword});break;
			// }
		},
		//关闭配置的原生子窗体
		subnvue_close() {
			const subNVue = uni.getSubNVueById('mask3'); //通过id获取nvue子窗体
			subNVue.hide('none', 10);
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
				}
				.radio-label {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 20rpx 28rpx;
					height: 48rpx;
					overflow: hidden;
					.label {
						margin-right: 26rpx;
					}
				}
			}
		}
	}
}
</style>
