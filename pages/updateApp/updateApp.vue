<template>
	<view>
		<u-modal :async-close="true" v-model="show" :show-cancel-button="content.type == 3" confirm-text="升级" title="发现新版本" @cancel="cancel" @confirm="confirm">
			<view class="u-update-content">
				<view>{{`当前版本${this.content.nowVersion},最新版本${this.content.version}`}}</view>
				<rich-text :nodes="content.desc"></rich-text>
				<u-line-progress v-show="isDownload" active-color="#2979ff" :percent="percent" :striped="true" :striped-active="true"></u-line-progress>
			</view>
		</u-modal>
		<u-modal v-model="backShow" content="还未完成更新,确定退出应用吗？" :show-cancel-button="true" @confirm="confirmExit"></u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: true,
			content: {},
			percent: 0,
			isDownload: false,
			backShow: false,
		};
	},
	onLoad: function(option) {
		this.content = option;
	},
	onReady() {
		this.show = true;
	},
	onBackPress() {
		if (this.content.type == 2) {
			this.backShow = true;
		} else {
			this.closeModal();
		}
		return true;
	},
	methods: {
		confirmExit() {
			plus.runtime.quit();
		},
		cancel() {
			this.closeModal();
		},
		confirm() {
			//
			if(Number(this.content.nowVersion.replace(/\./g,''))<245){
				uni.clearStorage()
			}
			//
			this.isDownload = true;
			const downloadTask = uni.downloadFile({
				url: this.content.url,
				success: res => {
					if (res.statusCode === 200) {
						plus.runtime.install(
							res.tempFilePath,
							{force: false},
							function() {
								plus.runtime.restart();
							},
							function(e) {
								this.$u.toast('安装失败:'+JSON.stringify(e));
							}
						);
					}
				},
				fail:res=>{
					this.$u.toast('下载失败:'+JSON.stringify(res));
				}
			});
			downloadTask.onProgressUpdate(res => {
				this.percent = res.progress;
			});
		},
		closeModal() {
			uni.navigateBack();
		}
	}
};
</script>

<style scoped lang="scss">
.u-full-content {
	background-color: #00c777;
}

.u-update-content {
	font-size: 26rpx;
	color: $u-content-color;
	line-height: 1.7;
	padding: 30rpx;
}
</style>
