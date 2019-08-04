<template>
	<view class="v-config-view">
		<view class="company-con">
			<view class="info" @click="onselInfo(1)">
				<view class="title">客户</view>
				<view class="value">
					<input placeholder="客户" disabled v-model="selCustomerInfo.name" />
				</view>
				<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="info"  @click="onselInfo(2)">
				<view class="title">仓库</view>
				<view class="value">
					<input placeholder="仓库" disabled v-model="selStoreInfo.name" />
				</view>
				<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="info"  @click="onselInfo(3)">
				<view class="title">经手人</view>
				<view class="value">
					<input placeholder="经手人" disabled v-model="selEmployeerInfo.name" />
				</view>
				<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="info"  @click="onselInfo(4)">
				<view class="title">类别</view>
				<view class="value">
					<input placeholder="类别 " disabled v-model="selSalesTypeInfo.name" />
				</view>
				<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
			<view class="info">
				<view class="title">日期</view>
				<view class="value">{{nowDate}}</view>
				<view class="add-right"><image class="base-right" src="../../../static/base/right.png"></image></view>
			</view>
		</view>
		<view class="list-con">
			<goodsItem :list="infoList" type="3" isCustomize="1" @toPath="goEditGoods"></goodsItem>
		</view>
		<view class="price-con"  v-if="!isAccount">
			<view class="price-info">
				<view class="title">买单金额</view>
				<view class="value"><text>¥</text>{{baseInfo.amountsum}}</view>
				<view class="des">买单折扣10</view>
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
				<view class="value"><text class="pay-price">¥{{baseInfo.amountsum}}</text></view>
				<view class="des">抹零 <text class="mol-value">  ¥{{baseInfo.clearZero}}</text></view>
			</view>
			<view class="price-info">
				<view class="title">备注</view>
				<view class="value">{{baseInfo.memo}}</view>
			</view>
		</view>
		<view class="footer"  v-if="!isAccount">
			<view class="left">合计{{baseInfo.quantitysum}}<text>¥ {{baseInfo.amountsum}}</text></view>
			<view class="btn main">追加货品</view>
			<view class="btn right" @click="accountPirce">结算</view>
		</view>
		<view class="footer" v-if="isAccount">
		<!-- 	<view class="count-btn print"><image src="../../../static/base/print.png"></image>打印</view> -->
			<view class="count-btn share"><image src="../../../static/base/share.png"></image>分享</view>
		</view>
		<view  v-if="isShowStore" >
			<radioItemsSearch  v-if="onStoreType  === 1" :list="customerList" :keyWord="keyWord"  title="选择客户" placeholderTitle="关键字搜索" @closeAlert="closeAlert" @search="search" @okRadioValue="okInfo()" :moreType="onStoreType"  :isPage="isPage" :isMore="customerMore"   @moreTypeInfo="moreTypeInfo"  ></radioItemsSearch>
			<radioItemsSearch  v-if="onStoreType  === 2" :list="storeList" :keyWord="keyWord"  title="选择店仓" placeholderTitle="店仓/编码/店仓名称"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo()" :moreType="onStoreType"  :isPage="isPage" :isMore="storePage"   @moreTypeInfo="moreTypeInfo"  ></radioItemsSearch>
			<radioItemsSearch  v-if="onStoreType  === 3" :list="employeeList" :keyWord="keyWord"  title="选择经手人" placeholderTitle="关键字搜索"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo()" :moreType="onStoreType"  :isPage="isPage" :isMore="employeeMore"   @moreTypeInfo="moreTypeInfo"></radioItemsSearch>
			<radioItem v-if="onStoreType === 4"  :list="salesTypeList" @closeAlert="closeAlert"  @okRadioValue="okInfo()"></radioItem>
			<radioItem v-if="onStoreType === 5"  :list="payTypeList" @closeAlert="closeAlert"  @okRadioValue="okInfo()"></radioItem>
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
				baseInfo: {memo: '', orderamount: 0, privilegeamount: 0, receivalamount: 0},
				infoList: [ // 货品信息
					{id:1},
					{id:1}
				],
				isAccount: false,
				sizeList: [],
				// 弹框选择
				isShowStore: false,
				onStoreType: 0,
				customerList: [],
				storeList: [],
				employeeList: [],
				salesTypeList: [],
				payTypeList: [],
				selCustomerInfo: {},
				selStoreInfo: {},
				selEmployeerInfo: {},
				selSalesTypeInfo: {},
				selPayTypeInfo: {},
				keyWord: '',
				// 弹框分页
				isPage: true,
				size: 10,
				customerPage: 1,  // 客户
				customerMore: true,
				storePage: 1,  // 店仓
				storeMore: true,
				employeePage: 1,  // 负责人
				employeeMore: true,
				nowDate: '',
			}
		},
		onNavigationBarButtonTap(e) {
			this.$API.tab('../../tab/main/main');
		},
		onLoad() {
			// 获取当前时间
			let dd = new Date();
			let y = dd.getFullYear();
			let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
			let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
			this.nowDate =  y + '-' +  m + '-' + d;
		},
		computed: {
			...mapState(['sales'])
		},
		onShow() {
			this.$API.getStorage('fuxiSelasOrderInfo').then(res => {
				this.infoList = res.data;
				this.baseInfo.amountsum  = 0;
				this.baseInfo.discountsum = 0;
				this.baseInfo.quantitysum = 0;
				for (let i = 0; i < this.infoList.length; i++) {
					this.baseInfo.amountsum = parseFloat(this.baseInfo.amountsum ) + parseFloat(this.infoList[i].totalPrice);
					this.baseInfo.discountsum = parseFloat(this.baseInfo.discountsum) + parseFloat(this.infoList[i].discount);
					this.baseInfo.quantitysum = parseInt(this.baseInfo.quantitysum) + parseInt(this.infoList[i].quantity);
					this.sizeList = this.sizeList.concat(this.infoList[i].colorList);
				}
				this.baseInfo.amountsum = this.baseInfo.amountsum.toFixed(2);
				this.baseInfo.discountsum = this.baseInfo.discountsum.toFixed(2);
				this.baseInfo.receivalamount = this.baseInfo.amountsum;
				this.baseInfo.clearZero = parseInt(this.baseInfo.amountsum);
				
			});
		},
		methods: {
			goEditGoods (id) {
				this.$API.to(`../../sale/editGoods/editGoods?id=${id}`);
			},
			accountPirce () { // 结算
				if (!nullPass(this.selCustomerInfo.id)) {
					uni.showToast({
						title: '客户不能为空!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.selStoreInfo.id)) {
					uni.showToast({
						title: '仓库不能为空!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.selEmployeerInfo.id)) {
					uni.showToast({
						title: '经手人不能为空!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.selSalesTypeInfo.id)) {
					uni.showToast({
						title: '类别不能为空!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.selPayTypeInfo.id)) {
					uni.showToast({
						title: '支付方式不能为空!',
						icon: 'none'
					});
					return;
				} 
				this.baseInfo.customerid = this.selCustomerInfo.id;
				this.baseInfo.warehouseid = this.selCustomerInfo.departmentId;
				this.baseInfo.departmentid = this.selCustomerInfo.departmentId;
				this.baseInfo.employeeid = this.selEmployeerInfo.id;
				this.baseInfo.paymenttypeid = this.selPayTypeInfo.id;
				this.baseInfo.type  = this.selSalesTypeInfo.id;
				let salesInfo = {salesDTO: this.baseInfo, salesDetailTempDTOs: this.sizeList};
				uni.showLoading({
					title: '正在保存...',
					duration: 2000
				});
				console.log(salesInfo);
				this.$API.post('/fuxi/sales/add-sales', salesInfo).then(res => {
					if (res.code === 'success') {
						uni.hideLoading();
						uni.showToast({
							title: '保存成功!',
							icon: 'none'
						});
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
				if (type === 1) { // 客户
					this.employeePage = 1;
					this.employeeMore = true;
					this.$API.get('/fuxi/select/query-customer',  {keyword: this.keyWord, pageNum: this.customerPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.customerList = this.$API.fmtSelData(res.data.list, 4);
							this.isShowStore = true;
							if (this.customerPage === res.data.pages) {
								this.customerMore = false;
							} else {
								this.customerMore = true;
							}
						}
					});
				} else if (type === 2) { // 仓库
					this.storePage = 1;
					this.storeMore = true;
					this.$API.get('/fuxi/select/query-warehouse', {keyword: this.keyWord, pageNum: this.storePage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.storeList = this.$API.fmtSelData(res.data.list, 14);
							this.isShowStore = true;
							if (this.departmentPage === res.data.pages) {
								this.departmentMore = false;
							} else {
								this.departmentMore = true;
							}
						}
					});
				} else if (type === 3) { // 经手人
					this.employeePage = 1;
					this.employeeMore = true;
					this.$API.get('/fuxi/select/query-employee',  {keyword: this.keyWord, pageNum: this.employeePage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.employeeList = this.$API.fmtSelData(res.data.list, 10);
							this.isShowStore = true;
							if (this.employeePage === res.data.pages) {
								this.employeeMore = false;
							} else {
								this.employeeMore = true;
							}
						}
					});
				} else if (type === 4) { // 销售类型
					this.$API.get('/fuxi/select/query-sales-Type').then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.salesTypeList = this.$API.fmtSelData(res.data, 17);
							this.isShowStore = true;
						}
					});
				} else if (type === 5) { // 支付方式
					this.$API.get('/fuxi/select/query-payment-Type').then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.payTypeList = this.$API.fmtSelData(res.data, 18);
							this.isShowStore = true;
						}
					});
				}
				
			},
			moreTypeInfo (index) { // 更新弹框信息
				uni.showLoading({
					title: '加载中...',
				});
				 if (index === 1) { // 客户
					this.customerPage++;
					this.$API.get('/fuxi/select/query-customer',  {keyword: this.keyWord, pageNum: this.customerPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							let list = this.$API.fmtSelData(res.data.list, 4);
							this.customerList = this.customerList.concat(list);
							if (this.customerPage === res.data.pages) {
								this.customerMore = false;
							} else {
								this.customerMore = true;
							}
						}
					});
				} else if (index === 2) { // 仓库
					this.storePage++;
					this.$API.get('/fuxi/select/query-warehouse', {keyword: this.keyWord, pageNum: this.storePage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							let list = this.$API.fmtSelData(res.data.list, 14);
							this.storeList = this.storeList.concat(list);
							if (this.storePage === res.data.pages) {
								this.departmentMore = false;
							} else {
								this.departmentMore = true;
							}
						}
					});
				} else if (index === 3) { // 经手人
					this.employeePage++;
					this.$API.get('/fuxi/select/query-employee', {keyword: this.keyWord, pageNum: this.employeePage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							let list = this.$API.fmtSelData(res.data.list, 10);
							this.employeeList = this.employeeList.concat(list);
							if (this.employeePage === res.data.pages) {
								this.employeeMore = false;
							} else {
								this.employeeMore = true;
							}
						}
					});
				} 
			},	
			okInfo (val) {// 确认选择店仓分类
				this.isShowStore = false;
				if (this.onStoreType === 1) {
					this.selCustomerInfo = val;
				} else if (this.onStoreType === 2){
					this.selStoreInfo = val;
				} else if (this.onStoreType ===3){
					this.selEmployeerInfo = val;
				} else if (this.onStoreType === 4){
					this.selSalesTypeInfo = val;
				} else if (this.onStoreType === 5){
					this.selPayTypeInfo = val;
				}
			},
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
				width: 25%;
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
