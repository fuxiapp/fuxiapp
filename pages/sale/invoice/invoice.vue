<template>
	<view class="v-invoice-view">
		<view class="search">
			<searchLeft placeholderStr="货品编码/品名/条形码" type="1"></searchLeft>
		</view>
		<view class="list-con">
			<goodsItem :list="infoList" type="1" @toPath="goEditGoods"></goodsItem>
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
				]
			}
		},
		onLoad() {
		},
		methods: {
			goEditGoods (id) {
				this.$API.to(`../../sale/editGoods/editGoods?id=${id}`);
			}
		},
		components: {
			searchLeft,
			goodsItem
		}
	}
</script>

<style lang="scss">
	.v-invoice-view {
		.list-con {
			margin-top: 140upx;
		}
	}
</style>
