<script>
export default {
	globalData: {
		systemInfo: {}
	},
	onLaunch: async function() {
		this.globalData.systemInfo = uni.getSystemInfoSync();
		this.initBooks();
		this.initSetting();
		// const pages = ['./pages/tabs/discord', './pages/tabs/user', './pages/tabs/book'];
		// uni.switchTab({
		// 	url:pages[0]
		// })
		// setTimeout(()=>{
		// 	uni.switchTab({
		// 		url:pages[2]
		// 	})
		// },10)
	},
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
// #ifndef APP-PLUS-NVUE
@import 'uview-ui/index.scss';
*{
	transition: background-color 0.5s;
	// #ifdef APP-PLUS
	font-family: '黑体','微软雅黑';
	// #endif
}
page {
	height: 100%;
}
// #endif
</style>
