<template>
	<view class="content">
		<image class="avatar-img" src="@/static/login/avatar.png" mode=""></image>
		<view class="login-btn" @click="toLogin()">
			一键授权登录
		</view>
		<view class="change-mobile" @click="toMobileLogin()">
			切换手机号登录
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
				isAgree: true,
			}
		},
		methods: {
			toLogin(){
				if(!this.isAgree){
					uni.showToast({
						title: '请先阅读并同意协议',
						icon: 'none'
					})
					return
				}
				uni.getUserProfile({ //获取到用户信息
					desc: '登录后可同步数据',
					success: async (obj) => {
						let avatarUrl = obj.userInfo.avatarUrl
						let nickName = obj.userInfo.nickName
						// 调用 action ，请求登录接口
						uni.login({
							provider: 'weixin',
							success: (res) => {
								let params = {
									wxCode: res.code,
									wxAvatarUrl: avatarUrl,
									wxNickName: nickName,
								}
								//获取到登录凭证
								// wxLoginGetOpenid(params).then(res => {
								// 	if (res.code === 600) {
								// 		that.$store.commit("userInfo/setUserToken", res
								// 			.msg)
								// 		uni.setStorageSync('token', res.msg);
								// 		that.dialogToggle()
								// 		uni.showToast({
								// 			title: res.data,
								// 			icon: 'none'
								// 		})
								// 	} else {
								// 		that.$store.commit("userInfo/setUserToken", res)
								// 		uni.setStorageSync('token', res);
								// 		uni.showToast({
								// 			title: '登录成功',
								// 			icon: 'none'
								// 		})
								// 		that.dialogClose()
								// 		setTimeout(() => {
								// 			this.goUser()
								// 		}, 600)
								// 	}

								// }).catch(err => {
								// 	console.log(err, 234324)
								// })
							},
				
						});
				
					},
					fail: () => {
						uni.showToast({
							title: '授权已取消',
							icon: 'error',
							mask: true,
						});
					},
					complete: () => {
						// 隐藏loading
						uni.hideLoading();
					},
				});
			},

			// 手机号登录
			toMobileLogin() {
				uni.navigateTo({
					url:'/pages/login/mobile'
				})
			},
			// 协议跳转
			navigateToProtocol() {
				uni.navigateTo({
					url: '/pages/protocol'
				})
			},
			navigateToPrivacy() {
				uni.navigateTo({
					url: '/pages/privacy'
				})
			},
			// 显示协议提示
			showProtocolAlert() {
				uni.showToast({
					title: '请先阅读并同意协议',
					icon: 'none'
				})
			},
			// 验证手机号
			verifyPhone() {
				if (!/^1[3-9]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: '手机号格式错误',
						icon: 'none'
					})
					return false
				}
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 200rpx;
		height: 100vh;
		box-sizing: border-box;

		.avatar-img {
			display: block;
			margin: 0 auto 120rpx;
			width: 160rpx;
			height: 160rpx;
		}

		.login-btn {
			margin: 0 auto 16rpx;
			width: 586rpx;
			height: 96rpx;
			line-height: 96rpx;
			border-radius: 36rpx;
			background: #3D8D7A;
			text-align: center;
			color: #FFF;
		}

		.change-mobile {
			text-align: center;
			color: #969696;
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