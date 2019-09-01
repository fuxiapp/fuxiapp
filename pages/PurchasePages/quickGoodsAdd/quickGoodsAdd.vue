<template>
	<view class="v-add-goods-view">
		<view class="cgh-head-con">
			<view class="left">
				<view class="goods-img"  @click="onSelImg">
					<image :src="goodImg"  @error="handleError()"></image>
				</view>
			</view>
			<view class="right">
				<view class="head-item">
					<view class="head-title">
						<text class="mark">*</text>货号
					</view>
					<view class="head-val-code">
						<input type="text" class="input-no" disabled v-model="goodsInfo.code" />
					</view>
					<view class="content-refresh"   @click="rand(goodsInfo.goodstypeid, otherName)">
						<image src="../../../static/refresh.png"></image>
					</view>
				</view>
				<!-- <view class="head-item">
					<view class="head-title">
						<text class="mark">*</text>品名
					</view>
					<view class="head-val">
						<input type="text" v-model="goodsInfo.name" maxlength="100" />
					</view>
				</view> -->
				<view class="head-item">
					<view class="head-title">
						<text class="mark">*</text>类别
					</view>
					<view class="head-val"  @click="opentType(1)">
						<input type="text" disabled v-model="selRadioList.classType" maxlength="100" />
					</view>
					<view class="content-right">
						<image src="../../../static/base/right.png"></image>
					</view>
				</view>
				<view class="head-item">
					<view class="head-title">
						<text class="mark">*</text>子类
					</view>
					<view class="head-val"  @click="opentType(7)">
						<input type="text" disabled v-model="selRadioList.classSubclassType" maxlength="100" />
					</view>
					<view class="content-right">
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
					<input type="text"  v-model="selRadioList.brandType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand" @click="opentType(3)">
				<view class="v-input-title">
					<text>年份</text>
				</view>
				<view class="v-input">
					<input type="text"  v-model="selRadioList.ageType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand" @click="opentType(4)">
				<view class="v-input-title">
					<text>季节</text>
				</view>
				<view class="v-input">
					<input type="text"  v-model="selRadioList.seasonType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand" @click="opentType(5)" v-if="isEditGoods">
				<view class="v-input-title">
					<text>厂商</text>
				</view>
				<view class="v-input">
					<input type="text" v-model="selRadioList.supplierType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand" v-if="!isEditGoods">
				<view class="v-input-title">
					<text>厂商</text>
				</view>
				<view class="v-input">
					<input type="text" class="input-no" v-model="selRadioList.supplierType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>厂商货号</text>
				</view>
				<view class="v-input">
					<input type="text"  v-model="goodsInfo.suppliercode" />
				</view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>进货价</text>
				</view>
				<view class="v-input">
					<input type="number"  v-model="goodsInfo.purchaseprice" />
				</view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>零售价</text>
				</view>
				<view class="v-input">
					<input type="number"  v-model="goodsInfo.retailsales" />
				</view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>批发价</text>
				</view>
				<view class="v-input">
					<input type="number" v-model="goodsInfo.tradeprice" />
				</view>
			</view>
			<view class="v-goods-brand" @click="opentType(6)">
				<view class="v-input-title">
					<text class="mark">*</text><text>颜色</text>
				</view>
				<view class="v-input">
					<input type="text"  v-model="selRadioList.colorType" disabled="true" />
				</view>
				<view class="content-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>材料成分</text>
				</view>
				<view class="v-input">
					<input type="text" v-model="goodsInfo.model1" />
				</view>
			</view>
			
		</view>
		<view class="v-save" v-if="!isShowType">
			<view class="btn-item left" @click="save(1)" >保存并新增</view>
			<view class="btn-item right" @click="save(2)" >保存并收货</view>
		</view>
		<!-- 点击图片选择 -->
		<view class="cgh-img-alet-con" v-if="isShowImg">
			<view class="alert-black" @click="isShowImg = false"></view>
			<view class="img-con">
				<view class="alert-btn">
					<view class="btn"  @click="uploadImg">上传图片</view>
					<view class="btn" @click="previewImage">查看大图</view>
					<view class="btn" @click="isShowImg = false">取消</view>
				</view>
			</view>
		</view>
		<!-- 单选 -->
		<view  v-if="isShowType" >
			<radioItemsSearch  v-if="typeNumber === 1"  :list="classTypeInfo"  title="货品类别" placeholderTitle="关键字搜索"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okRadioValue()"></radioItemsSearch>
			<radioItemsSearch  v-if="typeNumber === 2" :list="brandTypeInfo"  title="所属品牌" placeholderTitle="关键字搜索"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okRadioValue()"></radioItemsSearch>
			<radioItem v-if="typeNumber === 3" :list="ageTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 4" :list="seasonTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItemsSearch  v-if="typeNumber === 5" :moreType="typeNumber" :list="supplierTypeInfo" :isPage="isPage" :isMore="supplierisMore"  title="所属厂商" placeholderTitle="关键字搜索"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okRadioValue()" @moreTypeInfo="moreTypeInfo"></radioItemsSearch>
			<selType v-if="typeNumber === 6" :selTypeChidenItem="selTypeChidenItem" :classTypeInfo="colorTypeInfo" @onType="onType" @resetType="resetType"  @closeMoreType="closeMoreType" @okType="okType" :moduleType="moduleType"></selType>
			<radioItem v-if="typeNumber === 7" :list="classSubclassTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
		</view> 
	</view>
</template>

<script>
	import radioItem from '../../../components/radioItem.vue';
	import selType from '../../../components/selType.vue';
	import { pricePass } from '../../../components/filter/index.js';
	import radioItemsSearch from '../../../components/radioItemsSearch';
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
					  tradePrice: '',
					  subtype: '',
					  model1 : ''
				},
				isShowRadio: false,
				selRadioList: {classType: '', brandType: '', ageType: '', seasonType: '', supplierType: '', colorType:'', classSubclassType: ''},
				//
				classTypeInfo: [],
				brandTypeInfo: [],
				ageTypeInfo: [],
				seasonTypeInfo: [],
				supplierTypeInfo: [],
				colorTypeInfo: [],
				classSubclassTypeInfo: [], // 子类
				isShowType: false,
				typeNumber: 1,
				moduleType: 18,
				selTypeChidenItem: [],
				goodsId: '',
				isonSave: false,
				keyword: '',
				// 弹框分页
				isPage: true,
				size: 10,
				supplierPage: 1,  // 厂商
				otherName: '',
				supplierisMore: true,
				isEditGoods: true, // 是否是追加货品
				code: '',
				// 图片弹框
				isShowImg: false,
				userInfo: {},
				// 默认值
				currQuarter: '', // 当前季度
				nowYear: '', // 当前年份
			}
		},
		onBackPress(options) {  
		    if (options.from === 'navigateBack') {  
		        return false;  
		    } 
			this.$API.tab('../../tab/main/main');
		    return true;  
		}, 	
		onLoad(option) {
			let isEditGoodsflg = option.isEditGoods ?  +option.isEditGoods : '';
			if (isEditGoodsflg === 1) {
				this.isEditGoods = false;
				this.$API.getStorage('fuxiSalesSend').then(res => {
					let info = res.data;
					this.selRadioList =  {
						classType: info.typeCode, brandType: info.brandName, ageType: info.ageName,
						seasonType: info.seasonTypeName, supplierType: info.supplierName,
						colorType: '', classSubclassType: info.subName,
					};
					this.goodsInfo = {
						  age: info.age,
						  brandid: info.brandType,
						  goodscolor: "",
						  goodsid: "",
						  goodstypeid: info.type,
						  name: "",
						  purchasePrice: '',
						  retailsales:'',
						  season: info.seasonType,
						  suppliercode:"",
						  supplierid: info.supplierId,
						  tradePrice: '',
						  subtype: info.subClass,
						  model1 :  ''
					};
					this.otherName = info.otherName;
					this.rand(this.goodsInfo.goodstypeid, info.otherName);
				});
			} else {
				this.isEditGoods = true;
				this.$API.removeStorage('fuxiSalesSend');
				this.$API.removeStorage('fuxiSelasOrderInfo');
			}
			this.$API.getStorage('fuxiUserInfo').then(res => {
				this.userInfo = res.data;
			}).catch((err) => {
				uni.showToast({
					title: '未登录,请先登录!',
					icon: 'none',
					success: () => {
						this.$API.to('../../login/login');
					}
				});
			});
			this.isonSave = true;
			// 
			let myDate = new Date();
			this.goodsInfo.age =   myDate.getFullYear(); //获取完整的年份(4位,1970-????)
			this.selRadioList.ageType = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
			let currMonth =  myDate.getMonth(); //获取当前月份(0-11,0代表1月)
			myDate.toLocaleString( ); //获取日期与时间
			let currQuarter = +(Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ))); // 获取当前季度
			let currQuarterStr = '';
			if (currQuarter === 1) {
				currQuarterStr = '春季'
			} else if (currQuarter == 2) {
				currQuarterStr = '夏季'
			} else if (currQuarter == 3) {
				currQuarterStr = '秋季'
			} else if (currQuarter == 4) {
				currQuarterStr = '冬季'
			}
			this.goodsInfo.season = currQuarterStr;
			this.selRadioList.seasonType  = currQuarterStr;
			this.getInfo();
		},
		methods: {
			getInfo () {
				uni.showLoading({
					title: '加载中...'
				});
				this.$API.get('/fuxi/select/query-goods-type', {keyword: this.keyword}).then(res => {
					uni.hideLoading();
					if (res.code === 'success') {
						if (res.data.length > 0) {
							this.goodsInfo.goodstypeid = res.data[0].goodsTypeId;
							this.selRadioList.classType =  res.data[0].goodsType;
							this.goodsInfo.name =  res.data[0].goodsType;
							this.$API.get('/fuxi/select/query-goods-sub-type',  {goodsTypeId: this.goodsInfo.goodstypeid}).then(res => {
								if (res.code === 'success') {
									if (res.data.length > 0) {
										this.goodsInfo.subtype = res.data[0].goodsSubTypeId;
										this.selRadioList.classSubclassType =  res.data[0].name;
										this.otherName =  res.data[0].otherName;
										this.rand( this.goodsInfo.goodstypeid, res.data[0].otherName);
									}
								}
							});
						}
					}
				});
			},
			rand(goodstypeid, otherName) { // 生成随机数
				let min = 1000;
				let max = 9999;
			    let randnum =  Math.floor(Math.random()*(max-min))+min;
				let val = '';
				if (otherName === '' || otherName === null || otherName === undefined) {
					val = goodstypeid + randnum;
				} else {
					val = goodstypeid + otherName + randnum;
				}
				this.goodsInfo.code = val;
				this.code = val;
			 },
			closeAlert () {
				this.isShowType = false;
				this.keyWord = '';
			},
			search (str) { // 弹框搜索
				this.keyword = str;
				this.opentType(this.typeNumber);
			},
			okRadioValue (val) { // 确定选择类别
				this.isShowType = false;
				if (this.typeNumber === 1) {
					if (val.id !== this.goodsInfo.goodstypeid) {
						this.goodsInfo.subtype = '';
						this.selRadioList.classSubclassType = '';
					}
					this.goodsInfo.goodstypeid = val.id;
					this.selRadioList.classType = val.name;
					if (this.goodsInfo.name === '') {
						this.goodsInfo.name = val.name;
					}
					this.rand(this.goodsInfo.goodstypeid, this.otherName);
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
				} else if (this.typeNumber === 7) {
					this.goodsInfo.subtype  = val.id;
					this.selRadioList.classSubclassType = val.name;
					this.otherName = val.otherName;
					this.rand(this.goodsInfo.goodstypeid, this.otherName);
				}
			},
			onSelImg () { // 打开图片选择
				this.isShowImg = true;
			},
			uploadImg () { // 选择图片
				this.$API.uploadChooseImage(this.goodsInfo.code).then(res => {
					this.goodImg = res;
					this.isShowImg = false;
				});
			},
			previewImage () {  // 预览图片
				if (this.goodImg === '../../../static/err_img.png' || this.goodImg === '') {
					uni.showToast({
						title: '请先选择一张图片!',
						icon: 'none'
					});
					return;
				}
				let imgs = [this.goodImg];
				uni.previewImage({
				    urls: imgs
				});
				this.isShowImg = false;
			},
			onType (index) { // 选择颜色
				this.colorTypeInfo[index].flg = !this.colorTypeInfo[index].flg;
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
				if (index === 7 && this.goodsInfo.goodstypeid === '') {
					uni.showToast({
						title: '请选选择类别',
						icon: 'none'
					});
					return;
				}	
				this.typeNumber = index;
				this.isShowType = true;
				uni.showLoading({
					title: '加载中...'
				});
				if (index === 1) {
					this.$API.get('/fuxi/select/query-goods-type', {keyword: this.keyword}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.classTypeInfo = this.$API.fmtSelData(res.data, 11);
						}
					});
				} else if (index === 2) {
					this.$API.get('/fuxi/select/query-brand', {keyword: this.keyword}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.brandTypeInfo = this.$API.fmtSelData(res.data, 2);
						}
					});
				} else if (index === 3) {
					if (this.ageTypeInfo.length > 0) {
						uni.hideLoading();
						return;
					}
					this.$API.get('/fuxi/select/query-age').then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.ageTypeInfo = this.$API.fmtSelData(res.data, 1);
						}
					});
				} else if (index === 4) {
					if (this.seasonTypeInfo.length > 0) {
						uni.hideLoading();
						return;
					}
					this.$API.get('/fuxi/select/query-season').then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.seasonTypeInfo = this.$API.fmtSelData(res.data, 12);
						}
					});
				} else if (index === 5) {
					this.supplierPage = 1;
					this.supplierisMore = true;
					this.$API.get('/fuxi/select/query-supplier',  {keyword: this.keyword, pageNum: this.supplierPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.supplierTypeInfo = this.$API.fmtSelData(res.data.list, 13)
							if (this.supplierPage === res.data.pages) {
								this.supplierisMore = false;
							} else {
								this.supplierisMore = true;
							}
						}
					});
				} else if (index === 6) { 
					this.colorTypeInfo = [];
					this.$API.get('/fuxi/select/query-color',  {keyword: this.keyword}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							let arr =  this.$API.fmtSelData(res.data, 3);
							if (this.goodsInfo.goodscolor !== '' ) {
								let selColor = (this.goodsInfo.goodscolor).split(',');
								for (let i = 0; i < arr.length; i++) {
									let info = {id: arr[i].id, name: arr[i].name, flg: false};
									for (let j = 0; j < selColor.length; j++) {
										if (arr[i].id === selColor[j]) {
											info.flg = true;
										}
									}
									this.colorTypeInfo.push(info);
								}
							} else {
								this.colorTypeInfo =  this.$API.fmtSelData(res.data, 3);
							}
						}
					});
				} else if (index === 7) {
					if (this.goodsInfo.goodstypeid === '') {
						uni.showToast({
							title: '请选选择类别',
							icon: 'none'
						});
						return;
					}
					this.$API.get('/fuxi/select/query-goods-sub-type',  {goodsTypeId: this.goodsInfo.goodstypeid}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.classSubclassTypeInfo = this.$API.fmtSelData(res.data, 20);
						}
					});
				}
			},
			moreTypeInfo (index) { // 更新弹框信息
				 if (index === 5) {
					this.supplierPage++;
					this.$API.get('/fuxi/select/query-supplier',  {keyword: this.keyword, pageNum: this.supplierPage, pageSize: this.size}).then(res => {
						if (res.code === 'success') {
							let list = this.$API.fmtSelData(res.data.list, 13);
							this.supplierTypeInfo = this.supplierTypeInfo.concat(list);
							if (this.supplierPage === res.data.pages) {
								this.supplierisMore = false;
							} else {
								this.supplierisMore = true;
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
			save (typeRq) {
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
						title: '请选择类别',
						icon: 'none'
					});
					return;
				}
				if (this.goodsInfo.brandid === '' || this.goodsInfo.brandid === undefined || this.goodsInfo.brandid === null) {
					uni.showToast({
						title: '请选择品牌',
						icon: 'none'
					});
					return;
				}
				if (this.goodsInfo.age === '' || this.goodsInfo.age === undefined || this.goodsInfo.age === null) {
					uni.showToast({
						title: '请选择年份',
						icon: 'none'
					});
					return;
				}
				if (this.goodsInfo.season === '' || this.goodsInfo.season === undefined || this.goodsInfo.season === null) {
					uni.showToast({
						title: '请选择季节',
						icon: 'none'
					});
					return;
				}
				if (this.goodsInfo.supplierid === '' || this.goodsInfo.supplierid === undefined || this.goodsInfo.supplierid === null ) {
					uni.showToast({
						title: '请选择厂商!',
						icon: 'none'
					});
					return;
				}
				let purchasePrice = this.goodsInfo.purchaseprice;
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
				let tradePrice = this.goodsInfo.tradeprice;
				if (tradePrice !== '' && tradePrice !== undefined && tradePrice !== null ) {
					if (!pricePass(tradePrice)) {
						uni.showToast({
							title: '请输入正确的批发价!',
							icon: 'none'
						});
						return;
					}
				}
				if (this.goodsInfo.goodscolor === '') {
					uni.showToast({
						title: '请选择颜色!',
						icon: 'none'
					});
					return;
				}
				this.$API.post('/fuxi/goods/add-goods', this.goodsInfo, 'POST').then(res => {
					if (res.code === 'success') {
						this.$API.upload(this.goodsInfo.code, this.goodImg);
						if (typeRq === 2) { // 保存并收货
							uni.showToast({
								title: '保存成功!',
								icon: 'none'
							});	
							setTimeout(() => {
								let info = {
								 goodsId: res.data,
								 brandType: this.goodsInfo.brandid, brandName: this.selRadioList.brandType,
								 warehouseid: this.userInfo.departmentId, warehousedName: this.userInfo.departmentName,
								 employeeid: '', employeeName:'', 
								 age: this.goodsInfo.age, ageName: this.selRadioList.ageType,
								 seasonType: this.goodsInfo.season, seasonTypeName: this.selRadioList.seasonType,
								 supplierId: this.goodsInfo.supplierid,	supplierName: this.selRadioList.supplierType, 
								 type: this.goodsInfo.goodstypeid, typeCode: this.selRadioList.classType,
								 subClass: this.goodsInfo.model1, subName: this.selRadioList.classSubclassType,
								 otherName: this.otherName
								};
								this.$API.setStorage('fuxiSalesSend', info);
								// this.$API.to(`../../PurchasePages/selStore/selStore?id=${this.goodsInfo.supplierid}&type=4&getType=1`);
								this.$API.to(`../../PurchasePages/editGoods/editGoods?id=${res.data}&type=${this.moduleType}&getType=1`);
							}, 1000)
						} else {
							uni.showToast({
								title: '保存成功!',
								icon: 'none'
							});	
							this.isonSave = true;
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
				this.selTypeChidenItem = [];
				this.goodsId = '';
				this.url = '/fuxi/goods/add-goods';
				this.typeRq = 1;
				this.isEditGoods = true;
				this.$API.removeStorage('fuxiSalesSend');
				this.$API.removeStorage('fuxiSelasOrderInfo');
				this.getInfo();
			}
		},
		components: {
			radioItem,
			selType,
			radioItemsSearch
		}
	}
</script>

<style lang="scss">
	@import "../../../components/mixin.scss";
	.v-add-goods-view {
		width: 100%;
		overflow: hidden;
		font-size: 30upx;
		padding-bottom: 110upx;
		// 头部
		.cgh-head-con {
			width: 94%;
			overflow: hidden;
			padding: 0upx 3%;
			display: flex;
			justify-items: center;
			align-content: center;
			padding-top: 20upx;
			background: #fff;
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
					.head-val-code {
						width: 75%;
						input {
							width: 100%;
						}
					}
				}
			}
		}
		.content-right {
			width: 5%;
			margin-left: 2%;
			image {
				@include cgh-right-img();
				vertical-align: middle;
				margin-top: 30upx;
			}
		}
		.content-refresh {
			width: 12%;
			margin-left: 2%;
			image {
				width: 50upx;
				height: 50upx;
				vertical-align: middle;
				margin-top: 14upx;
			}
		}
		// 中间内容
		.v-goods-content {
			width: 100%;
			overflow: hidden;
			background: #fff;
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
					line-height: 80upx;
				}
				.v-input {
					width: 69%;
					height: 80upx;
					margin-top: 20upx;
					input {
						width: 100%;
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
			z-index: 2;
			display:  flex;
			.btn-item {
				width: 50%;
			}
			.left {
				background: orange;
			}
			.again-code {
				background: #007AFF;
			}
		}
		input {
			text-align: right;
			height: 80upx;
			line-height: 80upx;
		}
		// 弹框查看图片
		.cgh-img-alet-con {
			.alert-black  {
				@include cgh-alert-black();
			}
			.img-con {
				width: 70%;
				height: 380upx;
				position: fixed;
				overflow:auto;
				top: 30%;
				left: 15%;
				z-index: 11;
				background: #fff;
				.btn {
					width: 90%;
					height: 70upx;
					margin-left: 5%;
					background: $themeColor;
					text-align: center;
					color: #fff;
					font-size: 30upx;
					margin-top: 40upx;
					line-height: 70upx;
				}
				.btn:first-child {
					background: orange;
				}
				.btn:last-child {
					background: #0EA391;
				}
			}
		}
		.input-no {
			background: #F2F0F0;
			border: 1upx solid $boder-se;
		}
	}
</style>
