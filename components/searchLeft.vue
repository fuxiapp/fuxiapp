<template>
	<view class="cgh-search-childe">
		<view class="search-con">
			<view class="left" @click="scanCode" v-if="type === 1"><image src="../../../static/base/sm.png"></image></view>
			<view class="left" @click="onSelStore" v-if="type === 11">
				{{store}}<image class="down-img" src="../../../static/base/down.png"></image>
			</view>
			<view class="main">
				<image src="../../../static/base/search.png"></image>
				<input v-model="keyWord" placeholder="请输入内容" />
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
			type: { // 1: 销售发货单  11: 店仓管理
				type: String,
				default: '1'
			},
			store: {
				type: String,
				default: '店仓'
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
			},
			scanCode () { // 二维码识别
				this.$emit('scanCode');
			},
			onSelStore () { // 选择店仓
				this.$emit('onSelStore');
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
				image {
					width: 65upx;
					height: 65upx;
					vertical-align: middle;
				}
				.down-img {
					width: 25upx;
					height: 25upx;
					vertical-align: middle;
					margin-left: 10upx;
				}
			}
			.main {
				width: 60%;
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
