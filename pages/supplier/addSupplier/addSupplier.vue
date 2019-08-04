<template>
	<view class="cgh-add-customer-view">
		<view v-if="!isShowCity">
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">厂商编码</view>
					<view class="add-input">
						<input type="text" v-if="id !== ''" class="no" placeholder="编码" disabled v-model="supplierInfo.code" />
						<input type="text" v-if="id === ''"  placeholder="编码"  v-model="supplierInfo.code" />
					</view>
				</view>
				<view class="item">
					<view class="add-title red-title">厂商名称</view>
					<view class="add-input"><input placeholder="厂商名称" v-model="supplierInfo.supplier"  /></view>
				</view>
				<view class="item">
					<view class="add-title">手机</view>
					<view class="add-input"><input placeholder="手机" v-model="supplierInfo.mobilephone" /></view>
				</view>
				<view class="item" @click="onselInfo(1)">
					<view class="add-title red-title">负责人</view>
					<view class="add-input"><input placeholder="负责人" disabled v-model="selsupplierInfo.name" /></view>
					<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item" @click="onselInfo(2)">
					<view class="add-title red-title">所属门店</view>
					<view class="add-input"><input placeholder="所属门店" disabled v-model="selStoreTypeInfo.name" /></view>
					<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item" @click="onselInfo(3)">
					<view class="add-title red-title">厂商类别</view>
					<view class="add-input"><input placeholder="厂商类别" disabled v-model="selSupplierTypeInfo.name" /></view>
					<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item">
					<view class="add-title">厂商欠款</view>
					<view class="add-input"><input placeholder="厂商欠款" v-model="supplierInfo.apAmount" disabled= /></view>
				</view>
				<view class="item">
					<view class="add-title">历史交易</view>
					<view class="add-right"><image src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item">
					<view class="add-title">停用</view>
					<view class="add-sWitch">
						 <switch @change="useWitchChange"  :checked="isUser"  color="#427CAC" style="transform:scale(0.6)" />
					</view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">详情地址</view>
					<view class="add-input"><input placeholder="详情地址"  v-model="supplierInfo.address"  /></view>
				</view>
				<view class="item">
					<view class="add-title">银行账号</view>
					<view class="add-input"><input placeholder="银行账号" v-model="supplierInfo.accountno"  /></view>
				</view>
				<view class="item">
					<view class="add-title">开户银行</view>
					<view class="add-input"><input placeholder="开户银行"  v-model="supplierInfo.bankname" /></view>
				</view>
				<view class="item">
					<view class="add-title">银行账户</view>
					<view class="add-input"><input placeholder="银行账户" v-model="supplierInfo.corpname"  /></view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">备注</view>
					<view class="add-input"><input placeholder="备注" v-model="supplierInfo.memo"  /></view>
				</view>
			</view>
			<view class="btn" @click="save">保存</view>
		</view>
		<view  v-if="isShowStore" >
			<radioItemsSearch  v-if="onStoreType  === 1" :list="storeList" :keyWord="keyWord"  title="选择负责人" placeholderTitle="负责人姓名" @closeAlert="closeAlert" @search="search" @okRadioValue="okInfo()" :moreType="onStoreType"  :isPage="isPage" :isMore="employeeMore"   @moreTypeInfo="moreTypeInfo"  ></radioItemsSearch>
			<radioItemsSearch  v-if="onStoreType  === 2" :list="storeTypeList" :keyWord="keyWord"  title="选择门店" placeholderTitle="门店/编码/门店名称"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo()" :moreType="onStoreType"  :isPage="isPage" :isMore="departmentMore"   @moreTypeInfo="moreTypeInfo"  ></radioItemsSearch>
			<radioItemsSearch  v-if="onStoreType  === 3" :list="suTypeList" :keyWord="keyWord"  title="选择厂商类别" placeholderTitle="门店/编码/门店名称"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo()"></radioItemsSearch>
		</view>
	</view>
</template> 
<script>
	import search from '../../../components/search.vue';
	import city from '../../../common/city-data.json'; 
	import radioItemsSearch from '../../../components/radioItemsSearch';
	import { nullPass } from '../../../components/filter/index.js';
	export default {
		data() {
			return {
				supplierInfo: {code: '', warehouseflag : true, stopflag: false, posnonzerostockflag: true},
				cityS: [],
				isShowCity: false,
				cityType: 0,
				selPrivince: [],
				selCityInfo: [],
				selCounty: [],
				selCityNameS: {privinceName: '',cityName: '',countyArea: '', address: ''},
				selPrivinceIndex: 0,
				selCityIndex: 0,
				selCountyIndex: 0,
				moduleType: 1 ,// 0: 销售订单 1: 销售发货单
				isShowStore: false,
				supplierList: [], 
				supplierTypeList: [], 
				suTypeList: [], 
				selsupplierInfo: {},
				selStoreTypeInfo: {},
				selSupplierTypeInfo: {}, // 厂商类别
				onStoreType: 1,
				isStore: true,
				isStock: true,
				isUser: false,
				id: '' ,
				keyWord: '',
				storeList: [],
				storeTypeList: [],
				type: 1, // 1: 新增 2: 编辑
				// 弹框分页
				isPage: true,
				size: 10,
				employeePage: 1,  // 负责人
				employeeMore: true,
				departmentPage: 1,  // 所属门店
				departmentMore: true,
			}
		},
		onLoad(option) {
			this.id = option.id;
			if (this.id !== '' && this.id !== undefined && this.id !== null) {
				uni.setNavigationBarTitle({title: '编辑厂商'});
				this.type = 2;
				this.getInfo();
			} else {
				uni.setNavigationBarTitle({title: '新增厂商'});
				this.$API.generateNo().then(res => {
					this.supplierInfo.code = res;
				});
				this.$API.getStorage('fuxiUserInfo').then(res => {
					this.selStoreTypeInfo = {id: res.data.departmentId, name: res.data.departmentName};
				});
			}
		},
		methods: {
			getInfo () {
				this.$API.get('/fuxi/supplier/query-supplier', {supplierId: this.id}).then(res => {
					if (res.code === 'success') {
						this.supplierInfo = res.data;
						this.isUser = this.supplierInfo.stopflag;
						this.selsupplierInfo =  {id: this.supplierInfo.contact, name: this.contactName};
						this.selStoreTypeInfo =  {id: this.supplierInfo.departmentid, name: this.supplierInfo.department};
						this.selSupplierTypeInfo =  {id: this.supplierInfo.suppliertypeid , name: this.supplierInfo.suppliertype};
					}
				});
			},
			storeWitchChange (e) { // 是否店仓
				this.isStore = e.target.value;
			},
			stockWitchChange (e) { // 是否允许负库存
				this.isStock = e.target.value;
			},
			useWitchChange (e) { // 是否停用
				this.isUser = e.target.value;
			},
			search (str) { // 弹框搜索
				this.keyWord = str;
				this.onselInfo(this.onStoreType);
			},
			onselInfo (type) { // 选择店仓类类别/类型
				this.onStoreType = type;
				uni.showLoading({
					title: '加载中...',
					duration: 2000
				});
				if (type === 1) {
					this.employeePage = 1;
					this.employeeMore = true;
					this.$API.get('/fuxi/select/query-employee',  {keyword: this.keyWord, pageNum: this.employeePage, pageSize: this.size}).then(res => {
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
				} else if (type === 2) {
					this.departmentPage = 1;
					this.departmentMore = true;
					this.$API.get('/fuxi/select/query-department', {keyword: this.keyWord, pageNum: this.departmentPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.storeTypeList = this.$API.fmtSelData(res.data.list, 6);
							this.isShowStore = true;
							if (this.departmentPage === res.data.pages) {
								this.departmentMore = false;
							} else {
								this.departmentMore = true;
							}
						}
					});
				} else if (type === 3) {
					if (this.keyword === '' && this.suTypeList.length !== 0) {
						uni.hideLoading();
						this.isShowStore = true;
						return;
					}
					this.$API.get('/fuxi/select/query-supplier-type',  {keyword: this.keyWord}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.suTypeList = this.$API.fmtSelData(res.data, 16);
							this.isShowStore = true;
						}
					});
				}
				
			},
			moreTypeInfo (index) { // 更新弹框信息
				uni.showLoading({
					title: '加载中...',
				});
				 if (index === 1) { // 员工
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
				} else if (index === 2) { // 所属门店
					this.departmentPage++;
					this.$API.get('/fuxi/select/query-department', {keyword: this.keyWord, pageNum: this.departmentPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							let list = this.$API.fmtSelData(res.data.list, 6);
							this.storeTypeList = this.storeTypeList.concat(list);
							if (this.departmentPage === res.data.pages) {
								this.departmentMore = false;
							} else {
								this.departmentMore = true;
							}
						}
					});
				}
			},	
			okInfo (val) {// 确认选择店仓分类
				this.isShowStore = false;
				if (this.onStoreType === 1) {
					this.selsupplierInfo = val;
				} else if (this.onStoreType === 2){
					this.selStoreTypeInfo = val;
				} else if (this.onStoreType ===3){
					this.selSupplierTypeInfo = val;
				}
			},
			closeAlert () {
				this.isShowStore = false;
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
			save () { // 保存
				let url = '/fuxi/supplier/add-supplier';
				let method = 'POST';
				if (this.type === 2) {
					url = '/fuxi/supplier/update-supplier';
					method = 'PUT';
				}
				this.supplierInfo.contact = this.selsupplierInfo.id;
				this.supplierInfo.departmentid = this.selStoreTypeInfo.id;
				this.supplierInfo.suppliertypeid  = this.selSupplierTypeInfo.id;
				this.supplierInfo.stopflag  = this.isUser;
				this.$API.post(url, this.supplierInfo, method).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						this.$API.to('../../supplier/supplierList/supplierList?type=14');
					}
				});
			}
		},
		components: {
			search,
			radioItemsSearch
		},
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
			padding: 0upx 3%;
			margin-bottom: 20upx;
			background: #fff;
			.item {
				display: flex;
				align-items: center;
				white-space: nowrap;
				border-bottom: 1upx solid $boder-se;
				line-height: 80upx;
				justify-content: space-between;
				.add-title {
					width: 22%;
					color: #333;
					font-weight: bold;
					font-size: 30upx;
				}
				.add-input {
					width: 76%;
					input {
						width: 98%;
						height: 100%;
						color: #333;
						padding-left: 5upx;
					}
				}
				.add-right {
					width: 5%;
					image {
						@include cgh-right-img();
					}
				}
				.content-right {
					width: 5%;
					image {
						margin-right: 20upx;
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
