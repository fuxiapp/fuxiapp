<template>
	<scroll-view class="goods-list-view">
		<view class="search">
			<search placeholderStr="请输入货品条码" type="1" @search="search"></search>
		</view>
		<view class="v-filter">
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
						<image class="goods-image" :src="goods.image" @click="previewImage(goods.image)" @error="handleError(index)"></image>
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
					<view class="share-goods"  @click="share(index)">
						<text>&#xe61a;</text>
						<text>&nbsp;推广</text>
					</view>
					<view class="edit-goods" @click="toPath(1, goods.goodsid)">
						<text>&#xe626;</text>
						<text>&nbsp;编辑</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
		<view class="sel-type" v-if="isShowType">
			<selType v-if="typeNumber === 1" :selTypeChidenItem="selTypeChidenItem" :classTypeInfo="classTypeInfo" @onType="onType" @okType="okType" @resetType="resetType" @closeMoreType="closeMoreType"></selType>
			<selType v-if="typeNumber === 2" :selTypeChidenItem="selTypeChidenItem" :classTypeInfo="AgeTypeInfo" @onType="onType" @okType="okType" @resetType="resetType" @closeMoreType="closeMoreType"></selType>
			<selType v-if="typeNumber === 3" :selTypeChidenItem="selTypeChidenItem" :classTypeInfo="seasonTypeInfo" @onType="onType" @okType="okType" @resetType="resetType" @closeMoreType="closeMoreType" ></selType>
			<selType v-if="typeNumber === 4" :selTypeChidenItem="selTypeChidenItem" :classTypeInfo="supplierTypeInfo" @onType="onType" @okType="okType" @resetType="resetType" @closeMoreType="closeMoreType" :moreType="typeNumber"  :isPage="isPage" :isMore="supplierisMore"   @moreTypeInfo="moreTypeInfo"   ></selType>
		</view>
	</scroll-view>
</template>
<script>
	import uniLoadMore from '../../../components/uni/uni-load-more/uni-load-more.vue';
	import selType from '../../../components/selType.vue';
	import search from '../../../components/search.vue';
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
				typeNumber: 1,
				selTypeChidenItem: [],
				// 弹框分页
				isPage: true,
				size: 20,
				supplierPage: 1,  // 厂商
				supplierisMore: true,
			}
		},
		onBackPress(options) {  
            if (options.from === 'navigateBack') {  
                return false;  
            } 
			this.$API.tab('../../tab/main/main');
            return true;  
        }, 		
		onReachBottom() { // 页面下拉 
			this.status = 'more';
			this.getMoreInfo();
		},
		onShow() {
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
			previewImage (img) {  // 预览图片
				let imgs = [img];
				uni.previewImage({
				    urls: imgs
				});
			},
			search (keyword) { // 关键字搜索
				this.para.keyword = keyword;
				this.getList();
			},
			toPath (type, id) {
				let url = '';
				if (type === 1) { // 编辑商品
					url = 	`../../goods/goodsAdd/goodsAdd?id=${id}`;
				}
				this.$API.to(url);
			},
			share (index) {
				let info = this.listData[index];
				let content = info.name;
				//#ifdef APP-PLUS
				plus.share.sendWithSystem({content: content, href: `${this.$SHARE}/mallgoods/${info.goodsid}/goodsdetail.html`}, function(){
				}, function(e){
					uni.showToast({
						title: '' + JSON.stringify(err),
						icon: 'none'
					});
				});
				//#endif
			},
			getList() { // 获取货品列表
				this.countPage = 0;
				this.listData = [];
				this.last_id = '';
				this.status = 'more';
				this.para.pageNum = 1;
				this.$API.get('/fuxi/goods/query-goods-list', this.para).then(res => {
					if (res.code === 'success') {
						this.countPage = res.data.pages;
						let list = res.data.list;
						for (let i = 0; i < list.length; i++) {
							list[i].image = this.$URL + list[i].code + '.jpg';
						}
						this.listData = this.reload ? list : this.listData.concat(list);
						this.reload = false;
						if (this.para.pageNum === res.data.pages ) {
							this.status = 'finish';
							return;
						}
						this.last_id = list.length > 1 ? list[list.length - 1].id : '';
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
				if (this.priceByType === 0) {
					this.priceByType = 1;
					this.para.orderBy = 'retailsales asc';
				} else if (this.priceByType === 1) {
					this.priceByType = 2;
					this.para.orderBy = 'retailsales desc';
				} else if (this.priceByType === 2) {
					this.priceByType = 0;
					this.para.orderBy = '';
				}
				this.getList();
			},
			handleError (index) { // 图片加载错误
                this.listData[index].image = '../../../static/err_img.png';  
			},
			onType (index) { // 选择类型
				this.selTypeChidenItem.push(index);
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
				this.okType();
			},
			closeMoreType () { // 关闭多选
				let list = this.selTypeChidenItem;
				if (this.typeNumber === 1) {
					for (let i = 0; i < list.length; i++) {
						this.classTypeInfo[list[i]].flg = false;
					}
				} else if (this.typeNumber === 2) {
					for (let i = 0; i < list.length; i++) {
						this.AgeTypeInfo[list[i]].flg = false;
					}
				} else if (this.typeNumber === 3) {
					for (let i = 0; i < list.length; i++) {
						this.seasonTypeInfo[list[i]].flg = false;
					}
				} else if (this.typeNumber === 4) {
					for (let i = 0; i < list.length; i++) {
						this.supplierTypeInfo[list[i]].flg = false;
					}
				}
				this.okType();
			},
			opentType (index) { // 打开筛选类型
				this.typeNumber = index;
				this.isShowType = true;
				this.selTypeChidenItem = [];
				if (index === 1) {
					if (this.classTypeInfo.length > 0) {
						return;
					}
					this.$API.get('/fuxi/select/query-goods-type').then(res => {
						if (res.code === 'success') {
							this.classTypeInfo = this.$API.fmtSelData(res.data, 11);
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
								let info = {name: arr[i].season, goodsTypeId: '', flg: false};
								this.seasonTypeInfo.push(info);
							}
							
						}
					});
				} else if (index === 4) {
					this.supplierPage = 1;
					this.$API.get('/fuxi/select/query-supplier', {pageNum: this.supplierPage, pageSize: this.size}).then(res => {
						if (res.code === 'success') {
							let arr = res.data.list;
							for (let i = 0; i < arr.length; i++) {
								let info = {name: arr[i].supplier, supplierId: arr[i].supplierId, flg: false};
								this.supplierTypeInfo.push(info);
								if (this.supplierPage === res.data.pages) {
									this.supplierisMore = false;
								} else {
									this.supplierisMore = true;
								}
							}
							
						}
					});
				}
			},
			moreTypeInfo (index) { // 更新弹框信息
				 if (index === 4) {
					this.supplierPage++;
					this.$API.get('/fuxi/select/query-supplier', {pageNum: this.supplierPage, pageSize: this.size}).then(res => {
						if (res.code === 'success') {
							let arr = res.data.list;
							let list = [];
							for (let i = 0; i < arr.length; i++) {
								let info = {name: arr[i].supplier, supplierId: arr[i].supplierId, flg: false};
								list.push(info);
							}
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
			okType () { // 确定筛选类型
				this.isShowType = false;
				let selArr = '';
				if (this.typeNumber === 1) {
					for (let i = 0; i < this.classTypeInfo.length; i++) {
						if (this.classTypeInfo[i].flg === true) {
							if (selArr === '') {
								selArr = this.classTypeInfo[i].id;
							} else {
								selArr = selArr + ',' + this.classTypeInfo[i].id;
							}
						}
					}
					this.para.goodsType = selArr;
				} else if (this.typeNumber === 2) {
					for (let i = 0; i < this.AgeTypeInfo.length; i++) {
						if (this.AgeTypeInfo[i].flg) {
							if (selArr === '') {
								selArr = this.AgeTypeInfo[i].name;
							} else {
								selArr = selArr + ',' + this.AgeTypeInfo[i].name;
							}
						}
					}
					this.para.age = selArr;
				} else if (this.typeNumber === 3) {
					for (let i = 0; i < this.seasonTypeInfo.length; i++) {
						if (this.seasonTypeInfo[i].flg) { 
							if (selArr === '') {
								selArr = this.seasonTypeInfo[i].name;
							} else {
								selArr = selArr + ',' + this.seasonTypeInfo[i].name;
							}
						}
					}
					this.para.season = selArr;
				} else if (this.typeNumber === 4) {
					for (let i = 0; i < this.supplierTypeInfo.length; i++) {
						if (this.supplierTypeInfo[i].flg) { 
							if (selArr === '') {
								selArr = this.supplierTypeInfo[i].supplierId;
							} else {
								selArr = selArr + ',' + this.supplierTypeInfo[i].supplierId;
							}
						}
						
					}
					this.para.supplier = selArr;
				} 
				this.getList();
			},
			scoInfo () {
				uni.scanCode({
					success: (res) => {
						this.para.keyword = res.result;
						this.getList();
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
			selType,
			search
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
			/* #ifndef H5 */
				top: 110upx;
			/*  #endif */
			/* #ifdef H5 */
				top: 200upx;
			/*  #endif */
			left: 0;
			z-index: 1;
			padding: 15upx 0upx;
			.head {
				width: 100%;
				display: flex;
				justify-content: space-around;
				.v-price {
					width: 20%;
					display: flex;
					justify-content: space-around;
					.title {
						line-height: 85upx;
					}
					.icon {
						width: 50upx;
						height: 50upx;
						image {
							width: 25upx;
							height: 25upx;
							vertical-align: middle;
							margin-top: 32upx;
						}
					}
					.price-title {
						line-height: 80upx;
					}
					.icon-price {
						width: 50upx;
						height: 50upx;
						clear: both;
						margin-top: 14upx;
						view {
							width: 30upx;
							height: 20upx;
						}
						image {
							width: 20upx;
							height: 20upx;
						}
					}
				}
			}
		}
		
		.v-goods-list {
			margin-top: 220upx;
			overflow: hidden;
		}
		.v-goods {
			background-color: #FFFFFF;
			margin-top: 10upx;
			width: 100%;
			overflow: hidden;
		}
		
		.v-goods-top {
			width: 100%;
			height: 160upx;
			display: flex;
			flex-direction: row;
		}
		
		.v-goods-bottom {
			width: 94%;
			overflow: hidden;
			padding: 20upx 0upx;
			font-size: 32upx;
			line-height: 50upx;
			color: #427CAC;
			border-top: 3upx solid #F2F2F2;
			clear: both;
			padding-right: 5%;
			view {
				float: right;
				text-align: right;
				font-family: iconfont;
			}
			view:last-child {
				margin-right: 50upx;
			}
			.share-goods {
				margin-left: 30upx;
			}
			text:first-child {
				padding-right: 10upx;
			}
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
