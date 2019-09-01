<template>
	<view class="cgh-radio-childe">
		<view class="alert-black" @click="closeAlert"></view>
		<view class="radio-con">
			<view class="close" @click="closeAlert">
				<image src="../../../static/base/left.png"></image>{{title}}
			</view>
			<view class="search-con">
				<view style="display: none;">{{list}}</view>
				<view class="left">
					<image src="../../../static/base/search.png"></image>
					<input  type="text" confirm-type="search" v-model="keyWord" @confirm="search" :placeholder="placeholderTitle" />
				</view>
				<view class="right" @click="search">搜索</view>
			</view>
			<view class="radio-info-con" >
				<view class="item" v-for="(item, index) in list" :key="index" @click="okRadioValue(item)">
					{{item.name}}
				</view>
				<block v-if="isPage">
					<view class="child-more" v-if="isMore"  @click="onMoreType">查看更多</view>
					<view class="child-more" v-if="!isMore">已加载全部</view>
				</block>
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
			},
			type: {
				type: String,
				default: '-1'
			},
			title: {
				type: String,
				default: '选择'
			},
			placeholderTitle: {
				type: String,
				default: '关键字搜索'
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
				selIndex: 0,
				keyWord: ''
			}
		},
		watch: {
          keyWord (newVal) {
			  console.log(newVal);
            if (newVal === '' || newVal === null) {
				this.search();
			}
          }
	    },
	 	methods: {
			search () {
				this.$emit('search', this.keyWord);	
			},
			okRadioValue (val) {
				this.$emit('okRadioValue', val);	
			},
			closeAlert() {
				this.$emit('closeAlert');
			},
			onMoreType () {
				this.$emit('moreTypeInfo', this.moreType);	
			},
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
		.radio-con {
			width: 100%;
			height: 70%;
			position: fixed;
			overflow:auto;
			bottom: 0;
			left: 0;
			z-index: 11;
			background: #fff;
			padding-bottom: 80upx;
			.search {
				background: red;
				margin-top: 100upx;
			}
			.radio-info-con {
				width: 100%;
				height: 70%;
				overflow: scroll;
				position: fixed;
				left: 0;
				bottom:  0u;
				z-index: 2009;
				.item {
					font-size: 36upx;
					color: #333;
					border-bottom: 1upx solid $boder-se;
					padding: 25upx 0upx 25upx 30upx;
				}
			}
		}
		.close {
			width: 100%;
			color: #333;
			background: $themeColor;
			color: #fff;
			padding: 10upx 0upx;
			image {
				width: 45upx;
				height: 50upx;
				margin-left: 20upx;
				vertical-align: middle;
			}
		}
		.search-con {
			width: 92%;
			height: 80upx;
			margin-left: 4%;
			margin-top: 20upx;
			font-size: 32upx;
			line-height: 80upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			white-space: nowrap;
			.left {
				width: 75%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border: 1upx solid $boder-se;
				border-radius: 20upx;
				padding-left: 20upx;
				image {
					width: 45upx;
					height: 45upx;
				}
				input {
					width: 88%;
					height: 100%;
					text-align: left;
				}
			}
			.right {
				width: 18%;
				height: 100%;
				border: 1upx solid $boder-se;
				border-radius: 20upx;
				text-align: center;
			}
		}
		.child-more {
			@include base-btn (80%, 70upx);
			margin-left: 10%;
		}
	}
</style>
