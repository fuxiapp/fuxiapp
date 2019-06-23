<template>
	<view class="v-config-view">
		<view class="company-con">
			<view class="info">
				<view class="title">客户</view>
				<view class="value">张家界</view>
			</view>
			<view class="info">
				<view class="title">仓库</view>
				<view class="value">四楼仓库</view>
			</view>
			<view class="info">
				<view class="title">经手人</view>
				<view class="value">小林</view>
			</view>
			<view class="info">
				<view class="title">日期</view>
				<view class="value">2019-05-17</view>
			</view>
		</view>
		<view class="list-con">
			<goodsItem :list="infoList" type="3" @toPath="goEditGoods"></goodsItem>
		</view>
		<view class="price-con">
			<view class="price-info">
				<view class="title">买单金额</view>
				<view class="value"><text>¥</text>350020.00</view>
				<view class="des">买单折扣(10.00)</view>
			</view>
			<view class="price-info">
				<view class="title">支付方式</view>
				<view class="value">现金</view>
				<view class="des"><image src="../../../static/base/right.png"></image></view>
			</view>
			<view class="price-info">
				<view class="title">支付金额</view>
				<view class="value"><text class="pay-price">¥350020.00</text></view>
				<view class="des">抹零 <text class="mol-value">  ¥20.00</text></view>
			</view>
			<view class="price-info">
				<view class="title">备注</view>
				<view class="value">备注备注备注</view>
			</view>
		</view>
		<view class="footer">
			<view class="left">合计200<text>¥ 12000.00</text></view>
			<view class="btn main">追加货品</view>
			<view class="btn right" @click="accountPirce">结算</view>
		</view>
		<view class="footer" v-if="isAccount">
			<view class="count-btn print"><image src="../../../static/base/print.png"></image>打印</view>
			<view class="count-btn share"><image src="../../../static/base/share.png"></image>分享</view>
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
			z-index: 2;
			line-height: 100upx;
			.left {
				margin-left: 2%;
				width: 50%;
				font-size: 28upx;
				color: #333;
				text {
					padding-left: 20upx;
					@include default-price(38upx, bold);
				}
			}
			.btn {
				width: 25%;
				font-size: 30upx;
				text-align: center;
				color: #fff;
			}
			.main {
				background: $themeColor;
			}
			.right {
				background: orange;
			}
			.count-btn {
				width: 50%;
				background: $themeColor;
				color: #fff;
				text-align: center;
				image {
					width: 60upx;
					height: 50upx;
					vertical-align: middle;
				}
			}
			.count-btn:first-child {
				border-right: 1upx solid #999;
			}
		}
	}
</style>
