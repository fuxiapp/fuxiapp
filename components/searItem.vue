<template>
	<view class="cgh-search-item-childe">
		<view class="info-con">
			<view class="list" v-for="(v, index) in list" :key="index" @click="toPath(v.id)">
				<view class="name" v-if="type === '1'">广州市伏羲计算机系统工程有限公司</view>
				<view class="name" v-if="type === '2'">白马店</view>
				<view class="class-type">
					<view class="type-name" v-if="type === '1'">手机号: 15216168437</view>
					<view class="type-name" v-if="type === '2'">店仓分类: 门店</view>
					<view><image src="../../static/base/right.png"></image></view>
				</view>
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
				padding: 25upx 4%;
				.name {
					color: #333;
					font-size: 36upx;
					font-weight: bold;
					@include lineEllipsis(1);
				}
				.class-type {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 10upx;
					.type-name {
						font-size: 30upx;
						color: #999;
						@include lineEllipsis(1);
					}
					image {
						@include cgh-right-img();
						margin-left: 10upx;
					}
				}
			}
		}
	}
</style>
