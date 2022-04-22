<template>
	<view class="setting" :style="{ backgroundColor: color.bgPage }">
		<view class="navbar">
			<u-navbar :background="{ backgroundColor: color.bgPage }" :autoBack="true" class="main" :fixed="false" :border-bottom="false"><view slot="right"></view></u-navbar>
		</view>
		<view class="main">
			<u-cell-group :border="false">
				<u-cell-item
					:border-bottom="false"
					:title-style="{ color: color.normalText }"
					title="夜间模式"
					hover-class="cell-hover-class"
					:arrow="false"
					:bg-color="color.bgPage"
					:hover-class="isNightMode?'cell-hover-class-night':'cell-hover-class'"
				>
					<view slot="right-icon"><u-switch v-model="isNight" @change="changeNight" size="40"></u-switch></view>
				</u-cell-item>
				<u-cell-item
					:border-bottom="false"
					:title-style="{ color: color.normalText }"
					title="切换源"
					hover-class="cell-hover-class"
					:arrow="false"
					:bg-color="color.bgPage"
					@click="showSwitchSource"
					:hover-class="isNightMode?'cell-hover-class-night':'cell-hover-class'"
				>
				</u-cell-item>
				<!-- #ifdef APP-PLUS -->
				<u-cell-item
					:border-bottom="false"
					:title-style="{ color: color.normalText }"
					title="清除图片缓存"
					hover-class="cell-hover-class"
					:bg-color="color.bgPage"
					@click="confirmClearImage"
					:hover-class="isNightMode?'cell-hover-class-night':'cell-hover-class'"
				></u-cell-item>
				<u-cell-item
					:border-bottom="false"
					:title-style="{ color: color.normalText }"
					title="检测更新"
					hover-class="cell-hover-class"
					:bg-color="color.bgPage"
					@click="checkAppUpdate"
					:value="version"
					:hover-class="isNightMode?'cell-hover-class-night':'cell-hover-class'"
				></u-cell-item>
				<!-- #endif -->
			</u-cell-group>
		</view>
		<switch-source v-model="isShowSourceSwitch"></switch-source>
		<custom-modal v-model="toastImgDelete" @confirm="clearImage" :async-close="true">
			<view style="padding: 5px 15px;text-align: center;">
				{{`当前缓存图片${imgNum.all}张,未使用图片${imgNum.use}张`}}<br>
				是否确定删除未使用图片
			</view>
		</custom-modal>
	</view>
</template>

<script>
import request from '@/untils/ajax.js';
import switchSource from '@/components/switch-source.vue';
import customModal from '@/components/custom-modal.vue';
export default {
	components:{switchSource,customModal},
	data() {
		return {
			isNight: false,
			version: '',
			isShowSourceSwitch:false,
			toastImgDelete:false,
			imgNum:{
				use:0,
				all:0
			},
			confirmDeleteImgList:[]//确定删除图片的列表
		};
	},
	computed: {
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		},
		myBooks() {
			return this.$store.getters.getMyBooks;
		}
	},
	onLoad() {
		this.isNight = this.isNightMode;
		//#ifdef APP-PLUS
		this.version = plus.runtime.version;
		//#endif
	},
	methods: {
		confirmClearImage(){
			this.toastImgDelete=!this.toastImgDelete
			uni.getSavedFileList({
				success: (res) => {
					res.fileList.forEach(item=>{
						for(let book in this.myBooks){
							if(book.img==item.filePath){
								this.confirmDeleteImgList.push(item.filePath)
								break
							}
						}
					})
					this.imgNum.all=res.fileList.length
					this.imgNum.use=this.confirmDeleteImgList.length
				}
			})
		},
		//清除图片缓存
		clearImage(){
			if(this.imgNum.use){
				this.confirmDeleteImgList.forEach((item)=>{
					uni.removeSavedFile({
						filePath:item
					})
				})
			}
			this.toastImgDelete=false
		},
		showSwitchSource(){
			this.isShowSourceSwitch=!this.isShowSourceSwitch
		},
		checkAppUpdate() {
			//#ifdef APP-PLUS
			request('checkAppUpdate', { version: plus.runtime.version }).then(res => {
				if (res.data.type == 2) {
					const data = this.$u.queryParams(res.data);
					uni.navigateTo({
						url: '../updateApp/updateApp' + data
					});
				}
			});
			//#endif
		},
		changeNight() {
			this.$store.commit('setting/SET_NIGHT');
		}
	}
};
</script>

<style>
.setting {
	height: 100%;
}
</style>
