<template>
	<view class="chg-center-view">
		<view class="cgh-header">
			<view class="cgh-header-item" v-if="isLogin">
				<view class="name">{{userInfo.userName}}</view>
				<view class="company">{{userInfo.corpName}}</view>
				<view class="company">{{userInfo.departmentName}}</view>
			</view>
			<view class="cgh-header-item" v-if="!isLogin" @click="toLogin">
				<view class="not-login">未登录</view>
			</view>
		</view>
		<view class="cgh-tab">
			<view class="tab-item" v-for="(v, index) in tabList" :key="index" @click="toPath(index)">
				<view class="icon">
					<image :src="'../../../static/center/' + v.icon"></image>
				</view>
				<view class="title">{{v.name}}</view>
				<view class="verstion">
					<block v-if="index === 1">{{version}}</block>
				</view>
				<view class="right"><image src="../../../static/base/right.png"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{name: '密码设置', icon: 'mm.png'}, {name: '版本更新', icon: 'gx.png'}],
				userInfo: {userName: '', corpName: ''},
				isLogin: false,
				version: '1.0.0'
			}
		},
		onShow() {
			this.$API.getStorage('fuxiUserInfo').then(res => {
				this.userInfo = res.data;
				this.isLogin = true;
			}).catch((err) => {
				uni.showToast({
					title: '未登录,请先登录!',
					icon: 'none',
					success: () => {
						this.$API.to('../../login/login');
					}
				});
			});
			// #ifdef APP-PLUS
				this.version = plus.runtime.version;
			// #endif
		},
		methods: {
			toLogin () { // 去登录
				this.$API.to('../../login/login');
			},
			toPath (index) {
				if (index === 0) {
					this.$API.to('../../setting/setPassword/setPassword');
				} else if (index === 1) { // 版本更新
					// #ifdef APP-PLUS
					this.appToUpdate();
					// #endif
				}
			},
			appToUpdate () { // app更新
				uni.getSystemInfo({
					success: (pl) => {
						let para = {_api_key: '79d7bea260c3c7bda4e71d8b909808f2', appKey: ''};
						if (pl.platform === 'ios') {
							para.appKey = '2057e757c11122b7c5547b420226dfaf';
						} else if (pl.platform === 'android') {
							para.appKey = '617c1afcdea1380affc262d877d5c2ee';
						}
						uni.request({
							url: 'https://www.pgyer.com/apiv2/app/check',
							data: para,
							method: 'POST',
							header:{ //自定义请求头信息
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								if (res.data.code === 0) {
									let data = res.data;
									if (this.version < data.buildVersion) {
										uni.showModal({
											title: '更新提示',
											content: '发现新版本, 是否选择更新?',
											showCancel: true,
											cancelText: '取消',
											confirmText: '确定',
											success: (showResult) => {
												if (showResult.confirm) {
													if (pl.platform === 'ios') {
														plus.runtime.openURL(data.data.buildShortcutUrl);
													} else if (pl.platform === 'android') {
														plus.runtime.openURL(data.data.downloadURL);
													}
												}
											}
										});
									}
								}
							}
						});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../../components/mixin.scss";
	.chg-center-view {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #fff;
		.cgh-header {
			width: 94%;
			height: 250upx;
			background: $themeColor;
			color: #333;
			margin: 20upx 0upx 30upx 3%;
			border-radius: 20upx;
			.cgh-header-item {
				padding-top: 40upx;
				margin-left: 4%;
				line-height: 60upx;
				.name {
					font-size: 34upx;
					font-weight: bold;
					@include lineEllipsis(1);
				}
				.company {
					font-size: 32upx;
					@include lineEllipsis(1);
				}
				.not-login {
					font-size:  32upx;
					margin-top: 40upx;
				}
			}
		}
		.cgh-tab {
			width: 100%;
			overflow: hidden;
			.tab-item {
				margin: 0upx 20upx;
				display: flex;
				align-items: center;
				border-bottom: 1upx solid $boder-se;
				padding: 40upx 0upx;
				.icon {
					width: 10%;
					image {
						width: 50upx;
						height: 50upx;
						vertical-align: middle;
					}
				}
				.title {
					width: 73%;
					font-size: 30upx;
					color: #333;
				}
				.verstion {
					width: 10%;
					font-size: 28upx;
					color: #ccc;
				}
				.right {
					width: 5%;
					image {
						width: 25upx;
						height: 30upx;
						vertical-align: middle;
					}
				}
			}
		}
	}

</style>
