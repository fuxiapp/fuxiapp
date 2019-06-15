<template>
	<view class="content">
		<view class="content-top">
			<view class="v-logo">
				<image class="logo" src="../../static/logo.jpg"></image>
			</view>
			<view class="v-title">
				<text class="title">西奈移动应用</text>
			</view>
		</view>
		<view class="margin-center">
			<view class="v-username">
				<view class="v-img-before">
					<image src="../../static/image/icon_user.png" />
				</view>
				<input class="username" :value="username" maxlength="20" type="text" @input="checkUser" @blur="queryUser"
					placeholder="请输入账号"  placeholder-style="color:#BEBEBE" focus="true" />
				<view class="v-img-after">
					<image mode="aspectFit" @tap="delUser" class="img_del" src="../../static/image/icon_del.png" />
				</view>
			</view>
			<view class="v-password">
				<view class="v-img-before">
					<image src="../../static/image/icon_pwd.png" />
				</view>
				<input class="password" :value="password" maxlength="20" :type="pwdType" @input="checkPwd" placeholder-style="color:#BEBEBE"
				 placeholder="请输入密码" />
				<view class="v-img-after">
					<image mode="aspectFit" @tap="switchPwd" class="img_del" :src="switchImg" />
				</view>
			</view>
			<view class="v-department">
				<view class="v-img-before">
					<image src="../../static/image/icon_dept.png" />
				</view>
				<input class="department" type="text" disabled="true" placeholder-style="color:#BEBEBE" placeholder="登录店铺名" :value="department" />
			</view>
		</view>
		<view class="margin-bottom">
			<button class="btn-login" @tap="login" :style="{'background-color':btnColor}">登&nbsp;录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				department: '',
				pwdType: 'password',
				btnDisabled: false,
				switchImg: '/static/image/icon_pwd_hide.png',
				btnColor: '#91C5F7'
			}
		},
		methods: {
			queryUser(e) {
				if (this.username != '') {
					// 查询用户所在店铺
					this.department = "总仓";
				}
			},
			checkUser(e) {
				this.username = e.target.value;
				this.department = '';
				if (this.username != '' && this.password != '') {
					this.btnColor = '#427CAC';
					this.btnDisabled = true;
				} else {
					this.btnColor = '#91C5F7';
					this.btnDisabled = false;
				}
			},
			checkPwd(e) {
				this.password = e.target.value;
				if (this.username != '' && this.password != '') {
					this.btnColor = '#427CAC';
					this.btnDisabled = true;
				} else {
					this.btnColor = '#91C5F7';
					this.btnDisabled = false;
				}
			},
			delUser(e) {
				this.username = '';
				this.password = '';
				this.department = '';
				this.btnColor = '#91C5F7';
				this.btnDisabled = false;
			},
			switchPwd(e) {
				if (this.pwdType == 'text') {
					this.pwdType = 'password';
					this.switchImg = '/static/image/icon_pwd_hide.png'
				} else {
					this.pwdType = 'text';
					this.switchImg = '/static/image/icon_pwd_show.png'
				}
			},
			login() { // 登录成功
				if (this.btnDisabled) {
					this.$API.tab('../tab/main/main');
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../components/mixin.scss";
	page{
		background-color: #FFFFFF;
	}
	.content{
		overflow: hidden;
		.content-top {
			width: 100%;
			height: 400upx;
			text-align: center;
			margin-top: 130upx;
		}
		
		.v-logo {
			height: 200upx;
		}
		
		.logo {
			height: 200upx;
			width: 200upx;
			border-radius: 50%;
		}
		
		.v-title {
			line-height: 30upx;
			font-weight: bold;
			font-size: 40upx;
			margin-top: 35upx;
		}
		
		.margin-center {
			width: 100%;
			height: 300upx;
		}
		
		.margin-center input {
			height: 90upx;
			alignment-baseline: after-edge;
		}
		.v-username,
		.v-password,
		.v-department {
			border-bottom: 2upx solid #F6F6F6;
			height: 90upx;
			margin: 0 40upx 20upx 40upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
		}
		
		.v-img-before {
			margin-right: 40upx;
			margin-top: 10upx;
		}
		
		.v-img-before image {
			width: 20px;
			height: 20px;
		}
		
		.v-img-after {
			margin-left: 50upx;
		}
		
		.v-img-after image {
			width: 40upx;
			height: 40upx;
		}
		
		.btn-login {
			color: #FFFFFF;
			margin: 80upx 40upx 0 40upx;
		}
	}
	
</style>
