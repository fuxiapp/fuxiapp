<template>
	<view class="cgh-search-item-childe">
		<view class="info-con">
			<view class="list"  v-for="(v, index) in list" :key="index">
				<view class="img"><image :src="v.image" @click="previewImage(v.image)" @error="imgError(index)" lazy-load="true" mode="aspectFill"></image></view>
				<view class="info"  @click="toPath(v)">
					<view class="name">{{v.name}}</view>
					<view class="no">{{v.code}}</view>
					<view class="prices">
						<view class="price">¥
							<text v-if="moduleType !== 1 &&  moduleType !== 2">{{v.price}}</text>
							<text v-if="moduleType === 1">{{v.totalPrice}}</text>
							<text v-if="moduleType === 2">{{v.retailsales}}</text>
						</view>
						<view class="order-number goods-add" v-if="(isFlgAdd === 0 || isFlgAdd === 1 || isFlgAdd === 2 || isFlgAdd === 5) && v.flg === true">该货品已追加</view>
						<view class="order-number" v-if="type === '3'">下单数 <text v-if="moduleType === 2">-</text>{{v.quantity}}</view>
					</view>
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
			// 1: 选择客户(售发货单) 2:选择店库(售发货单) 3:确定销售发货单
			type: {
				type: String,
				default: '1'
			},
			moduleType: {
				type: Number,
				default: 0
			},
			isFlgAdd: {
				type: Number,
				default: 1
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
			toPath(v) {
				this.$emit('toPath', v);
			},
			imgError (index) {
				this.$emit('handleError', index);
			},
			previewImage (img) {  // 预览图片
				let imgs = [img];
				uni.previewImage({
				    urls: imgs
				});
			},
		}
		
	}
</script>

<style lang="scss" scoped="">
	@import "mixin.scss";
	.cgh-search-item-childe {
		width: 100%;
		overflow: hidden;
		background: #fff;
		font-size: 28upx;
		.info-con {
			width: 100%;
			overflow: hidden;
			margin: 0upx auto;
			.list {
				width: 92%;
				overflow: hidden;
				border-bottom: 1upx solid $boder-se;
				padding: 5upx 4%;
				display: flex;
				align-items: center;
				line-height: 40upx;
				.img {
					width: 180upx;
					height: 180upx;
					margin-right: 5%;
					border-radius: 10upx;
					image {
						width: 180upx;
						height: 180upx;
						border-radius: 10upx;
						background: $themeColor;
					}
				}
				.info {
					width: 80%;
					.name {
						color: #333;
						@include lineEllipsis(1);
					}
					.prices {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.price {
							text {
								margin-left: 10upx;
								@include default-price(30upx, bold);
							}
						}
					}	
					
			 }
			 .goods-add {
				color: red;
			 }
			}
		}
	}
</style>
