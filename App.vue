<script>
export default {
	globalData: {
		systemInfo: {}
	},
	onLaunch: function() {
		this.globalData.systemInfo=uni.getSystemInfoSync()
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-ui/index.scss';
page {
	height: 100%;
}
</style>
