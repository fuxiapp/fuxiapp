<template>
	<view class="cgh-type-childe">
		<view>
			<view class="cgh-black" @click="closeMoreType"></view>
			<view class="cgh-white">
				<view class="cgh-white-con" >
					<view v-for="(item, index) in classTypeInfo"  :key="index" :class="item.flg === true ? 'item check-item' : 'item'" @click="onType(index)">
						{{item.name}}
					</view>
					<block v-if="isPage">
						<view class="child-more" v-if="isMore"  @click="onMoreType">查看更多</view>
						<view class="child-more" v-if="!isMore">已加载全部</view>
					</block>
				</view>
				<view class="btn" >
					<view class="reset" @click="resetType">重置</view>
					<view class="config" @click="okType">确定</view>
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
			selTypeChidenItem: {
				type: Array,
				default: []
			},
			moduleType: {
				type: Number,
				default: 1
			},
			isPage: { // 是否分页
				type: Boolean,
				default: false
			},
			moreType: { // 分页类型
				type: Number,
				default: 0
			},
			isMore: { // 是否更多
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
			onType (index, flg) { // 选择类型
				this.$emit('onType', index);
			},
			okType (index) { // 关闭选择类型
				this.$emit('okType');
			},
			resetType () {
				this.$emit('resetType');
			},
			closeMoreType() {
				this.$emit('closeMoreType');
			},
			onMoreType () {
				this.$emit('moreTypeInfo', this.moreType);	
			},
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
					width: 27%;
					height: 65upx;
					padding: 0upx 5upx;
					line-height: 65upx;
					float: left;
					border: 1upx solid $boder-se;
					margin-top: 30upx;
					margin-right: 30upx;
					text-align: center;
					font-size: 32upx;
					@include lineEllipsis(1);
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
				display: flex;
				view {
					width: 50%;
					height: 100%;
				}
				.reset {
					background: #fff;
					color: black;
				}
			}
		}
		.child-more {
			float: left;
			@include base-btn (80%, 70upx);
			margin-left: 10%;
		}
	}
</style>
