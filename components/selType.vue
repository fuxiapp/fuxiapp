<template>
	<view class="cgh-type-childe">
		<view>
			<view class="cgh-black"></view>
			<view class="cgh-white">
				<view class="cgh-white-con" >
					<view v-for="(item, index) in classTypeInfo"  :key="index" :class="item.flg === true ? 'item check-item' : 'item'" @click="onType(index)">
						{{item.name}}
					</view>
				</view>
				<view class="btn" @click="okType">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			classTypeInfo: {
				type: Array,
				default: []
			},
			selCityInfo: {
				type: Array,
				default: []
			},
			selCounty: {
				type: Array,
				default: []
			},
			isShowCity: {
				type: Boolean,
				default: false
			},
			cityType: {
				type: Number,
				default: 0
			},
			moduleType: {
				type: Number,
				default: 1
			},
			selCityNameS: {}
		},
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
			onType (index) { // 选择类型
				this.$emit('onType', index);
			},
			okType (index) { // 关闭选择类型
				this.$emit('okType');
			}
		}
		
	}
</script>

<style lang="scss" scoped="">
	@import "mixin.scss";
	.cgh-type-childe {
		width: 100%;
		overflow: hidden;
		.cgh-black {
			@include cgh-alert-black();
		}
		.cgh-white {
			width: 100%;
			height: 70%;
			background: #fff;
			display: black; 
			position: fixed; 
			left: 0;
			bottom: 0;
			z-index: 3;
			-webkit-overflow-scrolling: touch;
			.cgh-white-con {
				width: 92%;
				height: 85%;
				margin: 0upx auto;
				overflow: scroll;
				.item {
					float: left;
					padding: 10upx 30upx;
					border: 1upx solid $boder-se;
					margin-top: 30upx;
					margin-right: 30upx;
				}
				.check-item {
					background: $themeColor!important;
					color: #fff!important;
				}
			}
			.btn {
				width: 100%;
				height: 100upx;
				position: fixed; 
				left: 0;
				bottom: 0;
				z-index: 3;
				font-size: 34upx;
				border-top: 1upx solid $boder-se;
				background: $themeColor;
				text-align: center;
				line-height: 100upx;
				color: #fff;
			}
		}
	}
</style>
