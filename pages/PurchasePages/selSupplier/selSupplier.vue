<template>
	<view class="v-sel-strore">
		<view class="search">
			<search placeholderStr="店仓编码/店仓名称" type="2" @search="search" ></search>
		</view>
		<view class="list-con">
			<!-- #ifdef MP-WEIXIN -->
			<button @click="showAdd">添加</button>
			<!-- #endif -->
			<view class="list" v-for="(v, index) in listData" :key="v.supplierId" @click="toPath(v)">
				<view class="name">{{v.supplier}}</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import search from '../../../components/search.vue';
	import searItem from '../../../components/searItem.vue';
	import uniLoadMore from '../../../components/uni/uni-load-more/uni-load-more.vue';
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
				countPage: '',
				para: {pageSize: 20, pageNum: 1, keyword: ''},
				moduleType: 1 ,// main 模块
				companyOrStrore: 0,
				supperId: '',
				salesSend: {}
			}
		},
		onNavigationBarButtonTap(e) {
			this.showAdd();
		},
		onLoad (option) {
			this.$API.removeStorage('fuxiSelasOrderInfo');
			this.$API.removeStorage('fuxiSalesSend');
			this.moduleType = +option.type;
			this.getList();
		},
		onReachBottom() { // 页面下拉 
			this.status = 'more';
			this.getMoreInfo();
		},
		methods: {
			showAdd () {
				this.$API.to('../../supplier/addSupplier/addSupplier');
			},
			search (keyword) { // 关键字搜索
				this.para.keyword = keyword;
				this.getList();
			},
			toPath (v) { // 选择店仓
				if (this.moduleType === 4 || this.moduleType === 5) { // 采购发货单
					let info = {supplierId: v.supplierId, supplierName: v.supplier, warehouseid: '', warehousedName: '', employeeid: '', employeeName:'', type: '', typeCode: ''};
					this.$API.setStorage('fuxiSalesSend', info);
					this.$API.to(`../../PurchasePages/selStore/selStore?id=${v.supplierId}&type=${this.moduleType}`);
				}
			},
			getList() { // 获取店仓列表
				this.countPage = 0;
				this.listData = [];
				this.last_id = '';
				this.status = 'more';
				this.para.pageNum = 1;
				uni.showLoading({
					title: '加载中...',
					duration: 2000
				});
				this.$API.get('/fuxi/select/query-supplier', this.para).then(res => {
					uni.hideLoading();
					if (res.code === 'success') {
						if (res.data.pages === 0 ) {
							this.status = 'finish';
							return;
						}
						this.countPage = res.data.pages;
						let list = res.data.list;
						this.last_id = list[list.length - 1].id;
						this.listData = this.reload ? list : this.listData.concat(list);
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
				uni.showLoading({
					title: '加载中...',
					duration: 2000
				});
				this.$API.get('/fuxi/select/query-supplier', this.para).then(res => {
					uni.hideLoading();
					if (res.code === 'success') {
						let list = res.data.list;
						this.listData = this.reload ? list : this.listData.concat(list);
						this.last_id = list[list.length - 1].id;
						this.reload = false;
					}
				});
			},
		},
		components: {
			search,
			searItem,
			uniLoadMore
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../components/mixin.scss";
	.v-sel-strore {
		width: 100%;
		overflow: hidden;
		.list-con {
			margin-top: 140upx;
			background: #fff;
			.list {
				width: 92%;
				overflow: hidden;
				border-bottom: 1upx solid $boder-se;
				padding: 28upx 4%;
				.name {
					color: #333;
					font-size: 36upx;
				}
			}
		}
	}
</style>
