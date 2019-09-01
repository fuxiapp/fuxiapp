<template>
	<view class="v-sel-strore">
		<view class="list-con">
			<view class="list" v-for="(v, index) in listData" :key="index" @click="toPath(v)">
				<view class="name">{{v.Name}}</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
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
				moduleType: 1 ,// main 模块
				companyOrStrore: 0,
				supperId: '',
				salesSend: {},
			}
		},
		onLoad (option) {
			this.$API.getStorage('fuxiSalesSend').then(res => {
				this.salesSend = res.data;
			});
			this.supperId = option.id;
			this.moduleType = parseInt(option.type);
			this.getList();
		},
		methods: {
			toPath (v) { // 选择类别
				if  (this.moduleType === 0 || this.moduleType === 1 || this.moduleType === 2) { // 销售订单/销售退货单/销售发货单
					this.salesSend.type = v.Name;
					this.salesSend.typeCode = v.Type;
					this.$API.setStorage('fuxiSalesSend', this.salesSend);
					this.$API.rto(`../../sale/invoice/invoice?id=${v.Name}&type=${this.moduleType}`);
				}
			},
			getList() { // 获取销售列表
				this.$API.get('/fuxi/select/query-sales-Type').then(res => {
					uni.hideLoading();
					if (res.code === 'success') {
						this.listData = res.data;
						this.reload = false;
						this.status = 'finish';
					}
				});
			},
		},
		components: {
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
			background: #fff;
			.list {
				width: 92%;
				overflow: hidden;
				border-bottom: 1upx solid $boder-se;
				padding: 25upx 4%;
				.name {
					color: #333;
					font-size: 36upx;
					font-weight: bold;
					@include lineEllipsis(1);
				}
			}
		}
	}
</style>
