<script>
export default {
	globalData: {
		systemInfo: {}
	},
	onLaunch: function() {
		this.globalData.systemInfo=uni.getSystemInfoSync()
		
	},
	onShow: function() {
		
	},
	onHide: function() {
		
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
