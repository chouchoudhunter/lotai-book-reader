<script>
export default {
	globalData: {
		systemInfo: {}
	},
	onLaunch: function() {
		this.globalData.systemInfo = uni.getSystemInfoSync();
		this.initBooks();
		this.initSetting();
	},
	onShow: function() {},
	onHide: function() {},
	methods: {
		initBooks() {
			const myBooks = uni.getStorageSync('myBooks');
			const historyBooks = uni.getStorageSync('historyBooks');
			const historySearch = uni.getStorageSync('historySearch');
			const data = {
				myBooks: myBooks ? myBooks : [],
				historyBooks: historyBooks ? historyBooks : [],
				historySearch: historySearch ? historySearch : []
			};
			this.$store.commit('books/INIT_BOOKS', data);
		},
		initSetting() {
			const readSetting = uni.getStorageSync('readSetting');
			const nightMode = uni.getStorageSync('nightMode');
			const data = {
				readSetting: readSetting ? readSetting : {},
				nightMode: nightMode ? nightMode : false
			};
			this.$store.commit('setting/INIT_SETTING', data);
		}
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
