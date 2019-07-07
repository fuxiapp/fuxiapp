<template>
	<view class="v-config-view">
		<view class="list-con">
			<view class="list" v-for="(item, index) in infoList" :key="index" @click="toPath(item.id)">
				<view class="name">连衣裙连衣裙连衣裙</view>
				<view class="base-info">
					<view class="no">12121</view>
					<view class="stock">库存数: 121</view>
				</view>
				<view class="base-info">
					<view class="no">红色</view>
					<view class="price"><text>¥</text> 12121.00</view>
					<view class="stock">S</view>
					<view class="stock">盘点数: 232</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="left">
				差异数量:<text>12121</text>
			</view>
			<view class="btn" >¥  <text> 12121.00</text></view>
		</view>
		
	</view>
</template>

<script>
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
		onNavigationBarButtonTap(e) {
			this.$API.tab('../../tab/main/main');
		},
		onLoad(option) {
			let type = option.type;
			if (type !== '' && type !== undefined) {
				this.moduleType = parseInt(type);
			}
		},
		methods: {
			toPath (id) {
				this.$API.to(`../../sale/defferenceCheckConfig/defferenceCheckConfig?id=${id}&type=${this.moduleType}`);
			},
			accountPirce () { // 结算
				this.isAccount = true;
			}
		},
		components: {
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
			.list {
				width: 92%;
				overflow: hidden;
				border-bottom: 1upx solid $boder-se;
				padding: 10upx 4%;
				line-height: 50upx;
				.name {
					color: #333;
					font-size: 30upx;
					@include lineEllipsis(1);
				}
				.base-info {
					display: flex;
					justify-content: space-between;
					font-size: 28upx;
					color: #333;
				}
				.price {
					color: $themeColor;
					text {
						color: orange;
						padding-right: 5upx;
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
			font-size: 28upx;
			color: #333;
			line-height: 100upx;
			font-weight: bold;
			.left {
				margin-left: 4%;
				width: 50%;
			}
			.btn {
				width: 50%;
				text-align: center;
			}
			text {
				font-size: 34upx;
				color: $themeColor;
				padding-left: 10upx;
			}
		}
	}
</style>
