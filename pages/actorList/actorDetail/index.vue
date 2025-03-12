<template>
    <view class="content">
        <view class="actor-box">
            <view class="actor-box-top">
                <view class="actor-box-top-left">
                    <view class="title-1">
                        {{actorDetail.name}}
                    </view>
                    <view class="title-2">
                        {{actorDetail.gender== 1?'男':'女'}}
                    </view>
                    <view class="title-3">
                        年龄: <text>{{actorDetail.age?actorDetail.age:'未知'}}</text>
                    </view>
                    <view class="title-3">
                        身高: <text>{{actorDetail.height?actorDetail.height:'未知'}}</text>
                    </view>
                    <view class="title-3">
                        体重: <text>{{actorDetail.weight?actorDetail.weight:'未知'}}</text>
                    </view>
                </view>
                <image class="home-img" :src="actorDetail.homeImage" mode=""></image>
            </view>
            <view class="img-box">
                代表图: <u-album singleSize="50" multipleSize="50" :urls="actorDetail.coverImage" :maxCount="9"></u-album>
            </view>
            <view class="img-box">
                演示视频: <u-album singleSize="50" multipleSize="50" :urls="[actorDetail.videoClipUrl]" :maxCount="1"></u-album>
            </view>
            <view class="title-4">
                毕业院校: <text>{{actorDetail.graduationSchool?actorDetail.graduationSchool:'无'}}</text>
            </view>
            <view class="title-4">
                特长1: <text>{{actorDetail.primarySkillCategory?actorDetail.primarySkillCategory:'无'}}</text>
            </view>
            <view class="title-4">
                特长2: <text>{{actorDetail.secondarySkillCategory?actorDetail.secondarySkillCategory:'无'}}</text>
            </view>
            <view class="title-4">
                特长3: <text>{{actorDetail.thirdlySkillCategory?actorDetail.thirdlySkillCategory:'无'}}</text>
            </view>
            <view class="title-4">
                其他特长: <text>{{actorDetail.otherProfessionalCategory?actorDetail.otherProfessionalCategory:'无'}}</text>
            </view>
            <view class="title-4">
                演员过往经历: <text>{{actorDetail.pastExperiences?actorDetail.pastExperiences:'无'}}</text>
            </view>
            <view class="title-4">
                经典案例: <text>{{actorDetail.performanceCases?actorDetail.performanceCases:'无'}}</text>
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
                    name: null,
                    gender: 1,
                    age: '',
                    height: '',
                    weight: '',
                    pastExperiences: ''
                }
            }
        },
        computed: {},
        methods: {
            getActorOneDetail() {
                let params = {
                    userId: uni.getStorageSync('actor_detail').userId
                }
                getActorOneDetail(params).then(res => {
                    console.log(res)
                    this.actorDetail = res
                    this.actorDetail.coverImage = res.coverImage.split(',')
                    console.log(this.actorDetail)
                })
            }
        },
        onUnload() {},
        onLoad() {
            this.getActorOneDetail()
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        width: 750rpx;
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

            .actor-box-top {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                border-bottom: 4rpx dotted #EEE;
                padding-bottom: 16rpx;
                box-sizing: border-box;
                margin-bottom: 32rpx;

                .actor-box-top-left {
                    width: 330rpx;
                    height: 360rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .home-img {
                    display: flex;
                    width: 250rpx;
                    height: 360rpx;
                    border-radius: 16rpx;
                }
            }

            .title-1 {
                font-size: 48rpx;
                font-weight: 600;

            }

            .title-2 {

                font-size: 36rpx;
                color: #b9b9b9;
                font-weight: 600;
            }

            .title-3 {
                // margin-bottom: 16rpx;
                font-size: 36rpx;
                font-weight: 600;

                text {
                    padding-left: 12rpx;
                    font-size: 32rpx;
                    color: #b9b9b9;
                }
            }
            .title-4 {
                margin-bottom: 16rpx;
                font-size: 36rpx;
                text {
                    padding-left: 12rpx;
                    font-size: 32rpx;
                    color: #b9b9b9;
                }
            }
            .img-box {
                margin-bottom: 16rpx;
                font-size: 36rpx;
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
            }
            

            .title {
                display: block;
                font-weight: 600;
                font-size: 28rpx;
                text-align: left;
                margin-right: 10rpx;
            }

            .info {
                display: block;
                color: rgb(153, 153, 153);
                font-size: 32rpx;
            }



            .actor-box-two {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 622rpx;
                margin-bottom: 16rpx;

                .left,
                .right {
                    height: 40rpx;
                    width: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;


                }


            }

            .actor-box-line {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 622rpx;
                margin-bottom: 16rpx;
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