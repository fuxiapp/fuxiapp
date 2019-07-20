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
			<searItem :list="listData" @toPath="toPath"  type="1"></searItem>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import search from '../../../components/search.vue';
	import searItem from '../../../components/searItem.vue';
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
				para: {pageSize: 10, pageNum: 1, keyword: ''}
			}
		},
		onNavigationBarButtonTap(e) {
			this.showAdd();
		},
		methods: {
			
		},
		onLoad(option) {
			this.moduleType = option.type === undefined? 1 : parseInt(option.type);
			this.getList();
		},
		onReachBottom() { // 页面下拉 
			this.status = 'more';
			this.getMoreInfo();
		},
		methods: {
			showAdd () {
				this.$API.to('../../sale//addCustomer/addCustomer');
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
				this.$API.get('/fuxi/supplier/query-supplier-list', this.para).then(res => {
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
				this.$API.get('/fuxi/supplier/query-supplier-list', this.para).then(res => {
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
			toPath (id) { // 跳转
				this.$API.to(`../../sale/selStore/selStore?id=${id}`);
			},
			
		},
		components: {
			search,
			searItem,
			uniLoadMore
		}
	}
</script>

<style lang="scss">
	.v-sel-customer {
		.list-con {
			margin-top: 140upx;
		}
	}
</style>
