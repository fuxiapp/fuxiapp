<template>
	<view class="cgh-deparment-view">
		<view class="search">
			<search placeholderStr="颜色编码/颜色名称" type="15"  @search="search"  ></search>
		</view>
		<view class="list-con">
			 <!-- #ifdef MP-WEIXIN -->
			<button @click="addcolor">添加</button>
			<!-- #endif -->
			<searItem :moduleType="moduleType" :companyOrStrore="companyOrStrore" :list="listData" type="15" @toPath="uptecolor"></searItem>
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
				moduleType: 15,
				companyOrStrore: 0,
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
			}
		},
		onBackPress(options) {  
		    if (options.from === 'navigateBack') {  
		        return false;  
		    } 
			this.$API.tab('../../tab/main/main');
		    return true;  
		}, 
		onLoad (option) {
			this.getList();
		},
		onReachBottom() { // 页面下拉 
			this.status = 'more';
			this.getMoreInfo();
		},
		onNavigationBarButtonTap() {
			this.addcolor();
		},
		methods: {
			addcolor () { // 添加颜色
				this.$API.to('../../colors/addOrUpdate/addOrUpdate');
			},
			uptecolor (id) { // 修改颜色
				this.$API.to(`../../colors/addOrUpdate/addOrUpdate?id=${id}`);
			},
			search (keyword) { // 关键字搜索
				this.para.keyword = keyword;
				this.getList();
			},
			getList() { // 获取颜色列表
				this.countPage = 0;
				this.listData = [];
				this.last_id = '';
				this.status = 'more';
				this.para.pageNum = 1;
				this.$API.get('/fuxi/color/query-color-list', this.para).then(res => {
					if (res.code === 'success') {
						if (res.data.pages === 0 ||  res.data.pages === 1) {
							this.status = 'finish';
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
				this.$API.get('/fuxi/color/query-color-list', this.para).then(res => {
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
			search,
			searItem,
			uniLoadMore
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
