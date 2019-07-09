<template>
	<scroll-view class="goods-list-view">
		<view class="v-filter">
			<view class="search-conten">
				<view class="search-con">
					<image class="search" @click="getList"  src="../../../static/base/search.png"></image>
					<input v-model="para.keyword" placeholder="请输入货品条码" />
					<image class="close" @click="clearSearch" src="../../../static/base/colse.png"></image>
				</view>
			</view>
			<view class="head">
				<view class="v-price" @tap="sortPrice">
					<view class="price-title">价格</view>
					<view class="icon-price" v-if="priceByType === 0">
						<view><image src="../../../static/base/up_sjx.png"></image></view>
						<view><image src="../../../static/base/down_sjx.png"></image></view>
					</view>
					<view class="icon-price" v-if="priceByType === 1">
						<view><image src="../../../static/base/up_sjxr.png"></image></view>
						<view><image src="../../../static/base/down_sjx.png"></image></view>
					</view>
					<view class="icon-price" v-if="priceByType === 2">
						<view><image src="../../../static/base/up_sjx.png"></image></view>
						<view><image src="../../../static/base/down_sjxr.png"></image></view>
					</view>
				</view>
				<view class="v-price" @tap="opentType(1)">
					<view class="title">类别</view>
					<view class="icon">
					<image src="../../../static/base/down.png"></image>
					</view>
				</view>
				<view class="v-price"@tap="opentType(2)">
					<view class="title">年份</view>
					<view class="icon">
					<image src="../../../static/base/down.png"></image>
					</view>
				</view>
				<view class="v-price" @tap="opentType(3)">
					<view class="title">季节</view>
					<view class="icon">
						<image src="../../../static/base/down.png"></image>
					</view>
				</view>
				<view class="v-price" @tap="opentType(4)">
					<view class="title">厂商</view>
					<view class="icon">
						<image src="../../../static/base/down.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="v-goods-list" scroll-x="false" scroll-y="true">
			<!-- #ifdef MP-WEIXIN -->
			<button style="background: #0077AA;" @click="scoInfo">扫描</button>
			<button style="background: #0077AA;" @click="toAddGoods">添加</button>
			<!-- #endif -->
			<view class="v-goods" v-for="(goods,index) in listData" :key="index">
				<view class="v-goods-top">
					<view class="v-image">
						<image class="goods-image" :src="goods.image"  @error="handleError(index)"></image>
					</view>
					<view class="v-detail">
						<view class="goods-name">{{goods.name}}</view>
						<view class="goods-code">{{goods.code}}</view>
						<view class="v-goods-price">
							<view class="goods-price">¥&nbsp;{{goods.retailsales}}</view>
							<view class="goods-reserve">库存&nbsp;{{goods.stock}}</view>
							<view class="goods-purchase-price">成本价&nbsp;{{goods.purchaseprice}}</view>
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
		<uni-load-more :status="status" :content-text="contentText" />
		<view class="sel-type" v-if="isShowType">
			<selType v-if="typeNumber === 1" :classTypeInfo="classTypeInfo" @onType="onType" @okType="okType" @resetType="resetType"></selType>
			<selType v-if="typeNumber === 2" :classTypeInfo="AgeTypeInfo" @onType="onType" @okType="okType" @resetType="resetType"></selType>
			<selType v-if="typeNumber === 3" :classTypeInfo="seasonTypeInfo" @onType="onType" @okType="okType" @resetType="resetType" ></selType>
			<selType v-if="typeNumber === 4" :classTypeInfo="supplierTypeInfo" @onType="onType" @okType="okType" @resetType="resetType"></selType>
		</view>
	</scroll-view>
</template>

<script>
	import uniLoadMore from '../../../components/uni/uni-load-more/uni-load-more.vue';
	import selType from '../../../components/selType.vue';
	export default {
		data() {
			return {
				// 分页
				listData: [],
				last_id: '',
				reload: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多数据了'
				},
				priceByType: 0,
				para: {pageSize: 10, pageNum: 1, orderBy: '', keyword: '',  goodsType: '', age: '', season: '', supplier: ''},
				classTypeInfo: [],
				AgeTypeInfo: [],
				seasonTypeInfo: [],
				supplierTypeInfo: [],
				isShowType: false,
				typeNumber: 1
			}
		},
		onReachBottom() { // 页面下拉 
			this.status = 'more';
			this.getMoreInfo();
		},
		onLoad() {
			this.getList();
		},
		onNavigationBarButtonTap (e) {
			var i = e.index;
			if (i == 0) {
				this.toAddGoods();
			} else if (i == 1) {
				this.scoInfo();
			}
		},
		methods: {
			clearSearch () {
				this.para.keyword = '';
				this.getList();
			},
			getList() { // 获取货品列表
				console.log(this.isShowType);
				this.countPage = 0;
				this.listData = [];
				this.last_id = '';
				this.status = 'more';
				this.$API.get('/fuxi/goods/query-goods-list', this.para).then(res => {
					if (res.code === 'success') {
						this.countPage = res.data.pages;
						if (res.data.total === 0) {
							this.status = 'finish';
							return;
						}
						let list = res.data.list;
						for (let i = 0; i < list.length; i++) {
							list[i].image = this.$URL + list[i].code + '.jpg';
						}
						this.listData = this.reload ? list : this.listData.concat(list);
						this.last_id = list[list.length - 1].id;
						this.reload = false;
					}
				});
			},
			getMoreInfo() { // 获取更多货品列表
				if (this.countPage === this.para.pageNum) {
					this.status = 'finish';
					return;
				}
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
				}
				this.para.pageNum++;
				this.$API.get('/fuxi/goods/query-goods-list', this.para).then(res => {
					if (res.code === 'success') {
						let list = res.data.list;
						for (let i = 0; i < list.length; i++) {
							list[i].image = this.$URL + list[i].code + '.jpg';
						}
						this.listData = this.reload ? list : this.listData.concat(list);
						this.last_id = list[list.length - 1].id;
						this.reload = false;
					}
				});
			},
			sortPrice() { // 价格排序
				if (this.priceByType === 0 || this.priceByType === 2) {
					this.priceByType = 1;
					this.para.orderBy = 'retailsales asc';
				} else if (this.priceByType === 1) {
					this.priceByType = 2;
					this.para.orderBy = 'retailsales desc';
				}
				this.getList();
			},
			handleError (index) { // 图片加载错误
                this.listData[index].image = '../../../static/err_img.png';  
			},
			onType (index) { // 选择类型
				if (this.typeNumber === 1) {
					this.classTypeInfo[index].flg = !this.classTypeInfo[index].flg;
				} else if (this.typeNumber === 2) {
					this.AgeTypeInfo[index].flg = !this.AgeTypeInfo[index].flg;
				} else if (this.typeNumber === 3) {
					this.seasonTypeInfo[index].flg = !this.seasonTypeInfo[index].flg;
				} else if (this.typeNumber === 4) {
					this.supplierTypeInfo[index].flg = !this.supplierTypeInfo[index].flg;
				}
			},
			resetType () { // 重置筛选类型
				if (this.typeNumber === 1) {
					for (let i = 0; i < this.classTypeInfo.length; i++) {
						this.classTypeInfo[i].flg = false;
					}
				} else if (this.typeNumber === 2) {
					for (let i = 0; i < this.AgeTypeInfo.length; i++) {
						this.AgeTypeInfo[i].flg = false;
					}
				} else if (this.typeNumber === 3) {
					for (let i = 0; i < this.seasonTypeInfo.length; i++) {
						this.seasonTypeInfo[i].flg = false;
					}
				} else if (this.typeNumber === 4) {
					for (let i = 0; i < this.supplierTypeInfo.length; i++) {
						this.supplierTypeInfo[i].flg = false;
					}
				}
				this.getList();
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
								let info = {name: arr[i].goodsType, goodsTypeId: arr[i].goodsTypeId, flg: false};
								this.classTypeInfo.push(info);
							}
							
						}
					});
				} else if (index === 2) {
					if (this.AgeTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-age').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {name: arr[i].age, flg: false};
								this.AgeTypeInfo.push(info);
							}
							
						}
					});
				} else if (index === 3) {
					if (this.seasonTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-season').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {name: arr[i].season, goodsTypeId: arr[i].goodsTypeId, flg: false};
								this.seasonTypeInfo.push(info);
							}
							
						}
					});
				} else if (index === 4) {
					if (this.supplierTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-supplier').then(res => {
						if (res.code === 'success') {
							let arr = res.data;
							for (let i = 0; i < arr.length; i++) {
								let info = {name: arr[i].supplier, supplierId: arr[i].supplierId, flg: false};
								this.supplierTypeInfo.push(info);
							}
							
						}
					});
				}
			},
			okType () { // 确定筛选类型
				this.isShowType = false;
				let selArr = '';
				if (this.typeNumber === 1) {
					for (let i = 0; i < this.classTypeInfo.length; i++) {
						if (this.classTypeInfo[i].flg === true) {
							selArr = selArr +  this.classTypeInfo[i].name + ',';
						}
					}
					this.para.goodsType = selArr;
				} else if (this.typeNumber === 2) {
					for (let i = 0; i < this.AgeTypeInfo.length; i++) {
						if (this.AgeTypeInfo[i].flg) {
							selArr = selArr + this.AgeTypeInfo[i].name + ',';
						}
					}
					this.para.age = selArr;
				} else if (this.typeNumber === 3) {
					for (let i = 0; i < this.seasonTypeInfo.length; i++) {
						if (this.seasonTypeInfo[i].flg) {
							selArr = selArr +  this.seasonTypeInfo[i].name + ',';
						}
					}
					this.para.season = selArr;
				} else if (this.typeNumber === 4) {
					for (let i = 0; i < this.supplierTypeInfo.length; i++) {
						if (this.supplierTypeInfo[i].flg) {
							selArr = selArr +  this.supplierTypeInfo[i].name + ',';
						}
					}
					this.para.supplier = selArr;
				} 
				this.getList();
			},
			scoInfo () {
				uni.scanCode({
					success: (res) => {
						this.$API.get('	/fuxi/barcode/barcode-parsing', {barcode: res.result}).then(res => {
							if (res.code === 'success') {
							}
						});
					},
					fail: (err) => {
						console.log(err);
					}
				});
				
			},
			toAddGoods () {
				this.$API.to(`../goodsAdd/goodsAdd`);
			}
		},
		components: {
			uniLoadMore,
			selType
		}
	}
</script>

<style scoped="" lang="scss">
	@import "../../../components/mixin.scss";
	.goods-list-view {
		.v-filter {
			border-bottom: 1upx solid #F6F6F6;
			background-color: #FFFFFF;
			position: fixed;
			width: 100%;
			overflow: hidden;
			top: 0;
			left: 0;
			z-index: 1;
			padding: 15upx 0upx;
			.search-conten {
				width: 100%;
				border-bottom: 1upx solid $boder-se;
				padding-bottom: 20upx;
				.search-con {
					width: 94%;
					margin: 0upx 0upx 10upx 2%;
					display: flex;
					justify-content: space-around;
				}
				.search {
					width: 50upx;
					height: 50upx;
					vertical-align: middle;
				}
				input {
					width: 80%;
				}
				.close {
					width: 50upx;
					height: 50upx;
					vertical-align: middle;
				}
					
			}
			.head {
				width: 100%;
				display: flex;
				justify-content: space-around;
				.v-price {
					width: 20%;
					display: flex;
					justify-content: space-around;
					.title {
						line-height: 80upx;
					}
					.icon {
						width: 50upx;
						height: 50upx;
						image {
							width: 40upx;
							height: 40upx;
							vertical-align: middle;
							margin-top: 25upx;
						}
					}
					.price-title {
						line-height: 75upx;
					}
					.icon-price {
						width: 50upx;
						height: 50upx;
						clear: both;
						view {
							width: 30upx;
							height: 30upx;
						}
						image {
							width: 30upx;
							height: 30upx;
						}
					}
				}
			}
		}
		
		.v-goods-list {
			margin-top: 200upx;
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
			@include lineEllipsis(1);
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
	}
	//
</style>
