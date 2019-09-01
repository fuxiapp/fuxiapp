<template>
	<view class="v-sel-customer">
		<view class="search">
			<search placeholderStr="编码/名称/手机号" type="1" @search="search"></search>
		</view>
		<view class="list-con">
			<!-- #ifdef MP-WEIXIN -->
			<button @click="showAdd">添加</button>
			<!-- #endif -->
			<!--  -->
			<view class="list" v-for="(v, index) in listData" :key="v.code" @click="toPath(v)">
				<view class="name">{{v.customer}}</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import search from '../../../components/search.vue';
	import city from '../../../common/city-data.json';
	import uniLoadMore from '../../../components/uni/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				moduleType: 1 ,// 0: 销售订单 1: 销售发货单
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
				para: {pageSize: 20, pageNum: 1, keyword: ''}
			}
		},
		onNavigationBarButtonTap(e) {
			this.showAdd();
		},
		onLoad(option) {
			this.$API.removeStorage('fuxiSelasOrderInfo');
			this.$API.removeStorage('fuxiSalesSend');
			this.moduleType = option.type === undefined? 0 : parseInt(option.type);
			this.getList();
		},
		onReachBottom() { // 页面下拉 
			this.status = 'more';
			this.getMoreInfo();
		},
		methods: {
			showAdd () {
				this.$API.to('../../sale/addCustomer/addCustomer');
			},
			search (keyword) { // 关键字搜索
				this.para.keyword = keyword;
				this.getList();
			},
			getList() { // 获取公司列表
				this.countPage = 0;
				this.listData = [];
				this.last_id = '';
				this.status = 'more';
				this.para.pageNum = 1;
				uni.showLoading({
					title: '加载中...',
					duration: 2000
				});
				this.$API.get('/fuxi/select/query-customer', this.para).then(res => {
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
						console.log(this.listData);
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
				this.$API.get('/fuxi/select/query-customer', this.para).then(res => {
					uni.hideLoading();
					if (res.code === 'success') {
						let list = res.data.list;
						this.listData = this.reload ? list : this.listData.concat(list);
						this.last_id = list[list.length - 1].id;
						this.reload = false;
					}
				});
			},
			toPath (v) { // 跳转
				if (this.moduleType === 0 || this.moduleType === 1 || this.moduleType === 2) {   // 销售发货单/退货单
					let info = {customerid: v.customerId, customerName: v.customer, departmentid: v.departmentId, warehouseid: '', warehousedName: '',  employeeid:'', employeeName: '', type: '', typeCode: ''};
					if (this.moduleType === 0) {
						info.warehouseid = v.departmentId;
					} 
					this.$API.setStorage('fuxiSalesSend', info);
					this.$API.rto(`../../sale/selStore/selStore?id=${v.customerId}&type=${this.moduleType}`);
				}
			},
		},
		components: {
			search,
			uniLoadMore
		}
	}
</script>

<style lang="scss">
	@import "../../../components/mixin.scss";
	.v-sel-customer {
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
