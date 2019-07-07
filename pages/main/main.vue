<template>
	<scroll-view class="content" scroll-x="false" scroll-y="true">
		<!-- <view class="v-background"></view> -->
		<view class="v-no-info">
			<view class="v-title">
				<text class="title">单据信息</text>
			</view>
			<view class="v-content">
				<view class="item-list" hover-class="uni-list-cell-hover" v-for="(item,index) in noInfo" v-if="index<4" :key="index"
				@tap="clickModule(item.url)" v-bind:id="item.url">
					<view class="v-item-img">
						<image class="item-img" :src="item.icon" mode="aspectFit"></image>
					</view>
					<view class="v-item-title">{{item.title}}</view>
				</view>
			</view>
			<view class="v-content">
				<view class="item-list" hover-class="uni-list-cell-hover" v-for="(item,index) in noInfo" v-if="index>3 && index<8"
				 :key="index" @tap="clickModule(item.url)" v-bind:id="item.url">
					<view class="v-item-img">
						<image class="item-img" :src="item.icon" mode="aspectFit"></image>
					</view>
					<view class="v-item-title">{{item.title}}</view>
				</view>
			</view>
			<view class="v-content">
				<view class="item-list" hover-class="uni-list-cell-hover" v-for="(item,index) in noInfo" v-if="index>7 && index<12"
				 :key="index" @tap="clickModule(item.url)" v-bind:id="item.url">
					<view class="v-item-img">
						<image class="item-img" :src="item.icon" mode="aspectFit"></image>
					</view>
					<view class="v-item-title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="v-doc-info">
			<view class="v-title">
				<text class="title">档案信息</text>
			</view>
			<!-- 循环遍历 -->
			<view class="v-content">
				<view class="item-list" hover-class="uni-list-cell-hover" v-for="(item,index) in docInfo" v-if="index<4" :key="index"
				@tap="clickModule(item.url)" v-bind:id="item.url">
					<view class="v-item-img">
						<image class="item-img" :src="item.icon" mode="aspectFit"></image>
					</view>
					<view class="v-item-title">{{item.title}}</view>
				</view>
			</view>
			<view class="v-content">
				<view class="item-list" hover-class="uni-list-cell-hover" v-for="(item,index) in docInfo" v-if="index>3 && index<8"
				 :key="index" @tap="clickModule(item.url)" v-bind:id="item.url">
					<view class="v-item-img">
						<image class="item-img" :src="item.icon" mode="aspectFit"></image>
					</view>
					<view class="v-item-title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="v-receival-info">
			<view class="v-title">
				<text class="title">往来账管</text>
			</view>
			<!-- 循环遍历 -->
			<view class="v-content">
				<view class="item-list" hover-class="uni-list-cell-hover" v-for="(item,index) in receivalInfo" v-if="index<4" :key="index"
				 @tap="clickModule(item.url)" v-bind:id="item.url">
					<view class="v-item-img">
						<image class="item-img" :src="item.icon" mode="aspectFit"></image>
					</view>
					<view class="v-item-title">{{item.title}}</view>
				</view>
			</view>
			<view class="v-content">
				<view class="item-list" hover-class="uni-list-cell-hover" v-for="(item,index) in receivalInfo" v-if="index>3 && index<8"
				 :key="index" @tap="clickModule(item.url)" v-bind:id="item.url">
					<view class="v-item-img">
						<image class="item-img" :src="item.icon" mode="aspectFit"></image>
					</view>
					<view class="v-item-title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="v-data-statistics">
			<view class="v-title">
				<text class="title">数据统计</text>
			</view>
			<view class="qiun-charts">
				<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
				<!--#endif-->
				<!--#ifdef MP-WEIXIN || APP-PLUS -->
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
				<!--#endif-->
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import wxCharts from '../../components/wxcharts.js';
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
						icon: '/static/image/icon-tab-me-select.png',
						url: '../sale/salesSelCustomer/salesSelCustomer',
						title: '销售订单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url: '../sales/sales',
						title: '销售发货单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url: '../salesReturn/salesReturn',
						title: '销售退货单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url: '../purchaseOrder/purchaseOrder',
						title: '采购订单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url: '../purchase/purchase',
						title: '采购收货单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url: '../purchaseReturn/purchaseReturn',
						title: '采购退货单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url: '../stockMove/stockMove',
						title: '转仓单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url: '../stocktaking/stocktaking',
						title: '盘点单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url:'../stockIn/stockIn',
						title: '进仓单'
					},
					{
						icon: '/static/image/icon-tab-me-select.png',
						url:'../stockOut/stockOut',
						title: '出仓单'
					}

				],
				docInfo: [{
						icon: '/static/image/icon-tab-sales-select.png',
						url:'../goods/goodsAdd/goodsAdd',
						title: '新增货品'
					},
					{
						icon: '/static/image/icon-tab-sales-select.png',
						url:'../department/department',
						title: '店仓管理'
					},
					{
						icon: '/static/image/icon-tab-sales-select.png',
						url:'../vip/vip',
						title: '会员管理'
					},
					{
						icon: '/static/image/icon-tab-sales-select.png',
						url:'../employee/employee',
						title: '员工管理'
					},
					{
						icon: '/static/image/icon-tab-sales-select.png',
						url:'../supplier/supplier',
						title: '厂商管理'
					},
					{
						icon: '/static/image/icon-tab-sales-select.png',
						url:'../color/color',
						title: '颜色管理'
					},
					{
						icon: '/static/image/icon-tab-sales-select.png',
						url:'../customer/customer',
						title: '客户管理'
					},
					{
						icon: '/static/image/icon-tab-sales-select.png',
						url:'../goods/goodsList/goodsList',
						title: '货品管理'
					}

				],
				receivalInfo: [{
						icon: '/static/image/icon_dept.png',
						url:'../receival/receival',
						title: '客户收款单'
					},
					{
						icon: '/static/image/icon_dept.png',
						url:'../deduct/deduct',
						title: '客户费用单'
					},
					{
						icon: '/static/image/icon_dept.png',
						url:'../receivalReport/receivalReport',
						title: '客户往来'
					},
					{
						icon: '/static/image/icon_dept.png',
						url:'../payment/payment',
						title: '厂商付款单'
					},
					{
						icon: '/static/image/icon_dept.png',
						url:'../supplierDeduct/supplierDeduct',
						title: '厂商费用单'
					},
					{
						icon: '/static/image/icon_dept.png',
						url:'../paymentReport/paymentReport',
						title: '厂商往来'
					}

				]
			};
		},
		onLoad() {
			alert(1);
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
			clickModule(url) {
				console.log(121);
				this.$API.to(url);
			}
		}
	}
</script>

<style>
	/* 	.v-background {
		width: 100%;
		height: 50upx;
		background-color: #427CAC;
		text-align: center;
	} */

	.v-background .title {
		color: #FFFFFF;
		font-size: 35upx;
		line-height: 150upx;
	}

	.v-title {
		height: 80upx;
		background-color: #FFFFFF;
		margin-top: 20upx;
		line-height: 80upx;
	}

	.v-content {
		height: 150upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
	}

	.item-list {
		width: 25%;
		height: 150upx;
		display: flex;
		flex-direction: column;
		/* border: 1upx solid #F6F6F6; */
		border-left: 0upx;
		text-align: center;
	}

	.v-item-img {
		width: 100%;
		height: 60%;
		/* background-color: #8F8F94 */
	}

	.item-img {
		width: 70%;
		height: 70%;
		margin-top: 13%;
	}

	.v-item-title {
		width: 100%;
		height: 40%;
		/* background-color:#F0AD4E; */
		font-size: 26upx;
	}

	.v-title .title {
		font-size: 32upx;
		font-weight: bold;
		margin: 15upx 0 10upx 15upx;
	}

	/* 报表样式 */
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
</style>
