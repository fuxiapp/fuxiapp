<template>
	<view class="v-main">
		<!-- 单据信息 -->
		<view class="info">
			<view class="info-con">
				<view class="title">单据信息</view>
				<view class="list-con">
					<view class="item" v-for="(v, index) in noInfo"  @click="toPath(v.url, v.routeType)">
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
					<view class="item"  v-for="(v, index) in docInfo" @click="toPath(v.url, v.routeType)">
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
					<view class="item"  v-for="(v, index) in receivalInfo" @click="toPath(v.url, v.routeType)">
						<view class="icons" :style="'background:' + v.bac"><view  :class="'icon iconfont  '+ v.icon"></view></view>
						<view class="name">{{v.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bac-line"></view>
		<!--数据统计  -->
		<view class="info">
			<view class="info-con">
				<view class="title">商品销售统计</view>
				<view class="qiun-charts">
					<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
					<!--#endif-->
					<!--#ifdef MP-WEIXIN || APP-PLUS -->
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
					<!--#endif-->
				</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import wxCharts from '../../../components/wxcharts.js';
	var _self;
	var canvaColumn = null;
	var canvaLineA = null;
	var canvaLineB = null;
	var canvaArea = null;
	var canvaGauge = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				noInfo: [{
						icon: 'iconsales-order',
						url: '../../salesOrder/salesOrder',
						title: '销售订单',
						bac: '#427CAC',
						routeType: 2
					},
					{
						icon: 'iconfahuodan',
						url: '../../sale/salesSelCustomer/salesSelCustomer',
						title: '销售发货单',
						bac: '#F65341',
						routeType: 2
					},
					{
						icon: 'icontuihuodan',
						url: '../../salesReturn/salesReturn',
						title: '销售退货单',
						bac: '#FD943E',
						routeType: 2
					},
					{
						icon: 'iconicon-caigoudd',
						url: '../../purchaseOrder/purchaseOrder',
						title: '采购订单',
						bac: '#427CAC',
						routeType: 2
					},
					{
						icon: 'iconshouhuodan',
						url: '../../purchase/purchase',
						title: '采购收货单',
						bac: '#12BC7F',
						routeType: 2
					},
					{
						icon: 'icontuihuodan',
						url: '../../purchaseReturn/purchaseReturn',
						title: '采购退货单',
						bac: '#BC7AF1',
						routeType: 2
					},
					{
						icon: 'iconchanchengpinrukuzhuancang',
						url: '../../stockMove/stockMove',
						title: '转仓单',
						bac: '#12BC7F',
						routeType: 2
					},
					{
						icon: 'iconshengchengpandiandan',
						url: '../stocktaking/stocktaking',
						title: '盘点单',
						bac: '#427CAC',
						routeType: 2
					},
					{
						icon: 'iconjianchaliucheng',
						url:'../../stockIn/stockIn',
						title: '进仓单',
						bac: '#BC7AF1',
						routeType: 2
					},
					{
						icon: 'icontuihuodanguanli',
						url:'../../stockOut/stockOut',
						title: '出仓单',
						bac: '#427CAC',
						routeType: 2
					}

				],
				docInfo: [{
						icon: 'iconxinzengshangpin',
						url:'../../goods/goodsAdd/goodsAdd',
						title: '新增货品',
						bac: '#F65341',
						routeType: 2
					},
					{
						icon: 'iconcangkuguanli',
						url:'../../department/department',
						title: '店仓管理',
						bac: '#427CAC',
						routeType: 2
					},
					{
						icon: 'iconhuiyuanguanli',
						url:'../../vip/vip',
						title: '会员管理',
						bac: '#F65341',
						routeType: 2
					},
					{
						icon: 'iconyuangongguanli',
						url:'../../employee/employee',
						title: '员工管理',
						bac: '#FD943E',
						routeType: 2
					},
					{
						icon: 'iconchangshang',
						url:'../supplier/supplier',
						title: '厂商管理',
						routeType: 2
					},
					{
						icon: 'iconyanse',
						url:'../../color/color',
						title: '颜色管理',
						bac: '#BC7AF1',
						routeType: 2
					},
					{
						icon: 'iconkehuguanli',
						url:'../../customer/customer',
						title: '客户管理',
						bac: '#427CAC',
						routeType: 2
					},
					{
						icon: 'iconhuopinguanli',
						url:'../../goods/goodsList/goodsList',
						title: '货品管理',
						bac: '#12BC7F',
						routeType: 2
					}

				],
				receivalInfo: [{
						icon: 'iconshoukuandan',
						url:'../../receival/receival',
						title: '客户收款单',
						bac: '#12BC7F',
						routeType: 2
					},
					{
						icon: 'iconjigouduan-shouyeqietu',
						url:'../../deduct/deduct',
						title: '客户费用单',
						bac: '#427CAC',
						routeType: 2
					},
					{
						icon: 'iconkehuwanglai',
						url:'../../receivalReport/receivalReport',
						title: '客户往来',
						bac: '#427CAC',
						routeType: 2
					},
					{
						icon: 'iconfukuandan',
						url:'../payment/payment',
						title: '厂商付款单',
						bac: '#FD943E',
						routeType: 2
					},
					{
						icon: 'iconjigouduan-shouyeqietu',
						url:'../../supplierDeduct/supplierDeduct',
						title: '厂商费用单',
						bac: '#BC7AF1',
						routeType: 2
					},
					{
						icon: 'iconchanchengpinrukuzhuancang',
						url:'../../paymentReport/paymentReport',
						title: '厂商往来',
						bac: '#427CAC',
						routeType: 2
					}

				]
			};
		},
		onLoad() {
			_self = this;
			//#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			toPath (url, routeType) { // tab页面跳转
				if (routeType === 1) {
					this.$API.tab(url);
				} else {
					this.$API.to(url);
				}
			},
			getServerData() {
				uni.request({
					url: 'https://www.easy-mock.com/mock/5cc586b64fc5576cba3d647b/uni-wx-charts/chartsdata',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
						_self.serverData = res.data.data;
						let Ring = {
							series: []
						};
						//这里的series数据是后台做好的，如果您的数据没有和前面我注释掉的格式一样，请自行拼接数据
						Ring.series = res.data.data.Ring.series;
						//自定义文案示例，需设置format字段
						for (let i = 0; i < Ring.series.length; i++) {
							Ring.series[i].format = () => {
								return Ring.series[i].name + Ring.series[i].data
							};
						}
						//实例化图表前，请先检查您的数据是否为空，空数据会造成客户端卡死
						if (Ring.series.length > 0) {
							_self.showRing("canvasRing", Ring);
						}
					},
					fail: () => {
						console.log("数据获取失败！")
					},
				});
			},
			showRing(canvasId, chartData) {
				new wxCharts({
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
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
						ringWidth: 40 * _self.pixelRatio, //圆环的宽度
						pie: {
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
			clickModule(e) {
				console.info(e)
				uni.navigateTo({
					url: e.currentTarget.id
				});
			}
		}
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
				width: 92%;
				overflow: hidden;
				margin: 0upx auto;
				.title {
					@include tab-title();
					border-bottom: 1upx solid $boder-se;
				}
				.list-con {
					width: 100%;
					overflow: hidden;
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
	}
	/* 报表样式 */
	.v-data-statistics {
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
		
		/* 圆弧进度样式 */
		.qiun-charts3 {
			width: 750upx;
			height: 250upx;
			background-color: #FFFFFF;
			position: relative;
		}
		
		.charts3 {
			position: absolute;
			width: 250upx;
			height: 250upx;
			background-color: #FFFFFF;
		}
	
	}
</style>
