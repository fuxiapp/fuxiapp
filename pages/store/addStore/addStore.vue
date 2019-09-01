<template>
	<view class="cgh-add-customer-view">
		<view v-if="!isShowCity">
			<view class="add-base-info">
				<view class="item" @click="onselInfo(1)">
					<view class="add-title red-title">店仓类别</view>
					<view class="add-input"><input disabled v-model="selStoreInfo.name" /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
			</view>
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">店仓编码</view>
					<view class="add-input">
						<input type="text"  v-if="type === 1"   v-model="storeInfo.code" />
						<input type="text"  v-if="type === 2" class="no" disabled v-model="storeInfo.code" />
					</view>
				</view>
				<view class="item">
					<view class="add-title red-title">店仓名称</view>
					<view class="add-input"><input  v-model="storeInfo.department "  /></view>
				</view>
				<view class="item" @click="onselInfo(2)">
					<view class="add-title red-title">店仓类型</view>
					<view class="add-input"><input  disabled v-model="selStoreTypeInfo.name" /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>

				<view class="item">
					<view class="add-title red-title">是否是店仓</view>
					<view class="add-sWitch">
						 <switch @change="storeWitchChange" :checked="isStore" color="#427CAC" style="transform:scale(0.6)" />
					</view>
				</view>
				<view class="item">
					<view class="add-title red-title">不允许负库存</view>
					<view class="add-sWitch">
						 <switch @change="stockWitchChange"  :checked="isStock" color="#427CAC" style="transform:scale(0.6)" />
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
					<view class="add-input"><input  disabled  v-model="selCityNameS.cityName" /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item" @click="selCity(3)">
					<view class="add-title">区县</view>
					<view class="add-input"><input disabled  v-model="selCityNameS.countyArea"  /></view>
					<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
				</view>
				<view class="item">
					<view class="add-title">详细地址</view>
					<view class="add-input"><input v-model="storeInfo.addr" /></view>
				</view>
				<view class="item">
					<view class="add-title">电话</view>
					<view class="add-input"><input  v-model="storeInfo.tel" /></view>
				</view>
				<view class="item">
					<view class="add-title">停用</view>
					<view class="add-sWitch">
						 <switch @change="useWitchChange" :checked="isUser"  color="#427CAC" style="transform:scale(0.6)" />
					</view>
				</view>
				<view class="item">
					<view class="add-title">备注</view>
					<view class="add-input"><input  v-model="storeInfo.memo"  /></view>
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
			<radioItemsSearch v-if="onStoreType === 1"  :list="storeList"  title="店仓类别" placeholderTitle="关键字搜索"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo"></radioItemsSearch>
			<radioItem v-if="onStoreType === 2"  :list="storeTypeList" @closeAlert="closeAlert"  @okRadioValue="okInfo"></radioItem>
		</view>
	</view>
</template>
<script>
	import city from '../../../common/city-data.json';
	import radioItemsSearch from '../../../components/radioItemsSearch';
	import radioItem from '../../../components/radioItem';
	import { nullPass, meetsTel } from '../../../components/filter/index.js';
	export default {
		data() {
			return {
				storeInfo: {code: '', warehouseflag : true, stopflag: false, posnonzerostockflag: true},
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
				storeTypeList: [],
				selStoreInfo: {},
				selStoreTypeInfo: {},
				onStoreType: 1,
				isStore: true,
				isStock: true,
				isUser: false,
				id: '',
				keyword: '',
				type: 1, // 1: 新增 2: 编辑
			}
		},
		onLoad(option) {
			this.id = option.id;
			if (this.id !== '' && this.id !== undefined && this.id !== null) {
				uni.setNavigationBarTitle({title: '编辑店仓'});
				this.type = 2;
				this.getDetailsInfo();
			} else {
				this.$API.generateNo().then(res => {
					this.storeInfo.code = res;
				});
			}
		},
		methods: {
			getDetailsInfo () { // 获取详情
				uni.showLoading({
					title: '加载中...'
				});
				this.$API.get('/fuxi/dept/query-dept', {departmentId: this.id}).then(res => {
					uni.hideLoading();
					if (res.code === 'success') {
						this.storeInfo = res.data;
						this.selStoreInfo = {id: this.storeInfo.departmenttypeid, name: this.storeInfo.departmenttype};
						this.selStoreTypeInfo = {id: this.storeInfo.departmentid, name: this.storeInfo.departmenttype};
						this.isStore = this.storeInfo.warehouseflag;
						this.isStock = this.storeInfo.posnonzerostockflag;
						this.isUser = this.storeInfo.stopflag;
						let addrees = (this.storeInfo.city).split('-');
						for (let i = 0; i < addrees.length; i++) {
							if (i === 0) {
								this.selCityNameS.privinceName = addrees[i];
							} else if (i === 1) {
								this.selCityNameS.cityName = addrees[i];
							} else if (i === 2) {
								this.selCityNameS.countyArea = addrees[i];
							}
						}
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
			closeAlert () { // 关闭弹框
				this.isShowStore = false;
				this.keyword = '';
			},
			search (str) { // 弹框搜索
				this.keyword = str;
				this.onselInfo(this.onStoreType);
			},
			onselInfo (type) { // 选择类别/类型
				this.isShowStore = true;
				this.onStoreType = type;
				uni.showLoading({
					title: '加载中...'
				});
				if (type === 1) {
					this.$API.get('/fuxi/select/query-department-type', {keyword: this.keyword}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.storeList = this.$API.fmtSelData(res.data, 7);
						}
					});
				} else if (type === 2) {
					this.$API.get('/fuxi/select/query-dept-type', {keyword: this.keyword}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.storeTypeList = this.$API.fmtSelData(res.data, 8);
						}
					});
				} 
			},
			okInfo (val) {// 确认选择店仓分类
				this.isShowStore = false;
				if (this.onStoreType === 1) {
					this.selStoreInfo = val;
				} else if (this.onStoreType === 2){
					this.selStoreTypeInfo = val;
				} else if (this.onStoreType === 3){
					this.departmentInfo = val;
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
				if (!nullPass(this.selStoreInfo.id)) {
					uni.showToast({
						title: '请选择店仓类别!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.selStoreTypeInfo.id)) {
					uni.showToast({
						title: '店仓类型不能为空!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.storeInfo.tel)) {
					if (!meetsTel(this.storeInfo.tel)) {
						uni.showToast({
							title: '请输入正确的手机号码格式!',
							icon: 'none'
						});
						return;
					}
				}
				let url = '/fuxi/dept/add-dept';
				let method = 'POST';
				if (this.type === 2) {
					url = '/fuxi/dept/update-dept';
					method = 'PUT'
				}
				let provice = nullPass(this.selCityNameS.privinceName);
				let city = nullPass(this.selCityNameS.cityName);
				let count = nullPass(this.selCityNameS.countyArea);
				if (provice && city && count) {
					this.storeInfo.city = this.selCityNameS.privinceName + '-' + this.selCityNameS.cityName + '-' + this.selCityNameS.countyArea;
				} else if (provice && city) { 
					this.storeInfo.city = this.selCityNameS.privinceName + '-' + this.selCityNameS.cityName;
				} else if (provice) {
					this.storeInfo.city = this.selCityNameS.privinceName;
				} else {
					this.storeInfo.city = '';
				}
				this.storeInfo.departmenttypeid = this.selStoreInfo.id;
				this.storeInfo.depttype = this.selStoreTypeInfo.id;
				this.storeInfo.posnonzerostockflag = this.isStock; 
				this.storeInfo.stopflag  = this.isUser;
				this.storeInfo.warehouseflag  = this.isStore;
				this.$API.post(url, this.storeInfo, method).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						this.$API.to('../../store/department/department?type=11');
					}
				});
			}
		},
		components: {
			radioItemsSearch,
			radioItem
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
					width: 78%;
					input {
						width: 98%;
						height: 100%;
						color: #333;
						padding-left: 5upx;
					}
				}
			}
			.add-right {
				width: 5%;
				image {
					@include cgh-right-img();
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
