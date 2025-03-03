<template>
	<view class="content">
		<view class="content-title">
			请输入登录手机号
		</view>
		<view class="content-tips">
			为了方便联系,请输入您的常用手机号码进行登录
		</view>
		<!-- 手机号输入框 -->
		<u-input v-model="mobile" :maxlength="11" border="none" type="number" placeholder="请输入手机号">
			<view class="input-info" slot="prefix">
				+86
			</view>
		</u-input>
		<!-- 手机号输入框 -->
		<u-input v-model="mobile" :maxlength="11" border="none" type="number" placeholder="请输入右侧图片验证码">
			<view class="input-info" slot="suffix">
				<image class="code-img" src="../../static/logo.png" mode="widthFix"></image>
			</view>
		</u-input>
		<view class="login-btn" @click="toLogin()">
			手机号登录
		</view>
		<view class="bottom-tips">
			<image class="active-icon" @click="isAgree = !isAgree" v-if="isAgree" src="@/static/login/active.png"
				mode=""></image>
			<image class="active-icon" @click="isAgree = !isAgree" v-else src="@/static/login/inactive.png" mode="">
			</image>
			我已阅读并同意<text class="text-1">
				隐私协议
			</text>和<text class="text-1">
				服务政策
			</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				mobile: '',
				isAgree: true
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		padding-top: 52rpx;

		.content-title {
			width: 626rpx;
			margin: 0 auto;
			text-align: left;
			color: black;
			font-size: 36rpx;
			font-weight: 600;
		}

		.content-tips {
			width: 626rpx;
			margin: 16rpx auto 32rpx;
			text-align: left;
			color: #969696;
			font-size: 26rpx;
		}

		/deep/.u-input {
			width: 626rpx;
			height: 100rpx;
			margin: 0 auto 24rpx;
			border-radius: 24rpx;
			box-sizing: border-box;
			padding: 32rpx !important;
			background: #FFF !important;
			border: 1rpx solid rgb(213, 212, 218);
			margin-bottom: 24rpx;
		}

		.input-info {
			padding-right: 20rpx;

			.code-img {
				width: 56rpx;
			}
		}

		.login-btn {
			margin: 0 auto 16rpx;
			width: 626rpx;
			height: 96rpx;
			line-height: 96rpx;
			border-radius: 36rpx;
			background: #3D8D7A;
			text-align: center;
			color: #FFF;
		}

		.bottom-tips {
			width: 750rpx;
			position: fixed;
			bottom: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;

			.active-icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 16rpx;
			}

			.text-1 {
				color: #3D8D7A;
				padding: 0 8rpx;
			}
		}
	}
</style>