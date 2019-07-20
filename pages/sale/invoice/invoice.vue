<template>
	<view class="v-invoice-view">
		<view v-if="!iShowSelGoods">
			<view class="search">
				<search v-if="moduleType === 4 || moduleType === 5"   @search="search" placeholderStr="店仓编码/店仓名称" type="2"></search>
				<searchLeft v-else placeholderStr="货品编码/品名/条形码" type="1" @scanCode="scanCode"  @search="search" ></searchLeft>
			</view>
			<view class="list-con">
				<goodsItem :list="listData" type="1" @toPath="goEditGoods"  @handleError="handleError"></goodsItem>
			</view>
			<view class="btn" v-if="moduleType === 7" @click="selGoods" >已盘货品</view>
			<view class="btn" v-else @click="selGoods" >已选货品</view>
		</view>
		<view  v-if="iShowSelGoods">
			<view  class="ok-goods-con">
				<goodsItem :list="infoList" type="1" @toPath="goEditGoods" @handleError="handleError"></goodsItem>
			</view>
			<view class="btn"  @click="iShowSelGoods = false">返回</view>
			<view class="cgh-alert-black"></view>
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
			}
		},
		onShow() {
			this.iShowSelGoods = false;
		},
		onLoad(option) {
			let type = option.type;
			if (type !== '' && type !== undefined) {
				this.moduleType = parseInt(type);
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
			goEditGoods (id) {
				this.$API.to(`../../sale/editGoods/editGoods?id=${id}&type=${this.moduleType}`);
			},
			scanCode () { // 识别二维码
				uni.scanCode({
					success: (res) => {
						this.para.keyword = res.result;
						this.getList();
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
						}
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
