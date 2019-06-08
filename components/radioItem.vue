<template>
	<view class="cgh-radio-childe">
		<view class="alert-black" @click="closeAlert"></view>
		<view class="close" @click="closeAlert"><image src="../../../static/icon/login/icon_del.png"></image></view>
		<view class="radio-con">
			<view class="radio-info-con">
				<view class="item" v-for="(item, index) in list" :key="index" @click="okRadioValue(item)">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
			
		},
		data() {
			return {
				selIndex: 0
			}
		},
		onLoad() {
		},
		methods: {
			okRadioValue (val) {
				this.$emit('okRadioValue', val);	
			},
			closeAlert() {
				this.$emit('closeAlert');
			}
		}
		
	}
</script>

<style lang="scss" scoped="">
	@import "mixin.scss";
	.cgh-radio-childe {
		width: 100%;
		overflow: hidden;
		.alert-black  {
			@include cgh-alert-black();
		}
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
