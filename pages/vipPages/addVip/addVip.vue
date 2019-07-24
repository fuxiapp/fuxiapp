<template>
	<view class="cgh-add-customer-view">
		<view class="add-base-info">
			<view class="item">
				<view class="add-title red-title">姓名</view>
				<view class="add-input"><input placeholder="姓名" v-model="customerInfo.customer"  /></view>
			</view>
			<view class="item">
				<view class="add-title">手机</view>
				<view class="add-input"><input type="number" placeholder="手机" v-model="customerInfo.mobilephone" /></view>
			</view>
			<view class="item" @click="onselInfo(1)">
				<view class="add-title red-title">vip类别</view>
				<view class="add-input"><input placeholder="vip类别" disabled v-model="selStoreInfo.departmentType" /></view>
				<view class="add-right"><image src="../../../static/base/right.png"></image></view>
			</view>
			<view class="item">
				<view class="add-title">所属门店</view>
				<view class="add-input"><input placeholder="所属门店" v-model="customerInfo.accountno"  /></view>
				<view class="add-right"><image src="../../../static/base/right.png"></image></view>
			</view>
			<view class="item-radio">
				<view class="add-title">性别</view>
				<view class="radio-tab" v-for="(r, index) in sexRadioTab" @click="onSelSex(index)">
					<image v-if="selSex !== index" src="../../../static/base/radio.png"></image>
					<image v-if="selSex === index"  src="../../../static/base/sel_radio.png"></image>
					{{r.name}}
				</view>
			</view>
			<view class="item">
				<view class="add-title">生日</view>
				<view class="add-input" @click="isDateShow = true"><input placeholder="生日" disabled  v-model="customerInfo.birthday"  /></view>
				<view class="add-right"><image src="../../../static/base/right.png"></image></view>
			</view>
		</view>
		<view class="btn">保存</view>
		<!-- 弹框选择 -->
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
		<!-- 日期选择 -->
		<view v-if="isDateShow">
			<view class="cgh-black" @click="isDateShow = false"></view>
			<view class="cgh-white">
				<view class="calendar-box">
						<uni-calendar :lunar="checkedFlg" :fixed-heihgt="checkedFlg" slide="vertical" :disable-before="checkedFlg"  @change="changeDate" @to-click="toClick" />
					<view class="cgh-calendar-button">
						<view class="cel" @click="isDateShow = false">取消</view>
						<view class="confirm" @click="confirm">确认</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import city from '../../../common/city-data.json';
	import uniCalendar from '../../../components/uni-calendar/uni-calendar.vue';
	export default {
		data() {
			return {
				customerInfo: {},
				moduleType: 1,
				isShowStore: false,
				storeList: [],
				customerList: [],
				alterType: 1, // 1: 客户分类 2: 店仓
				selCustomerInfo: {},
				selStoreInfo: {},
				isUser: false,
				id: '',
				type: 1,// 1:添加 2: 编辑
				sexRadioTab: [{name: '男', val: 0}, {name: '女', val: 1}],
				selSex: 0,
				isDateShow: false,
				timeData: '',
				checkedFlg: false
			}
		},
		onLoad(option) {
			this.id = option.id;
			if (this.id !== '' && this.id !== undefined && this.id !== null) {
				this.type = 2;
				this.getInfo();
			}
			this.$API.generateNo().then(res => {
				this.customerInfo.code = res;
			});
		},
		onNavigationBarButtonTap(e) {
			this.saveCustomer();
		},
		methods: {
			getInfo () { // 获取详情
				this.$API.get('', {id: this.id}).then(res => {
					if (res.code === 'success') {
						this.customerInfo = res.data;
					}
				});
			},
			onSelSex (index) { //  选择性别
				this.selSex = index;
			},
			changeDate(e) {
				
				this.timeData = e.fulldate;
			},
			toClick(e) {
				this.timeData =  e.fulldate;
			},
			confirm() {
				this.isDateShow = false;
				this.customerInfo.birthday = this.timeData;
			},
			onselInfo (type) { // 选择类别/门店
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
			okInfo (val) {// 确认选择选择类别/门店
				this.isShowStore = false;
				if (this.alterType === 1) {
					this.selCustomerInfo = val;
				} else if (this.alterType === 2) {
					this.selStoreInfo = val;
				}
			},
			saveCustomer () { // 保存 
				let url = '/fuxi/customer/add-customer';
				if (this.type === 2) {
					url = '';
				}
				this.customerInfo.customertypeid  = this.selCustomerInfo.customerTypeId;
				this.customerInfo.departmentid  = this.selStoreInfo.departmentTypeId;
				this.customerInfo.province  = this.selCityNameS.privinceName;
				this.customerInfo.city = this.selCityNameS.cityName;
				this.customerInfo.address = this.customerInfo.address + this.selCityNameS.countyArea;
				this.$API.post(url, this.customerInfo).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						uni.navigateBack();
					}
				});
			}
		},
		components: {
			uniCalendar
		}
	}
</script>

<style lang="scss" scoped="">
	@import "../../../components/mixin.scss";
	.cgh-add-customer-view {
		width: 100%;
		overflow: hidden;
	
		font-size: 28upx;
		padding-bottom: 100upx;
		.add-base-info {
			width: 94%;
			overflow: hidden;
			margin-bottom: 20upx;
			padding: 0upx 3%;
			background: #fff;
			.add-title {
				width: 22%;
				color: #333;
				font-weight: bold;
				font-size: 30upx;
			}
			.item {
				display: flex;
				align-items: center;
				white-space: nowrap;
				border-bottom: 1upx solid $boder-se;
				line-height: 80upx;
				justify-content: space-between;
			
				.add-input {
					width: 76%;
					input {
						width: 100%;
						height: 100%;
						color: #333;
					}
					
				}
				.add-right {
					width: 10%;
					image {
						@include cgh-right-img();
					}
				}
			}
		}
		// radio
		.item-radio {
			width: 100%;
			display: flex;
			align-items: center;
			white-space: nowrap;
			border-bottom: 1upx solid $boder-se;
			line-height: 80upx;
			.radio-tab {
				width: 14%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-right: 50upx;
				image {
					width: 50upx;
					height: 50upx;
					vertical-align: middle;
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
		// 日期
		.cgh-black {
			@include cgh-alert-black();
		}
		.cgh-white {
			width: 80%;
			height: 60%;
			background: #fff;
			display: black; 
			position: fixed; 
			left: 10%;
			top: 10%;
			z-index: 3;
			-webkit-overflow-scrolling: touch;
			.cgh-calendar-button {
				display: flex;
				border-top: 1upx solid $boder-se;
				view {
					width: 50%;
					height: 80upx;
					font-size: 30upx;
					color: $themeColor;
					background: #fff;
					text-align: center;
					line-height: 80upx;
				}
				view:last-child {
					background: $themeColor;
					color: #fff;
				}
			}
		}
	}
</style>
