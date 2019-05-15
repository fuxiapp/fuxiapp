<template>
	<view class="content">
		<view class="v-goods-detail-top">
			<view class="v-goods-img">
				<image :src="goodImg"></image>
			</view>
			<view class="v-goods-title">
				<view class="v-goods-title-item">
					<view class="v-input-title">
						<text class="mark">*</text>
						<text>货号</text>
					</view>
					<view class="v-input">
						<input type="text" :value="goodsCode" maxlength="200" />
					</view>
				</view>
				<view class="v-goods-title-item">
					<view class="v-input-title">
						<text class="mark">*</text>
						<text>品名</text>
					</view>
					<view class="v-input">
						<input type="text" :value="goodsName" />
					</view>
				</view>
				<view class="v-goods-title-item">
					<view class="v-input-title">
						<text class="mark">*</text>
						<text>类别</text>
					</view>
					<view class="v-input">
						<input type="text" :value="goodsType" disabled="true" @click="selectGoodsType" />
					</view>
				</view>
			</view>
		</view>
		<view class="v-goods-content">
			<view class="v-goods-brand">
				<view class="v-input-title">
					<text>品牌</text>
				</view>
				<view class="v-input">
					<input type="text" :value="goodsBrand" disabled="true" />
				</view>
			</view>
			<view class="v-goods-year">
				<view class="v-input-title">
					<text>年份</text>
				</view>
				<view class="v-input">
					<input type="text" :value="goodsYear" />
				</view>
			</view>
			<view class="v-goods-season">
				<view class="v-input-title">
					<text>季节</text>
				</view>
				<view class="v-input">
					<input type="text" :value="goodsSeason" />
				</view>
			</view>
			<view class="v-goods-supplier">
				<view class="v-input-title">
					<text>厂商</text>
				</view>
				<view class="v-input">
					<input type="text" :value="supplier" disabled="true" />
				</view>
			</view>
			<view class="v-goods-supplier-code">
				<view class="v-input-title">
					<text>厂商货号</text>
				</view>
				<view class="v-input">
					<input type="text" :value="supplierCode" />
				</view>
			</view>
			<view class="v-goods-purchase-price">
				<view class="v-input-title">
					<text>进货价</text>
				</view>
				<view class="v-input">
					<input type="text" :value="purchasePrice" />
				</view>
			</view>
			<view class="v-goods-retail-sales">
				<view class="v-input-title">
					<text>零售价</text>
				</view>
				<view class="v-input">
					<input type="text" :value="retailSales" />
				</view>
			</view>
			<view class="v-goods-trade-price">
				<view class="v-input-title">
					<text>批发价</text>
				</view>
				<view class="v-input">
					<input type="text" :value="tradePrice" />
				</view>
			</view>
			<view class="v-goods-goods-color">
				<view class="v-input-title">
					<text>颜色</text>
				</view>
				<view class="v-input">
					<input type="text" :value="goodsColor" />
				</view>
			</view>
		</view>
		<view class="v-save">
			<text>保存</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodImg: '/static/image/pic.jpg',
				goodsCode: '0102003',
				goodsName: '测试货品',
				goodsType: '毛衣',
				goodsBrand: '七匹狼',
				goodsYear: '12',
				goodsSeason: '春季',
				supplier: '测试厂商',
				supplierCode: '101010101',
				purchasePrice: '99.5',
				retailSales: '108',
				tradePrice: '102',
				goodsColor: '红色'
			}
		},
		methods: {
			selectGoodsType(){}
		}
	}
</script>

<style>
	.content {
		font-size: 30upx;
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

	.v-input-title {
		width: 20%;
		margin-left: 15upx;
	}

	.v-input {
		width: 80%;
		margin-right: 30upx;
	}

	.mark {
		color: red;
	}

	.v-goods-content {
		background-color: #FFFFFF;
		margin-top: 15upx;
	}

	.v-goods-content view {
		height: 80upx;
		width: 100%;
		line-height: 80upx;
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
		z-index: 100;
	}

	input {
		text-align: right;
		height: 80upx;
		line-height: 80upx;
	}
</style>
