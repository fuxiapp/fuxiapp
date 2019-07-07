<template>
	<view class="v-invoice-view">
		<view v-if="!iShowSelGoods">
			<view class="search">
				<search v-if="moduleType === 4 || moduleType === 5" placeholderStr="店仓编码/店仓名称" type="2"></search>
				<searchLeft v-else placeholderStr="货品编码/品名/条形码" type="1" @scanCode="scanCode" ></searchLeft>
			</view>
			<view class="list-con">
				<goodsItem :list="infoList" type="1" @toPath="goEditGoods"></goodsItem>
			</view>
			<view class="btn" v-if="moduleType === 7" @click="selGoods" >已盘货品</view>
			<view class="btn" v-else @click="selGoods" >已选货品</view>
		</view>
		<view  v-if="iShowSelGoods">
			<view  class="ok-goods-con">
				<goodsItem :list="infoList" type="1" @toPath="goEditGoods"></goodsItem>
			</view>
			<view class="btn"  @click="iShowSelGoods = false">返回</view>
			<view class="cgh-alert-black"></view>
		</view>
	</view>
</template>
<script>
	import searchLeft from '../../../components/searchLeft.vue';
	import search from '../../../components/search.vue';
	import goodsItem from '../../../components/goodsItem.vue';
	export default {
		data() {
			return {
				infoList: [
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1},
					{id:1}
				],
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
		},
		methods: {
			goEditGoods (id) {
				this.$API.to(`../../sale/editGoods/editGoods?id=${id}&type=${this.moduleType}`);
			},
			scanCode () { // 识别二维码
				uni.scanCode({
					success: (res) => {
						uni.showToast({
							title: '扫码结果 = ' + res.result,
							icon: 'none'
						});
					}
				});
			},
			selGoods () { // 一选货品
				this.iShowSelGoods = true;
			},
		},
		components: {
			searchLeft,
			goodsItem,
			search
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
