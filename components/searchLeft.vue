<template>
	<view class="cgh-search-childe">
		<view class="search-con">
			<view class="left"><image src="../../../static/base/sm.png"></image></view>
			<view class="main">
				<image src="../../../static/base/search.png"></image>
				<input placeholder="请输入内容" />
			</view>
			<view class="right">搜索</view>
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
			type: { // 1: 销售发货单
				type: String,
				default: '1'
			}
		},
		data() {
			return {
				selIndex: 0
			}
		},
		onLoad() {
		},
		methods: {
			radioChange(val, index) {
				this.selIndex = index;
				this.$emit('radioChange', val);
			},
			okRadioValue () {
				this.$emit('okRadioValue');	
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
		top: 0;
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
			}
			.main {
				width: 63%;
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
