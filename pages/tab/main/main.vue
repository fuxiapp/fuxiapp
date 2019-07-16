<template>
	<view class="v-main">
		<!-- 单据信息 -->
		<view class="info">
			<view class="info-con">
				<view class="title">单据信息</view>
				<view class="list-con">
					<view class="item" v-for="(v, index) in noInfo"  @click="toPath(v.url, v.routeType, v.type)" :key="index">
						<view class="bill-icons-con">
							<view class="bill-icons" :style="'background:' + v.bac">
								<view :class="'icon iconfont  '+ v.icon"></view>
							</view>
						</view>	
						<view class="name">{{v.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bac-line"></view>
		<!-- 档案信息 -->
		<view class="info">
			<view class="info-con">
				<view class="title">档案信息</view>
				<view class="list-con">
					<view class="item"  v-for="(v, index) in docInfo" @click="toPath(v.url, v.routeType, v.type)" :key="index">
						<view class="icons" :style="'background:' + v.bac"><view :class="'icon iconfont  '+ v.icon"></view></view>
						<view class="name">{{v.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bac-line"></view>
		<!-- 往来帐管理 -->
		<view class="info">
			<view class="info-con">
				<view class="title">往来帐管理</view>
				<view class="list-con">
					<view class="item"  v-for="(v, index) in receivalInfo" @click="toPath(v.url, v.routeType, v.type)" :key="index">
						<view class="icons" :style="'background:' + v.bac"><view  :class="'icon iconfont  '+ v.icon"></view></view>
						<view class="name">{{v.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bac-line"></view>
		<!--数据统计  -->
		<view class="qiun-columns">
			<view class="usharts-title">
				<view class="title-name">商品销售统计</view>
				<view class="date-con">
					2018-11.13-2018.11.12<image src="../../../static/base/down.png"></image>
				</view>
			</view>
			<view class="qiun-charts">
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
				<!--#endif-->
			</view>
		</view>
		
		<view v-if="isDateShow">
			<view class="cgh-black" @click="closeMask"></view>
			<view class="cgh-white">
				<view class="calendar-box">
					<uni-calendar :lunar="checkedFlg" :fixed-heihgt="checkedFlg" :slide="checkedFlg" :disable-before="checkedFlg" :start-date="startDate" :end-date="endDate" :date="date" @change="change" @to-click="toClick" />
					<view class="calendar-button-groups">
						<button class="calendar-button-confirm" @click="closeMask">取消</button>
						<button class="calendar-button-confirm" @click="confirm">确认</button>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uCharts from '../../../components/u-charts.js';
	import uniCalendar from '../../../components/uni-calendar/uni-calendar.vue';
	var _self;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				cHeight3: '', //圆弧进度图
				pixelRatio: 1,
				serverData: '',
				noInfo: [{
						icon: 'iconsales-order',
						url: '../../sale/salesSelCustomer/salesSelCustomer',
						title: '销售订单',
						bac: '#427CAC',
						routeType: 2,
						type: 0
					},
					{
						icon: 'iconfahuodan',
						url: '../../sale/salesSelCustomer/salesSelCustomer',
						title: '销售发货单',
						bac: '#F65341',
						routeType: 2,
						type: 1
						
					},
					{
						icon: 'icontuihuodan',
						url: '../../sale/selStore/selStore',
						title: '销售退货单',
						bac: '#FD943E',
						routeType: 2,
						type: 2
					},
					{
						icon: 'iconicon-caigoudd',
						url: '../../purchaseOrder/purchaseOrder',
						title: '采购订单',
						bac: '#427CAC',
						routeType: 2,
						type: 3
					},
					{
						icon: 'iconshouhuodan',
						url: '../../sale/salesPurchase/salesPurchase',
						title: '采购收货单',
						bac: '#12BC7F',
						routeType: 2,
						type: 4
					},
					{
						icon: 'icontuihuodan',
						url: '../../sale/salesPurchase/salesPurchase',
						title: '采购退货单',
						bac: '#BC7AF1',
						routeType: 2,
						type: 5
					},
					{
						icon: 'iconchanchengpinrukuzhuancang',
						url: '../../stockMove/stockMove',
						title: '转仓单',
						bac: '#12BC7F',
						routeType: 2,
						type: 6
					},
					{
						icon: 'iconshengchengpandiandan',
						url:'../../sale/selStore/selStore',
						title: '盘点单',
						bac: '#427CAC',
						routeType: 2,
						type: 7
					},
					{
						icon: 'iconjianchaliucheng',
						url:'../../sale/selStore/selStore',
						title: '进仓单',
						bac: '#BC7AF1',
						routeType: 2,
						type: 8
					},
					{
						icon: 'icontuihuodanguanli',
						url:'../../stockOut/stockOut',
						title: '出仓单',
						bac: '#427CAC',
						routeType: 2,
						type: 9
					}

				],
				docInfo: [{
						icon: 'iconxinzengshangpin',
						url:'../../goods/goodsAdd/goodsAdd',
						title: '新增货品',
						bac: '#F65341',
						routeType: 2,
						type: 10
					},
					{
						icon: 'iconcangkuguanli',
						url:'../../department/department',
						title: '店仓管理',
						bac: '#427CAC',
						routeType: 2,
						type: 11
					},
					{
						icon: 'iconhuiyuanguanli',
						url:'../../vip/vip',
						title: '会员管理',
						bac: '#F65341',
						routeType: 2,
						type: 12
					},
					{
						icon: 'iconyuangongguanli',
						url:'../../employee/employee',
						title: '员工管理',
						bac: '#FD943E',
						routeType: 2,
						type: 13
					},
					{
						icon: 'iconchangshang',
						url:'../supplier/supplier',
						title: '厂商管理',
						routeType: 2,
						type: 14
					},
					{
						icon: 'iconyanse',
						url:'../../color/color',
						title: '颜色管理',
						bac: '#BC7AF1',
						routeType: 2,
						type: 15
					},
					{
						icon: 'iconkehuguanli',
						url:'../../customer/customer',
						title: '客户管理',
						bac: '#427CAC',
						routeType: 2,
						type: 16
					},
					{
						icon: 'iconhuopinguanli',
						url:'../../goods/goodsList/goodsList',
						title: '货品管理',
						bac: '#12BC7F',
						routeType: 2,
						type: 17
					}

				],
				receivalInfo: [{
						icon: 'iconshoukuandan',
						url:'../../receival/receival',
						title: '客户收款单',
						bac: '#12BC7F',
						routeType: 2,
						type: 18
					},
					{
						icon: 'iconjigouduan-shouyeqietu',
						url:'../../deduct/deduct',
						title: '客户费用单',
						bac: '#427CAC',
						routeType: 2,
						type: 19
					},
					{
						icon: 'iconkehuwanglai',
						url:'../../receivalReport/receivalReport',
						title: '客户往来',
						bac: '#427CAC',
						routeType: 2,
						type: 20
					},
					{
						icon: 'iconfukuandan',
						url:'../payment/payment',
						title: '厂商付款单',
						bac: '#FD943E',
						routeType: 2,
						type: 21
					},
					{
						icon: 'iconjigouduan-shouyeqietu',
						url:'../../supplierDeduct/supplierDeduct',
						title: '厂商费用单',
						bac: '#BC7AF1',
						routeType: 2,
						type: 22
					},
					{
						icon: 'iconchanchengpinrukuzhuancang',
						url:'../../paymentReport/paymentReport',
						title: '厂商往来',
						bac: '#427CAC',
						routeType: 2,
						type: 23
					}

				],
				isDateShow: true,
				slide: 'none',
				date: '',
				startDate: '',
				endDate: '',
				timeData: {},
				checkedFlg: false
			};
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			toPath (url, routeType, type) { // tab页面跳转
				let router = `${url}?type=${type}`;
				if (routeType === 1) {
					this.$API.tab(router);
				} else {
					this.$API.to(router);
				}
			},
			getServerData() {
				uni.showLoading({
					title: "正在加载数据..."
				})
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
					data: {},
					success: function(res) {
						_self.fillData(res.data);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			fillData(data) {
				this.serverData = data;
				let Ring = {
					series: []
				};
				Ring.series = data.Ring.series;
				//自定义文案示例，需设置format字段
				for (let i = 0; i < Ring.series.length; i++) {
					Ring.series[i].format = () => {
						return Ring.series[i].name + Ring.series[i].data
					};
				}
				this.showRing("canvasRing", Ring);
			},
			showRing(canvasId, chartData) {
				new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: false,
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
						offsetY: -20 * _self.pixelRatio, //新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: 30 * _self.pixelRatio, //新增参数，自定义调整Y轴文案距离
					},
					extra: {
						pie: {
							lableWidth: 15,
							ringWidth: 40 * _self.pixelRatio, //圆环的宽度
							offsetAngle: -45 //圆环的角度
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});
			
			},
			change(e) {
				console.log('change 返回:', e.fulldate)
				this.timeData = e
			},
			toClick(e) {
				console.log('点击事件', e.fulldate)
				this.timeData = e
			},
			confirm() {
				this.show = false;
			},
			closeMask() {
				this.checkedFlg = false;
			},
		},
		components: {
			uniCalendar
		},
	}
</script>

<style lang="scss">
	@import "../../../mainIconFont/iconfont.css";
	@import "../../../components/mixin.scss";
	.v-main {
		font-size: 28upx;
		padding-bottom: 50upx;
		.info {
			width: 100%;
			overflow: hidden;
			background: #fff;
			padding-bottom: 30upx;
			.info-con {
				width: 100%;
				overflow: hidden;
				margin: 0upx auto;
				.list-con {
					width: 92%;
					overflow: hidden;
						margin: 0upx auto;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					.item {
						width: 140upx;
						overflow: hidden;
						margin-left: 30upx;
						margin-top: 30upx;
						.bill-icons-con {
							width: 150upx;
							overflow: hidden;
							text-align: center;
						}
						.bill-icons {
							width: 100upx;
							height: 100upx;
							border-radius: 50%;
							background: $themeColor;
							text-align: center;
							line-height: 100upx;
							margin-left: 25upx;
						}
						.icons {
							width: 100upx;
							height: 100upx;
							border-radius: 20upx;
							background: $themeColor;
							text-align: center;
							line-height: 100upx;
							margin-left: 25upx;
						}
						.iconfont {
							color: #fff;
							font-size: 55upx;
						}
						.name{
							width: 150upx;
							overflow: hidden;
							font-size: 24upx;
							color: #333;
							margin-top: 15upx;
							text-align: center;
						}
					}
				}
			}
		}
		.bac-line {
			@include bac-line(20upx);
		
		}
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
		}
	}
	.title {
		background: #fff;
		@include tab-title();
		border-bottom: 1upx solid $boder-se;
		padding-left: 4%;
	}
	
	/* 报表样式 */
	.usharts-title {
		width: 100%;
		overflow: hidden;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid $boder-se;
		.title-name {
			width: 30%;
			margin-left: 4%;
			background: #fff;
			@include tab-title();
		}
		image {
			width: 30upx;
			height: 30upx;
			vertical-align: middle;
			margin-left: 10upx;
		}
		.date-con {
			font-size: 28upx;
			color: #333;
			margin-left: 20upx;
			margin-right: 20upx;
		}
			
	}
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
