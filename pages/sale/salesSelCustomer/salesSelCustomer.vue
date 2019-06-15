<template>
	<view class="v-sel-customer">
		<view class="search">
			<search placeholderStr="编码/名称/手机号" type="1"></search>
		</view>
		<view class="list-con">
			<searItem :list="infoList" @toPath="toStrore"  type="1"></searItem>
		</view>
		<!-- 新增客户 -->
		<view>
			<addCustomer :cityS="cityS" :isShowCity="isShowCity" :selCityNameS="selCityNameS"  @selCity="selCity" @closeAlertCity="closeAlertCity" @okCityValue="okCityValue" >
			</addCustomer>
		</view>
	</view>
</template>

<script>
	import search from '../../../components/search.vue';
	import searItem from '../../../components/searItem.vue';
	import addCustomer from '../../../components/addCustomer.vue';
	import city from '../../../common/city-data.json';
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
				cityS: [],
				isShowCity: false,
				cityType: 0,
				selCityNameS: {privinceName: '',cityName: '',countyArea: ''}
			}
		},
		onNavigationBarButtonTap(e) {
		},
		methods: {
			
		},
		onLoad() {
		},
		methods: {
			toStrore (id) { // 选择店仓
				this.$API.to('../../sale/selStore/selStore');
			},
			selCity (type) {
				if (type === 1) { // 获取省份
					for (let i = 0; i < city.length; i++) {
						let val = {name: city[i].values};
						this.cityS.push(val);
					}
				} else if (type === 2) {
					
				}
				this.isShowCity = true;
			},
			closeAlertCity () {
				this.isShowCity = false;
			},
			okCityValue (val) {
				if (this.cityType === 1) {
					this.selCityNameS.privinceName = val.name;
				}
				if (this.cityType === 2) {
					this.selCityNameS.cityName = val.name;
				}
				if (this.cityType === 3) {
					this.selCityNameS.countyArea = val.name;
				}
			}
		},
		components: {
			search,
			searItem,
			addCustomer
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
