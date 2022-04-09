<script>
export default {
	globalData: {
		systemInfo: {}
	},
	onLaunch: function() {
		this.globalData.systemInfo=uni.getSystemInfoSync()
		this.initBooks()
	},
	onShow: function() {
		
	},
	onHide: function() {
		
	},
	methods:{
		initBooks(){
			const myBooks=uni.getStorageSync('myBooks')
			const data={
				myBooks:myBooks?myBooks:[]
			}
			this.$store.commit('books/INIT_BOOKS',data)
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
