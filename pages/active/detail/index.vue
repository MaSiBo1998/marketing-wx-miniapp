<template>
    <view class="content">
        <view class="active-detail-top">
            <image class="active-img" :src="detail.coverImage" mode="widthFix"></image>
            <view class="active-box-title">
                {{detail.name}}
            </view>
            <view class="active-box-info">
                {{detail.subject}}
            </view>
            <view class="active-address">
                城市 <text class="date">{{detail.location}}
                </text>
            </view>
        </view>
        <view class="time-line">
            <view class="time-line-left">
                时效 <view class="date">
                    活动时间:{{detail.activityStartTime}}-{{detail.activityEndTime}}<br>
                    报名截止: {{detail.registrationDeadline}}
                </view>
            </view>
            <u-icon name="share-square" size="28"></u-icon>
        </view>
        <view class="detail-box-top">
            <view class="box-item">
                <view class="detail-box-top-left">
                    人数需求
                </view>
                <!-- <view class="detail-box-top-right">
                    总人数:{{detail.requiredTotalNumber}}人 | 男:{{detail.requiredFemaleNumber}}人 |
                    女:{{detail.requiredMaleNumber}}人 已录用: {{detail.registeredNumber}}人 <br>
                    剩余报名人数:{{detail.lackNumber}}人| 男:{{detail.requiredFemaleNumber - detail.maleRegisteredNumber}}人 |
                    女:{{detail.requiredMaleNumber- detail.femaleRegisteredNumber}}人
                </view> -->
                <view class="detail-box-top-right">
                    总人数:{{detail.requiredTotalNumber}}人  |  男:{{detail.requiredFemaleNumber}}人  |  女:{{detail.requiredMaleNumber}}人  |  
                    已录用: {{detail.registeredNumber}}人  |  
                    剩余:{{detail.lackNumber}}人
                </view>
            </view>
            <view class="box-item">
                <view class="detail-box-top-left">
                    节目要求
                </view>
                <view class="detail-box-top-right">
                    {{detail.programRequirements?detail.programRequirements:''}}
                </view>
            </view>
            <view class="box-item">
                <view class="detail-box-top-left">
                    其他要求
                </view>
                <view class="detail-box-top-right">
                    {{detail.otherRequirementsType?detail.otherRequirementsType:''}}{{detail.otherRequirementsDesc?detail.otherRequirementsDesc:''}}
                </view>
            </view>
        </view>
        <view class="detail-box-info" v-html="detail.detailDesc">
        </view>
        <view class="subtim-bottom">
            <view class="subtim-bottom-left">
                <u-icon name="server-fill" size="24" color="rgb(153, 153, 153)"></u-icon>
                客服
            </view>
            <view class="subtim-bottom-btn" @click="toSignUp()">
                {{statusFilter(detail.registrationStatus)}}
            </view>
        </view>
    </view>
</template>

<script>
    import {
        getActiveOne
    } from '@/api/active.js'
    export default {
        onShow(option) {},
        data() {
            return {
                activityId: '',
                detail: {},
            }
        },
        onUnload() {
        },
        onLoad() {
            this.activityId = uni.getStorageSync('active_detail_id')
            if (this.activityId) {
                this.getActiveOne()
            } else {
                uni.switchTab({
                    url: '/pages/active/index'
                })
            }
        },
        methods: {
            getActiveOne() {
                let params = {
                    id: this.activityId
                }
                uni.showLoading({
                    title: '加载中...'
                });
                getActiveOne(params).then(res => {
                    this.detail = res
                    this.detail.detailDesc = res.detailDesc.replace(/<img/g, '<img style="width:100%"').replace(/<p/g, '<p style="color:rgb(153, 153, 153);font-size:26rpx"')
                }).catch(err => {
                    uni.switchTab({
                        url: '/pages/active/index'
                    })
                })
            },
            statusFilter(status) {
                switch (status) {
                    case '0':
                        console.log('已报名')
                        return '已报名'
                        break;
                    case '1':
                        return '报名通过'
                        break;
                    case '2':
                        return '报名拒绝'
                        break;
                    case '3':
                        return '已作废'
                        break;
                    default:
                        return '立即报名'
                        break;
                }
            },
            toSignUp() {
                let _this = this
                if (_this.detail.registrationStatus !== null) {
                    uni.showToast({
                        title: _this.statusFilter(_this.detail.registrationStatus),
                        icon: 'none',
                        duration: 1200
                    })
                } else {
                    uni.navigateTo({
                        url: '/pages/user/register/index?type=sign'
                    })
                }

            }
        },

    }
</script>

<style lang="scss" scoped>
    .content {
        background-color: #EEE;
        min-height: 100vh;
        padding-bottom: 230rpx;
        box-sizing: border-box;

        .active-detail-top {
            background-color: #FFF;
            padding: 32rpx;
            box-sizing: border-box;

            .active-img {
                width: 686rpx;
                display: block;
                border-radius: 16rpx;
            }

            .active-box-title {
                font-size: 38rpx;
                font-weight: 600;
                margin: 16rpx 0 6rpx;
                text-align: left;
            }

            .active-box-info {
                font-size: 28rpx;
                text-align: left;
                font-weight: 500;
            }

            .active-address {
                margin-top: 16rpx;
                font-size: 28rpx;
                font-weight: 600;
                line-height: 28rpx;


                text {
                    padding-left: 16rpx;
                    color: rgb(153, 153, 153);
                    font-size: 26rpx;
                    text-align: left;
                    font-weight: 500;
                }
            }
        }

        .time-line {
            margin: 15rpx auto;
            padding: 32rpx;
            box-sizing: border-box;
            background-color: #FFF;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .time-line-left {

                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: 32rpx;
                font-weight: 600;

                .date {
                    color: rgb(153, 153, 153);
                    margin-left: 16rpx;
                    font-size: 22rpx;
                    text-align: left;
                    font-weight: 500;
                }
            }
        }

        .detail-box-top {
            padding: 32rpx;
            box-sizing: border-box;
            background-color: #FFF;

            border-bottom: 1rpx solid rgb(153, 153, 153);

            .box-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 16rpx;

                .detail-box-top-left {
                    width: 130rpx;
                    font-weight: 600;
                    text-align: left;
                    font-size: 26rpx;
                }

                .detail-box-top-right {
                    width: 560rpx;
                    color: rgb(153, 153, 153);
                    font-size: 24rpx;
                }
            }

        }

        .detail-box-info {
            padding: 16rpx 32rpx;
            box-sizing: border-box;
            background-color: #FFF;
            font-size: 26rpx;
            font-weight: 600;
            color: black;
            line-height: 1.6;
            overflow-wrap: break-word;
            width: 750rpx;
            img {
                width: 686rpx !important;
            }
            
        }

        .subtim-bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 750rpx;
            background-color: #FFF;
            padding: 32rpx 32rpx 64rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .subtim-bottom-left {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: rgb(153, 153, 153);
                font-size: 20rpx;
            }

            .subtim-bottom-btn {
                width: 630rpx;
                background-color: #3D8D7A;
                height: 96rpx;
                border-radius: 48rpx;
                text-align: center;
                line-height: 96rpx;
                color: #FFF;
                font-size: 32rpx;
            }
        }
    }
</style>