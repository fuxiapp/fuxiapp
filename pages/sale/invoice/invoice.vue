<template>
	<view class="v-invoice-view">
		<view v-if="!iShowSelGoods">
			<view class="search">
				<search v-if="moduleType === 4 || moduleType === 5"   @search="search" placeholderStr="店仓编码/店仓名称" type="2"></search>
				<searchLeft v-else placeholderStr="货品编码/品名/条形码" :type="selType" @scanCode="scanCode"  @search="search" ></searchLeft>
			</view>
			<view class="list-con">
				<goodsItem :list="listData" :moduleType="goodsItemType" :isFlgAdd="moduleType"  type="1" @toPath="goEditGoods"  @handleError="handleError"></goodsItem>
			</view>
			<view class="btn" v-if="moduleType === 7" @click="selGoods" >已盘货品</view>
			<view class="btn" v-else @click="selGoods" >已选货品</view>
		</view>
		<view  v-if="iShowSelGoods">
			<view  class="ok-goods-con">
				<goodsItem :list="fuxiSelasOrderInfo" :moduleType="goodsItemType" type="1" @handleError="handleError"></goodsItem>
			</view>
			<view class="btn"  @click="iShowSelGoods = false">返回</view>
			<view class="cgh-alert-black" @click="iShowSelGoods = false"></view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>
<script>
	import searchLeft from '../../../components/searchLeft.vue';
	import search from '../../../components/search.vue';
	import goodsItem from '../../../components/goodsItem.vue';
	import uniLoadMore from '../../../components/uni/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				goodsItemType: 2,
				selType: 1,
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
				countPage: '',
				para: {pageSize: 10, pageNum: 1},
				iShowSelGoods: false,
				moduleType: 1 ,// main 模块
				fuxiSelasOrderInfo: [], // 已追加的货品
			}
		},
		onBackPress(options) {  
		    if (options.from === 'navigateBack') {  
		        return false;  
		    } 
			this.$API.tab('../../tab/main/main');
		    return true;  
		}, 	
		onShow() {
			this.iShowSelGoods = false;
		},
		onLoad(option) {
			this.$API.getStorage('fuxiSelasOrderInfo').then(res => {
				let fuxiSelasOrderInfo = [];
				let selSelesIds = [];
				let list = res.data;
				for (let i = 0; i < list.length; i++) {
					let para = {goodsid: list[i].goodsid, image: this.$URL + list[i].code + '.jpg', name: list[i].name, code: list[i].code, retailSales: list[i].retailSales};
					this.fuxiSelasOrderInfo.push(para);
				}
			});
			this.moduleType = option.type ? +option.type : 1;
			if (this.moduleType === 4 || this.moduleType === 5) {
				this.$API.setTitle('采购单');
			} else {
				this.$API.setTitle('销售单');
			}
			this.getList();
		},
		onReachBottom() { // 页面下拉 
			this.status = 'more';
			this.getMoreInfo();
		},
		methods: {
			search (keyword) { // 关键字搜索
				this.para.keyword = keyword;
				this.getList();
			},
			goEditGoods (v) {
				if (v.flg) {
					uni.showToast({
						title: '该货品已追加!',
						icon: 'none'
					});
				} else {
					if (this.moduleType === 0 || this.moduleType === 1) { // 销售订单/销售发货单
						this.$API.rto(`../../sale/editGoods/editGoods?id=${v.goodsid}&type=${this.moduleType}&getType=1`);
					} else if (this.moduleType === 2) { // 销售退货单
						this.$API.rto(`../../sale/returnGoods/returnGoods?id=${v.goodsid}&type=${this.moduleType}&getType=1`);
					} else if (this.moduleType === 4) { // 采购发货单
						this.$API.rto(`../../PurchasePages/editGoods/editGoods?id=${v.goodsid}&type=${this.moduleType}&getType=1`);
					}  else if (this.moduleType === 5) { // 采购退货单
						this.$API.rto(`../../PurchasePages/returnGoods/returnGoods?id=${v.goodsid}&type=${this.moduleType}&getType=1`);
					}
				}
			},
			scanCode () { // 识别二维码
				uni.scanCode({
					success: (res) => {
						if (this.moduleType === 1) {
							this.$API.rto(`../../sale/editGoods/editGoods?id=${res.result}&type=${this.moduleType}&getType=2`);
						} else if (this.moduleType === 2) {
							this.$API.rto(`../../sale/returnGoods/returnGoods?id=${res.result}&type=${this.moduleType}&getType=2`);
						}
					},fail: (err) => {
						console.log(err);
					}
				});
			},
			selGoods () { // 一选货品
				this.iShowSelGoods = true;
			},
			handleError (index) { // 图片错误
				this.listData[index].image = '../../../static/err_img.png';  
			},
			getList() { // 获取公司列表
				this.countPage = 0;
				this.listData = [];
				this.last_id = '';
				this.status = 'more';
				this.para.pageNum = 1;
				this.$API.get('/fuxi/goods/query-goods-simple-list', this.para).then(res => {
					if (res.code === 'success') {
						if (res.data.pages === 0) {
							this.status = 'finish';
							return;
						}
						this.countPage = res.data.pages;
						let list = res.data.list;
						for (let i = 0; i < list.length; i++) {
							list[i].image = this.$URL + list[i].code + '.jpg';
							for (let j = 0; j < this.fuxiSelasOrderInfo.length; j++) {
								if (this.fuxiSelasOrderInfo[j].goodsid === list[i].goodsid) {
									list[i].flg = true;
								} else {
									list[i].flg = false;
								}
							}
						}
						console.log(this.fuxiSelasOrderInfo);
						console.log(list);
						this.listData = this.reload ? list : this.listData.concat(list);
						this.last_id = list[list.length - 1].id;
						this.reload = false;
						
					}
				});
			},
			getMoreInfo() { // 获取更多公司列表
				if (this.countPage === this.para.pageNum) {
					this.status = 'finish';
					return;
				}
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
				}
				this.para.pageNum++;
				this.$API.get('/fuxi/goods/query-goods-simple-list', this.para).then(res => {
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
		},
		components: {
			searchLeft,
			goodsItem,
			search,
			uniLoadMore
		}
	}
</script>

<style lang="scss">
	@import "../../../components/mixin.scss";
	.v-invoice-view {
		.list-con {
			margin-top: 140upx;
			padding-bottom: 100upx;
		}
		.ok-goods-con {
			width: 100%;
			height: 80%;
			background: #fff;
			overflow: auto;
			position: fixed;
			z-index: 3;
			bottom: 0;
			left: 0;
			padding-bottom: 100upx;
		}
		.btn {
			width: 100%;
			height: 80upx;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 4;
			display: flex;
			justify-content: space-around;
			text-align: center;
			line-height: 80upx;
			background: $themeColor;
			color: #fff;
		}
		.cgh-alert-black {
			@include cgh-alert-black();
		}
	}
</style>
