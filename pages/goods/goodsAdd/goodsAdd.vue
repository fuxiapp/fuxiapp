<template>
	<view class="v-add-goods-view">
		<view class="v-goods-detail-top">
			<view class="v-goods-img">
				<image :src="goodImg" @click="uploadImg"></image>
			</view>
			<view class="v-goods-title">
				<view class="v-goods-title-item">
					<view class="v-input-title">
						<text class="mark">*</text>
						<text>货号</text>
					</view>
					<view class="v-input">
						<input type="text" v-model="goodsInfo.code" maxlength="200" />
					</view>
				</view>
				<view class="v-goods-title-item">
					<view class="v-input-title">
						<text class="mark">*</text>
						<text>品名</text>
					</view>
					<view class="v-input">
						<input type="text" v-model="goodsInfo.name" />
					</view>
				</view>
				<view class="v-goods-title-item" @click="opentType(1)">
					<view class="v-input-title">
						<text class="mark">*</text>
						<text>类别</text>
					</view>
					<view class="v-input">
						<input type="text" placeholder="请选择分类" v-model="selRadioList.classType" disabled="true" />
					</view>
					<view class="v-right">
						<image class="top-right" src="../../../static/base/right.png"></image>
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
					<image class="base-right" src="../../../static/base/right.png"></image>
				</view>
			</view>
			<view class="v-goods-brand" @click="opentType(3)">
				<view class="v-input-title">
					<text>年份</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择年份"  v-model="selRadioList.ageType" disabled="true" />
					<image class="base-right" src="../../../static/base/right.png"></image>
				</view>
			</view>
			<view class="v-goods-brand" @click="opentType(4)">
				<view class="v-input-title">
					<text>季节</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择季节"  v-model="selRadioList.seasonType" disabled="true" />
					<image class="base-right" src="../../../static/base/right.png"></image>
				</view>
			</view>
			<view class="v-goods-brand" @click="opentType(5)">
				<view class="v-input-title">
					<text>厂商</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择厂商"  v-model="selRadioList.supplierType" disabled="true" />
					<image class="base-right" src="../../../static/base/right.png"></image>
				</view>
			</view>
			<view class="v-goods-supplier-code">
				<view class="v-input-title">
					<text>厂商货号</text>
				</view>
				<view class="v-input">
					<input type="text" v-model="goodsInfo.suppliercode" />
				</view>
			</view>
			<view class="v-goods-purchase-price">
				<view class="v-input-title">
					<text>进货价</text>
				</view>
				<view class="v-input">
					<input type="text"  v-model="goodsInfo.purchaseprice" />
				</view>
			</view>
			<view class="v-goods-retail-sales">
				<view class="v-input-title">
					<text>零售价</text>
				</view>
				<view class="v-input">
					<input type="text" v-model="goodsInfo. retailsales" />
				</view>
			</view>
			<view class="v-goods-trade-price">
				<view class="v-input-title">
					<text>批发价</text>
				</view>
				<view class="v-input">
					<input type="text" v-model="goodsInfo.tradeprice" />
				</view>
			</view>
			<view class="v-goods-brand" @click="opentType(6)">
				<view class="v-input-title">
					<text>颜色</text>
				</view>
				<view class="v-input">
					<input type="text" placeholder="请选择颜色"  v-model="selRadioList.colorType" disabled="true" />
					<image class="base-right" src="../../../static/base/right.png"></image>
				</view>
			</view>
		</view>
		<view class="v-save" @click="save" >
			<text>保存</text>
		</view>
		<!-- 单选 -->
		<view v-if="isShowType">
			<radioItem v-if="typeNumber === 1" :list="classTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 2" :list="brandTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 3" :list="ageTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 4" :list="seasonTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 5" :list="supplierTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
			<radioItem v-if="typeNumber === 6" :list="colorTypeInfo" @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
		</view>
	</view>
</template>

<script>
	import radioItem from '../../../components/radioItem.vue';
	export default {
		data() {
			return {
				goodImg: '/static/image/pic.jpg',
				goodsInfo: {
					goodsCode: '',
					goodsName: '',
					goodsType: '',
					goodsBrand: '',
					goodsYear: '',
					goodsSeason: '',
					supplier: '',
					supplierCode: '101010101',
					purchasePrice: '99.5',
					retailSales: '108',
					tradePrice: '102',
					goodsColor: '红色',
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
				typeNumber: 1
				
			}
		},
		methods: {
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
					this.goodsInfo.suppliercode = val.id;
					this.selRadioList.supplierType = val.name;
				} else if (this.typeNumber === 6) {
					this.goodsInfo.colorid = val.id;
					this.selRadioList.colorType = val.name;
				}
			},
			uploadImg () { // 上传图片
				this.$API.upload().then(res => {
					this.goodImg = res.imageSrc;
				});
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
			save () {
				this.$API.post(' /fuxi/goods/add-goods', {goodsDTO: this.goodsInfo}).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});	
						this.$API.tab('../../tab/main/main');
					}
				});
			}
		},
		components: {
			radioItem
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
		.top-right {
			padding-bottom: 25upx;
			padding-right: 20upx;
			@include cgh-right-img();
		}
		.base-right {
				margin-left: 20upx;
				@include cgh-right-img();
		}
		.v-goods-detail-top {
			display: flex;
			flex-direction: row;
			height: 240upx;
			width: 100%;
			padding: 10upx 0upx;
			border-bottom: 2upx solid #F6F6F6;
			background-color: #FFFFFF;
		}
		
		.v-goods-img {
			margin-left: 15upx;
			height: 240upx;
			width: 35%;
		}
		
		.v-goods-img image {
			width: 100%;
			height: 100%;
			border: 1upx solid #F6F6F6;
		}
		
		.v-goods-title {
			height: 240upx;
			width: 65%;
		}
		
		.v-goods-title view {
			height: 80upx;
			line-height: 80upx;
			border-bottom: 2upx solid #F6F6F6;
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			justify-content: flex-end;
		}
		.v-goods-title view:last-child {
			border-bottom: 0upx;
		}
		.v-goods-title view:nth-of-type(1) {
			border-bottom: 0upx;
		}
		.v-input-title {
			width: 20%;
			margin-left: 15upx;
		}
		
		.v-input {
			width: 80%;
			margin-right: 30upx;
			text-align: right;
			input {
				width: 92%;
			}
		}
		
		.mark {
			color: red;
		}
		
		.v-goods-content {
			background-color: #FFFFFF;
			margin-top: 15upx;
			margin-bottom: 180upx;
		}
		
		.v-goods-content view {
			height: 100upx;
			width: 100%;
			line-height: 100upx;
			border-bottom: 2upx solid #F6F6F6;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
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
