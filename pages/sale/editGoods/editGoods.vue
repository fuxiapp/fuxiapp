<template>
	<view class="v-edit-goods-view">
		<view class="con goods-base-info">
			<view class="img"><image src="../../../static/err_img.png"></image></view>
			<view class="info">
				<view class="name">连衣裙</view>
				<view class="no">113112</view>
				<view class="prices">
					<text class="there">¥</text>
					<text class="org" @click="openUpPrice(1)">{{goodsInfo.price}}</text>
					<image @click="onMore()" src="../../../static/base/time.png"></image>
					<text class="sel-more" @click="onMore()">更多价格</text>
				</view>
				<view class="name">
					<text class="there">折扣</text>
					<text  class="org" @click="openUpPrice(2)">{{goodsInfo.discount}}</text>
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
			<view class="color-item" v-for="(item, index) in 4" :key="index" >
				<view class="name">蓝色</view>
				<view class="number">123</view>
			</view>
		</view>
		<view class="info-con">
			<view class="title">
				<view class="cgh-size">尺寸</view>
				<view class="cgh-stock">库存</view>
				<view class="cgh-number">数量</view>
			</view>
			<view class="info-details">
				<view class="list" v-for="(item, index) in infoList" :key="index">
					<view  class="cgh-size">36</view>
					<view class="cgh-stock">42</view>
					<view class="cgh-number">
						<view class="less" @click="less(index)">-</view>
						<view class="one-number"><input v-model="item.number" @blur="inputBlur(2, index)"  placeholder="数量"/></view>
						<view class="add" @click="add(index)">+</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="more-con" v-if="isShowMore">
			<view class="price-con">
				<view class="type">批发价</view>
				<view class="price">¥ 350</view>
			</view>
			<view class="price-con">
				<view class="type">零售价</view>
				<view class="price">¥ 350</view>
			</view>
			<view class="company">
				<image src="../../../static/base/sjx.png"></image>
				<text>张家界</text>上次销售价
			</view>
			<view class="price-con" v-for="(itme, index) in 2" :key="index">
				<view class="type">蓝色</view>
				<view class="price">¥ 350</view>
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
		
		<view class="footer">
			<view class="left">20件<text>¥ 12000.00</text></view>
			<view class="right" @click="toPath">确定</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				goodsInfo: {price: 689.00, discount: 10},
				infoList: [
					{id:1, number: 0},
					{id:1, number: 0},
					{id:1, number: 0},
					{id:1, number: 0},
					{id:1, number: 0},
					{id:1, number: 0},
					{id:1, number: 0},
					{id:1, number: 0},
					{id:1, number: 0},
				],
				numberS: [],
				allNumber: 1,
				isShowMore: false,
				price: 0,
				isShowPrice: false,
				priceType: 0,
				upTitle: '修改价格',
			}
		},
		onLoad() {
			this.goodsInfo.price = this.decimalNumber(this.goodsInfo.price);
		},
		methods: {
			toPath () {
				this.$API.to('../../sale/saleComfig/saleComfig');
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
				this.infoList[index].number = parseInt( this.infoList[index].number) + parseInt(this.allNumber);
			},
			less (index) { // 单个数量减
				if (this.infoList[index].number < 2) {
					return; 
				}
				if (parseInt(this.infoList[index].number) <= parseInt(this.allNumber)) {
					this.infoList[index].number--;
				} else if ((parseInt(this.infoList[index].number) - parseInt(this.allNumber)) < 2) {
					if (parseInt(this.infoList[index].number) > 2) {
						this.infoList[index].number--;
					}
				} else {
					this.infoList[index].number = parseInt(this.infoList[index].number) - parseInt(this.allNumber);
				}
			},
			inputBlur (type, index) { // 输入框失去焦点的时候
				if (type === 1) {
					if (this.allNumber > 1 || this.allNumber === '' || this.allNumber === null) {
						this.allNumber = 1;
					}
				} else if (type === 2) {
					let val = this.infoList[index].number;
					if (val > 1 || val === '' || val === null) {
						this.infoList[index].number = 1;
					}	
				}
			},
			openUpPrice (type) { 
				this.isShowPrice = true;
				this.priceType = type;
				if (type === 1) {
					this.price = this.goodsInfo.price;
					this.upTitle = '修改价格';
				} else if (type === 2) {
					this.price = this.goodsInfo.discount;
					this.upTitle = '修改折扣';
				}
 			},
			okPirce () { // 修改价格
				if (this.priceType === 1) {
					if (this.price !== '' && this.price !== null && parseFloat(this.price) > 0) {
						this.goodsInfo.price = parseFloat(this.price).toFixed(2);
					}
				} else if (this.priceType === 2) {
					if (this.price !== '' && this.price !== null && parseFloat(this.price) > 0) {
						this.goodsInfo.discount = this.price;
					}
				} 
				this.isShowPrice = false;
			},
			onMore () { // 查看/更多价格
				this.isShowMore = !this.isShowMore;
			},
			decimalNumber (val) { //价格保留两位小数
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
			padding: 20upx 2%;
			display: flex;
			align-items: center;
			white-space: nowrap;
			justify-content: space-around;
			border-bottom: 1upx solid $boder-se;
			background: #fff;
			font-size: 30upx;
			color: #333;
			.color-item {
				width: 125upx;
				height: 70upx;
				margin-right: 20upx;
				border: 1upx solid $boder-se;
				position: relative;
				text-align: center;
				line-height: 70upx;
			}
			.number {
				width: 40upx;
				height: 30upx;
				font-size: 22upx;
				border: 1upx solid $boder-se;
				position: absolute;
				top: -10upx;
				right: -10upx;
				color: #fff;
				line-height: 30upx;
				background: red;
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
				text-align: center;
				line-height: 80upx;
				.cgh-size, .cgh-stock{
					width: 30%;
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
					.one-number {
						width: 90upx;
						height: 45upx;
						font-size: 30upx;
						color: #333;
						line-height: 30upx;
						border-bottom: 2upx solid $boder-se;
						margin: 14upx 15upx 0upx 15upx;
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
	}
</style>
