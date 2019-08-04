<template>
	<view class="cgh-search-childe">
		<view class="search-con">
			<view class="left">
				<image src="../../../static/base/search.png"></image>
				<input type="text" confirm-type="search" @confirm="search"  v-model="keyWord" :placeholder="placeholderStr" />
			</view>
			<view class="right" @click="search">搜索</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			searchStr: {
				type: String,
				default: ''
			},
			placeholderStr: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: '1'
			},
			
		},
		data() {
			return {
				selIndex: 0,
				keyWord: ''
			}
		},
		onLoad() {
		},
		methods: {
			search() {
				this.$emit('search', this.keyWord);
			}
		}
		
	}
</script>

<style lang="scss" scoped="">
	@import "mixin.scss";
	.cgh-search-childe {
		width: 100%;
		overflow: hidden;
		background: #fff;
		padding: 30upx 0upx;
		position: fixed;
		left: 0;
		/* #ifndef H5 */
			top: 0;
		/*  #endif */
		/* #ifdef H5 */
			top: 90upx;
		/*  #endif */
		z-index: 2009;
		.search-con {
			width: 92%;
			height: 80upx;
			margin: 0upx auto;
			font-size: 32upx;
			line-height: 80upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			white-space: nowrap;
			.left {
				width: 75%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border: 1upx solid $boder-se;
				border-radius: 20upx;
				padding-left: 20upx;
				image {
					width: 45upx;
					height: 45upx;
				}
				input {
					width: 88%;
					height: 100%;
				}
			}
			.right {
				width: 18%;
				height: 100%;
				border: 1upx solid $boder-se;
				border-radius: 20upx;
				text-align: center;
			}
		}
	}
</style>
