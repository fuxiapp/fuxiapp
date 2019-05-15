<template>
	<scroll-view class="content">
		<view class="v-filter">
			<view class="v-price" @tap="sortPrice">
				<text>价格</text>
				<text id="price-text">&#xe609;</text>
			</view>
			<view class="v-type" @tap="sortType">
				<text>类别</text>
				<text id="type-text">&#xe60b;</text>
			</view>
			<view class="v-year" @tap="sortYear">
				<text>年份</text>
				<text>&#xe60b;</text>
			</view>
			<view class="v-season" @tap="sortSeason">
				<text>季节</text>
				<text>&#xe60b;</text>
			</view>
		</view>
		<view class="v-goods-list" scroll-x="false" scroll-y="true">
			<view class="v-goods" v-for="(goods,index) in goodsList" :key="index">
				<view class="v-goods-top">
					<view class="v-image">
						<image class="goods-image" :src="goods.image"></image>
					</view>
					<view class="v-detail">
						<view class="goods-name">{{goods.name}}</view>
						<view class="goods-code">{{goods.code}}</view>
						<view class="v-goods-price">
							<view class="goods-price">¥&nbsp;{{goods.price}}</view>
							<view class="goods-reserve">库存&nbsp;{{goods.reserve}}</view>
							<view class="goods-purchase-price">成本价&nbsp;{{goods.originalPrice}}</view>
						</view>
					</view>
				</view>
				<view class="v-goods-bottom">
					<view class="share-goods">
						<text>&#xe61a;</text>
						<text>&nbsp;推广</text>
					</view>
					<view class="edit-goods">
						<text>&#xe626;</text>
						<text>&nbsp;编辑</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [{
					name: '测试商品',
					code: '123456',
					image: '/static/image/08M7Y.jpg',
					price: '10.00',
					originalPrice: '9.00',
					reserve: '10'
				}, {
					name: '女士上衣',
					code: '223456',
					image: '/static/image/08O1A.jpg',
					price: '100.00',
					originalPrice: '90.00',
					reserve: '99'
				}, {
					name: '上衣1',
					code: '123456',
					image: '/static/image/pic.jpg',
					price: '199.50',
					originalPrice: '109',
					reserve: '1000'
				}, {
					name: '上衣2',
					code: '223456',
					image: '/static/image/08O1A.jpg',
					price: '100.00',
					originalPrice: '90.00',
					reserve: '99'
				}, {
					name: '上衣1',
					code: '123456',
					image: '/static/image/08M7Y.jpg',
					price: '10.00',
					originalPrice: '9.00',
					reserve: '10'
				}, {
					name: '上衣2',
					code: '223456',
					image: '/static/image/08O1A.jpg',
					price: '100.00',
					originalPrice: '90.00',
					reserve: '99'
				}, {
					name: '上衣1',
					code: '123456',
					image: '/static/image/08M7Y.jpg',
					price: '10.00',
					originalPrice: '9.00',
					reserve: '10'
				}, {
					name: '上衣2',
					code: '223456',
					image: '/static/image/08O1A.jpg',
					price: '100.00',
					originalPrice: '90.00',
					reserve: '99'
				}]
			}
		},
		methods: {
			sortPrice() {

			},
			sortType() {
				document.getElementById('type-text').innerHtml = "<span>&#xe60a;</span>";
			},
			sortYear() {

			},
			sortSeason() {

			}
		},
		onNavigationBarButtonTap: (function(e) {
			var i = e.index;
			if (i == 0) {
				uni.navigateTo({
					url: '../goodsAdd/goodsAdd',
				});
			} else if (i == 1) {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.showToast({
							title: '条码类型：' + res.scanType + '\n条码内容：' + res.result,
							icon: "none",
							duration: 3000
						});
					}
				});
			}
		})
	}
</script>

<style>
	.v-filter {
		display: flex;
		flex-direction: row;
		border-bottom: 1upx solid #F6F6F6;
		background-color: #FFFFFF;
		position: fixed;
		width: 100%;
		height: 70upx;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.v-filter view {
		width: 25%;
		font-size: 36upx;
		text-align: center;
		line-height: 70upx;
		height: 70upx;
		font-family: iconfont;
	}

	.v-goods-list {
		margin-top: 72upx;
		overflow: hidden;
	}

	.v-goods {
		background-color: #FFFFFF;
		margin-top: 10upx;
		width: 100%;
		height: 210upx;
	}

	.v-goods-top {
		width: 100%;
		height: 160upx;
		display: flex;
		flex-direction: row;
	}

	.v-goods-bottom {
		width: 100%;
		height: 50upx;
		display: flex;
		flex-direction: row;
		font-size: 32upx;
		line-height: 50upx;
		color: #427CAC;
		border-top: 3upx solid #F2F2F2;
	}

	.v-goods-bottom view {
		width: 50%;
		font-family: iconfont;
	}

	.share-goods {
		margin-left: 30upx;
	}

	.v-image {
		height: 140upx;
		width: 140upx;
		text-align: center;
		border: 1upx solid #F6F6F6;
		margin: 10upx 0 10upx 10upx;

	}

	.v-detail {
		width: 70%;
		margin: 10upx 0 10upx 20upx;
		font-size: 30upx;
	}

	.goods-image {
		height: 100%;
		width: 100%;
	}

	.goods-name {
		font-size: 36upx;
	}

	.goods-code {
		margin: 10upx 0;
	}

	.v-goods-price {
		display: flex;
		flex-direction: row;
	}

	.v-goods-price view {
		width: 33%;
	}
</style>
