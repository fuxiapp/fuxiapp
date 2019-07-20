<template>
	<view class="cgh-deparment-view">
		<view class="search">
			<searchLeft placeholderStr="店仓编码/店仓名称" :type="moduleType" :store="store" @onSelStore="onSelStore" @search="search"  ></searchLeft>
		</view>
		<view class="list-con">
			<searItem :moduleType="moduleType" :companyOrStrore="companyOrStrore" :list="listData" type="2" @toPath="toInvoice"></searItem>
		</view>
		<view v-if="isShowStore">
			<radioItem :list="storeList" :type="moduleType"  @closeAlert="closeAlert"  @okRadioValue="okRadioValue"></radioItem>
		</view>
	</view>
</template>

<script>
	import searchLeft from '../../../components/searchLeft.vue';
	import searItem from '../../../components/searItem.vue';
	import radioItem from '../../../components/radioItem.vue';
	export default {
		data() {
			return {
				moduleType: 0,
				companyOrStrore: 0,
				store: '店仓',
				isShowStore: false,
				storeList: [],
				// 分页
				listData: [1,1,1],
				last_id: '',
				reload: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多数据了'
				},
				countPage: '',
				para: {pageSize: 10, pageNum: 1, keyword: ''},
			}
		},
		onLoad (option) {
			this.moduleType = +option.type;
			this.moduleType = parseInt(option.type);
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
			toInvoice (id) { // 选择店仓
				if (this.moduleType === 2) { // 销售退货单
					this.$API.to(`../../sale/salesSelCustomer/salesSelCustomer?id=${id}`);
				} else {
					this.$API.to(`../../sale/invoice/invoice?id=${id}&type=${this.moduleType}`);
				}	
			},
			onSelStore () { // 店仓筛选
				this.isShowStore = true;
				if (this.storeList.length !== 0) {
					return;
				}
				this.$API.get('/fuxi/select/query-department-type').then(res => {
					if (res.code === 'success') {
						this.storeList = res.data;
					}
				});
			},
			okRadioValue (val) { // 确认选择店仓
				this.isShowStore = false;
				this.store = val;
			},
			closeAlert () { // 关闭选择店仓
				this.isShowStore = false;
			},
			getList() { // 获取店仓列表
				this.countPage = 0;
				this.listData = [];
				this.last_id = '';
				this.status = 'more';
				this.para.pageNum = 1;
				this.$API.get('/fuxi/dept/query-dept-list', this.para).then(res => {
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
				this.$API.get('/fuxi/dept/query-dept-list', this.para).then(res => {
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
			searItem,
			radioItem
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../components/mixin.scss";
	.cgh-deparment-view {
		width: 100%;
		overflow: hidden;
		.list-con {
			margin-top: 140upx;
		}
	}
</style>
