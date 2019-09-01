<template>
	<view class="cgh-add-customer-view">
		<view class="add-base-info">
			<view class="item">
				<view class="add-title">当前登录密码</view>
				<view class="add-input"><input v-model="passwordInfo.oldPassword"  /></view>
			</view>
			<view class="item">
				<view class="add-title">新密码</view>
				<view class="add-input"><input v-model="passwordInfo.newPassword"  /></view>
			</view>
		</view>
		<view class="btn" @click="save">提交</view>
	</view>
</template>
<script>
	import { nullPass } from '../../../components/filter/index.js';
	export default {
		data() {
			return {
				passwordInfo: {oldPassword: '', newPassword: ''},
			}
		},
		onLoad(option) {
		},
		methods: {
			save () { // 保存
				if (!nullPass(this.passwordInfo.oldPassword)) {
					uni.showToast({
						title: '当前登录密码不能为空!',
						icon: 'none'
					});
					return;
				}
				if (!nullPass(this.passwordInfo.newPassword)) {
					uni.showToast({
						title: '新密码不能为空!',
						icon: 'none'
					});
					return;
				}
				this.$API.post('', this.passwordInfo).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '修改成功!'
						});
						this.$API.tab('../../tab/setting/setting');
					}
				});
			}
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
			padding: 0upx 3%;
			margin-bottom: 20upx;
			background: #fff;
			.item {
				display: flex;
				align-items: center;
				white-space: nowrap;
				justify-content: space-between;
				border-bottom: 1upx solid $boder-se;
				line-height: 80upx;
				justify-content: space-between;
				padding: 5upx 0upx;
				.add-title {
					width: 25%;
					color: #333;
					font-weight: bold;
					font-size: 30upx;
				}
				.add-input {
					width: 72%;
					text-align: left;
					input {
						width: 98%;
						height: 100%;
						color: #333;
						padding-left: 5upx;
					}
				}
			}
		}
		.btn {
			width: 90%;
			height: 80upx;
			margin-left: 5%;
			margin-top: 30upx;
			text-align: center;
			line-height: 80upx;
			background: $themeColor;
			color: #fff;
		}
	}
</style>
