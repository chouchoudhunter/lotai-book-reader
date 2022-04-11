<template>
	<view class="history" :style="{ backgroundColor: color.bgPage }">
		<view class="navbar">
			<u-navbar :autoBack="true" :fixed="false" :border-bottom="false" :background="{backgroundColor:color.bgPage}">
				<view slot="right" class="right">
					<u-icon :name="'../../../static/home/'+(isNightMode?'trash-night':'trash')+'.png'" size="35" @click="confirmClear()"></u-icon>
				</view>
			</u-navbar>
		</view>
		<view class="main">
			<book-item v-for="(book, i) in historyBooks" :key="i" @click="goBookInfo(book)" :book="book"></book-item>
		</view>
		<u-modal v-model="toastClear" content="确定要清空历史记录吗？" :show-cancel-button="true" @confirm="clearHistory"></u-modal>
	</view>
</template>

<script>
import bookItem from '@/components/book-item.vue';
export default {
	components: { bookItem },
	data() {
		return {
			toastClear:false
		};
	},
	computed: {
		historyBooks() {
			return this.$store.getters.getHistoryBooks();
		},
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		},
		color() {
			return this.$store.getters.getColor;
		},
	},
	methods: {
		goBookInfo(data){
			data=this.$u.queryParams(data)
			uni.navigateTo({
				url:'../../book-info/book-info'+data,
			})
		},
		confirmClear(){
			this.toastClear=true
		},
		clearHistory(){
			this.$store.commit('books/CLEAR_HISTORY_BOOKS')
		}
	}
};
</script>

<style lang="scss">
.history{
	height: 100%;
	.navbar{
		.right{
			padding-right: 15px;
		}
	}
	.main{
		padding: 0 15px;
	}
}
</style>
