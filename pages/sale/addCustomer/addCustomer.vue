<template>
	<view class="cgh-add-customer-view">
		<view v-if="!isShowCity">
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">客户编码</view>
					<view class="add-input">
						<input type="text" v-if="type === 1" v-model="customerInfo.code" />
						<input type="text" v-if="type === 2" class="no" disabled v-model="customerInfo.code" />
					</view>
				</view>
				
				<view class="item" @click="onselInfo(1)">
					<view class="add-title red-title">所在门店</view>
					<view class="add-input"><input disabled v-model="selCustomerInfo.name" /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item">
					<view class="add-title red-title">客户名称</view>
					<view class="add-input"><input v-model="customerInfo.customer"  /></view>
				</view>
				<view class="item">
					<view class="add-title">订货账号</view>
					<view class="add-input"><input v-model="customerInfo.loginname"  /></view>
				</view>
				<view class="item">
					<view class="add-title">订货密码</view>
					<view class="add-input"><input type="password" v-model="customerInfo.loginpass"  /></view>
				</view>
				
				<view class="item">
					<view class="add-title">手机</view>
					<view class="add-input"><input type="number" v-model="customerInfo.mobilephone" /></view>
				</view>
				<view class="item"  @click="onselInfo(2)">
					<view class="add-title red-title">所属业务员</view>
					<view class="add-input"><input v-model="selStoreInfo.name" disabled /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item" @click="onselInfo(3)">
					<view class="add-title red-title">客户类型</view>
					<view class="add-input"><input  disabled v-model="selCustomerTypeInfo.name" /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">客户欠款</view>
					<view class="add-input"><input type="number"   v-model="customerInfo.arAmount" /></view>
				</view>
				<view class="item">
					<view class="add-title">历史交易</view>
						<view class="add-input"></view>
					<view class="add-right"><image src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item">
					<view class="add-title">停用</view>
					<view class="add-input"></view>
					<view class="add-sWitch">
						 <switch @change="useWitchChange" color="#427CAC" style="transform:scale(0.6)" />
					</view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item" @click="selCity(1)">
					<view class="add-title">省份</view>
					<view class="add-input"><input disabled  v-model="selCityNameS.privinceName"  /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item" @click="selCity(2)">
					<view class="add-title" >城市</view>
					<view class="add-input"><input disabled  v-model="selCityNameS.cityName" /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item" @click="selCity(3)">
					<view class="add-title">区县</view>
					<view class="add-input"><input  disabled  v-model="selCityNameS.countyArea"  /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item">
					<view class="add-title">详细地址</view>
					<view class="add-input"><input v-model="customerInfo.address" /></view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">开户银行</view>
					<view class="add-input"><input v-model="customerInfo.bankname" /></view>
				</view>
				<view class="item">
					<view class="add-title">银行账号</view>
					<view class="add-input"><input  v-model="customerInfo.accountno"  /></view>
				</view>
				<view class="item">
					<view class="add-title">银行账户</view>
					<view class="add-input"><input  v-model="customerInfo.corpname "  /></view>
				</view>
				<view class="item">
					<view class="add-title">备注</view>
					<view class="add-input"><input  v-model="customerInfo.memo"  /></view>
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
		<view  v-if="isShowStore" >
			<radioItemsSearch  v-if="alterType  === 1"  type="1" :list="customerList"  title="所在门店" placeholderTitle="门店/编码/门店名称" @closeAlert="closeAlert" @search="search" @okRadioValue="okInfo()" :moreType="alterType"  :isPage="isPage" :isMore="departmentMore"   @moreTypeInfo="moreTypeInfo"></radioItemsSearch>
			<radioItemsSearch  v-if="alterType  === 2"  type="2" :list="storeList"  title="所属业务员" placeholderTitle="业务员名字"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo()" :moreType="alterType"  :isPage="isPage" :isMore="employeeMore"   @moreTypeInfo="moreTypeInfo"></radioItemsSearch>
			<radioItemsSearch  v-if="alterType  === 3"  type="3" :list="customerTypeList"  title="客户类型" placeholderTitle="关键字搜索"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo()"></radioItemsSearch>
		</view> 
	</view>
</template>
<script>
	import city from '../../../common/city-data.json';
	import radioItemsSearch from '../../../components/radioItemsSearch';
	import { nullPass } from '../../../components/filter/index.js';
	export default {
		data() {
			return {
				customerInfo: {code: ''},
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
				moduleType: 1,
				isShowStore: false,
				storeList: [],
				customerList: [],
				customerTypeList: [], // 客户类型
				alterType: 1,
				selCustomerInfo: {},
				selStoreInfo: {},
				selCustomerTypeInfo: {},
				isUser: false,
				id: '',
				type: 1 ,// 1:添加 2: 编辑
				keyWord: '',
				type: 1, // 1: 新增 2: 编辑
				// 弹框分页
				isPage: true,
				size: 10,
				employeePage: 1,  // 业务员
				employeeMore: true,
				departmentPage: 1,  // 门店
				departmentMore: true,
			}
		},
		components: {
			radioItemsSearch	
		},
		onLoad(option) {
			this.id = option.id;
			if (this.id !== '' && this.id !== undefined && this.id !== null) {
				uni.setNavigationBarTitle({title: '编辑颜色'});
				this.type = 2;
				this.getInfo();
			} else {
				this.$API.generateNo(2).then(res => {
					this.customerInfo.code = res;
				});
				this.$API.getStorage('fuxiUserInfo').then(res => {
					this.selCustomerInfo = {id: res.data.departmentId, name: res.data.departmentName};
				});
			}
		},
		methods: {
			getInfo () { // 获取详情
				this.$API.get('/fuxi/customer/query-customer', {customerId: this.id}).then(res => {
					if (res.code === 'success') {
						this.customerInfo = res.data;
						this.isUser = this.customerInfo.stopflag;
						this.selCityNameS.privinceName = this.customerInfo.province;
						this.selCityNameS.cityName = this.customerInfo.city;
						this.selCityNameS.countyArea = this.customerInfo.website;
						this.selCustomerInfo = {name: this.customerInfo.department , id: this.customerInfo.departmentid};
						this.selStoreInfo = {name: this.customerInfo.employee, id: this.customerInfo.employeeid};
						this.selCustomerTypeInfo = {name: this.customerInfo.customertype , id: this.customerInfo.customertypeid};
					}
				});
			},
			useWitchChange (e) { // 是否停用
				this.isUser = e.target.value;
			},
			closeAlert () { // 关闭弹框
				this.isShowStore = false;
				this.keyWord = '';
			},
			search (str) { // 弹框搜索
				this.keyWord = str;
				if (this.keyWord === '') {
					return;
				}
				this.onselInfo(this.alterType);
			},
			onselInfo (type) { // 选择门店/所属业务员/客户类型
				this.alterType = type;
				uni.showLoading({
					title: '加载中...'
				});
				if (type === 1) {
					this.departmentPage = 1;
					this.departmentMore = true;
					this.$API.get('/fuxi/select/query-department', {keyword: this.keyWord, pageNum: this.departmentPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.customerList = this.$API.fmtSelData(res.data.list, 6);
							this.isShowStore = true;
							if (this.departmentPage === res.data.pages) {
								this.departmentMore = false;
							} else {
								this.departmentMore = true;
							}
						}
					});
				} else if (type === 2) {
					this.employeePage = 1;
					this.employeeMore = true;
					this.$API.get('/fuxi/select/query-employee', {keyword: this.keyWord, pageNum: this.employeePage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.storeList = this.$API.fmtSelData(res.data.list, 10);
							this.isShowStore = true;
							if (this.employeePage === res.data.pages) {
								this.employeeMore = false;
							} else {
								this.employeeMore = true;
							}
						}
					});
				} else if (type === 3) {
					if (this.keyWord === '' &&  this.customerTypeList.length !== 0) {
						uni.hideLoading();
						this.isShowStore = true;
						return;
					}
					this.$API.get('/fuxi/select/query-customer-type', {keyword: this.keyWord}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.customerTypeList = this.$API.fmtSelData(res.data, 5);
							this.isShowStore = true;
						}
					});
				}
			},
			moreTypeInfo (index) { // 更新弹框信息
				uni.showLoading({
					title: '加载中...',
				});
				 if (index === 2) { // 员工
					this.employeePage++;
					this.$API.get('/fuxi/select/query-employee',  {keyword: this.keyWord, pageNum: this.employeePage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							let list = this.$API.fmtSelData(res.data.list, 10);
							this.storeList = this.storeList.concat(list);
							if (this.employeePage === res.data.pages) {
								this.employeeMore = false;
							} else {
								this.employeeMore = true;
							}
						}
					});
				} else if (index === 1) { // 所属门店
					this.departmentPage++;
					this.$API.get('/fuxi/select/query-department', {keyword: this.keyWord, pageNum: this.departmentPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							let list = this.$API.fmtSelData(res.data.list, 6);
							this.customerList = this.customerList.concat(list);
							if (this.departmentPage === res.data.pages) {
								this.departmentMore = false;
							} else {
								this.departmentMore = true;
							}
						}
					});
				}
			},	
			okInfo (val) {// 确认选择所属门店/业务员/客户类型
				this.isShowStore = false;
				if (this.alterType === 1) {
					this.selCustomerInfo = val;
				} else if (this.alterType === 2) {
					this.selStoreInfo = val;
				} else if (this.alterType === 3) {
					this.selCustomerTypeInfo = val;
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
				if (!nullPass(this.customerInfo.customer)) {
					uni.showToast({
						title: '客户名称不能为空!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.selCustomerInfo.id)) {
					uni.showToast({
						title: '请选择所属门店!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.selCustomerTypeInfo.id)) {
					uni.showToast({
						title: '请选择所客户类型!',
						icon: 'none'
					});
					return;
				}
				let url = '/fuxi/customer/add-customer';
				let method = 'POST';
				if (this.type === 2) {
					url = '/fuxi/customer/update-customer';
					method = 'PUT';
				}
				this.customerInfo.departmentid  = this.selCustomerInfo.id;
				this.customerInfo.employeeid  = this.selStoreInfo.id;
				this.customerInfo.customertypeid  = this.selCustomerTypeInfo.id;
				this.customerInfo.province  = this.selCityNameS.privinceName;
				this.customerInfo.city = this.selCityNameS.cityName;
				this.customerInfo.website  = this.selCityNameS.countyArea;
				this.customerInfo.address = this.customerInfo.addres;
				this.customerInfo.stopflag  = this.isUser;
				this.$API.post(url, this.customerInfo, method).then(res => {
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
		font-size: 28upx;
		padding-bottom: 100upx;
		.add-base-info {
			width: 94%;
			overflow: hidden;
			margin-bottom: 20upx;
			padding: 0upx 3%;
			background: #fff;
			.item {
				display: flex;
				align-items: center;
				white-space: nowrap;
				border-bottom: 1upx solid $boder-se;
				line-height: 80upx;
				.add-title {
					width: 24%;
					color: #333;
					font-weight: bold;
					font-size: 30upx;
				}
				.add-input {
					width: 78%;
					input {
						width: 100%;
						height: 100%;
						color: #333;
						text-align: left;
					}
				}
				.add-right {
					width: 5%;
					image {
						@include cgh-right-img();
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
