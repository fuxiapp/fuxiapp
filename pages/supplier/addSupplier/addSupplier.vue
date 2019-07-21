<template>
	<view class="cgh-add-customer-view">
		<view v-if="!isShowCity">
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">厂商编码</view>
					<view class="add-input">
						<input v-if="id !== ''" class="no" placeholder="编码" disabled v-model="supplierInfo.code" />
						<input v-if="id === ''"  placeholder="编码"  v-model="supplierInfo.code" />
					</view>
				</view>
				<view class="item">
					<view class="add-title red-title">厂商名称</view>
					<view class="add-input"><input placeholder="厂商名称" v-model="supplierInfo.department"  /></view>
				</view>
				<view class="item">
					<view class="add-title">手机</view>
					<view class="add-input"><input placeholder="手机" v-model="supplierInfo.tel" /></view>
				</view>
				<view class="item" @click="onselInfo(1)">
					<view class="add-title red-title">负责人</view>
					<view class="add-input"><input placeholder="店仓" disabled v-model="selsupplierInfo.departmentType" /></view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item" @click="onselInfo(2)">
					<view class="add-title red-title">所属门店</view>
					<view class="add-input"><input placeholder="所属门店" disabled v-model="selStoreTypeInfo.deptType" /></view>
				</view>
				<view class="item">
					<view class="add-title">厂商欠款</view>
					<view class="add-input"><input placeholder="厂商欠款" v-model="supplierInfo.tel" /></view>
				</view>
				<view class="item">
					<view class="add-title">历史交易</view>
					<view class="add-right"><image src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item">
					<view class="add-title">停用</view>
					<view class="add-sWitch">
						 <switch @change="useWitchChange" color="#427CAC" style="transform:scale(0.6)" />
					</view>
				</view>
			</view>
			<view class="add-base-info">
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
					<view class="add-title">开户银行</view>
					<view class="add-input"><input placeholder="开户银行"  v-model="supplierInfo.addr" /></view>
				</view>
				<view class="item">
					<view class="add-title">银行账户</view>
					<view class="add-input"><input placeholder="银行账户" v-model="supplierInfo.memo"  /></view>
				</view>
			</view>
			<view class="btn" @click="save">保存</view>
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
			<view class="radio-con">
				<view class="close" @click="isShowStore = false">
					<image src="../../../static/base/left.png"></image>{{alertTitle}}
				</view>
				<view class="search-con">
					<view class="left">
						<image src="../../../static/base/search.png"></image>
						<input v-model="para.keyWord" placeholder="门店/编码/门店名称" />
					</view>
					<view class="right" @click="search">搜索</view>
				</view>
				<view class="radio-info-con" >
					<view class="item" v-if="onStoreType  === 1"  v-for="(item, index) in storeList" :key="index" @click="okInfo(item)">
						小林
					</view>
					<view class="item" v-if="onStoreType  === 2"  v-for="(item, index) in storeTypeList" :key="index" @click="okInfo(item)">
						白马店
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import search from '../../../components/search.vue';
	import city from '../../../common/city-data.json';
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
				selCityNameS: {privinceName: '',cityName: '',countyArea: ''},
				selPrivinceIndex: 0,
				selCityIndex: 0,
				selCountyIndex: 0,
				moduleType: 1 ,// 0: 销售订单 1: 销售发货单
				isShowStore: false,
				storeList: [1,1,1,1 ,1,1,1,,1,1,1],
				storeTypeList: [1,1,1,1 ,1,1,1,,1,1,1],
				selsupplierInfo: {},
				selStoreTypeInfo: {},
				onStoreType: 1,
				isStore: true,
				isStock: true,
				isUser: false,
				alertTitle: '选择负责人',
				id: '' 
			}
		},
		onLoad() {
			this.$API.generateNo().then(res => {
				this.supplierInfo.code = res;
			});
		},
		methods: {
			storeWitchChange (e) { // 是否店仓
				this.isStore = e.target.value;
			},
			stockWitchChange (e) { // 是否允许负库存
				this.isStock = e.target.value;
			},
			useWitchChange (e) { // 是否停用
				this.isUser = e.target.value;
			},
			search () {// 搜索
				
			},
			onselInfo (type) { // 选择店仓类类别/类型
				this.isShowStore = true;
				this.onStoreType = type;
				uni.showLoading({
					title: '加载中...'
				});
				if (type === 1) {
					this.alertTitle = '选择负责人';
					if (this.storeList.length !== 0) {
						uni.hideLoading();
						return;
					}
					this.$API.get('/fuxi/select/query-employee').then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.storeList = res.data;
						}
					});
				} else if (type === 2) {
					this.alertTitle = '选择部门';
					if (this.storeTypeList.length !== 0) {
						uni.hideLoading();
						return;
					}
					this.$API.get('/fuxi/select/query-department').then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.storeTypeList = res.data;
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
			judgeataNull (val) {
				
			},
			save () { // 保存
				if (!nullPass(this.selsupplierInfo.departmentTypeId)) {
					uni.showToast({
						title: '请选择店仓类别!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.supplierInfo.department)) {
					uni.showToast({
						title: '店仓名称不能为空!',
						icon: 'none'
					});
					return;
				}
				let provice = nullPass(this.selCityNameS.privinceName);
				let city = nullPass(this.selCityNameS.cityName);
				let count = nullPass(this.selCityNameS.countyArea);
				if (provice && city && count) {
					this.supplierInfo.city = this.selCityNameS.privinceName + '-' + this.selCityNameS.cityName + '-' + this.selCityNameS.countyArea;
				} else if (provice && city) { 
					this.supplierInfo.city = this.selCityNameS.privinceName + '-' + this.selCityNameS.cityName;
				} else if (provice) {
					this.supplierInfo.city = this.selCityNameS.privinceName;
				} else {
					this.supplierInfo.city = '';
				}
				this.supplierInfo.departmenttypeid  = this.selsupplierInfo.departmentTypeId;
				this.supplierInfo.depttype   = this.selStoreTypeInfo.deptType;
				this.$API.post('/fuxi/dept/add-dept', this.supplierInfo).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						this.cleaData();
					}
				});
			},
			cleaData () { // 清除数据
				this.supplierInfo =  {warehouseflag : true, stopflag: false, posnonzerostockflag: true};
				this.cityS = [];
				this.isShowCity = false;
				this.cityType = 0;
				this.selPrivince = [];
				this.selCityInfo = [];
				this.selCounty = [];
				this.selCityNameS = {privinceName: '',cityName: '',countyArea: ''};
				this.selPrivinceIndex = 0;
				this.selCityIndex = 0;
				this.selCountyIndex = 0;
				this.moduleType = 1;
				this.isShowStore = false;
				this.storeList =[];
				this.selsupplierInfo = {};
				this.isStore = true;
				this.isStock = true;
				this.isUser = false;
			}
		},
		components: {
			search
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
					width: 10%;
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
			width: 100%;
			color: #333;
			background: $themeColor;
			color: #fff;
			padding: 10upx 0upx;
			image {
				width: 45upx;
				height: 50upx;
				margin-left: 20upx;
				vertical-align: middle;
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
			.search {
				background: red;
				margin-top: 100upx;
			}
			.radio-info-con {
				width: 100%;
				height: 56%;
				overflow: scroll;
				position: fixed;
				left: 0;
				bottom:  0u;
				z-index: 2009;
				.item {
					font-size: 36upx;
					color: #333;
					font-weight: bold;
					border-bottom: 1upx solid $boder-se;
					padding: 25upx 0upx 25upx 30upx;
				}
			}
		}
		.search-con {
			width: 92%;
			height: 80upx;
			margin-left: 4%;
			margin-top: 20upx;
			font-size: 32upx;
			line-height: 80upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			white-space: nowrap;
			
			.left {
				width: 75%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border: 1upx solid $boder-se;
				border-radius: 20upx;
				padding-left: 20upx;
				image {
					width: 45upx;
					height: 45upx;
				}
				input {
					width: 88%;
					height: 100%;
				}
			}
			.right {
				width: 18%;
				height: 100%;
				border: 1upx solid $boder-se;
				border-radius: 20upx;
				text-align: center;
			}
		}
	}
</style>
