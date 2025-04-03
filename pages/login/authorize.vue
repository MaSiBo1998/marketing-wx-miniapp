<template>
    <view class="content">
        <image class="avatar-img" src="@/static/login/avatar.png" mode=""></image>
        <button class="login-btn" @click="toLogin()">
            一键授权登录
        </button>
        <!-- <view class="change-mobile" @click="toMobileLogin()">
			切换手机号登录
		</view> -->
        <view class="bottom-tips">
            <image class="active-icon" @click="isAgree = !isAgree" v-if="isAgree" src="@/static/login/active.png"
                mode=""></image>
            <image class="active-icon" @click="isAgree = !isAgree" v-else src="@/static/login/inactive.png" mode="">
            </image>
            我已阅读并同意<text class="text-1" @click="toTerms()">
                用户协议
            </text>和<text class="text-1" @click="toPrivacy()">
                隐私政策
            </text>
        </view>
    </view>
</template>

<script>
    import {
        wxLoginCode
    } from '@/api/login'
    export default {
        data() {
            return {
                isAgree: false,
                type: '',
                currentPath:'',
            }
        },
        onLoad(options) {
            this.type = options.type
            const pages = getCurrentPages(); // 获取当前页面栈
            const currentPage = pages[pages.length - 2]; // 获取当前页面对象
            const currentPath = currentPage.route; // 当前页面的路径
            this.currentPath = currentPath
            console.log(currentPath,pages)
        },
        methods: {
            toLogin() {
                if (!this.isAgree) {
                    uni.showToast({
                        title: '请先阅读并同意用户协议与隐私政策',
                        icon: 'none'
                    })
                    return
                }
                let _this = this
                // 调用 action ，请求登录接口
                uni.login({
                    provider: 'weixin',
                    success: (res) => {
                        let params = {
                            code: res.code,
                        }
                        uni.showLoading({
                            title: '登录中...'
                        });
                        //获取到登录凭证
                        wxLoginCode(params).then(res => {
                            console.log(res)
                            uni.showToast({
                                title: '登录成功',
                                icon: 'none',
                                duration: 1200
                            });
                            uni.setStorageSync('token', res.token)
                            this.goBackRoute()
                        }).catch(err => {
                            console.log(err, 234324)
                            uni.showToast({
                                title: '登录失败,请重新登录',
                                icon: 'none',
                                duration: 1200
                            });
                        })
                    },

                });
            },
            goBackRoute() {
                if(this.currentPath){
                    if(this.currentPath == 'pages/user/index' || this.currentPath == 'pages/home/index'){
                        uni.switchTab({
                            url: `/${this.currentPath}`
                        })
                    }else{
                        uni.redirectTo({
                            url: `/${this.currentPath}`
                        })
                    }
                }else{
                    uni.switchTab({
                        url: '/pages/home/index'
                    })
                }

            },
            toTerms(){
                uni.navigateTo({
                    url:'/pages/agree/terms'
                })
            },
            toPrivacy(){
                uni.navigateTo({
                    url:'/pages/agree/privacy'
                })
            },

            // 手机号登录
            toMobileLogin() {
                uni.navigateTo({
                    url: '/pages/login/mobile'
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