<template>
	<view class="v-edit-goods-view">
		<view class="con goods-base-info">
			<view class="img"><image @error="handleError" :src="goodsInfo.image"></image></view>
			<view class="info">
				<view class="name">{{goodsInfo.goodsName}}</view>
				<view class="no">{{goodsInfo.goodsCode}}</view>
				<view class="prices">
					<text class="there">¥</text>
					<text class="org" @click="openUpPrice(1)" v-if="goodsInfo.morePrice === ''">0</text>
					<text class="org" @click="openUpPrice(1)" v-if="goodsInfo.morePrice !== ''">{{goodsInfo.unitPrice}}</text>
					<image @click="onMore()" src="../../../static/base/time.png"></image>
					<text class="sel-more" @click="onMore()">更多价格</text>
				</view>
				<view class="name"  @click="openUpPrice(2)">
					<text class="there">折扣</text>
					<text class="org" v-if= "goodsInfo.discountRate === ''">1</text>
					<text class="org" v-if= "goodsInfo.discountRate !== ''">{{goodsInfo.discountRate}}</text>
				</view>
			</view>
		</view>
		<view class="con numbers">
			<view>	批量设置	</view>
			<view><input v-model="allNumber" type="number"  @blur="inputBlur(1)" placeholder="数量" /></view>
			<view>(件)</view>
			<view>
				<image @click="allLess" src="../../../static/base/lessS.png"></image>
				<image @click="allAdd" src="../../../static/base/addS.png"></image>
			</view>
		</view>
		<view class="color-con">
			<view  v-for="(v, index) in colorList"  :class="index === selColorIndex ? 'color-item check-color':'color-item'" :key="index" @click="onColor(index)" >
				<view class="name">{{v.colorName}}</view>
				<view class="number" v-if="v.quantity > 0">-{{v.quantity}}</view>
			</view>
		</view>
		<view class="info-con">
			<view class="title">
				<view class="cgh-size">尺寸</view>
				<view class="cgh-number">数量</view>
			</view>
			<view class="info-details">
				<view class="list" v-for="(v, index) in sizeList" :key="index">
					<view  class="cgh-size">{{v.sizeName}}</view>
					<view class="cgh-number">
						<view class="less" @click="less(index)">-</view>
						<view class="one-number-con">
							<view class="one-less">-</view>
							<view class="one-number"><input type="number" v-model="v.quantity" @input="inputBlur(2, index)" @blur="inputBlur(2, index)"  placeholder="数量"/></view>
						</view>
						<view class="add" @click="add(index)">+</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="more-con" v-if="isShowMore">
			<!-- <view class="company">
				<image src="../../../static/base/sjx.png"></image>
				<text>张家界</text>上次销售价
			</view> -->
			<view class="price-con" v-for="(v, index) in morePriceList" :key="index">
				{{v}}
			</view>
		</view>
		<view v-if="isShowPrice">
			<view class="upate-price">
				<view class="title">{{upTitle}}</view>
				<view class="input-con">
					<input v-model="price" type="number" placeholder="请输入价格" />
				</view>
				<view class="btn">
					<view class="cel" @click="isShowPrice = false">取消</view>
					<view class="config" @click="okPirce">确定</view>
				</view>
			</view>
			<view class="cgh-alert-black" @click="isShowPrice = false"></view>
		</view>
		<view class="one-btn" v-if= "moduleType === 7"  @click="toPath">
			确定
		</view>
		<view class="footer" v-else>
			<view class="left">-{{totalNumber}}件<text>¥ -{{totalPrice}}</text></view>
			<view class="right" @click="toPath">确定</view>
		</view>
		
	</view>
</template>
<script>
	import {mapState,mapMutations} from 'vuex';
	import { nullPass } from '../../../components/filter/index';
	export default {
		data() {
			return {
				goodsInfo: {price: 689.00, discount: 10}, // 货品基本信息
				colorList: [], // 颜色
				sizeList: [], // 尺码
				colorAndSize: [],
				morePriceList: [], // 更多价格
				numberS: [],
				allNumber: 1,
				isShowMore: false,
				price: 0,
				isShowPrice: false,
				priceType: 0,
				upTitle: '修改价格',
				moduleType: 0,
				id: '019W7',
				selColorIndex: 0, // 选中的颜色  
				selColorItem: [],
				totalNumber:  0, // 总数量
				totalPrice: 0, // 折后价格
				strogeInfo: [], // 已选择的货品信息
				salesSend:  {},
				getType: 1, // 1: 货品点击 2: 扫描
				fuxiSelasOrderInfo: [], // 已添加的货品
				stockFlag: 1, // 是否查询库存
			}
		},
		onBackPress(options) {  
		    if (options.from === 'navigateBack') {  
		        return false;  
		    } 
			this.$API.to('../../sale/invoice/invoice');
		    return true;  
		}, 	
		onLoad(option) {
			this.id = option.id;
			let type = option.type;
			this.getType = +option.getType;
			this.moduleType = +option.type;
			this.goodsInfo.price = this.decimalNumber(this.goodsInfo.price);
			this.$API.getStorage('fuxiSalesSend').then(res => {
				this.salesSend = res.data;
				if (!nullPass(this.salesSend.supplierId)) {
					uni.showToast({
						title: '请先厂商!'
					});
					this.$API.rto(`../../PurchasePages/selSupplier/selSupplier?type=${this.moduleType}`);
				}
				this.getByIdInfo();
			}).catch (() => {
				uni.showToast({
					title: '请先厂商!'
				});
				this.$API.rto(`../../PurchasePages/selSupplier/selSupplier?type=${this.moduleType}`);
			});
			this.$API.getStorage('fuxiSelasOrderInfo').then(res => {
				this.fuxiSelasOrderInfo = res.data;
			});
			
		},
		methods: {
			...mapMutations(['changeSales']),
			getByIdInfo () { // 获取详情信息
				uni.showLoading({
					title: '加载中...'
				});
				let para = {supplierId: this.salesSend.supplierId, goodsId: this.id, barcode: ''};
				if (this.getType === 2) { // 条形码识别
					para = {supplierId: this.salesSend.supplierId, goodsId: '', barcode: this.id};
				} 
				this.$API.get('/fuxi/barcode/barcode-parsing-purchase', para, 'POST').then(res => {
					uni.hideLoading();
					if (res.code === 'success') {
						this.goodsInfo = res.data;
						if (this.goodsInfo.discountRate  === '' || this.goodsInfo.discountRate === null) { 
							this.goodsInfo.discountRate = 1;
						}
						this.morePriceList = res.data.morePrice;
						this.goodsInfo.image = this.$URL + this.goodsInfo.goodsCode + '.jpg';
						this.colorList = res.data.colors;
						this.sizeList = this.colorList[0].sizes;
					}
				});
			},
			handleError () { // 图片错误
				this.goodsInfo.image = '../../../static/err_img.png'; 
			},
			toPath () {
				if (this.moduleType === 7) {
					this.$API.rto(`../../sale/addGoodsConfig/addGoodsConfig?id=${this.id}&type=${this.moduleType}`);
				} else { // 销售发货单
					let selInfoList = [];
					for (let j = 0; j < this.colorList.length; j++) {
						let flg = false;
						let colorS = {};
						// 计算某个size
						colorS.amount = this.totalPrice; 
						colorS.colorid = this.colorList[j].colorId;
						colorS.discountrate  = this.goodsInfo.discountRate;
						colorS.goodsid = this.goodsInfo.goodsId;
						colorS.quantity = this.colorList[j].quantity;
						colorS.unitprice  = this.goodsInfo.unitPrice; 
						colorS.discount = 0;
						colorS.retailsales =  this.goodsInfo.retailSales;
						for (let i = 0; i < this.colorList[j].sizes.length; i++) {
							let s = this.colorList[j].sizes[i].quantity;
							if (s !== '' && s !== null && parseInt(s) > 0) {
								flg = true;	
							} else {
								s = 0;
							}
							switch (i) {
								case 0:
									colorS.x1 = s;
									continue;
								case 1:
									colorS.x2 = s;
									continue;
								case 2:
									colorS.x3 = s;
									continue;
								case 3:
									colorS.x4 = s;
									continue;
								case 4:
									colorS.x5 = s;
									continue;
								case 5:
									colorS.x6 = s;
									continue;
								case 6:
									colorS.x7 = s;
									continue;
								case 7:
									colorS.x8 = s;
									continue;
								case 8:
									colorS.x9 = s;
									continue;
							}
						}
						if (flg) {
							selInfoList.push(colorS);
						}
					}
					if (selInfoList.length === 0) {
						uni.showToast({
							title: '请选择添加一个数量!',
							icon: 'none'
						});
						return;
					}
					let retailamount = (parseFloat(this.goodsInfo.retailSales) * parseInt(this.totalNumber)).toFixed(2);
					let info = {discountRate: this.goodsInfo.discountRate, retailamount: retailamount, retailSales: this.goodsInfo.retailSales ,goodsid: this.id, code: this.goodsInfo.goodsCode, totalPrice: this.totalPrice , retailSales: this.goodsInfo.retailSales,  image: this.goodsInfo.image ,name: this.goodsInfo.goodsName, price: this.goodsInfo.unitPrice, quantity: this.totalNumber, discountrate: this.goodsInfo.discountrate,  colorList: selInfoList};
					this.fuxiSelasOrderInfo.push(info);
					this.$API.setStorage('fuxiSelasOrderInfo', this.fuxiSelasOrderInfo);
					this.$API.rto( `../../PurchasePages/saleComfig/saleComfig?id=${this.id}&type=${this.moduleType}`);
					// this.$API.to(`../../sale/saleComfig/saleComfig?id=${this.id}&type=${this.moduleType}`);
				}
			},
			allAdd () { // 批量添加数量
				this.allNumber++;
			},
			allLess () { // 批量减少数量
				if (this.allNumber < 2) {
					return;
				}
				this.allNumber--;
			},
			add (index)  { // 单个数量加
				this.sizeList[index].quantity = parseInt( this.sizeList[index].quantity) + parseInt(this.allNumber);
				this.computeAll();
			},
			less (index) { // 单个数量减
				if (parseInt(this.sizeList[index].quantity) < 1) { 
					uni.showToast({
						title: '数量不能小于-0!',
						icon: 'none'
					});
					return;
				}
				if (parseInt(this.sizeList[index].quantity) <= parseInt(this.allNumber)) {
					this.sizeList[index].quantity--;
				} else {
					this.sizeList[index].quantity = parseInt(this.sizeList[index].quantity) - parseInt(this.allNumber);
				}
				this.computeAll();
			},
			computeAll () { // 计算总数量
				let temp = 0;
				for (let i = 0; i < this.sizeList.length; i++) {
					if (this.sizeList[i].quantity !== '' && this.sizeList[i].quantity !== null && parseInt(this.sizeList[i].quantity) > 0) {
						temp = temp + parseInt(this.sizeList[i].quantity);
					}
				}
				this.totalNumber = totalTemp;
				this.colorList[this.selColorIndex].quantity = temp;
				this.colorList[this.selColorIndex].sizeList = this.sizeList;
				let totalTemp = 0;
				for (let j = 0; j < this.colorList.length; j++) {
					for (let i = 0; i < this.colorList[j].sizes.length; i++) {
						let s = this.colorList[j].sizes[i].quantity;
						if (s !== '' && s !== null && parseInt(s) > 0) {
							totalTemp = totalTemp + parseInt(s);
						}
					}
				}
				this.totalNumber = totalTemp;
				let totalPriceTemp = 0;
				for (let j = 0; j < this.colorList.length; j++) {
					for (let i = 0; i < this.colorList[j].sizes.length; i++) {
						let s = this.colorList[j].sizes[i].quantity;
						if (s !== '' && s !== null && parseInt(s) > 0) {
							totalPriceTemp = totalPriceTemp + parseFloat(this.goodsInfo.retailSales) * s;
						}
					}
				}
				if (this.goodsInfo.discountRate > 0 || this.goodsInfo.discountRate < 10) { 
					totalPriceTemp =  (totalPriceTemp * parseFloat((this.goodsInfo.discountRate / 10)));
				}
				this.totalPrice = (totalPriceTemp).toFixed(2);
			},
			inputBlur (type, index) { // 输入框失去焦点的时候
				if (type === 1) {
					if (this.allNumber > 1 || this.allNumber === '' || this.allNumber === null) {
						this.allNumber = 1;
					}
				} else if (type === 2) {
					let val = this.sizeList[index].quantity;
					let reg = /^(0|[1-9][0-9]*)$/;
					if (!reg.test(val)) { 
						this.sizeList[index].quantity = 0;
						 uni.showToast({
						 	title: '请输入正确的数量!',
						 	icon: 'none',
						 	mask: true
						 });
					} 
					this.computeAll();
				}
			},
			openUpPrice (type) { 
				this.isShowMore = false;
				this.isShowPrice = true;
				this.priceType = type;
				if (type === 1) {
					 this.price = this.goodsInfo.unitPrice;
					this.upTitle = '修改价格';
				} else if (type === 2) {
					 this.price = this.goodsInfo.discountRate;
					this.upTitle = '修改折扣';
				}
			},
			okPirce () { // 修改价格
				if (this.priceType === 1) {
					if (this.price !== '' && this.price !== null && parseFloat(this.price) > 0) {
						let reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
						if (!reg.test(this.price)) {
							this.goodsInfo.unitPrice = this.goodsInfo.unitPrice;
						} else {
							this.goodsInfo.unitPrice = parseFloat(this.price).toFixed(2);
						}
					}
					this.isShowPrice= false;
					if (this.goodsInfo.unitPrice < this.goodsInfo.retailSales) {
						this.goodsInfo.discountRate = ((this.goodsInfo.unitPrice / this.goodsInfo.retailSales) * 10).toFixed(2);
					} else {
						this.goodsInfo.discountRate = 10;
					}
					this.computeAll();
				} else if (this.priceType === 2) {
					let reg = /^((0\.[1-9]{1})|((10|[1-9]{1})(\.\d{1})?))$/;
					if (!reg.test(this.price)) {
						this.goodsInfo.discountRate = 10;
						uni.showToast({
							title: '请输入正确的折扣!',
							icon: 'none'
						});
						return;
						this.isShowPrice= true;
					} else {
						this.isShowPrice= false;
						this.goodsInfo.discountRate = this.price;
					}
					if (this.totalNumber > 0) {
						this.totalPrice =  (this.totalPrice * parseFloat((this.goodsInfo.discountRate / 10))).toFixed(2)
					}
					if (this.goodsInfo.discountRate  > 0 && this.goodsInfo.discountRate < 11) {
						this.goodsInfo.unitPrice = this.goodsInfo.retailSales * parseFloat((this.goodsInfo.discountRate / 10)).toFixed(2);
					} 
				}
			},
			onMore () { // 查看/更多价格
				this.isShowMore = !this.isShowMore;
			},
			onColor (index) { // 点击颜色
				this.selColorIndex = index;
				this.sizeList = this.colorList[index].sizes;
				
			},
			decimalNumber (val) { // 价格保留两位小数
				if (val === '' || val === null || val === undefined) {
					return '0.00'
				}
				return val.toFixed(2);
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../components/mixin.scss";
	.v-edit-goods-view {
		width: 100%;
		overflow: hidden;
		background: #fff;
		.con {
			width: 96%;
			overflow: hidden;
			padding: 20upx 2%;
			display: flex;
			align-items: center;
			white-space: nowrap;
			font-size: 30upx;
		}
		.goods-base-info {
			border-bottom: 1upx solid $boder-se;
			.img {
				margin-right: 30upx;
				image {
					width: 180upx;
					height: 180upx;
					background: $themeColor;
				}
			}
			.info {
				font-size: 32upx;
				color: #333;
				.name {
					@include lineEllipsis(1);
				}
			}
			.prices {
				font-size: 30upx;
				color: $themeColor;
				font-weight: bold;
				image {
					width: 40upx;
					height: 40upx;
					margin-left: 20%;
					margin-right: 20upx;
					vertical-align: middle;
				}
			}
			.org {
				margin-left: 20upx;
				@include default-price(30upx, bold);
			}
			.sel-more {
				color: black;
				font-weight: bold;
			}
			.there {
				color: $themeColor;
			}
		}
		.numbers {
			flex-wrap: wrap;
			justify-content: space-around;
			background: #F2F0F0;
			font-size: 30upx;
			color: #999;
			input {
				width: 200upx;
				height: 30upx;
				font-size: 28upx;
				color: #999;
				background: #fff;
			}
			image {
				width: 60upx;
				height: 60upx;
				vertical-align: middle;
				background: transparent;
				margin-right: 30upx;
			}
		}
		.color-con {
			width: 96%;
			overflow: hidden;
			position: relative;
			padding: 20upx 3%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			white-space: nowrap;
			border-bottom: 1upx solid $boder-se;
			background: #fff;
			font-size: 30upx;
			color: #333;
			.color-item {
				width: 145upx;
				height: 70upx;
				margin-right: 30upx;
				margin-top: 40upx;
				border: 1upx solid $boder-se;
				position: relative;
				text-align: center;
				line-height: 70upx;
				.name {
					@include lineEllipsis(1);
				}
			}
			.number {
				width: 70upx;
				height: 35upx;
				font-size: 22upx;
				border: 1upx solid $boder-se;
				position: absolute;
				top: -26upx;
				right: -20upx;
				color: #fff;
				line-height: 35upx;
				background: red;
				@include lineEllipsis(1);
			}
			.check-color {
				background: $themeColor;
				color: #fff;
			}
		}
		.info-con {
			width: 96%;
			overflow: hidden;
			padding: 20upx 2%;
			font-size: 28upx;
			.list {
				margin-bottom: 15upx;
			}
			.title, .list {
				width: 100%;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				text-align: center;
				line-height: 80upx;
				.cgh-size, .cgh-stock{
					width: 20%;
					height: 80upx;
				}
				.cgh-number {
					width: 40%;
					height: 70upx;
					display:  flex;
					justify-content: center;
					.less,.add {
						width: 50upx;
						height: 50upx;
						border-radius: 10upx;
						background: #F2F0F0;
						color: #fff;
						margin-top: 14upx;
					}
					.less {
						font-size: 80upx;
						line-height: 35upx;
					}
					.add {
						font-size: 55upx;
						line-height: 40upx;
					}
					.one-number-con {
						display: flex;
						border-bottom: 2upx solid $boder-se;
						width: 100upx;
						height: 50upx;
						text-align: center;
						margin: 0upx 15upx 0upx 15upx;
						line-height: 50upx;
						.one-less {
							font-size: 40upx;
						}
					}
					.one-number {
						font-size: 30upx;
						@include lineEllipsis(1);
					}
				}
			}
		}
		// 查看更多价格
		.more-con {
			width: 52%;
			overflow: auto;
			height: 40%;
			background: white;
			display: black; 
			position: absolute;  
			top: 200upx;
			right: 100upx; 
			z-index:  3; 
			border: 1upx solid $boder-se;
			-webkit-overflow-scrolling: touch;
			padding-bottom: 120upx;
			font-size: 28upx;
			color: #333;
			line-height: 60upx;
			padding: 30upx;
			.price-con {
				display: flex;
				justify-content: space-between;
				.price {
					@include default-price(30upx, normal);
				}
			}
			.company {
				text-align: center;
				image {
					width: 50upx;
					height: 50upx;
					vertical-align: middle;
				}
				text {
					padding-right: 30upx;
				}
			}
		}
		// 修改价格
		.upate-price {
			width: 80%;
			height: 230upx;
			background: #fff;
			position: fixed;
			z-index: 3;
			top: 550upx;
			left: 10%;
			font-size: 28upx;
			padding: 20upx 0upx;
			color: #333;
			.title {
				width: 100%;
				text-align: center;
				font-size: 32upx;
				font-weight: bold;
			}
			.input-con {
				border-top: 1upx solid $boder-se;
				border-bottom: 1upx solid $boder-se;
				padding: 15upx 0upx;
				margin: 20upx 0upx;
				input {
					margin-left: 20upx;
				}
			}
			.btn {
				display: flex;
				justify-content: space-around;
				text-align: center;
				line-height: 60upx;
				.cel {
					width: 30%;
					height: 60upx;
					border: 1upx solid $boder-se;
				}
				.config {
					width: 30%;
					height: 60upx;
					border: 1upx solid $themeColor;
					color: $themeColor;
				}
			}
		}
		.cgh-alert-black{ 
			overflow: hidden;
			@include cgh-alert-black();
		} 
		.footer {
			width: 98%;
			height: 100upx;
			padding-left: 2%;
			background: #fff;
			border-top: 1upx solid $boder-se;
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			z-index: 2;
			justify-content: space-between;
			line-height: 100upx;
			.left {
				font-size: 28upx;
				color: #333;
				text {
					padding-left: 20upx;
					@include default-price(30upx, bold);
				}
			}
			.right {
				width: 30%;
				background: orange;
				font-size: 30upx;
				text-align: center;
				color: #fff;
			}
		}
		.one-btn {
			width: 100%;
			height: 100upx;
			background: orange;
			border-top: 1upx solid $boder-se;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 2;
			line-height: 100upx;
			text-align: center;
			color: #fff;
		}
	}
</style>
