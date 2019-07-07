<template>
	<view class="v-config-view">
		<view class="list-con">
			<goodsItem :list="infoList" :moduleType="moduleType" type="3" @toPath="goEditGoods"></goodsItem>
		</view>
		<view class="footer">
			<view class="left">
				<view class="price">¥<text> 12000.00</text></view>
				<view class="number">数量:<text>12121</text></view>
			</view>
			<view class="btn" @click="accountPirce">确认</view>
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
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1}
				],
				isAccount: false,
				moduleType: 0
			}
		},
		onLoad(option) {
			let type = option.type;
			if (type !== '' && type !== undefined) {
				this.moduleType = parseInt(type);
			}
		},
		onNavigationBarButtonTap() {
			this.$API.to(`../../sale/differenceGoodsCheck/differenceGoodsCheck?type=${this.moduleType}`);
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
		.list-con {
			width: 100%;
			overflow: hidden;
			background: #fff;
			padding-bottom: 110upx;
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
		.price-con {
			width: 100%;
			overflow: hidden;
			background: #fff;
			margin-top: 20px;
			margin-bottom: 100upx;
			.price-info {
				display: flex;
				align-items: center;
				padding: 20upx 0upx;
				font-size: 30upx;
				border-bottom: 1upx solid $boder-se;
				color: #999;
				.title {
					width: 20%;
					color: #999;
					margin-left: 3%;
				}
				.value {
					width: 40%;
					text-align: left;
					font-size: 34upx;
				}
				.pay-price {
					color: #333;
					font-weight: bold;
				}
				.des {
					width: 33%;
					text-align: right;
					image {
						@include cgh-right-img();
						vertical-align: middle
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
			justify-content: space-between;
			z-index: 2;
			font-size: 32upx;
			.left {
				margin-left: 4%;
				width: 68%;
				color: #333;
				text {
					padding-left: 10upx;
				}
				.price {
					@include default-price(30upx, bold);
				}
				.number {
					font-size: 28upx;
				}
			}
			.btn {
				width: 30%;
				font-size: 30upx;
				text-align: center;
				color: #fff;
				background: orange;
				line-height: 100upx;
			}
		}
	}
</style>
