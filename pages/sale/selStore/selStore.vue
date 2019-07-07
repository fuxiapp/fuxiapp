<template>
	<view class="v-sel-strore">
		<view class="search">
			<search placeholderStr="店仓编码/店仓名称" type="2"></search>
		</view>
		<view class="list-con">
			<searItem :moduleType="moduleType" :companyOrStrore="companyOrStrore" :list="infoList" type="2" @toPath="toInvoice"></searItem>
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
				],
				moduleType: 1 ,// main 模块
				companyOrStrore: 0
			}
		},
		onLoad (option) {
			this.moduleType = parseInt(option.type);
		},
		methods: {
			toInvoice (id) { // 选择店仓
				if (this.moduleType === 2) { // 销售退货单
					this.$API.to(`../../sale/salesSelCustomer/salesSelCustomer?id=${id}`);
				} else {
					this.$API.to(`../../sale/invoice/invoice?id=${id}&type=${this.moduleType}`);
				}	
			}
		},
		components: {
			search,
			searItem
		}
	}
</script>

<style lang="scss">
	.v-sel-strore {
		.list-con {
			margin-top: 140upx;
		}
	}
</style>
