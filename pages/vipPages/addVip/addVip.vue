<template>
	<view class="cgh-add-customer-view">
		<view class="add-base-info">
			<view class="item">
				<view class="add-title red-title">会员编号</view>
				<view class="add-input">
					<input type="text" v-if="type === 1" placeholder="请输入会员编号" v-model="vipInfo.code" />
					<input type="text" v-if="type === 2 " placeholder="请输入会员编号" disabled v-model="vipInfo.code" />
				</view>
			</view>
			<view class="item">
				<view class="add-title red-title">姓名</view>
				<view class="add-input">
					<input placeholder="姓名" v-model="vipInfo.vip"  />
				</view>
			</view>
			<view class="item">
				<view class="add-title">手机</view>
				<view class="add-input"><input type="number" placeholder="手机" v-model="vipInfo.mobilephone" /></view>
			</view>
			<view class="item">
				<view class="add-title red-title">vip类别</view>
				<view class="add-input"  @click="onselInfo(1)"><input placeholder="vip类别" disabled v-model="selStoreInfo.name" /></view>
				<view class="add-type" @click="isShowTypeAdd = true">新增</view>
			</view>
			<view class="item" >
				<view class="add-title">所属门店</view>
				<view class="add-input " @click="onselInfo(2)"><input placeholder="所属门店" v-model="selCustomerInfo.name" disabled /></view>
				<view class="add-right"><image src="../../../static/base/right.png"></image></view>
			</view>
			<view class="item-radio">
				<view class="add-title">性别</view>
				<view class="radio-tab" v-for="(r, index) in sexRadioTab" @click="onSelSex(index)">
					<image v-if="selSex !== index" src="../../../static/base/radio.png"></image>
					<image v-if="selSex === index"  src="../../../static/base/sel_radio.png"></image>
					{{r.name}}
				</view>
			</view>
			<view class="item">
				<view class="add-title">生日</view>
				<view class="add-input" >
					<picker mode="date" :value="vipInfo.birthday" @change="confirmBirthday">
						<input placeholder="生日" disabled  v-model="vipInfo.birthday"  />
					</picker>
				</view>
				<view class="add-right"><image src="../../../static/base/right.png"></image></view>
			</view>
		</view>
		<view class="btn" v-if="!isShowTypeAdd" @click="save" >保存</view>
		<!-- 弹框选择 -->
		<view  v-if="isShowStore" >
			<radioItemsSearch  v-if="alterType === 1" :list="vipTypeList"  title="vip分类" placeholderTitle="关键字搜索"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo()"></radioItemsSearch>
			<radioItemsSearch  v-if="alterType === 2" :list="storeList"  title="所属门店" placeholderTitle="关键字搜索"  @closeAlert="closeAlert" @search="search"  @okRadioValue="okInfo()" :moreType="alterType"  :isPage="isPage" :isMore="departmentMore"   @moreTypeInfo="moreTypeInfo" ></radioItemsSearch>
		</view> 
		<!-- 新增vip类别 -->
		<view v-if="isShowTypeAdd">
			<view class="cgh-black" @click="closeAddType"></view>
			<view class="cgh-add-type-white">
				<view class="add-base-info">
					<view class="item">
						<view class="add-title">类别名称</view>
						<view class="add-input"><input placeholder="类别名称"  v-model="addVipInfo.vipType"  /></view>
					</view>
					<view class="item">
						<view class="add-title">类别折扣</view>
						<view class="add-input"><input type="number"  placeholder="类别折扣"  v-model="addVipInfo.discountRate "  /></view>
					</view>
				</view> 
				<view class="cgh-add-type-button" @click="saveVipType">确认</view>
			</view>
		</view>
	</view>
</template>
<script>
	import city from '../../../common/city-data.json';
	import uniCalendar from '../../../components/uni-calendar/uni-calendar.vue';
	import radioItemsSearch from '../../../components/radioItemsSearch';
	export default {
		data() {
			return {
				vipInfo: {code: '', birthday: ''},
				moduleType: 1,
				isShowStore: false,
				storeList: [],
				vipTypeList: [],
				alterType: 1, // 1: 客户分类 2: 店仓
				selCustomerInfo: {},
				selStoreInfo: {},
				isUser: false,
				id: '',
				type: 1,// 1:添加 2: 编辑
				sexRadioTab: [{name: '男', val: 0}, {name: '女', val: 1}],
				selSex: 0,
				keyWord: '',
				isShowTypeAdd: false,
				addVipInfo: {},
				// 弹框分页
				isPage: true,
				size: 10,
				departmentPage: 1,  // 所属门店
				departmentMore: true,
			}
		},
		onLoad(option) {
			this.id = option.id;
			if (this.id !== '' && this.id !== undefined && this.id !== null) {
				uni.setNavigationBarTitle({title: '编辑会员'});
				this.type = 2;
				this.getInfo();
			} else {
				this.$API.generateNo().then(res => {
					this.vipInfo.code = res;
				});
				this.$API.getStorage('fuxiUserInfo').then(res => {
					this.selCustomerInfo = {id: res.data.departmentId, name: res.data.departmentName};
				});
			}
		},
		onNavigationBarButtonTap(e) {
			this.saveCustomer();
		},
		methods: {
			getInfo () { // 获取详情
				this.$API.get('/fuxi/vip/query-vip', {vipId: this.id}).then(res => {
					if (res.code === 'success') {
						this.vipInfo = res.data;
						this.vipInfo.birthday = this.$API.fmtClearTime(this.vipInfo.birthday);
						this.selCustomerInfo =  {id: this.vipInfo.departmentid, name: this.vipInfo.department};
						this.selStoreInfo = {id: this.vipInfo.viptypeid, name: this.vipInfo.viptype};
						this.selSex = this.vipInfo.sex == '男'? 0 : 1;
					}
				});
			},
			closeAlert () {
				this.isShowStore = false;
				this.keyWord = '';
			},
			search (str) { // 弹框搜索
				this.keyWord = str;
				this.onselInfo(this.alterType);
			},
			onSelSex (index) { //  选择性别
				this.selSex = index;
			},
			confirmBirthday(e) {
				this.vipInfo.birthday =  e.target.value;
			},
			onselInfo (type) { // 选择类别/门店
				this.alterType = type;
				uni.showLoading({
					title: '加载中...',
				});
				if (type === 1) {
					this.$API.get('/fuxi/select/query-vip-type', {keyWord: this.keyWord}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.vipTypeList = this.$API.fmtSelData(res.data, 15);
							this.isShowStore = true;
						}
					});
				} else if (type === 2) {
					this.departmentPage = 1;
					this.departmentMore = true;
					this.$API.get('/fuxi/select/query-department',  {keyword: this.keyWord, pageNum: this.departmentPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							this.isShowStore = true;
							this.storeList = this.$API.fmtSelData(res.data.list, 6);
							if (this.departmentPage === res.data.pages) {
								this.departmentMore = false;
							} else {
								this.departmentMore = true;
							}
						}
					});
				}
			
			},
			moreTypeInfo (index) { // 更新弹框信息
				uni.showLoading({
					title: '加载中...',
				});
				 if (index === 2) {
					this.departmentPage++;
					this.$API.get('/fuxi/select/query-department',  {keyword: this.keyWord, pageNum: this.departmentPage, pageSize: this.size}).then(res => {
						uni.hideLoading();
						if (res.code === 'success') {
							let list = this.$API.fmtSelData(res.data.list, 6);
							this.storeList = this.storeList.concat(list);
							if (this.departmentPage === res.data.pages) {
								this.departmentMore = false;
							} else {
								this.departmentMore = true;
							}
						}
					});
				} 
			},
			okInfo (val) {// 确认选择选择
				this.isShowStore = false;
				if (this.alterType === 1) {
					this.selStoreInfo = val;
				} else if (this.alterType === 2) {
					this.selCustomerInfo = val;
				}
			},
			closeAddType () {
				this.isShowTypeAdd = false;
				this.addVipInfo = {};
			},
			saveVipType () { // 保存vip类别
				this.$API.post('/fuxi/vip/add-vip-type', this.addVipInfo).then(res => {
					console.log(res);
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						this.closeAddType();
					}
				});
			},
			save () { // 保存 
				let url = '/fuxi/vip/add-vip';
				let method = 'POST';
				if (this.type === 2) {
					url = '/fuxi/vip/update-vip';
					method = 'PUT';
				}
				this.vipInfo.viptypeid  = this.selStoreInfo.id;
				this.vipInfo.departmentid  = this.selCustomerInfo.id;
				this.vipInfo.sex = this.sexRadioTab[this.selSex].name;
				this.$API.post(url, this.vipInfo, method).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						uni.navigateBack();
					}
				});
			}
		},
		components: {
			uniCalendar,
			radioItemsSearch
		}
	}
</script>

<style lang="scss" scoped="">
	@import "../../../components/mixin.scss";
	.cgh-add-customer-view {
		width: 100%;
		overflow: hidden;
		font-size: 28upx;
		padding-bottom: 100upx;
		.add-base-info {
			width: 94%;
			overflow: hidden;
			margin-bottom: 20upx;
			padding: 0upx 3%;
			background: #fff;
			.add-title {
				width: 22%;
				color: #333;
				font-weight: bold;
				font-size: 30upx;
			}
			.item {
				display: flex;
				align-items: center;
				white-space: nowrap;
				border-bottom: 1upx solid $boder-se;
				line-height: 80upx;
				justify-content: space-between;
				.add-input {
					width: 76%;
					input {
						width: 100%;
						height: 100%;
						color: #333;
					}
					
				}
				.add-right {
					width: 10%;
					image {
						@include cgh-right-img();
					}
				}
				.add-type {
					width: 15%;
					height: 60upx;
					background: $themeColor;
					line-height: 60upx;
					color: #fff;
					text-align: center;
				}
			}
		}
		// radio
		.item-radio {
			width: 100%;
			display: flex;
			align-items: center;
			white-space: nowrap;
			border-bottom: 1upx solid $boder-se;
			line-height: 80upx;
			.radio-tab {
				width: 14%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-right: 50upx;
				image {
					width: 50upx;
					height: 50upx;
					vertical-align: middle;
				}
			}
		}
		.no {
			background: #F2F0F0;
			border: 1upx solid $boder-se;
		}
		.red-title {
			color: red!important;
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
			.cel {
				width: 50%;
			}
			.config {
				width: 50%;
				border-left: 1upx solid $boder-se;
			}
		}
		.cgh-alert-black {
			@include cgh-alert-black();
		}
		//
		.close {
			width: 100upx;
			height: 100upx;
			position: fixed;
			overflow:auto;
			top: 270upx;
			right: 0;
			z-index: 11;
			image {
				width: 90upx;
				height: 80upx;
			}
		}
		.radio-con {
			width: 100%;
			height: 70%;
			position: fixed;
			overflow:auto;
			bottom: 0;
			left: 0;
			z-index: 11;
			background: #fff;
			.radio-info-con {
				.item {
					font-size: 36upx;
					color: #333;
					font-weight: bold;
					border-bottom: 1upx solid $boder-se;
					padding: 25upx 0upx 25upx 30upx;
				}
			}
		}
		// 日期
		.cgh-black {
			@include cgh-alert-black();
		}
		.cgh-white {
			width: 80%;
			height: 60%;
			background: #fff;
			display: black; 
			position: fixed; 
			left: 10%;
			top: 10%;
			z-index: 3;
			-webkit-overflow-scrolling: touch;
			.cgh-calendar-button {
				display: flex;
				border-top: 1upx solid $boder-se;
				view {
					width: 50%;
					height: 80upx;
					font-size: 30upx;
					color: $themeColor;
					background: #fff;
					text-align: center;
					line-height: 80upx;
				}
				view:last-child {
					background: $themeColor;
					color: #fff;
				}
			}
		}
		.cgh-add-type-white {
			width: 90%;
			height: 400upx;
			background: #fff;
			display: black; 
			position: fixed; 
			left: 5%;
			top: 20%;
			z-index: 3;
			-webkit-overflow-scrolling: touch;
			padding-top: 20upx;
			.cgh-add-type-button {
				width: 80%;
				height: 70upx;
				@include default-bac-button();
				border-radius: 10upx;
				background: $themeColor;
				margin-left: 10%;
				margin-top: 40upx;
				line-height: 70upx;
			}
		}
		
	}
</style>
