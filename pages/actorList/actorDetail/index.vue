<template>
    <view class="content">
        <view class="actor-box">
            <view class="actor-box-top">
                <view class="actor-box-top-left">
                    <view class="actor-box-item">
                        <view class="actor-box-item-left">
                            <text class="title">姓名:</text>
                            <text class="info">{{actorDetail.name}}</text>
                        </view>
                        <view class="actor-box-item-right">
                            <text class="title">性别:</text>
                            <text class="info">{{actorDetail.gender== 1?'男':女}}</text>
                        </view>

                    </view>
                    <view class="actor-box-item">
                        <view class="actor-box-item-left">
                            <text class="title">年龄:</text>
                            <text class="info">{{actorDetail.age}}</text>
                        </view>
                        <view class="actor-box-item-right">
                            <text class="title">身高:</text>
                            <text class="info">{{actorDetail.height}}</text>
                        </view>

                    </view>
                    <view class="actor-box-item">
                        <view class="actor-box-item-left">
                            <text class="title">体重:</text>
                            <text class="info">{{actorDetail.weight}}</text>
                        </view>
                        <view class="actor-box-item-right">
                            <text class="title">特长:</text>
                            <text class="info">唱歌</text>
                        </view>

                    </view>

                </view>
                <image class="actor-box-top-right" :src="actorDetail.homeImage" mode="widthFix"></image>

            </view>
            <view class="actor-detail-title">
                演员详细资料
            </view>
            <view class="actor-detail-info">
            {{actorDetail.pastExperiences}}
            </view>
        </view>

    </view>
</template>

<script>
    import {
        getActorOneDetail
    } from '@/api/actor.js'
    export default {
        onShow(option) {},
        data() {
            return {
                searchVal: '',
                actorDetail: {

                }
            }
        },
        computed: {},
        methods: {
            getActorOneDetail() {
                let params = {
                    userId:uni.getStorageSync('actor_detail').userId
                }
                getActorOneDetail(params).then(res => {
                    console.log(res)
                    this.actorDetail = res
                    console.log(this.actorDetail)
                })
            }
        },
        onUnload() {
            uni.removeStorageSync('actor_detail')


        },
        onLoad() {
            this.getActorOneDetail()
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        width: 750rpx;
        height: 582rpx;
        background: linear-gradient(7.73deg, rgba(255, 255, 255, 0) 7.45%, rgba(255, 106, 12, 1) 61.97%, rgba(255, 106, 12, 1) 95.12%) no-repeat;
        background-size: 750rpx 582rpx;
        background-color: #EEE;
        min-height: 100vh;
        padding-top: 20rpx;
        box-sizing: border-box;

        .actor-box {
            width: 686rpx;
            margin: 0 auto;
            box-sizing: border-box;
            padding: 48rpx 32rpx;
            border-radius: 24rpx;
            background: rgba(255, 255, 255, 1);
            min-height: 80vh;

            .actor-box-item {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 436rpx;
                margin-bottom: 16rpx;

                .actor-box-item-left,
                .actor-box-item-right {
                    width: 218rpx;
                }

                .title {
                    font-weight: 600;
                    font-size: 26rpx;
                    text-align: left;
                }

                .info {
                    color: rgb(153, 153, 153);
                    font-size: 32rpx;
                }
            }

            .actor-box-top {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;

                .actor-box-top-left {}

                .actor-box-top-right {
                    width: 218rpx;
                    display: block;
                }
            }

            .actor-detail-title {
                padding: 15rpx 0;
                border-top: 1rpx solid #EEE;
                font-size: 26rpx;
                font-weight: 600;
                margin: 16rpx 0 6rpx;
                text-align: left;
            }

            .actor-detail-info {
                font-size: 22rpx;
                text-align: left;
                font-weight: 500;
                color: rgb(153, 153, 153);
            }
        }
    }
</style>