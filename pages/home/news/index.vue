<template>
    <view class="content">
        <view class="active-detail-top">
            <image class="active-img" :src="detail.coverImage" mode="widthFix"></image>
            <view class="active-box-title">
                {{detail.subject}}
            </view>
            <view class="active-box-info">
                发布时间{{detail.activityStartTime}}
            </view>
        </view>
        <view class="time-line"></view>
        <view class="detail-box-info" v-html="detail.detailDesc">
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
        onUnload() {},
        onLoad() {
           let detail = uni.getStorageSync('news_detail')
           this.detail = detail
            this.detail.detailDesc = detail.detailDesc.replace(/<img/g, '<img style="width:100%"').replace(/<p/g, '<p style="color:rgb(153, 153, 153);font-size:26rpx"')
        },
        methods: {

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
                margin: 16rpx 0 26rpx;
                text-align: center;
            }

            .active-box-info {
                font-size: 28rpx;
                text-align: center;
                font-weight: 500;
            }
        }

        .time-line {
            margin: 15rpx auto;
            box-sizing: border-box;
            background-color: #FFF;
            height: 2rpx solid rgb(153, 153, 153);

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
    }
</style>