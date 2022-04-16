<template>
	<view class="declaration" :style="{ backgroundColor: color.bgPage }">
		<view class="navbar">
			<u-navbar :background="{ backgroundColor: color.bgPage }" :autoBack="true" class="main" :fixed="false" :border-bottom="false"><view slot="right"></view></u-navbar>
		</view>
		<view class="main">
			<u-collapse :head-style="{color:color.normalText}" :body-style="{color:color.secText}">
				<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">
					<rich-text :nodes="item.body"></rich-text>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			itemList: [
				{
					head: '关于LoTai书架',
					body: '此软件承诺永久免费，并且保证【阅读页】不加入任何形式广告。为了更好的开发维护此软件，希望大家多点击一下其他页面的广告。同时也尽量保证其他页面的广告不影响界面美观和使用。',
					open: true,
				},
				{
					head: '免责声明',
					body: `1.所有资源均为网友，上传或者通过网络收集，我们仅提供一个搜集、展示、介绍、浏览及网友交流的平台，我们不对其内容的	准确性、正确性、正当性、及时性、安全性、合法性等负责,亦不承担任何法律责任。<br><br>
2.鉴于本软件以非人工检索方式、根据您键入的关键字自动显示第三方网页的内容,除本软件注明之服务条款外，其他一切因使用本软件而可能遭致的意外、疏忽、侵权及其造成的损失(包括因下载被搜索链接到的第三方网站内容而感染电脑病毒),本软件对其概不负责亦不承担任何法律责任。<br><br>
3.本软件的搜索结果根据您键入的关键字自动搜索获得并生成，不代表本软件赞成被搜索链接到的第三方网页上的内容或立场。<br><br>
4.您应该对使用本软件的结果自行承担风险，我们不做任何形式的保证。<br><br>
5任何单位或个人认为Lotai书架提供服务的内容可能涉嫌侵犯其知识产权或信息网络传播权，应该及时向Lotai书架提出书面权利通知投诉，并提供身份证明、权属证明及详细侵权情况证明。Lotai书架在收到上述法律文件后，将会依法尽快断开相关链接内容。`,
					open: false
				}
			]
		};
	},
	computed: {
		color() {
			return this.$store.getters.getColor;
		}
	}
};
</script>

<style lang="scss">
.declaration {
	height: 100%;
	.main{
		padding: 0 15px;
	}
}
</style>
