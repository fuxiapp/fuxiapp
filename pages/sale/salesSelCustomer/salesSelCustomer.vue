<template>
	<view class="v-sel-customer">
		<view class="search">
			<search placeholderStr="编码/名称/手机号" type="1"></search>
		</view>
		<view class="list-con">
			<searItem :list="infoList" @toPath="toStrore"  type="1"></searItem>
		</view>
	</view>
</template>

<script>
	import search from '../../../components/search.vue';
	import searItem from '../../../components/searItem.vue';
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
					{id:1}
				]
			}
		},
		methods: {
			
		},
		onLoad() {
		},
		methods: {
			toStrore (id) { // 选择店仓
				this.$API.to('../../sale/selStore/selStore');
			}
		},
		components: {
			search,
			searItem
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
