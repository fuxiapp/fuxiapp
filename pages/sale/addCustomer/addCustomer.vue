<template>
	<view class="cgh-add-customer-view">
		<view v-if="!isShowCity">
			<view class="add-base-info">
				<view class="item" @click="onselInfo(1)">
					<view class="add-title">客户分类</view>
					<view class="add-input"><input placeholder="盘点客户" v-model="selCustomerInfo.customerType" disabled /></view>
				</view>
				<view class="item">
					<view class="add-title">客户编码</view>
					<view class="add-input"><input  class="no" placeholder="编码"  v-model="customerInfo.code" /></view>
				</view>
				<view class="item">
					<view class="add-title red-title">客户名称</view>
					<view class="add-input"><input placeholder="名称" v-model="customerInfo.customer"  /></view>
				</view>
				<view class="item" @click="onselInfo(2)">
					<view class="add-title red-title">所在门店</view>
					<view class="add-input"><input placeholder="门店" disabled v-model="selStoreInfo.departmentType" /></view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">手机</view>
					<view class="add-input"><input placeholder="手机" v-model="customerInfo.mobilephone" /></view>
				</view>
				<view class="item">
					<view class="add-title">业务员</view>
					<view class="add-input"><input placeholder="业务员" v-model="customerInfo.accountno"  /></view>
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
					<view class="add-input"><input placeholder="详细地址"  v-model="customerInfo.address" /></view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">开户银行</view>
					<view class="add-input"><input placeholder="开户银行" v-model="customerInfo.bankname" /></view>
				</view>
				<view class="item">
					<view class="add-title">银行账户</view>
					<view class="add-input"><input placeholder="银行账户" v-model="customerInfo.accountno"  /></view>
				</view>
				<view class="item">
					<view class="add-title">备注</view>
					<view class="add-input"><input placeholder="备注" v-model="customerInfo.memo"  /></view>
				</view>
			</view>
			<view class="btn">
				<view class="cel" @click="closeAdd">取消</view>
				<view class="config" v-if="moduleType === 1" @click="saveCustomer">保存并返回</view>
				<view class="config" v-if="moduleType === 0" @click="closeAdd">保存并下单</view>
			</view>
		</view>
		
		<view  v-if="isShowCity">
			<view class="cgh-alert-black" @click="closeAlertCity"></view>
			<view class="close" @click="closeAlertCity"><image src="../../../static/icon/login/icon_del.png"></image></view>
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
		<view  v-if="isShowStore">
			<view class="cgh-alert-black" @click="isShowStore = false"></view>
			<view class="close" @click="isShowStore = false"><image src="../../../static/icon/login/icon_del.png"></image></view>
			<view class="radio-con">
				<view class="radio-info-con">
					<view class="item" v-if="alterType === 1" v-for="(item, index) in customerList" :key="index" @click="okInfo(item)">
						{{item.customerType}}
					</view>
					<view class="item" v-if="alterType === 2" v-for="(item, index) in storeList" :key="index" @click="okInfo(item)">
						{{item.departmentType}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import city from '../../../common/city-data.json';
	export default {
		data() {
			return {
				customerInfo: {},
				cityS: [],
				isShowCity: false,
				cityType: 0,
				selPrivince: [],
				selCityInfo: [],
				selCounty: [],
				selCityNameS: {privinceName: '',cityName: '',countyArea: ''},
				selPrivinceIndex: 0,
				selCityIndex: 0,
				selCountyIndex: 0,
				moduleType: 1 ,// 0: 销售订单 1: 销售发货单
				isShowStore: false,
				storeList: [],
				customerList: [],
				alterType: 1, // 1: 客户分类 2: 店仓
				selCustomerInfo: {},
				selStoreInfo: {}
			}
		},
		onLoad() {
			
		},
		onNavigationBarButtonTap(e) {
			this.saveCustomer();
		},
		methods: {
			onselInfo (type) { // 选择客服分类/门店
				this.isShowStore = true;
				this.alterType = type;
				uni.showLoading({
					title: '加载中...'
				});
				if (type === 1) {
					if (this.customerList.length !== 0) {
						uni.hideLoading();
						return;
					}
					this.$API.get('/fuxi/select/query-customer-type').then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.customerList = res.data;
						}
					});
				} else if (type === 2) {
					if (this.storeList.length !== 0) {
						uni.hideLoading();
						return;
					}
					this.$API.get('/fuxi/select/query-department-type').then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.storeList = res.data;
						}
					});
				}
				
			},
			okInfo (val) {// 确认选择客服分类/门店
				this.isShowStore = false;
				if (this.alterType === 1) {
					this.selCustomerInfo = val;
				} else if (this.alterType === 2) {
					this.selStoreInfo = val;
				}
			},
			selCity (type) {
				this.cityType = type;
				if (type === 1) { // 获取省份
					this.selPrivince = city;
				} else if (type === 2) {
					if (this.selCityNameS.privinceName  === '') {
						uni.showToast({
							title: '请先选择省份',
							icon: 'none'
						});
						this.isShowCity = false;
						return;
					}
					this.selCityInfo = this.selPrivince[this.selPrivinceIndex].children;
				} else if (type === 3) {
					if (this.selCityNameS.cityName  === '') {
						uni.showToast({
							title: '请先选择城市',
							icon: 'none'
						});
						this.isShowCity = false;
						return;
					}
					this.selCounty = this.selCityInfo[this.selCityIndex].children;
				}
				this.isShowCity = true;
			},
			closeAlertCity () {
				this.isShowCity = false;
			},
			okCityValue (val, index) {
				this.isShowCity = false;
				if (this.cityType === 1) {
					this.selCityNameS.privinceName = val.values;
					this.selPrivinceIndex = index;
					this.selCityNameS.cityName = '';
					this.selCityNameS.countyArea = '';
				} else if (this.cityType === 2) {
					this.selCityNameS.cityName = val.values;
					this.selCityIndex =  index;
					this.selCityNameS.countyArea = '';
				} else 	if (this.cityType === 3) {
					this.selCityNameS.countyArea = val.values;
					this.selCountyIndex = index;
				}
			},
			closeAdd () {
				uni.navigateBack();
			},
			saveCustomer () { // 保存 
				this.customerInfo.customertypeid  = this.selCustomerInfo.customerTypeId;
				this.customerInfo.departmentid  = this.selStoreInfo.departmentTypeId;
				this.customerInfo.province  = this.selCityNameS.privinceName;
				this.customerInfo.city = this.selCityNameS.cityName;
				this.customerInfo.address = this.customerInfo.address + this.selCityNameS.countyArea;
				this.$API.post('/fuxi/customer/add-customer', this.customerInfo).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						uni.navigateBack();
					}
				});
			}
		}
		
	}
</script>

<style lang="scss" scoped="">
	@import "../../../components/mixin.scss";
	.cgh-add-customer-view {
		width: 100%;
		overflow: hidden;
		background: #fff;
		font-size: 28upx;
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
