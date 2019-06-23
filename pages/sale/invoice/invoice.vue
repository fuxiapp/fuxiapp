<template>
	<view class="v-invoice-view">
		<view v-if="!iShowSelGoods">
			<view class="search">
				<searchLeft placeholderStr="货品编码/品名/条形码" type="1" @scanCode="scanCode" ></searchLeft>
			</view>
			<view class="list-con">
				<goodsItem :list="infoList" type="1" @toPath="goEditGoods"></goodsItem>
			</view>
			<view class="btn" @click="selGoods" >已选货品</view>
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
				iShowSelGoods: false
			}
		},
		onShow() {
			this.iShowSelGoods = false;
		},
		methods: {
			goEditGoods (id) {
				this.$API.to(`../../sale/editGoods/editGoods?id=${id}`);
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
			goodsItem
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
