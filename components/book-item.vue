<template>
	<view class="book-item">
		<view class="book" @click="tapBook">
			<book-status v-if="showStatus">连载中</book-status>
			<view class="img"><u-image width="100%" height="100%" mode="aspectFill" :src="book.img"></u-image></view>
			<view class="info">
				<view class="title" :style="{ color: color.normalText }">{{ book.title }}</view>
				<view class="author" :style="{ color: color.secText }">{{ book.author }}</view>
				<view class="desc" :style="{ color: color.secText }" v-html="book.desc"></view>
				<view :class="isNightMode ? 'tags-night' : 'tags'">
					<view class="tag" v-for="(item, index) in book.tags" :key="index">{{ item }}</view>
				</view>
				<view class="star"><u-rate :count="5" current="4" active-color="#f5e100" :disabled="true"></u-rate></view>
			</view>
		</view>
	</view>
</template>

<script>
import bookStatus from './book-status.vue';
export default {
	name: 'book-item',
	components: { bookStatus },
	props: {
		book: {
			type: Object,
			default: () => {}
		},
		showStatus: {
			type: Boolean,
			default: true
		},
	},
	data() {
		return {};
	},
	computed: {
		color() {
			return this.$store.getters.getColor;
		},
		isNightMode() {
			return this.$store.getters.getIsNightMode;
		}
	},
	methods: {
		tapBook() {
			const data = this.$u.queryParams(this.book);
			uni.navigateTo({
				url: '/pages/book-info/book-info' + data
			});
		}
	}
};
</script>

<style lang="scss">
.book-item {
	.book {
		display: flex;
		flex-direction: row;
		position: relative;
		margin-bottom: 15px;
		margin-top: 5px;
		.img {
			width: 110px;
			height: 150px;
			border-radius: 5px;
			overflow: hidden;
			z-index: 8;
		}
		.info {
			width: calc(100% - 110px);
			padding-left: 15px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				font-size: 18px;
			}
			.desc {
				font-size: 12px;
				color: #c6c6c6;
				height: 32px;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
			.tags {
				display: flex;
				flex-direction: row;
				.tag {
					margin-right: 10px;
					border: 1px solid #c6c6c6;
					padding: 2px 8px;
					border-radius: 10px;
					font-size: 10px;
				}
			}
			.tags-night {
				display: flex;
				flex-direction: row;
				.tag {
					margin-right: 10px;
					padding: 2px 8px;
					background-color: #272727;
					border-radius: 10px;
					font-size: 10px;
					color: #9e9e9e;
				}
			}
			.star {
				pointer-events: none;
			}
		}
	}
}
</style>
