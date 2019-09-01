<template>
	<view class="v-config-view">
		<view class="company-con">
			<view class="info">
				<view class="title">厂商</view>
				<view class="value">
					<input placeholder="厂商" disabled v-model="salesSend.supplierName" />
				</view>
			</view>
			<view class="info">
				<view class="title">仓库</view>
				<view class="value">
					<input placeholder="仓库" disabled v-model="salesSend.warehousedName" />
				</view>
			</view>
			<!-- <view class="info" >
				<view class="title">经手人</view>
				<view class="value">
					<input placeholder="经手人" disabled v-model="salesSend.employeeName" />
				</view>
			</view> -->
			<view class="info" >
				<view class="title">采购类型</view>
				<view class="value">
					<input placeholder="经手人" disabled v-model="salesSend.typeCode" />
				</view>
			</view>
			<view class="info">
				<view class="title">日期</view>
				<view class="value">{{nowDate}}</view>
			</view>
			<view class="info" v-if="orderNo !== ''">
				<view class="title">单号</view>
				<view class="value">{{orderNo}}</view>
			</view>
		</view>
		<view class="list-con">
			<goodsItem :moduleType="moduleType"  :list="infoList" type="3" isCustomize="1"></goodsItem>
		</view>
		<view class="price-con"  v-if="!isAccount">
			<view class="price-info">
				<view class="title">买单金额</view>
				<view class="value"><text>¥</text>{{baseInfo.amountsum}}</view>
				<view class="des">买单折扣{{retailsalesSum}}</view>
			</view>
			<view class="price-info" @click="onselInfo(5)">
				<view class="title">支付方式</view>
				<view class="value">
					<input placeholder="支付方式" disabled v-model="selPayTypeInfo.name" />
				</view>
				<view class="des"><image src="../../../static/base/right.png"></image></view>
			</view>
			<view class="price-info">
				<view class="title">支付金额</view>
				<view class="value"><text class="pay-price">{{baseInfo.amountsum}}</text></view>
				<view class="des">抹零 <text class="mol-value">¥{{baseInfo.discountsum}}</text></view>
			</view>
			<view class="price-info">
				<view class="title">备注</view>
				<view class="memo-value">
					<input placeholder="备注"  v-model="baseInfo.memo" />
				</view>
			</view>
		</view>
		<view class="footer"  v-if="!isAccount">
			<view class="left">合计{{baseInfo.quantitysum}}<text>¥ {{baseInfo.amountsum}}</text></view>
			<view class="btn right" @click="accountPirce">结算</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button @click="goHome">回到首页</button>
		<!-- #endif -->
		<!--  -->
		<view class="footer" v-if="isAccount">
			<view class="count-btn print"><image src="../../../static/base/print.png"></image>打印</view>
			<view class="count-btn share" ><image src="../../../static/base/print.png"></image>条码打印</view>
		</view>
		
		<view  v-if="isShowStore" >
			<radioItem  :list="payTypeList" @closeAlert="closeAlert"  @okRadioValue="okInfo()"></radioItem>
		</view>
	</view>
</template>

<script>
	import goodsItem from '../../../components/goodsItem.vue';
	import radioItemsSearch from '../../../components/radioItemsSearch';
	import radioItem from '../../../components/radioItem';
	import { nullPass } from '../../../components/filter/index';
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				moduleType: 1,
				nowDate: '',
				baseInfo: {memo: '', orderamount: 0, privilegeamount: 0, receivalamount: 0},
				infoList: [ // 货品信息
					{id:1},
					{id:1}
				],
				isAccount: false,
				sizeList: [],
				retailsalesSum: 0, // 总零售额
				// 弹框选择
				isShowStore: false,
				payTypeList: [],
				selPayTypeInfo: {},
				salesSend: {} ,// 已选择的客户/店仓/经手人/类别
				orderNo: '',
			}
		},
		onBackPress(options) { 
		    if (options.from === 'navigateBack') {  
		        return false;  
		    } 
			let flg = false;
			uni.showModal({
				title: '温馨提示',
				content: '确定取消保存吗?',
				success: (res) =>  {
					if (res.confirm) {
						this.$API.tab('../../tab/main/main');
						this.$API.removeStorage('fuxiSelasOrderInfo');
						this.$API.removeStorage('fuxiSalesSend');
					} else if (res.cancel) {
					}
				}
			});
			return true;
		}, 
		onNavigationBarButtonTap(e) {
			this.$API.tab('../../tab/main/main');
		},
		onLoad (options) {
			this.moduleType = +options.type;
			this.$API.getStorage('fuxiSalesSend').then(res => {
				this.salesSend = res.data;
				if (this.moduleType == 18) {
					this.salesSend.typeCode = '采购';
					this.salesSend.type = 'purchaseType';
				}
				if (!nullPass(this.salesSend.type)) {
					uni.showToast({
						title: '请先选厂商'
					});
					this.$API.rto('../../PurchasePages/selSupplier/selSupplier?type=' + this.moduleType);
				}
			}).catch (() => {
				uni.showToast({
					title: '请先选厂商'
				});
				this.$API.rto('../../PurchasePages/selSupplier/selSupplier?type=' + this.moduleType);
			});
			// 获取当前时间
			let dd = new Date();
			let y = dd.getFullYear();
			let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
			let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
			this.nowDate =  y + '-' +  m + '-' + d;
		},
		onShow() {
			this.$API.getStorage('fuxiSelasOrderInfo').then(res => {
				this.infoList = res.data;
				this.baseInfo.amountsum  = 0;
				this.baseInfo.discountsum = 0;
				this.baseInfo.quantitysum = 0;
				let retailsalesSumStr = 0; // 总零售价
				for (let i = 0; i < this.infoList.length; i++) {
					// this.baseInfo.amountsum = parseFloat(this.baseInfo.amountsum) + parseFloat(this.infoList[i].totalPrice); 
					this.baseInfo.amountsum = this.baseInfo.amountsum + parseFloat(this.infoList[i].retailamount);
					retailsalesSumStr = retailsalesSumStr + parseFloat(this.infoList[i].retailamount); 
					this.baseInfo.quantitysum = parseInt(this.baseInfo.quantitysum) + parseInt(this.infoList[i].quantity); // 总数量
					this.baseInfo.discountsum = this.baseInfo.discountsum + ((parseFloat(this.infoList[i].retailSales) * parseInt(this.infoList[i].quantity)) - (parseFloat(this.infoList[i].retailSales) * parseInt(this.infoList[i].quantity) *  parseFloat(this.infoList[i].discountRate/10))); // 折扣额 
					this.sizeList = this.sizeList.concat(this.infoList[i].colorList);
				}
				this.baseInfo.amountsum = this.baseInfo.amountsum.toFixed(2); // 支付金额
				this.baseInfo.amountsum = this.baseInfo.amountsum.toFixed(2); // 支付金额
				if (retailsalesSumStr > 0 &&  this.baseInfo.amountsum > 0 && this.baseInfo.amountsum <  retailsalesSumStr) {
					this.retailsalesSum = ((this.baseInfo.amountsum / retailsalesSumStr) * 10).toFixed(2); // 总买单折扣
				} else {
					this.retailsalesSum = 10;
				}
				this.baseInfo.discountsum = this.baseInfo.discountsum.toFixed(2); // 折扣额
				this.baseInfo.receivalamount = this.baseInfo.amountsum; // 收款金额
				if (this.moduleType === 5) { // 销售退货单转成负数
					this.baseInfo.amountsum = '-' + this.baseInfo.amountsum;
					this.baseInfo.discountsum = '-' + this.baseInfo.discountsum;
					this.baseInfo.quantitysum   = '-' + this.baseInfo.quantitysum ;
					this.baseInfo.privilegeamount  = '-' + this.baseInfo.privilegeamount;
					for (let i = 0; i < this.sizeList.length; i++) {
						this.sizeList[i].amount = '-' + this.sizeList[i].amount;
						this.sizeList[i].discount  = '-' + this.sizeList[i].discount;
						this.sizeList[i].quantity  = '-' + this.sizeList[i].quantity;
						this.sizeList[i].x1 = '-' + this.sizeList[i].x1;
						this.sizeList[i].x2 = '-' + this.sizeList[i].x2;
						this.sizeList[i].x3 = '-' + this.sizeList[i].x3;
						this.sizeList[i].x4 = '-' + this.sizeList[i].x4;
						this.sizeList[i].x5 = '-' + this.sizeList[i].x5;
						this.sizeList[i].x6 = '-' + this.sizeList[i].x6;
						this.sizeList[i].x7 = '-' + this.sizeList[i].x7;
						this.sizeList[i].x8 = '-' + this.sizeList[i].x8;
						this.sizeList[i].x9 = '-' + this.sizeList[i].x9;
					}
				}
			});
		},
		methods: {
			goHome () { // 回到首页
				this.$API.tab('../../tab/main/main');
			},
			addGoods () {
				this.$API.rto(`../../sale/invoice/invoice?type=${this.moduleType}`);
			},
			accountPirce () { // 结算
				this.baseInfo.supplierid = this.salesSend.supplierId;
				this.baseInfo.departmentid = this.salesSend.warehouseid;
				this.baseInfo.employeeid = this.salesSend.employeeid;
				this.baseInfo.type  = this.salesSend.type;
				let salesInfo = {}
				if (this.moduleType === 4 || this.moduleType === 18) { // 采购发货单
					salesInfo = {purchaseDTO: this.baseInfo, purchaseDetailTempDTOs: this.sizeList};
				} else if (this.moduleType === 5) { // 采购退货单
					salesInfo = {purchaseDTO: this.baseInfo, purchaseDetailTempDTOs : this.sizeList};
				}
				uni.showLoading({
					title: '正在保存...',
					duration: 2000
				});
				let url = '';
				if (this.moduleType === 4 || this.moduleType === 18) { //采购发货单
					url = '/fuxi/purchase/add-purchase';
				} else if (this.moduleType === 5) { // 采购退货单
					url = '/fuxi/purchase/add-purchase-return';
				} 
				this.$API.post(url, salesInfo).then(res => {
					if (res.code === 'success') {
						uni.hideLoading();
						uni.showToast({
							title: '保存成功!',
							icon: 'none'
						});
						this.orderNo = res.data;
						this.$API.removeStorage('fuxiSelasOrderInfo');
						this.$API.removeStorage('fuxiSalesSend');
						this.isAccount = true;
					}
				});
				
			},
			closeAlert () { // 关闭弹框
				this.isShowStore = false;
			},
			search (str) { // 弹框搜索
				this.keyWord = str;
				this.onselInfo(this.onStoreType);
			},
			onselInfo (type) { //弹框选择
				if (this.isAccount) {
					return;
				}
				this.onStoreType = type;
				uni.showLoading({
					title: '加载中...',
					duration: 2000
				});
				this.$API.get('/fuxi/select/query-payment-Type').then(res => {
					uni.hideLoading();
					if (res.code === 'success') {
						this.payTypeList = this.$API.fmtSelData(res.data, 18);
						this.isShowStore = true;
						this.$API.removeStorage('fuxiSelasOrderInfo');
					}
				});
			},
			okInfo (val) {// 确认选择店仓分类
				this.isShowStore = false;
				this.selPayTypeInfo = val;
			}
		},
		components: {
			goodsItem,
			radioItemsSearch,
			radioItem
		}
	}
</script>

<style lang="scss">
	@import "../../../components/mixin.scss";
	.v-config-view {
		.company-con {
			width: 100%;
			overflow: hidden;
			background: #fff;
			.info {
				display: flex;
				align-items: center;
				padding: 20upx 0upx;
				font-size: 32upx;
				border-bottom: 1upx solid $boder-se;
				.title {
					width: 16%;
					color: #999;
					margin-left: 3%;
				}
				.value {
					width: 72%;
					color: #333;
					font-weight: bold;
					input {
						width: 98%;
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
		.price-con {
			width: 100%;
			overflow: hidden;
			background: #fff;
			margin-top: 20px;
			margin-bottom: 100upx;
			.price-info {
				display: flex;
				align-items: center;
				padding: 20upx 0upx;
				font-size: 30upx;
				border-bottom: 1upx solid $boder-se;
				color: #999;
				.title {
					width: 20%;
					color: #999;
					margin-left: 3%;
				}
				.value {
					width: 40%;
					text-align: left;
					font-size: 34upx;
					color: #333;
				}
				.pay-price {
					color: #333;
					font-weight: bold;
				}
				.des {
					width: 33%;
					text-align: right;
					image {
						@include cgh-right-img();
						vertical-align: middle
					}
				}
				.memo-value {
					width: 100%;
					color: #333;
					input {
						width: 95%;
					}
				}
			}
		}
		.footer {
			width: 100%;
			height: 100upx;
			background: #fff;
			border-top: 1upx solid $boder-se;
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			z-index: 2;
			line-height: 100upx;
			.left {
				margin-left: 2%;
				width: 50%;
				font-size: 28upx;
				color: #333;
				text {
					padding-left: 20upx;
					@include default-price(38upx, bold);
				}
			}
			.btn {
				width: 50%;
				font-size: 30upx;
				text-align: center;
				color: #fff;
			}
			.main {
				background: $themeColor;
			}
			.right {
				background: orange;
			}
			.count-btn {
				width: 100%;
				background: $themeColor;
				color: #fff;
				text-align: center;
				image {
					width: 60upx;
					height: 50upx;
					vertical-align: middle;
				}
			}
			.count-btn:first-child {
				border-right: 1upx solid #999;
			}
		}
	}
</style>
