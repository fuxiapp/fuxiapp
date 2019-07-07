<template>
	<view class="v-config-view">
		<view class="company-con">
			<view class="info">
				<view class="title">日期</view>
				<view class="value">2019-10-10</view>
			</view>
			<view class="info">
				<view class="title">仓库</view>
				<view class="value">四楼仓库</view>
			</view>
			<view class="info">
				<view class="title">业务员</view>
				<view class="value">小林</view>
			</view>
		</view>
		<view class="info-con">
			<view class="list" v-for="(v, index) in infoList" :key="index" @click="toPath(v.id)">
				<view class="img"><image src="../../../static/err_img.png" lazy-load="true" mode="aspectFit"></image></view>
				<view class="info">
					<view class="name">超级大围裙</view>
					<view class="prices">
						<view class="no">22003001</view>
						<view class="order-number">盘点数量: <text class="stock">30</text></view>
					</view>
					<view class="prices">
						<view class="price">¥<text>689.00</text></view>
						<view class="order-number">当前存库: 30</view>
					</view>
				
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="left">
				<view class="price"><text>¥</text>  121211.00</view>
				<view class="count-number">
					数量<text> 883434</text>
				</view>
			</view>
			<view class="right" @click="accountPirce">更新库存</view>
		</view>
	</view>
</template>

<script>
	import goodsItem from '../../../components/goodsItem.vue';
	export default {
		data() {
			return {
				infoList: [
					{id:1},
					{id:1}
				],
				isAccount: false
			}
		},
		onNavigationBarButtonTap(e) {
			this.$API.tab('../../tab/main/main');
		},
		onLoad() {
		},
		methods: {
			goEditGoods (id) {
				this.$API.to(`../../sale/editGoods/editGoods?id=${id}`);
			},
			accountPirce () { // 结算
				this.isAccount = true;
			}
		},
		components: {
			goodsItem
		}
	}
</script>

<style lang="scss">
	@import "../../../components/mixin.scss";
	.v-config-view {
		.company-con {
			width: 100%;
			overflow: hidden;
			background: #fff;
			.info {
				display: flex;
				align-items: center;
				padding: 20upx 0upx;
				font-size: 32upx;
				border-bottom: 1upx solid $boder-se;
				.title {
					width: 18%;
					color: #999;
					margin-left: 3%;
				}
				.value {
					color: #333;
					font-weight: bold;
				}
			}
		}
		.info-con {
			width: 100%;
			overflow: hidden;
			margin: 0upx auto;
			background: #fff;
			font-size: 28upx;
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
						.no {
							width: 60%;
							backgroud: pink;
						}
						.price {
							width: 60%;
							@include default-price(30upx, bold);
						}
						.order-number {
							color: #CCC;
							text {
								padding: 0upx 10upx;
								
							}
						}
						.stock {
							color: red;
						}
					}	
					
				}
			
			}
		}
		.footer {
			width: 100%;
			height: 100upx;
			background: #fff;
			border-top: 1upx solid $boder-se;
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			z-index: 2;
			.left {
				margin-left: 7%;
				width: 63%;
				font-size: 28upx;
				color: #333;
				.price {
					@include default-price(34upx, bold);
				}
			}
			.right {
				width: 45%;
				font-size: 30upx;
				text-align: center;
				color: #fff;
				background: orange;
				line-height: 100upx;
			}
		}
	}
</style>
