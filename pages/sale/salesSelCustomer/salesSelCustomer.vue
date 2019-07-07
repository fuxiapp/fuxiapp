<template>
	<view class="v-sel-customer">
		<view class="search" v-if="!isShowAddCustomer">
			<search placeholderStr="编码/名称/手机号" type="1"></search>
		</view>
		<view class="list-con">
			<searItem :list="infoList" @toPath="toStrore"  type="1"></searItem>
		</view>
		<!-- 新增客户 -->
		<view v-if="isShowAddCustomer">
			<addCustomer :selPrivince="selPrivince"  :moduleType="moduleType" :selCityInfo="selCityInfo"  :selCounty="selCounty" :cityType="cityType" :isShowCity="isShowCity" :selCityNameS="selCityNameS"  @selCity="selCity" @closeAlertCity="closeAlertCity" @okCityValue="okCityValue" @closeAdd="closeAdd" @saveCustomer="saveCustomer" >
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
				isShowAddCustomer: false,
				cityS: [],
				isShowCity: false,
				cityType: 0,
				selPrivince: [],
				selCityInfo: [],
				selCounty: [],
				selCityNameS: {privinceName: '',cityName: '',countyArea: ''},
				selPrivinceIndex: 0,
				selCityIndex: 0,
				selCountyIndex: 0,
				moduleType: 1 // 0: 销售订单 1: 销售发货单
				
			}
		},
		onNavigationBarButtonTap(e) {
			this.isShowAddCustomer = true;
		},
		methods: {
			
		},
		onLoad(option) {
			this.moduleType = option.type === undefined? 1 : parseInt(option.type);
		},
		methods: {
			toStrore (id) { // 选择店仓
				this.$API.to('../../sale/selStore/selStore');
			},
			selCity (type) {
				this.cityType = type;
				if (type === 1) { // 获取省份
					this.selPrivince = city;
				} else if (type === 2) {
					if (this.selCityNameS.privinceName  === '') {
						uni.showToast({
							title: '请先选择省份',
							icon: 'none'
						});
						this.isShowCity = false;
						return;
					}
					this.selCityInfo = this.selPrivince[this.selPrivinceIndex].children;
				} else if (type === 3) {
					if (this.selCityNameS.cityName  === '') {
						uni.showToast({
							title: '请先选择城市',
							icon: 'none'
						});
						this.isShowCity = false;
						return;
					}
					this.selCounty = this.selCityInfo[this.selCityIndex].children;
				}
				this.isShowCity = true;
			},
			closeAlertCity () {
				this.isShowCity = false;
			},
			okCityValue (val) {
				this.isShowCity = false;
				if (this.cityType === 1) {
					this.selCityNameS.privinceName = val.values;
					this.selPrivinceIndex = val.index;
					this.selCityNameS.cityName = '';
					this.selCityNameS.countyArea = '';
				} else if (this.cityType === 2) {
					this.selCityNameS.cityName = val.values;
					this.selCityIndex =  val.index;
					this.selCityNameS.countyArea = '';
				} else 	if (this.cityType === 3) {
					this.selCityNameS.countyArea = val.values;
					this.selCountyIndex = val.index;
				}
			},
			closeAdd () { // 取消添加客户
				this.isShowAddCustomer = false;
			},
			saveCustomer () { // 保存客户
				this.isShowAddCustomer = false;
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
