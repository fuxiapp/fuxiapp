<template>
	<view class="v-sel-customer">
		<view class="search">
			<search placeholderStr="客户编码/客户名称/手机号" type="1" @search="search"></search>
		</view>
		<view class="list-con">
			<!-- #ifdef MP-WEIXIN -->
			<button @click="showAdd">添加</button>
			<!-- #endif -->
			<!--  -->
			<view class="info-con">
				<view class="list" v-for="(v, index) in listData" :key="index" @click="toPath(v.customerid)">
					<view class="base-info">
						<view class="name">{{v.customer}}</view>
						<view class="desc">客户分类:
							<text>{{v.customertype}}</text>
						 </view>
						<view class="desc">客户余额: <text class="price">0</text></view>
						<view class="desc">手机:
							<text>{{v.mobilephone}}</text>
						 </view>
					</view>
					<view class="right"><image src="../../../static/base/right.png"></image></view>
				</view>
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
				this.$API.to(`../../sale/addCustomer/addCustomer`);
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
				this.$API.get('/fuxi/customer/query-customer-list', this.para).then(res => {
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
				this.$API.get('/fuxi/customer/query-customer-list', this.para).then(res => {
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
				this.$API.to(`../../sale/addCustomer/addCustomer?id=${id}`);
			}
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
		background: #fff;
		.list-con {
			margin-top: 140upx;
			.info-con {
				width: 100%;
				overflow: hidden;
				margin: 0upx auto;
				.list {
					width: 92%;
					overflow: hidden;
					border-bottom: 1upx solid $boder-se;
					padding: 30upx 4%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.base-info {
						width: 80%;
						line-height: 50upx
						view {
							width: 98%;
							@include lineEllipsis(1);
						}
						.name {
							color: #333;
							font-size: 36upx;
							font-weight: bold;
							
						}
						.desc {
							color: #333;
							font-size: 30upx;
							text {
								padding-left: 10upx;
							}
							.price {
								color: orange;
							}
						}
					}
					
					image {
						@include cgh-right-img();
						margin-left: 10upx;
					}
				}
			}
		}
	}
</style>
