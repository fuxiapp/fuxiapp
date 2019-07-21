<template>
	<view class="cgh-add-customer-view">
			<view class="add-base-info">
				<view class="item">
					<view class="add-title">编码</view>
					<view class="add-input"><input  class="no" placeholder="编码"  disabled v-model="colorInfo.no" /></view>
				</view>
				<view class="item">
					<view class="add-title">名称</view>
					<view class="add-input"><input placeholder="填写颜色编码" v-model="colorInfo.color"  /></view>
				</view>
			</view>
			<view class="btn" @click="save">保存</view>
	</view>
</template>
<script>
	import { nullPass } from '../../../components/filter/index.js';
	export default {
		data() {
			return {
				colorInfo: {no: '', color: ''},
				id: '',
			}
		},
		onLoad(option) {
			this.id = option.id;
			if (nullPass(this.id)) {
				this.getInfo();
			} else {
				this.$API.generateNo().then(res => {
					this.colorInfo.no = res;
				});
			}
		},
		methods: {
			getInfo () { // 根据id查询颜色
				this.$API.get('/fuxi/color/query-color', {colorId: this.id}).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						this.cleaData();
					}
				});
			},
			save () { // 保存
				let url = '';
				if (!nullPass(this.colorInfo.color)) {
					uni.showToast({
						title: '颜色名称不能为空!',
						icon: 'none'
					});
					return;
				}
				if (nullPass(this.id)) {
					url = '/fuxi/color/update-color';
				} else {
					url = '/fuxi/color/add-color';
				}
				this.$API.post(url, this.colorInfo).then(res => {
					if (res.code === 'success') {
						uni.showToast({
							title: '保存成功!'
						});
						if (nullPass(this.id)) {
							this.$API.bank();
						} else {
							this.$API.generateNo().then(res => {
									this.colorInfo.no = res;
								});
								this.colorInfo.color = '';
							}
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
				border-bottom: 1upx solid $boder-se;
				line-height: 80upx;
				justify-content: space-between;
				.add-title {
					width: 20%;
					color: #333;
					font-weight: bold;
					font-size: 30upx;
				}
				.add-input {
					width: 78%;
					input {
						width: 98%;
						height: 100%;
						color: #333;
						padding-left: 5upx;
					}
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
	}
</style>
