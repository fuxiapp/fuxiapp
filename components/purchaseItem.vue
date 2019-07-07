<template>
	<view class="cgh-search-item-childe">
		<view class="info-con">
			<view class="list" v-for="(v, index) in list" :key="index" @click="toPath(index)">
				<view class="name" v-if="type === '1'">大庆服装厂</view>
				<view class="right"><image src="../../../static/base/right.png"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			// 1: 选择客户 2:选择店库
			type: {
				type: String,
				default: '1'
			},
			moduleType: {
				type: Number,
				default: 1
			},
			companyOrStrore: {
				type: Number,
				default: 0 // 0: 公司 1:店面 
			},
			 
		},
		data() {
			return {
				selIndex: 0
			}
		},
		onLoad() {
		},
		methods: {
			toPath(id) {
				this.$emit('toPath', id);
			}
		}
		
	}
</script>

<style lang="scss" scoped="">
	@import "mixin.scss";
	.cgh-search-item-childe {
		width: 100%;
		overflow: hidden;
		background: #fff;
		.info-con {
			width: 100%;
			overflow: hidden;
			margin: 0upx auto;
			.list {
				width: 92%;
				overflow: hidden;
				border-bottom: 1upx solid $boder-se;
				padding: 30upx 4%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name {
					width: 80%;
					color: #333;
					font-size: 36upx;
					font-weight: bold;
					@include lineEllipsis(1);
				}
				
				image {
					@include cgh-right-img();
					margin-left: 10upx;
				}
			}
		}
	}
</style>
