<template>
	<view class="v-add-goods-view">
		<view class="cgh-head-con">
			<view class="left">
				<view class="goods-img" @click="uploadImg">
					<image :src="goodImg"></image>
				</view>
			</view>
			<view class="right">
				<view class="head-item">
					<view class="head-title">
						<text class="mark">*</text>货号
					</view>
					<view class="head-val">
						<input type="text" v-if="goodsId === '' || goodsId === undefined || goodsId === null " placeholder="请输入货号" v-model="goodsInfo.code" maxlength="100" />
						<input type="text " v-else placeholder="请输入货号" disabled v-model="goodsInfo.code" maxlength="100" />
					</view>
				</view>
				<view class="head-item">
					<view class="head-title">
						<text class="mark">*</text>品名
					</view>
					<view class="head-val">
						<input type="text" placeholder="请输入品名" v-model="goodsInfo.name" maxlength="100" />
					</view>
				</view>
				<view class="head-item">
					<view class="head-title">
						<text class="mark">*</text>类别
					</view>
					<view class="head-val"  @click="opentType(1)">
						<input type="text" placeholder="请选择类别" disabled v-model="selRadioList.classType" maxlength="100" />
					</view>
					<view class="top-right">
						<image src="../../../static/base/right.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="v-goods-content">
			<view class="v-goods-brand" @click="opentType(2)">
				<view class="v-input-title">
					<text>品牌</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择品牌" v-model="selRadioList.brandType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand" @click="opentType(3)">
				<view class="v-input-title">
					<text>年份</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择年份"  v-model="selRadioList.ageType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand" @click="opentType(4)">
				<view class="v-input-title">
					<text>季节</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择季节"  v-model="selRadioList.seasonType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand" @click="opentType(5)">
				<view class="v-input-title">
					<text>厂商</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择厂商"  v-model="selRadioList.supplierType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>厂商货号</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请输入厂商货号" v-model="goodsInfo.suppliercode" />
				</view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>进货价</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请输入进货价"  v-model="goodsInfo.purchasePrice" />
				</view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>零售价</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请输入零售价"   v-model="goodsInfo.retailsales" />
				</view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>批发价</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请输入批发价"  v-model="goodsInfo.tradePrice" />
				</view>
			</view>
			<view class="v-goods-brand" @click="opentType(6)">
				<view class="v-input-title">
					<text>颜色</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择颜色"  v-model="selRadioList.colorType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
		</view>
		<view class="v-save" v-if="!isShowType" @click="save" >
			<text>保存</text>
		</view>
		<!-- 单选 -->
		<view v-if="isShowType">
			<radioItem v-if="typeNumber === 1" :list="classTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 2" :list="brandTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 3" :list="ageTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 4" :list="seasonTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 5" :list="supplierTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<selType v-if="typeNumber === 6" :selTypeChidenItem="selTypeChidenItem" :classTypeInfo="colorTypeInfo" @onType="onType" @resetType="resetType"  @closeMoreType="closeMoreType" @okType="okType" :moduleType="moduleType"></selType>
		</view>
	</view>
</template>

<script>
	import radioItem from '../../../components/radioItem.vue';
	import selType from '../../../components/selType.vue';
	import { pricePass } from '../../../components/filter/index.js';
	export default {
		data() {
			return {
				goodImg: '../../../static/err_img.png',
				goodsInfo: {
					  age: "",
					  brandid: "",
					  code: "",
					  goodscolor: "",
					  goodsid: "",
					  goodstypeid: "",
					  name: "",
					  purchasePrice: '',
					  retailsales:'',
					  season: "",
					  suppliercode:"",
					  supplierid: "",
					  tradePrice: ''
				},
				isShowRadio: false,
				selRadioList: {classType: '', brandType: '', ageType: '', seasonType: '', supplierType: '', colorType:''},
				//
				classTypeInfo: [],
				brandTypeInfo: [],
				ageTypeInfo: [],
				seasonTypeInfo: [],
				supplierTypeInfo: [],
				colorTypeInfo: [],
				isShowType: false,
				typeNumber: 1,
				moduleType: 10,
				selTypeChidenItem: [],
				goodsId: '',
				url: '/fuxi/goods/add-goods',
				typeRq: 1 // 1: 新增 2: 修改
			}
		},
		onLoad(option) {
			 this.goodsId = option.id;
			// this.goodsId = '019W7';
			if (this.goodsId !== '' && this.goodsId !== undefined && this.goodsId !== null) {
				this.url = '/fuxi/goods/update-goods';
				this.typeRq = 2;
				this.getDetailsInfo();
			}
		},
		methods: {
			getDetailsInfo () { // 获取商品详情
				this.$API.get('/fuxi/goods/query-goods', {goodsId: this.goodsId}).then(res => {
					if (res.code === 'success') { 
						this.goodsInfo = res.data;
						this.goodImg = this.$URL + res.data.code + '.jpg';
						this.selRadioList = {classType: res.data.goodsType, brandType: res.data.brand, ageType: res.data.age, seasonType: res.data.season, supplierType: res.data.supplierName, colorType: res.data.goodscolorName};
					}
				});
			},
			closeAlert () {
				this.isShowType = false;
			},
			okRadioValue (val) { // 确定选择类别
				this.isShowType = false;
				if (this.typeNumber === 1) {
					this.goodsInfo.goodstypeid = val.id;
					this.selRadioList.classType = val.name;
				} else if (this.typeNumber === 2) {
					this.goodsInfo.brandid = val.id;
					this.selRadioList.brandType = val.name;
				} else if (this.typeNumber === 3) {
					this.goodsInfo.age = val.id;
					this.selRadioList.ageType = val.name;
				} else if (this.typeNumber === 4) {
					this.goodsInfo.season = val.id;
					this.selRadioList.seasonType = val.name;
				} else if (this.typeNumber === 5) {
					this.goodsInfo.supplierid = val.id;
					this.selRadioList.supplierType = val.name;
				}
			},
			uploadImg () { // 上传图片
				if (this.goodsInfo.id === '') {
					uni.showToast({
						title: '请先保存商品信息!',
						icon:'none'
					});
					return;
				}
				this.$API.upload().then(res => {
					this.goodImg = res.imageSrc;
				});
			},
			onType (index) { // 选择颜色
				this.selTypeChidenItem.push(index);
				this.colorTypeInfo[index].flg = !this.colorTypeInfo[index].flg ;
			},
			okType () { // 确定选择颜色
				this.isShowType = false;
				let selArr = '';
				let id = '';
				for (let i = 0; i < this.colorTypeInfo.length; i++) {
					if (this.colorTypeInfo[i].flg === true) {
						if (selArr === '') {
							selArr = selArr + this.colorTypeInfo[i].name;
							id = id + this.colorTypeInfo[i].id;
						} else {
							selArr = selArr + ','+ this.colorTypeInfo[i].name;
							id = id + ','+ this.colorTypeInfo[i].id;
						}
					}
				}
				this.goodsInfo.goodscolor = id;
				this.selRadioList.colorType = selArr;
			},
			opentType (index) { // 打开筛选类型
				this.typeNumber = index;
				this.isShowType = true;
				if (index === 1) {
					if (this.classTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-goods-type').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {id: arr[i].goodsTypeId, name: arr[i].goodsType, goodsTypeId: arr[i].goodsTypeId, flg: false};
								this.classTypeInfo.push(info);
							}
							
						}
					});
				} else if (index === 2) {
					if (this.brandTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-brand').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {id: arr[i].brandId, name: arr[i].brand, flg: false};
								this.brandTypeInfo.push(info);
							}
							
						}
					});
				} else if (index === 3) {
					if (this.ageTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-age').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {id: arr[i].age, name: arr[i].age, flg: false};
								this.ageTypeInfo.push(info);
							}
						}
					});
				} else if (index === 4) {
					if (this.seasonTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-season').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {id: arr[i].goodsTypeId, name: arr[i].season, flg: false};
								this.seasonTypeInfo.push(info);
							}
							
						}
					});
				} else if (index === 5) {
					if (this.supplierTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-supplier').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {id: arr[i].supplierId, name: arr[i].supplier, flg: false};
								this.supplierTypeInfo.push(info);
							}
							
						}
					});
				} else if (index === 6) {
					if (this.colorTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-color').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {id: arr[i].colorId, name: arr[i].color, flg: false};
								this.colorTypeInfo.push(info);
							}
							
						}
					});
				}
			},
			closeMoreType () { // 关闭多选
				let list = this.selTypeChidenItem;
				for (let i = 0; i < list.length; i++) {
					this.colorTypeInfo[list[i]].flg = false;
				}
				this.okType();
			},
			resetType () {// 重置多选
				for (let i = 0; i < this.colorTypeInfo.length; i++) {
					this.colorTypeInfo[i].flg = false;
				}
				this.okType();
			},
			save () {
				if (this.goodsInfo.code === '' || this.goodsInfo.code === undefined || this.goodsInfo.code === null ) {
					uni.showToast({
						title: '请输入货号',
						icon: 'none'
					});
					return;
				}
				if (this.goodsInfo.name === '' || this.goodsInfo.name === undefined || this.goodsInfo.code === null) {
					uni.showToast({
						title: '请输入品名',
						icon: 'none'
					});
					return;
				}
				if (this.goodsInfo.goodstypeid === '' || this.goodsInfo.goodstypeid === undefined || this.goodsInfo.goodstypeid === null) {
					uni.showToast({
						title: '请输入类别',
						icon: 'none'
					});
					return;
				}
				let purchasePrice = this.goodsInfo.purchasePrice;
				if (purchasePrice !== '' && purchasePrice !== undefined && purchasePrice !== null ) {
					if (!pricePass(purchasePrice)) {
						uni.showToast({
							title: '请输入正确的进货价!',
							icon: 'none'
						});
						return;
					}
				}
				let retailsales = this.goodsInfo.retailsales;
				if (retailsales !== '' && retailsales !== undefined && retailsales !== null ) {
					if (!pricePass(retailsales)) {
						uni.showToast({
							title: '请输入正确的零售价!',
							icon: 'none'
						});
						return;
					}
				}
				let tradePrice = this.goodsInfo.tradePrice;
				if (tradePrice !== '' && tradePrice !== undefined && tradePrice !== null ) {
					if (!pricePass(tradePrice)) {
						uni.showToast({
							title: '请输入正确的批发价!',
							icon: 'none'
						});
						return;
					}
				}
				let method = 'POST';
				if (this.typeRq === 2) {
					method = 'PUT'
				}
				this.$API.post(this.url, this.goodsInfo, method).then(res => {
					console.log(res);
					if (res.code === 'success') {
						if (this.typeRq === 2) {
							uni.showToast({
								title: '编辑成功!'
							});	
							setTimeout(() => {
								this.$API.to('../../goods/goodsList/goodsList');
							}, 2000)
						} else {
							uni.showToast({
								title: '添加成功!'
							});	
							this.resetData();
						}
					}
				});
			},
			resetData () {
				this.goodImg = '../../../static/err_img.png';
				this.goodsInfo =  {
					  age: "",
					  brandid: "",
					  code: "",
					  goodscolor: "",
					  goodsid: "",
					  goodstypeid: "",
					  name: "",
					  purchasePrice: '',
					  retailsales:'',
					  season: "",
					  suppliercode:"",
					  supplierid: "",
					  tradePrice: ''
				};
				this.isShowRadio = false;
				this.selRadioList = {classType: '', brandType: '', ageType: '', seasonType: '', supplierType: '', colorType:''};
				this.classTypeInfo = [];
				this.brandTypeInfo =  [];
				this.ageTypeInfo = [];
				this.seasonTypeInfo = [];
				this.supplierTypeInfo = [];
				this.colorTypeInfo = [];
				this.isShowType = false;
				this.typeNumber = 1;
				this.moduleType = 10;
				this.selTypeChidenItem = [];
				this.goodsId = '';
				this.url = '/fuxi/goods/add-goods';
				this.typeRq = 1;
			}
		},
		components: {
			radioItem,
			selType
		}
	}
</script>

<style lang="scss">
	@import "../../../components/mixin.scss";
	.v-add-goods-view {
		width: 100%;
		overflow: hidden;
		background: #fff;
		font-size: 30upx;
		// 头部
		.cgh-head-con {
			width: 94%;
			overflow: hidden;
			margin-left: 3%;
			display: flex;
			justify-items: center;
			align-content: center;
			padding-top: 20upx;
			.left {
				width: 33%;
				margin-right: 2%;
				image {
					width: 98%;
					height: 220upx;
					vertical-align: middle;
				}
			}
			.right{
				width: 66%;
				overflow: hidden;
				color: #333;
				font-size: 28upx;
				.head-item {
					display: flex;
					align-content: center;
					border-bottom: 1upx solid $boder-se;
					.head-title {
						width: 15%;
						line-height: 80upx;
					}
					.head-val {
						width: 78%;
						input {
							width: 100%;
						}
					}
				}
				.top-right {
					width: 5%;
					margin-left: 2%;
					image {
						@include cgh-right-img();
						vertical-align: middle;
						margin-top: 30upx;
					}
				}
			}
		}
		.base-right {
			margin-left: 20upx;
			@include cgh-right-img();
		}
		// 中间内容
		.v-goods-content {
			width: 100%;
			overflow: hidden;
			padding-bottom: 110upx;
			.v-goods-brand view:last-child {
				border-bottom: 0upx;
			}
			.v-goods-brand {
				width: 100%;
				overflow: hidden;
				display: flex;
				align-items: center;
				border-bottom: 1upx solid $boder-se;
				.v-input-title {
					width: 20%;
					margin-left: 15upx;
					line-height: 100upx;
				}
				.v-input {
					width: 69%;
					height: 100upx;
					margin-top: 20upx;
					input {
						width: 100%;
					}
				}
				.content-right {
					width: 5%;
					image {
						margin-right: 20upx;
					}
				}
			}
		}
		.mark {
			color: red;
		}
		.v-save {
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			width: 100%;
			box-shadow: 5upx 0 0 0 #ECECEC;
			width: 100%;
			height: 90upx;
			font-size: 36upx;
			color: #FFFFFF;
			background-color: #427CAC;
			text-align: center;
			line-height: 90upx;
			z-index: 9;
		}
		input {
			text-align: right;
			height: 80upx;
			line-height: 80upx;
		}
	}
</style>
