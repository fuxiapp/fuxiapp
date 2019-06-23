<template>
	<view class="cgh-add-childe">
		<view v-if="!isShowCity">
			<view class="add-con">
				<view class="add-base-info">
					<view class="item">
						<view class="add-title">客户分类</view>
						<view class="add-input"><input placeholder="盘点客户" /></view>
					</view>
					<view class="item">
						<view class="add-title">客户编码</view>
						<view class="add-input"><input  class="no" placeholder="编码" value="12344545" /></view>
					</view>
					<view class="item">
						<view class="add-title red-title">客户名称</view>
						<view class="add-input"><input placeholder="名称" /></view>
					</view>
					<view class="item">
						<view class="add-title red-title">所在门店</view>
						<view class="add-input"><input placeholder="门店" /></view>
					</view>
				</view>
				<view class="add-base-info">
					<view class="item">
						<view class="add-title">手机</view>
						<view class="add-input"><input placeholder="手机" /></view>
					</view>
					<view class="item">
						<view class="add-title">业务员</view>
						<view class="add-input"><input placeholder="业务员"  /></view>
					</view>
					<view class="item" @click="selCity(1)">
						<view class="add-title">省份</view>
						<view class="add-input"><input placeholder="省份" disabled  v-model="selCityNameS.privinceName"  /></view>
					</view>
					<view class="item" @click="selCity(2)">
						<view class="add-title" >城市</view>
						<view class="add-input"><input placeholder="城市" disabled  v-model="selCityNameS.cityName" /></view>
					</view>
					<view class="item" @click="selCity(3)">
						<view class="add-title">区县</view>
						<view class="add-input"><input placeholder="区县" disabled  v-model="selCityNameS.countyArea"  /></view>
					</view>
					<view class="item">
						<view class="add-title">详细地址</view>
						<view class="add-input"><input placeholder="详细地址" /></view>
					</view>
				</view>
				<view class="add-base-info">
					<view class="item">
						<view class="add-title">开户银行</view>
						<view class="add-input"><input placeholder="开户银行" /></view>
					</view>
					<view class="item">
						<view class="add-title">银行账户</view>
						<view class="add-input"><input placeholder="银行账户"  /></view>
					</view>
					<view class="item">
						<view class="add-title">备注</view>
						<view class="add-input"><input placeholder="备注" /></view>
					</view>
				</view>
			</view>
			<view class="btn">
				<view class="cel" @click="closeAdd">取消</view>
				<view class="config" @click="saveCustomer">保存并返回</view>
			</view>
		</view>
		
		<view class="cgh-alert-black"></view>
		<view  v-if="isShowCity">
			<view class="close" @click="closeAlert"><image src="../../../static/icon/login/icon_del.png"></image></view>
			<view class="radio-con">
				<view class="radio-info-con">
					<view class="item" v-if="cityType === 1" v-for="(item, index) in selPrivince" :key="index" @click="okCityValue(item, index)">
						{{item.values}}
					</view>
					<view class="item"  v-if="cityType === 2"  v-for="(item, index) in selCityInfo" :key="index" @click="okCityValue(item, index)">
						{{item.values}}
					</view>
					<view class="item" v-if="cityType === 3"  v-for="(item, index) in selCounty" :key="index" @click="okCityValue(item, index)">
						{{item.values}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			selPrivince: {
				type: Array,
				default: []
			},
			selCityInfo: {
				type: Array,
				default: []
			},
			selCounty: {
				type: Array,
				default: []
			},
			isShowCity: {
				type: Boolean,
				default: false
			},
			cityType: {
				type: Number,
				default: 0
			},
			selCityNameS: {}
		},
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
			selCity (type) {
				this.$emit('selCity', type);
			},
			closeAlert () {
				this.$emit('closeAlertCity');
			},
			okCityValue (item, index) {
				item.index = index;
				this.$emit('okCityValue',  item);
			},
			closeAdd () {
				this.$emit('saveCustomer');
			},
			saveCustomer () {
				this.$emit('saveCustomer');
			}
		}
		
	}
</script>

<style lang="scss" scoped="">
	@import "mixin.scss";
	.cgh-add-childe {
		width: 100%;
		overflow: hidden;
		background: #fff;
		font-size: 28upx;
		.add-con {
			width: 100%;
			height: 80%;
			background: #fff;
			overflow: auto;
			position: fixed;
			z-index: 3;
			bottom: 0;
			left: 0;
			padding-bottom: 100upx;
			.add-base-info {
				width: 94%;
				overflow: hidden;
				margin: 0upx auto;
				.item {
					display: flex;
					align-items: center;
					white-space: nowrap;
					border-bottom: 1upx solid $boder-se;
					line-height: 80upx;
					.add-title {
						width: 22%;
						color: #333;
						font-weight: bold;
						font-size: 30upx;
					}
					.add-input {
						width: 76%;
						input {
							width: 100%;
							height: 100%;
							color: #333;
						}
					}
				}
			}
			.no {
				background: #F2F0F0;
				border: 1upx solid $boder-se;
			}
			.red-title {
				color: red!important;
			}
		}
		.btn {
			width: 100%;
			height: 80upx;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 4;
			display: flex;
			justify-content: space-around;
			text-align: center;
			line-height: 80upx;
			background: $themeColor;
			color: #fff;
			.cel {
				width: 50%;
			}
			.config {
				width: 50%;
				border-left: 1upx solid $boder-se;
			}
		}
		.cgh-alert-black {
			@include cgh-alert-black();
		}
		//
		.close {
			width: 100upx;
			height: 100upx;
			position: fixed;
			overflow:auto;
			top: 270upx;
			right: 0;
			z-index: 11;
			image {
				width: 90upx;
				height: 80upx;
			}
		}
		.radio-con {
			width: 100%;
			height: 70%;
			position: fixed;
			overflow:auto;
			bottom: 0;
			left: 0;
			z-index: 11;
			background: #fff;
			.radio-info-con {
				.item {
					font-size: 36upx;
					color: #333;
					font-weight: bold;
					border-bottom: 1upx solid $boder-se;
					padding: 25upx 0upx 25upx 30upx;
				}
			}
		}
	}
</style>
